<template>
  <div class="ratings" ref='ratings'>
    <div>
      <div class="grade" >
        <div class="grade-left">
         <div class="score"> {{seller.score}}</div>
          <div class='comprehensive'>综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="grade-right">
          <span class="Attitude">
           <span class="Service">服务态度</span> <star :star="seller.serviceScore" :size='36'></star><span class="serviceScore">{{seller.serviceScore}}</span>
          </span>
          <div class="Attitude">
           <span class="Service">服务态度</span> <star :star="seller.foodScore" :size='36'></star ><span class="serviceScore">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span>送达时间</span><span class
            ='Time'>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="striping">
      </div>
      <div class="satisfaction">
        <satisfaction :desc='desc' :ratings='ratings' :selectType='selectType' :onlyContent='onlyContent'></satisfaction>
      </div>
      <div class="username">
        <ul >
          <li class="Distance" v-for='i in ratings' v-show='needShow(i.rateType,i.text)'>
            <div class="Avatar">
              <img :src="i.avatar">
            </div>
            <div class="information">
              <p class="monicker">{{i.username}}<span class="time">
              {{formdata(i.rateTime)}}</span></p>
              <p class="Vitas"><star :star="i.score" :size='48' class='star'></star><span class="deliveryTime">{{i.deliveryTime}}分钟送达</span></p>
              <div class="remark">
                {{i.text}}
              </div>
              <div class="thumb">
                <span v-if="i.rateType===0" class="icon-thumb_up"></span>
                <span  v-else class="icon-thumb_down bad"></span>
                <ul class="Dishes">
                  <li v-for='item in i.recommend'>{{item}}</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../star/star.vue'
import satisfaction from '../satisfaction/satisfaction.vue'
export default {
  props:{
      seller:{
        return:Object
      }
    },
    data(){
      return{
        ratings:[],
        selectType:2,
        onlyContent:false,
        goods:[],
        listHeight:[],
        scrollY:0,
        selectFood:{},
      desc:{
          all: '全部',
          positive:'满意',
          negative:'不满意'
        }
      }
    },
    created(){
      this.$http.get('api/ratings').then(response=>{
        response=response.body;
        this.ratings=response.data;
        this.$nextTick(()=>{
          this.scroll=new BScroll(this.$refs.ratings,{
            click:true
          })
        })
      });
    },
    watch:{
      'selectType'(type){
        this.selectType=type;
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      },
      'onlyContent'(onlyContent){
        this.onlyContent=onlyContent;
        this.$nextTick(()=>{
          this.scroll.refresh();
        })
      }
    },
  components:{
    star,
    satisfaction
  },
  methods:{
   needShow(type,text){
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import '../../components/common/mixin.scss';
  .ratings{
    position: fixed;
    top:184px;
    left:0;
    bottom:0;
    width: 100%;
    overflow: hidden;
    .grade{
      display:flex;
      width:100%;
      @include border1(#e6e7e8);
      .grade-left{
        flex:0 0 140px;
        margin:18px 0;
        border-right:1px solid rgba(147,153,159,0.3);
        .score{
          font-size:24px;
          color:rgb(255,153,0);
          line-height:28px;
          margin-bottom:6px;
          text-align:center;
        }
        .comprehensive{
          font-size:12px;
          color:rgb(7,17,27);
          line-height:12px;
          text-align:center;
          margin-bottom:8px;
        }
        .rankRate{
          font-size:10px;
          color:rgb(147,153,159);
          line-height:10px;
          text-align:center;
        }
      }
      .grade-right{
        flex:1;
        margin:18px 12px;
        .Attitude{
            margin:8px 0;
          .Service{
            font-size:12px;
            color:rgb(7,17,27);
          }
          .star{
            display:inline-block;
            margin:0 3px;
          }
          .serviceScore{
            font-size:12px;
            color:rgb(255,153,0);
            line-height:18px;
          }
        }
        .deliveryTime{
            span{
              font-size:12px;
              line-height:18px;
              margin-right:6px;
            }
            .Time{
              color:rgb(147,153,159)
            }
        }
      }
    }
    .striping{
      height:16px;
      width:100%;
      background:#f3f5f7;
    }
    .satisfaction{
      position:relative;
      padding-bottom:36px;
      &:after{
        position:absolute;
        top:0;
        left:0;
        content:'';
        width:100%;
        height:1px;
        background-color:#e6e7e8;
      }
      ul{
       padding:18px 18px 0;
        li{
          float:left;
          text-align:center;
          line-height:32px;
        }
        li:nth-child(1){
          width:60px;
          height:32px;
          color:white;
          background:#00a0dc;
          margin-right:18px;
        }
         li:nth-child(2){
          width:60px;
          height:32px;
          background:#ccecf8;
          margin-right:18px;
        }
        li:nth-child(3){
          width:60px;
          height:32px;
          background:#e9ebec;
        }
      }
    }
    .content{
      clear:both;
     padding:18px 0;
     margin:18px;
     color:#93999f;
     position:relative;
      &:after{
        position:absolute;
        top:0;
        left:0;
        content:'';
        width:100%;
        height:1px;
        background-color:#e6e7e8;
      }
    }
    .username{
       position:relative;
      margin-bottom:48px;
        &:after{
        position:absolute;
        top:-18px;
        left:0;
        content:'';
        width:100%;
        height:1px;
        background-color:#e6e7e8;
        }
        ul{
          padding: 0 18px;
           .Distance{
            padding:18px 0;
            display:flex;
            @include border1(#e6e7e8);
            .Avatar{
              flex:0 0 30px;
              padding-right:12px;
              img{
              width:28px;
              height:28px;
              border-radius:50%;
              }
            }
          .information{
            flex:1;
            .monicker{
              font-size:10px;
              color:rgb(7,17,27);
              line-height:12px;
              span{
                float:right;
                margin-right:18px;
                color:rgb(7,17,27);
              }
            }
            .Vitas{
              margin-top:4px;
              margin-bottom:8px;
             .star{
              float:left;
             }
             .deliveryTime{
              font-size:10px;
              font-weight:200;
              color:rgb(147,153,159);
              line-height:12px;
             }
            }
            .remark{
              font-size:12px;
              color:rgb(7,17,27);
              line-height:18px;
            }
            .thumb{
                display:inline-block;
                font-size:12px;
                color:rgb(0,160,220);
                line-height:16px;
                margin-left:8px;
                margin-top:8px;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:clip;

                }
                .bad{
                  color:black;
                }
            .Dishes{
                display:inline-block;
              li{
                float:left;
                margin:8px 8px 0 0;
                border:1px solid #93999f;
                font-size:8px;
                color:rgb(147,153,159);
                line-height:16px;
                text-align:center;
              }
            }
          }
        }
      }
    }
   .shopping-wrapper{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
   }
  }
</style>