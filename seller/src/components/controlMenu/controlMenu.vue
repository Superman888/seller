<template>
  <div class="controlMenu">
    <div class="add"  @click.stop.prevent="add($event)">
      <i class="icon-add_circle"></i>
    </div>
    <div class="figure"  v-show="food.count">{{food.count}}</div>
    <div class="subtract" v-show="food.count" @click.stop.prevent='sub($event)'>
      <i class="icon-remove_circle_outline"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
  export default {
    props:{
      food:{
      return:Object
      }
    },
  methods:{
    add(event){
      if(!event._constructed){
        return
      }
      if(!this.food.count){
        Vue.set(this.food,'count',1);
      }else{
        this.food.count++
      }
    },
    sub(event){
      if(!event._constructed){
        return
      }
         this.food.count--
    },
  }
}
</script>

<style lang='scss' scoped>
  .add{
    float:right;
    width:24px;
    height:24px;
    border-radius:50%;
    font-size:24px;
    color:rgb(0,160,220);
    text-align:center;
  }
  .figure{
    float:right;
    line-height:24px;
    padding:0 12px;
  }
  .subtract{
    float:right;
    width:24px;
    height:24px;
    border-radius:50%;
    text-align:center;
    font-size:24px;
    color:rgb(0,160,220);
  }
</style>