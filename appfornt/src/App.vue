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
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
     return {
        active:'门诊',
        items:[
          {name:'门诊',active:true},
          {name:'住院',active:false},
          {name:'科室',active:false}
        ]
     }
  },
  methods:{
      makeActive:function(item,index){
        this.active = item.name;
        for(var i=0;i<this.items.length;i++){
          this.items[i].active = false;
        }
        this.items[index].active = true;
        if(this.active == '门诊'){
            $("#tableOutpatientPanel").show();
            $("#outpatientDetail").show();
            $("#tableHospitalPanel").hide();
            $("#HospitalDetail").hide();
        }else  if(this.active == '住院'){
            $("#tableOutpatientPanel").hide();
            $("#tableHospitalPanel").show();
            $("#HospitalDetail").show();
            $("#outpatientDetail").hide();
        }

      }
  },

}
</script>

<style>
  @import "/assets/css/common.css";
</style>
