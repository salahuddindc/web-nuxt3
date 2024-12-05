<template>
    <div id="commingsoon">
        <div class="comming-soon-page">
            <div class="main-content">
                <a-row class="col-alignment1">
                    <a-col :lg="12">
                        <p class="heading mb-0 ">{{ $t('commingSoon.comming_soon') }}...</p>
                        <p class="desc">{{ $t('commingSoon.comming_soon_desc') }}</p>
                        <AppSocialLinks customClass="justify-start" />
                    </a-col>
                    <!--  <a-col :lg="6">
                    <img src="/images/comin-soon-icon.png" alt="">
                </a-col> -->
                </a-row>
            </div>
        </div>
    </div>
</template>
<script>

export default {

    data() {
        return {
            // text: ''
        }
    },

}
</script>
<style lang='scss'>
#commingsoon {
    .comming-soon-page {
        background: url('/images/coming-soon-bg.svg');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 100vh;
        /* padding: 257px 0; */
        display: grid;
        align-items: center;

        img {
            width: 100%;
        }
    }

    .col-alignment1 {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .heading {
        font-size: 2rem;
        font-weight: 500;
        line-height: 2.9rem;
        color: #081131;
    }

    .desc {
        color: #081131;
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1.8125rem;
    }

    .justify-start {
        /*  justify-content: flex-start !important; */
    }
}
</style>
