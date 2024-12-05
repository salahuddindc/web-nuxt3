
// ~/plugins/axios.js


import axios from 'axios';
import Crypto from './crypto';
const api = 'https://test_api.bitnasdaq.io';
import AxiosConfig from './config';
import { useNuxtApp } from '#app'; // To access the Nuxt app instance

export default defineNuxtPlugin((nuxtApp) => {
    const customAxiosSetting = {
        baseURL: api
    }

    const axiosInstance = axios.create(customAxiosSetting);
    axiosInstance.interceptors.request.use(
        async (config) => {

            const { $store } = useNuxtApp()
            const baseInfo = AxiosConfig.getBaseInfo($store, config.url)

            if (config.data) {
                config.data = Object.assign({}, baseInfo, config.data)
            } else {
                config.data = baseInfo
            }

            if (config.data) {
                const strData = JSON.stringify(config.data)
                await AxiosConfig.getToken($store)
                const tokenObj = $store.getters['getToken']
                const access_token = tokenObj.token
                console.log(config.url)
                console.log(strData)
                config.data = strData ? Crypto.encrypt(strData, access_token) : ''
            }
            const { headers } = AxiosConfig.setHeader($store, config)
            config.headers = headers;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        async (response) => {
            const { $store } = useNuxtApp();
            let _data = response.data, newData = null

            if (response.status == 401 || _data.code == '-40002' || _data.code == '-40003') {
                $store.commit('set_message', {
                    type: 'error',
                    text: "Login timeout!"
                });
                // $store.commit('remove_user_info');
            }

            if (_data.code == '200') {

                if (_data.hexdata) {
                    let access_token = response.config.headers.Authorization.replace("Bearer ", "");
                    newData = Crypto.decrypt(_data.hexdata, access_token);
                } else {
                    newData = _data.data;
                }
            } else {
                if (!(response.config.url.includes('assets.master.depositcomfrim') ||
                    response.config.url.includes('assets.imove.deposit.comfirm'))) {
                    $store.commit('set_message', {
                        type: 'error',
                        text: _data.msg
                    });
                }
            }
            _data.data = newData;
            return _data;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', axiosInstance);
});