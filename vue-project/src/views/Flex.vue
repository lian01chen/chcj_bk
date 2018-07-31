<template>
  <div>
    <div id="flex">
      <div class="cust">客户名称：{{customerName}}</div>
      <span>选择时间段:</span>
      <div><input class="time-select" v-focus type="text" value="2016-01"/></div>
      <span>至</span>
      <div><input class="time-select" type="text" value="2017-01"/></div>
      <div class="button" @click="goHome">
        确定
      </div>
    </div>
    <div><label for="home-data">home-page-data<input type="text" id="home-data" v-model="textStr"></label></div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        customerName: '100003 广州市万荣商贸有限公司广州分公司',
        textStr: this.inputMsg
      }
    },
    props: ['inputMsg'],
    methods: {
      goHome() {
        this.$router.push({
          path: '/home',
          query: {'aa': 1}
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #flex {
    /*background-color: gray;*/
    display: flex;
    /*flex-direction:row;*/
    /*flex-wrap: nowrap;*/
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    padding: 0 30px;
    width: 60%;
    height: 74px;
    margin: 0 auto;
    border: 1px solid #cce4fc;

    .cust {
      flex: none;
      height: 74px;
      line-height: 74px;
      flex-basis: 404px;
      border-right: 1px solid #cce4fc;
    }
    span {
      display: inline-flex;
    }
    .time-select {
      flex: none;
      width: 202px;
      padding: 8px;
    }
    .button {
      cursor: pointer;
      margin-left: 10px;
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 3px;
      color: #ffffff;
      background-color: #00b0f5;
    }

  }
</style>
