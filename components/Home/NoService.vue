<template>
     <div class="no-service">
      <div class="main-content col-alignment">
      <img src="/images/disclamir.svg" alt="" class="mr-3">
        
        <p class="mb-0 no-service-txt">
          {{$t('no_service')}}
        </p></div>
  </div>
</template>
<style lang="scss">
.no-service{
 /*  background-color: #EA43353D; *///black
  background-color: #E63550;//white
  padding: 18px 2px;
  .no-service-txt{
    font-size: 14px;
    line-height: 15.6px;
    font-weight: 400;
    color: #FFFFFF;
  }
  @media screen and (max-width: 1024px) {
    .no-service-txt{
      font-size: 12px;
    }
  }
}
</style>