<template>
  <div class="seller" ref='seller'>
    <div class="fox">
      <div class="head">
        <div class="trade">
          {{seller.name}}
        </div>
        <div class="star-appraise">
          <star :star="seller.serviceScore" :size='36' class='star-map'></star>
          <span class="evaluate">({{seller.rankRate}})</span>
          <span class="sale">月售{{seller.sellCount}}单</span>
          <div class="collect" @click='show'>
              <i class="icon-favorite" :class='{col:num===0}'></i>
            <span >{{word}}</span>
          </div>
        </div>
      </div>
      <div class="Price">
        <div class="minimum">
          <p>起送价</p>
          <span>{{seller.minPrice}}元</span>
        </div>
        <div class="minimum">
          <p>商家配送</p>
          <span>{{seller.deliveryPrice}}元</span>
        </div>
        <div class="time">
          <p>平均配送时间</p>
          <span>{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
      <div class="Space"></div>
      <div class="notice">
        <p>公告与活动</p>
        <span>{{seller.bulletin}}</span>
      </div>
      <div class="supports-wrapper" >
        <supports v-if="seller.supports" :supports="seller.supports" :className='blacks'></supports>
      </div>
      <div class="blank"></div>
      <div class="pics-wrapper">
          <p class="title" v-if="seller.pics">商家实景</p>
          <div class="pics" ref="picsScroll">
            <ul ref="piclist">
              <li v-for="item in seller.pics">
                <img :src="item" alt="">
              </li>
            </ul>
          </div>
      </div>
      <div class="infor-wrapper" v-if="seller.infos">
        <h2 class="title">商家信息</h2>
        <ul>
          <li class="after1px" v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../star/star.vue'
import supports from '../supports/supports.vue'
export default {
  props:{
    seller:{
      return:Object
    }
  },
  data(){
    return{
      className:'col',
      num:1,
      word:'未收藏',
      blacks:'blacks'
    }
  },
  watch:{
    'seller'(){
      this.$nextTick(()=>{
        this._initScroll();
      })
    }
  },
  mounted(){
    this._initScroll();
  },
  methods:{
      _initScroll(){
      if(this.seller.pics){
        let picWidth=120;
        let margin=6;
        let width=(picWidth+margin)*this.seller.pics.length-margin;
        this.$refs.piclist.style.width=width+'px';
        this.$nextTick(()=>{
          this.scrollX= new BScroll(this.$refs.picsScroll,{
            scrollX:true,
          });
          this.scrollY= new BScroll(this.$refs.seller,{
            click:true,
            // eventPassthrough:'vertical'
          })
        })
      }
    },
    show(){
      if(this.num!=1){
        this.num=1
        this.word='收藏'
      }else{
        this.num=0
        this.word='已收藏'
      }
    }
  },
  components:{
    star,
    supports
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import '../../components/common/mixin.scss';
  .seller{
    position: fixed;
    top: 180px;
    width: 100%;
    height:100%;
    overflow: hidden;
    .fox{
      padding-bottom: 180px;
    }
    .head{
      padding:18px;
      .trade{
        display:inline-block;
        font-size:14px;
        color:rgb(7,17,27);
        line-height:14px;
      }
      .star-appraise{
        position: relative;
        @include border1(#e6e7e8);
        padding-bottom:18px;
        .star-map{
          display:inline-block;
          margin-top:8px;
          text-align:none;
        }
        .evaluate{
          padding-right:12px;
          font-size:10px;
        }
        .sale{
          font-size:10px;
          color:rgb(77,85,93);
          line-height:18px;
        }
        .collect{
          position:absolute;
          right:0;
          top:-20px;
          i{
            text-align:center;
            display:block;
            margin-bottom:4px;
            font-size:24px;
            line-height:24px;
            color:rgba(7,17,27,0.1);
            &.col{
            color:rgb(240,20,20);
            }
          }
          span{
            font-size:10px;
            color:rgb(77,85,93);
            line-height:10px;
          }
        }
      }
    }
    .Price{
        padding-top:18px;
        text-align:center;
        @include border1(rgba(7, 17, 27, 0.2));
        padding-bottom:18px;
          P{
            font-size:10px;
            color:rgb(147,153,159);
            line-height:10px;
          }
          span{
            font-size:10px;
            font-weight:200;
            color:rgb(7,17,27);
            line-height:24px;
          }
        .minimum{
          display:inline-block;
          border-right:1px solid #e6e7e8;
          padding-right:24px;
          text-align:center;
          margin-right:24px;
        }
        .time{
          display:inline-block;
          text-align:center;

        }
    }
    .Space{
      height:8px;
      background:#e6e7e8;
      @include border1(rgba(7, 17, 27, 0.1));
    }
    .notice{
      padding:18px 18px;
      P{
        margin:0;
        padding-bottom:8px;
        font-size:14px;
        color:rgb(7,17,27);
        line-height:14px;
      }
      span{
        display:block;
        font-size:12px;
        font-weight:200;
        color:rgb(240,20,20);
        line-height:24px;
        padding:0 12px;
      }
    }
    .supports-wrapper{
      font-size:12px;
      font-weight:200;
      color:rgb(7,17,27);
      line-height:16px;
    }
    .blank{
      height:8px;
      background:#e6e7e8;
      @include border1(rgba(7, 17, 27, 0.1));
    }
    .pics-wrapper{
      padding: 18px;
      .title{
        margin-bottom: 12px;
      }
      .pics{
        position: relative;
        width: 100%;
        height: 90px;
        white-space: nowrap;
        overflow: hidden;
        ul{
          position: absolute;
          top: 0;
          left: 0;
          font-size: 0;
          li{
            margin-right: 6px;
            display: inline-block;
            width: 120px;
            height: 90px;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .infor-wrapper{
      position: relative;
      padding: 18px 18px 48px;
      .title{
        margin-bottom: 12px;
      }
      ul{
        li{
          position: relative;
          padding: 16px 12px;
          line-height: 16px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(7,17,27);
          @include border1(rgba(7,17,27,0.1))
        }
      }
    }
  }
</style>
