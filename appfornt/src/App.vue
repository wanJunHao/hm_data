<template>
  <div id="app">
    <!-- 头部 -->
    <div id="topInfo">
        <p>华美医院</p>
        <img src="/static/images/yujing-icon-03.png" alt="" class="yj-icon">
    </div>
    <div id="main">
      <!-- 左侧导航 -->
      <div class="leftNav">
         <div v-for="(item,index) in items"  :class="{'show':item.active}" @click="makeActive(item,index)">{{item.name}}</div>
      </div>
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
            $("#tableHospitalPanel").hide();
            $('#tableOutpatientPanel').DataTable({
                "bPaginate": false, //翻页功能
                "bLengthChange":false, //改变每页显示数据数量
                "bFilter": false, //过滤功能
                "bInfo":false,//页脚信息
            });
        }else  if(this.active == '住院'){
            $("#tableOutpatientPanel").hide();
            $("#tableHospitalPanel").show();
            $("#tableHospitalPanel").DataTable({
                "bPaginate": false, //翻页功能
                "bLengthChange":false, //改变每页显示数据数量
                "bFilter": false, //过滤功能
                "bInfo":false,//页脚信息
            });
        }
      }
  }
}
</script>

<style>
  @import "/assets/css/common.css";
</style>
