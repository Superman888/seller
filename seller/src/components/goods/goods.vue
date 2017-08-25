<template>
  <div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
      <ul>
      <li v-for='(i,index) in goods' class="menu-item " :class="{'current':currentIndex===index}" @click='selectMenu(index)'>
      <span class="text border-1px">
      <span class="icon decrease" :class='[classMap[i.type]]' v-if='i.type>0'></span>{{i.name}}</span>
      </li>
    </ul>
    </div>
    <div class="goods-wrapper" ref="foodWrapper">
        <ul>
          <li v-for="i in goods" class='food-list-hook'>
            <h2 class='title'>{{i.name}}</h2>
            <ul>
              <li v-for='food in i.foods' class='food' @click='ishowFood(food)'>
                <img :src="food.icon" alt="">
                <dl>
                  <dt>{{food.name}}</dt>
                  <dd>{{food.description}}</dd>
                  <dd>
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </dd>
                  <dd>
                    <controlMenu :food="food" ></controlMenu>
                  </dd>
                  <dd class='price'>￥{{food.price}}</dd>
                </dl>
              </li>
            </ul>
          </li>
        </ul>
    </div>
    <div  style="position: fixed; left:0; top:0;background:#fff">

      <idetails ref="food" :food="selectFood"></idetails>
    </div>
    <div class="shopping-wrapper">
      <shopcart :shopping='seller.deliveryPrice' :minPrice='seller.minPrice' :selectFoods='selectFoods'></shopcart>
    </div>
  </div>
</template>

<script>
 import BScroll from 'better-scroll'
 import shopcart from '../shopcart/shopcart.vue'
 import controlMenu from '../controlMenu/controlMenu.vue'
 import idetails from '../idetails/idetails.vue'
export default {
    props:{
      seller:{
        return:Object
      }
    },
    data(){
      return{
        goods:[],
        listHeight:[],
        scrollY:0,
        selectFood:{}
      }
    },
    created(){

      this.$http.get('api/goods').then((response)=>{
        this.goods=response.body.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();

        })
      }),
      this.classMap=['decrease','discount','guarantee','invoice','special']
    },
    methods:{
      _initScroll(){
        this.menuScroll= new BScroll(this.$refs.menuWrapper,{
          click:true
        });
        this.foodScroll= new BScroll(this.$refs.foodWrapper,{
          click: true,
          probeType:3
        });
        this.foodScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(Math.floor(pos.y))
          // console.log( this.scrollY);
        })
      },
      _calculateHeight(){
        let foodlist =this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height =0;
        this.listHeight.push(height);
        for(let i=0;i<foodlist.length;i++){
          let item =foodlist[i];
          height+=item.clientHeight;
          this.listHeight.push(height);
        }
        // console.log(this.listHeight);
      },
      selectMenu(index,event){
        // if(!event._constructed){
        //   return
        // }
        // console.log(event);
        let foodlist =this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let ele=foodlist[index];
        this.foodScroll.scrollToElement(ele,300)
      },
      ishowFood(food){
        this.selectFood= food;
        this.$refs.food.show();
      }
    },
    computed:{
      currentIndex(){
         for(let i=0;i<this.listHeight.length;i++){
            let height1=this.listHeight[i];
            let height2=this.listHeight[i+1];
            if (!height2||(this.scrollY>height1&&this.scrollY<height2)) {
              return i;
            };
         }
         return 0;
      },
      selectFoods(){
        let foodlist=[];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foodlist.push(food);
            }
          })
        })
        return foodlist
      }
    },
    components:{
     shopcart,
     controlMenu,
     idetails
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
   @import '../common/mixin.scss';
  .goods{
    display:flex;
    position:absolute;
    overflow:hidden;
    top:183px;
    bottom:0;
    width:100%;
    .menu-wrapper{
      flex:0 0 80px;
      width:80px;
      background-color:#f3f5f7;
      ul{
        padding-bottom:60px;
      }
      .current{
       z-index:10;
       // margin-top:-1px;
       background:white;
       font-weight:700;
      }
      .menu-item{
        display:table;
        padding:0 12px;
        height:54px;
        width:54px;
        .text{
          vertical-align:middle;
          font-size:12px;
          color:rgb(7,17,27);
          font-weight:200;
          line-height:14px;
          display:table-cell;
          @include border1(rgba(7,17,27,.1))
          .icon{
            display:inline-block;
            vertical-align:middle;
            width:14px;
            height:14px;
            background-size:cover;
            &.decrease{
              @include bgImage(decrease_3);
            }
            &.discount{
            @include bgImage(discount_3);
            }
            &.guarantee{
            @include bgImage(guarantee_3);
            }
            &.invoice{
            @include bgImage(invoice_3);
            }
            &.special{
            @include bgImage(special_3);
            }
          }
        }
      }    }
    .goods-wrapper{
      flex:1;
      ul{
        padding-bottom:20px;
      }
      .title{
        border-left:2px solid #d9dde1;
        height:26px;
        font-size:24px;
        color:rgb(147,153,159);
        line-height:26px;
        background:#f3f5f7;
      }
      .food{
        padding:18px 18px 18px;
        img{
          margin-right:10px;
          height:57px;
          width:57px;
          float:left;
        }
        dl{
          margin-left:67px;
          dt{
            font-size:14px;
            color:rgb(7,17,27);
            margin-bottom:8px;
            line-height:14px;
          }
          dd{
            font-size:10px;
            color:rgb(147,153,159);
            line-height:10px;
            margin-bottom:8px;
          }
        .price{
           color:red;
           font-weight:700;
           line-height:24px;

        }
        }
      }
    }
    .shopping-wrapper{
      position: absolute;
      bottom:0;
      left:0;
      width:100%;
    }
  }
</style>