<template>
  <div id="app">
    <!-- 头部 -->
    <div id="topInfo">
        <p>华美医院</p>
        <img src="/static/images/yujing_icon_03.png" alt="" class="yj-icon">
    </div>
    <!-- 左侧导航 -->
    <div class="leftNav">
         <div v-for="(item,index) in items"  :class="{'show':item.active}" @click="makeActive(item,index)">{{item.name}}</div>
    </div>

    <router-view :outpatienttable="tableShowName"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
     return {
        active:'门诊',
        items:[
          {name:'门诊',active:true,transChange:"outpatient"},
          {name:'住院',active:false,transChange:"inhostal"},
        ],
        tableShowName:"outpatient"
     }
  },
  methods:{
      makeActive:function(item,index){
        if(this.tableShowName == item.transChange) return;
        this.active = item.transChange;
        for(var i=0;i<this.items.length;i++){
          this.items[i].active = false;
        }
        this.items[index].active = true;
        this.tableShowName = this.active;

      }
  },

}
</script>

<style>
  @import "/assets/css/common.css";
</style>
