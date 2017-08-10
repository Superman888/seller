<template>
  <div class="supports" :class='[className]'>
    <ul>
      <li v-for='(i,index) in supports'>
      <span class="icon" :class='classMap[supports[index].type]'></span>
      {{i.description}}
      </li>
    </ul>
  </div>
</template>

<script>
 export default{
  props:{
    supports:{
      return:Array
    },
    className:{
      return:String
    }
  },
  created(){
    this.classMap=['decrease','discount','guarantee','invoice','special']
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
 @import '../common/mixin.scss';
  .supports{
   li{
        color: #fff;
    .icon{
      float: left;
      margin-right: 4px;
      width: 12px;
      height: 12px;
      background-size: cover;
      &.decrease{
        @include bgImage(decrease_1);
      }
      &.discount{
        @include bgImage(discount_1);
      }
      &.guarantee{
        @include bgImage(guarantee_1);
      }
      &.invoice{
        @include bgImage(invoice_1);
      }
      &.special{
        @include bgImage(special_1);
      }
    }
  }
  &.big{
    li{
      margin-bottom: 12px;
      line-height: 12px;
      font-size: 12px;
      font-weight: 200;
      color: #fff;
    }
   }
   &.blacks{
    padding:0 16px;
    li{
      padding:16px 18px;
      line-height: 12px;
      font-size: 12px;
      font-weight: 200;
      color:rgb(7,17,27);
      @include border1(rgba(7,17,27,.1));
    }
    li:nth-child(1){
       position:relative;
      &:after{
        position:absolute;
        top:0;
        left:0;
        content:'';
        width:100%;
        height:1px;
        background-color:rgba(7,17,27,.1);
      }
       &:before{
        position:absolute;
        bottom:0;
        left:0;
        content:'';
        width:100%;
        height:1px;
        background-color:rgba(7,17,27,.1);
      }
    }
   }
}
</style>
