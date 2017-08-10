<template>
  <div class="header">
    <div class="conter-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <h2>{{seller.name}}</h2>
        </div>
        <p class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div class="supports-wrapper">
          <supports v-if='seller.supports' :supports="seller.supports"></supports>
        </div>
      </div>
    </div>
    <div class="counter-weapper" @click='showDetail' v-if='seller.supports'>
      <div class="counter">
        {{seller.supports.length}}
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bottom" v-on:click='showDetail'>
      <p>
      <span></span>{{seller.bulletin}}
      </p>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <div class="overflow">
        <img :src="seller.avatar" alt="">
      </div>
    </div>
    <transition name='fade'>
      <div class="detail-wrapper" v-show=" detailshow" >
        <div class="detail" >
          <h2>{{seller.name}}</h2>
          <div class="star-wrapper">
            <star :star="seller.score" :size='24'></star >
          </div>
           <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <div class="supports-wrapper" >
            <supports v-if="seller.supports" :supports="seller.supports" :className='big'></supports>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulle">
            {{seller.bulletin}}
          </div>
          <div class="close">
            <i class="icon-close" v-on:click='closeDetail'></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import supports from '../supports/supports.vue'
import star from '../star/star.vue'
  export default{
    props:{
      seller:{
        return:Object
      }
    },
    data(){
      return{
        detailshow:false,
        big:'big'
      }
    },
    methods:{
      showDetail(){
        this.detailshow=true;

    },
    closeDetail(){
      this.detailshow=false;
    }
    },
    components:{
      supports,
      star,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import '../../components/common/common.scss';
  @import '../../components/common/mixin.scss';
.header{
    position: relative;
    height: 143px;
    background:rgba(7,17,27,0.5);
    .conter-wrapper{
      padding: 24px 0 18px 24px;
      font-size: 0;
      .avatar{
        display: inline-block;
        margin-right: 18px;
        border-radius: 2px;
        overflow: hidden;
        img{
          width:64px;
          height:64px;
          border-radius:2px;
        }
      }
      .content{
        display: inline-block;
        vertical-align: top;
        .brand{
          vertical-align: top;
          margin-right: 6px;
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bgImage('brand');
          background-size: cover;
        }
        h2{
          display: inline-block;
          line-height: 18px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
        }
        .desc{
          margin: 8px 0 10px 0;
          line-height: 12px;
          font-weight: 200;
          font-size: 12px;
          color: #fff;
        }
        .supports-wrapper{
          line-height:12px;
          font-weight:200;
          height:12px;
          font-size:10px!important;
          color:rgb(255,255,255);
          overflow:hidden;
        }
      }
    }
    .counter-weapper{
      position: absolute;
      right:12px;
      bottom:50px;
      .counter{
        box-sizing:border-box;
        padding:7px 8px;
        border-radius:26px;
        line-height:12px;
        font-weight:200;
        font-size:10px;
        background-color:rgba(0,0,0,0.2);
        color:rgb(255,255,255);
      }
    }
    .bottom{
      position: absolute;
      padding:0 12px;
      bottom:0;
      box-sizing:border-box;
      width:100%;
      height:28px;
      background-color:rgba(7,17,27,0.2);
      font-size:10px;
      color:rgb(255,255,255);
      line-height:28px;
      p{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        span{
        vertical-align:top;
        margin-top:8px;
        width:24px;
        height:13px;
        margin-right:4px;
        display: inline-block;
        background-size: cover;
       @include bgImage('bulletin');
        }
      }
      i{
        position: absolute;
        right:0;
        bottom:8px;
      }
    }
  }
  .background{
    z-index:-1;
    position: absolute;
    left:0;
    top:0;
    width:100%;
    overflow:hidden;
    filter:blur(10px);
    .overflow{
      height:143px;
      img{
        width:100%;
      }
    }
  }
  .detail-wrapper{
    z-index:10;
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    overflow:auto;
    background:rgba(7,17,27,0.8);
    color:rgb(255,255,255);
    .detail{
      position: relative;
      min-height:100%;
      background-filter:blur(10px);
      padding-bottom:96px;
      box-sizing:border-box;
       h2{
          padding:64px 16px 32px;
          line-height: 16px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
        .star-wrapper{
          margin: 16px auto 28px;
          text-align: center;
        }
          .title{
          display: flex;
          padding:0 12px;
          .line{
            position: relative;
            top: -7px;
            flex: 1;
            border-bottom: 1px solid rgba(255,255,255,0.2)
          }
          .text{
            padding:0 12px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(255,255,255);
          }
        }
         .supports-wrapper{
          margin: 24px 12px 28px;
        }
          .bulle{
          margin: 24px 12px 0;
          line-height: 24px;
          font-size: 12px;
          font-weight: 200;
          color: #fff;
        }
     }
  }
  .close{
    position: absolute;
    padding:64px 0;
    bottom:0;
    text-align:center;
    width:100%;
    i{
      font-size:32px;
      color:rgba(255,255,255,0.5);
    }
  }
  .fade-enter-active,.fade-leave-active{
    transition:opacity .5s
  }
  .fade-enter,.fade-leave-to{
    opacity:0;
  }
</style>