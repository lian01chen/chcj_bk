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
    <div>foo/inc/count : {{ fooCount }}</div>
    <button @click="add"> count ++ </button>
  </div>
</template>

<script>
  import fooStoreModule from '../store/modules/foo.js'
  import { mapActions } from 'vuex'
  import * as types from '../store/types'
  export default {
    name: 'App',
    asyncData({ store }){
      store.registerModule('foo',fooStoreModule)
      // TODO 解释：registerModule 只会注册state，而store中的actions，mutations等字段不会被注册？
      return store.dispatch('incAction')
    },
    data() {
      return {
        customerName: '100003 ',
        textStr: this.inputMsg
      }
    },
    computed:{
      fooCount(){
        return this.$store.state.foo.count
      }
    },
    props: ['inputMsg'],
    created(){
      // TODO 注意看count值的变化，created生命周期在客户端和服务端都会执行，这里都值会增加2
      // this.$store.dispatch(types.INC_ACTION)
      // this.$store.commit('INC_COUNTS')
    },
    mounted(){
      this.$store.dispatch(types.INC_ACTION)
    },
    methods: {
      ...mapActions({
        addAction:'incAction'
      }),
      goHome() {
        this.$router.push({
          path: '/home',
          query: {'aa': 1}
        })
      },
      add(){
        this.addAction()
        // this.$store.dispatch(types.INC_ACTION)
        // this.$store.commit('INC_COUNTS')
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
