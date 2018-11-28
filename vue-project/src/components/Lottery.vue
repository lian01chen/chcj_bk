<template>
  <section id="lottery">
    <ul class="lottery-square">
      <li v-for="(prize,index) in lotteryList" :key="index"
          :class="['prize-item',activeIndex === index ? 'active':'',index > 2 ? 'revert' :'']">
        <span>{{prize}}个</span>
        <span>加速包</span>
      </li>
    </ul>
    <button @click="lottery" class="start-lottery">start lottery</button>
  </section>
</template>

<script>
  export default {
    name: "NewLottery",
    data () {
      return {
        lotteryList: [ 10, 1, 5, 2, 5, 20 ],
        prizeIndex: -1, // 最后中奖序号
        times: 0,
        cycle: 20, // 至少跳动的次数
        timer: null,
        speedData: 300,
        activeIndex:-1,
        lock:false
      }
    },
    methods: {
      lottery(){
        if(this.lock) return
        this.lock = true
        this.roll()
      },
      roll () {
        this.times += 1
        this.activeIndex +=1
        if(this.activeIndex > 5){
          this.activeIndex = 0
        }
        // eslint-disable-next-line
        console.log('--->',this.times,this.cycle,'-->',this.prizeIndex,this.activeIndex,this.speedData)
        if (this.times > this.cycle + 10 && this.prizeIndex === this.activeIndex) {
          // todo 满足停止条件
          this.speedData = 300
          this.times = 0
          clearTimeout(this.timer)
          setTimeout(() => {
            this.showResult(this.prizeIndex)
          }, 1000)
          this.timer = null
          this.lock = false
        } else {
          if (this.times < this.cycle || this.prizeIndex === -1) {
            this.speedData -= 20
          } else {
            if (this.times > this.cycle + 10 && ((this.prizeIndex == 0 && this.activeIndex == 5) || this.prizeIndex == this.activeIndex + 1)) {
              this.speedData += 80
            } else {
              this.speedData += 20
            }
          }
          if (this.speedData < 80) {
            this.speedData = 80
          }
          if(this.speedData > 400){
            this.speedData = 400
          }
          this.timer = setTimeout(() => {this.roll()}, this.speedData)
        }
        return false
      },
      /**
       *
       */
      showResult (index) {
        alert('中奖编号：' + index)
      }
    },
    created () {
      // 接口长时间无返回的情况
      setTimeout(() => {
        this.prizeIndex = 5
      }, 805)
    }
  }
</script>

<style lang="less" scoped>
  #lottery {
    li {
      list-style: none;
    }
    ul{
      margin: 0;
      padding: 0;
    }
    .lottery-square {
      /*clear:both; height: 0; line-height: 0; font-size: 0;*/
      width: 300px;
      margin: 0 auto;
      .prize-item {
        float: left;
        width: 80px;
        height: 80px;
        background-color: gray;
        margin: 10px;
        span {
          display: block;
          &:first-child {
            padding-top: 20px;
          }
        }
      }
      .revert {
        float: right;
      }
      .active {
        background-color: #79f2a5;
      }
    }
    .lottery-square {zoom:1;}    /*==for IE6/7 Maxthon2==*/
    .lottery-square::after {clear:both;content:'.';display:block;width: 0;height: 0;visibility:hidden;}/*==for FF/chrome/opera/IE8==*/
    .start-lottery{
      margin-top: 20px;
      width:200px;
      height: 40px;
      font-size: 20px;
      background: #28a745;
      color:#fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
</style>