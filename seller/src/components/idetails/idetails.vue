<template>
  <transition name="move">
    <div class="foods-wrap" v-show="showFlag" ref="food">
      <div class="content">
        <div class="image">
          <img :src="food.image" alt="">
          <div class="back" @click="showFlag=!showFlag">返回</div>
        </div>
        <div class="food">
          <h2 class="title">{{food.name}}</h2>
          <p class="desc">{{food.description}}</p>
          <p class="sell"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
          <p class="price"><span>￥{{food.price}}</span><del v-if="food.oldPrice">￥{{food.oldPrice}}</del></p>
          <p class="join" @click="add($event)" v-if="!food.count">加入购物车</p>
          <p class="add" v-else>
            <controlMenu :food="food"></controlMenu>
          </p>
        </div>
        <div class="gap"></div>
        <div class="info">
          <h2 class="title">商品介绍</h2>
          <p class="info-content" v-if="food.info">{{food.info}}</p>
          <p class="info-content" v-else>该商品暂无介绍</p>
        </div>
        <div class="satisfaction">
          <satisfaction  :onlyContent="onlyContent" :ratings="food.ratings" :selectType="selectType"></satisfaction>
        </div>
        <div class="gap"></div>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-for="rating in food.ratings"  v-show="needshow(rating.rateType,rating.text)" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
              </div>
              <div class="time">{{ rating.rateTime }}</div>
              <p class="text">
              <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
              {{rating.text}}
            </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import controlMenu from "../controlMenu/controlMenu.vue";
  import satisfaction from "../satisfaction/satisfaction.vue";
  import BScroll from "better-scroll";
  export default{
    components:{
      controlMenu,
      satisfaction,

    },
    data(){
      return{
        selectType: 2,
        ratetype: -1,
        ratetype2: 2,
        text: -1,
        className: "unchecked",
        showFlag:false,
        onlyContent:false,
      }
    },
    props:{
      food:{
        return:Array
      }
    },
    methods:{
      add(eve){
        if(!eve._constructed){
        return;
        }
        if(!this.food.count){
        Vue.set(this.food,"count",1);
        }else{
        return;
        }
      },
      formdata(date){
        var  date  =  new  Date(date);//如果date为13位不需要乘1000
        var  Y  =  date.getFullYear()  +  '-';
        var  M  =  (date.getMonth()+1  <  10  ?  '0'+(date.getMonth()+1)  :  date.getMonth()+1)  +  '-';
        var  D  =  (date.getDate()  <  10  ?  '0'  +  (date.getDate())  :  date.getDate())  +  '  ';
        var  h  =  (date.getHours()  <  10  ?  '0'  +  date.getHours()  :  date.getHours())  +  ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
       return Y+M+D+h+m+s;
      },
      show(){
        this.showFlag =true;
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.food,{
              click:true
            })
          }else{
            this.scroll.refresh();
          }
        })
      },
      needshow(type,text){
        if(this.onlyContent && !text){
          return false;
        }
        if(this.selectType == 2){
        return true;
        }else{
         return type === this.selectType;
        }
        // return true;
      },
      hide(){
        this.showFlag =false;
      },
      addFirst(){
        if(!event._constructed){
          return
        }
        Vue.set(this.food,'count',1)
      },
    },
    watch:{
      'selectType'(type){
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      'onlyContent'(onlyContent){
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import '../common/mixin.scss';
  .foods-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow: hidden;
    .content{
      padding-bottom: 47px;
      .image{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .back{
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 7px 7px;
          font-size: 12px;
          background-color: #000;
          color: #fff;
          border-radius: 7px;
        }
        img{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      .food{
        position: relative;
        padding: 18px;
        .title{
          line-height: 14px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);
        }
        .desc{
          margin: 8px 0 18px 0;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .sell{
          font-size: 10px;
          color: rgb(147,153,159);
          margin: 8px 0 18px 0;
          line-height: 10px;
          span{
            margin-right: 12px;
          }
        }
        .price{
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
          del{
            margin-left: 12px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
        .join{
          position: absolute;
          bottom: 18px;
          right: 18px;
          padding: 6px 12px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(255,255,255);
          border-radius: 12px;
          background-color: rgb(0,160,220);
        }
        .add{
          position: absolute;
          bottom: 18px;
          right: 18px;
        }
      }
      .info{
        padding: 18px;
        .title{
          line-height: 14px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .info-content{
          padding: 6px 8px 0;
          line-height: 24px;
          font-size: 12px;
          color: rgb(77,85,93);
        }
      }
      .ratings{
        position: relative;
        padding: 18px 0;
        margin: 0 18px;
        @include border1(rgba(7,17,27,0.1))
        .title{
          margin-bottom: 18px;
          line-height: 14px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);
        }
        ul{
          font-size: 0;
          li{
            box-sizing: border-box;
            display: inline-block;
            margin-right: 8px;
            padding: 8px 12px;
            line-height: 16px;
            text-align: center;
            font-size: 14px;
            border-radius: 2px;
            &:nth-child(1){
              color: rgb(77,85,93);
              background-color: rgb(0,160,220);
            }
            &:nth-child(2){
              color: rgb(77,85,93);
              background-color: rgba(0,160,220,0.2);
            }
            &:nth-child(3){
              color: rgb(77,85,93);
              background-color: rgba(77,85,93,0.2);
            }
            &.active{
              color: #fff;
              background-color: #000;
            }
            span{
              margin-left: 2px;
              font-size: 8px;
            }
          }
        }
      }
      .select{
        position: relative;
        padding: 12px 18px;
        line-height: 24px;
        font-size: 0;
        color: rgb(147,153,159);
        @include border1(rgba(7,17,27,0.1));
        span{
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
        }
        i{
          margin-right: 4px;
          font-size: 24px;
          &.checked{
            color: #00b43c;
          }
          &.unchecked{
            color: rgb(147,153,159);
          }
        }
      }
     .rating-wrapper{
        padding: 0 18px;
        .rating-item{
          position: relative;
          padding: 16px 0;
          @include border1(rgba(7,17,27,.1));
          .user{
            position: absolute;
            right:0;
            top:16px;
            line-height: 16px;
            font-size: 0;
            .name{
              display:inline-block;
              margin-right:6px;
              vertical-align: top;
              font-size: 10px;
              color:rgb(147,153,159);
            }
            .avatar{
              border-radius:50%;
            }
          }
          .time{
            margin-bottom:6px;
            line-height: 12px;
            font-size: 10px;
            color:gray;
          }
          .text{
            line-height: 16px;
            font-size: 12px;
            color: rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down{
              margin-right: 4px;
              line-height: 24px;
              font-size: 12px;
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down{
              color:gray;
            }
          }
        }
      }
      .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color:rgb(147, 153, 159);
      }
    }
  }
  .move-enter-active, .move-leave-active{
    transition: all 0.2s linear;
    transform: translate3D(0,0,0);
  }
  .move-enter,.move-leave-active{
    transform: translate3D(100%,0,0);
  }
  </style>