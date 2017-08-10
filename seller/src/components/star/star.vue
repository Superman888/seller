<template>
  <div class="star" :class='[typeSize]'>
    <li v-for='i in classi' class="star-i"  :class='i'></li>
  </div>
</template>

<script>
const aa=5;
 export default{
  props:{
    star:{
      return:Number
    },
    size:{
      type:Number
    }
 },
 computed:{
  typeSize(){
    return 'type'+this.size
  },
  classi(){
    let result=[];//用来存储数组
    let socre=Math.floor(this.star*2) / 2;
    //进行取中运算。0.4之前全部为了0 0.5-0.9之间为0.5
    let hasDecimal=socre%1!==0;
    //判断是否有小数
    let inter=Math.floor(socre);
    //存储整数
    for(let i=0;i<inter;i++){
      result.push('on')
    };
    if(hasDecimal){
      result.push('half')
    };
    while(result.length<5){
      result.push('off');
    }
    return result;
  }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
 @import '../common/mixin.scss';
    .star{
      font-size:0;
      text-align: center;
      .star-i{
        display:inline-block;
        width:24px;
        height:24px;
        margin-right:24px;
        background-size:cover;
        &:last-child{
          margin-right:0;
        }
      }
      &.type24{
        .star-i{
             &.on{
            @include bgImage(star24_on);
          }
          &.half{
            @include bgImage(star24_half);
          }
          &.off{
            @include bgImage(star24_off);
          }
        }
      }
      &.type36{
        .star-i{
          width:14px;
          height:14px;
          margin-right:10px;
             &.on{
            @include bgImage(star36_on);
          }
          &.half{
            @include bgImage(star36_half);
          }
          &.off{
            @include bgImage(star36_off);
          }
        }
      }
      &.type48{
          .star-i{
          width:10px;
          height:10px;
          margin-right:10px;
          &.on{
            @include bgImage(star48_on);
            }
          &.half{
             @include bgImage(star48_half);
          }
          &.off{
            @include bgImage(star48_off);
          }
        }
      }
    }

</style>
