<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide class="item" v-for="(slide,index) in swiperSlides" :key="slide">
      <iframe-item :url="slide"></iframe-item>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
    <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import IframeItem from '../components/Iframe.vue'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Swiper',
  data() {
    return {
      swiperSlides:['https://pages.c-ctrip.com/ztrip/market/2018zxchunyun/img/15.png',
        'https://pages.c-ctrip.com/ztrip/market/2018zxchunyun/img/200.png',
        'https://pages.c-ctrip.com/ztrip/market/2018zxchunyun/img/50.png',
        'https://pages.c-ctrip.com/ztrip/market/2018zxchunyun/img/ad.png',
        'https://pages.c-ctrip.com/ztrip/market/2018zxchunyun/img/bg-box3.jpg',
        'https://pages.c-ctrip.com/ztrip/market/2018zxchunyun/img/vip.png',
      ],
      swiperOption: {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows : false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        /**
         * 详细是事件api参看：https://www.swiper.com.cn/api/event/92.html
         */
        on: {
          /**
             * 这个事件当手不离开屏时，貌似不会触发
             */
          slideChangeTransitionStart:()=>{
            // console.log(this.swiper,'slideChangeTransitionStart')
          },
          slideChangeTransitionEnd: ()=>{
            // console.log(this.swiper,'slideChangeTransitionEnd')
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          },
          click:()=>{
            // console.log(this.swiper,'click')
          },
          slideChange:()=>{
            // console.log(this.swiper,'slidechange')
          }
        },
      }
    }
  },
  components: {
    swiper,
    swiperSlide,
    IframeItem
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
    // console.log('mounted',this.swiper)
  }
}
</script>
<style lang="less">
.item {
  width: 260px !important;
  height: 300px;
  border: 2px solid gray;
}
</style>
