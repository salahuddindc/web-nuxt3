<template>
  <div  class="nodata">
    <AppLoading v-if="loading" height="20vh" background-color="transparent"/>
    <a-card class="nodata-card" v-else>
        <a-row class="py-5 my-4 text-center">
        <img src="/images/nodata.svg" height="40px" width="64px"/>
        <p class="nodata-txt mt-2 mb-0">{{$t('public.nr1')}}</p>
    </a-row>
    </a-card>
    
  </div>
</template>

<script>
 

export default {
   
    props:{
      loading:{
        type:Boolean,
        default:false
      }
    }

}
</script>

<style lang="scss">
.nodata-txt {
    color: rgba(0, 0, 0, 0.25);
    font-size: 14px;
    line-height: 22px;
}
.nodata-card {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #eaeff3;
}
</style>
