<template>
  <div id="app">
    <iheader :seller="someData"></iheader>
    <div class="tab">
      <div class="tab-item">
       <router-link to="goods">商品</router-link>
      </div>
       <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
       <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
  <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller='someData'></router-view>
    </keep-alive>
  </div>
</template>

<script>

  import iheader from"./components/header/header.vue"
  export default {
    name: 'app',
    data(){
      return{
        someData:Object
      };
    },
    created(){
      this.$http.get('api/seller').then(response=>{
        this.someData=response.body.seller
      });
    },
    components:{
      iheader:iheader
    }
  }
</script>

<style scoped lang='scss'>
@import 'components/common/common.scss';
img{
  margin-left:24px;
}
.tab{
  display:flex;
  height:40px;
  background:white;
@include border1(rgba(7,17,27,0.1));
  .tab-item{
    flex:1;
    line-height:40px;
    text-align:center;
    &>a{
      display:block;
      height:100%;
      color:rgb(77,85,93);
      font-size:14px;
      &.active{
        color:rgb(240,20,20)
      }
    }
  }
}
</style>
