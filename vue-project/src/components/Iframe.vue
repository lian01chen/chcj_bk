<template>
  <div class="iframe-item">
    <iframe :src="url" frameborder="0" class="iframeItem" :style="styleObj"></iframe>
  </div>
</template>
<script>
export default {
  name:'IframeItem',
  data(){
    return {
      loading:true,
      styleObj:{
        width:`${this.wd}px`,
        height:`${this.ht}px`,
      }
    }
  },
  props:{
    url:{
      type:String,
      required:true
    },
    wd:{
      type:Number,
      default:300
    },
    ht:{
      type:Number,
      default:150
    }
  }
}
</script>
<style <style lang="less" scoped>
.iframe-item {
  overflow: hidden;
}
</style>
