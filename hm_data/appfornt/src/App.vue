<template>
  <div id="app">
    <!-- 头部 -->
    <div id="topInfo">
        <!-- <p>华美医院</p> -->
        <img src="/static/images/logo.png" alt="" class="logo">
        <!-- <img src="/static/images/yujing_icon_03.png" alt="" class="yj-icon"> -->
        <img src="/static/images/nav_icon.png" alt="" class="detail">
        <img src="/static/images/user.png" alt="" class="user">
    </div>
    <!-- 左侧导航 -->
    <div class="leftNav">
        <!--  <div v-for="(item,index) in items"  :class="{'show':item.active}" @click="makeActive(item,index)">{{item.name}}</div> -->
        <!-- 导航按钮 -->
        <div v-for="(img,index) in imgs" class="imgBtn" :class="img.class" :title="img.name">
          <img :src="img.active ? '/static/images/'+img.transChange+'-select.png':'/static/images/'+img.transChange+'-able.png'" @click="changeActive(img,index)" :dataName="img.name">
        </div>
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
        // items:[
        //   {name:'门诊',active:true,transChange:"outpatient"},
        //   {name:'住院',active:false,transChange:"inhostal"},
        // ],
        imgs:[
          {name:'门诊',active:true,transChange:"outpatient",class:'outBtn'},
          {name:'住院',active:false,transChange:"inhostal",class:'hosBtn'},
          // {name:'预警',active:false,transChange:"yujing",class:'yjBtn'},
          {name:'统计',active:false,transChange:"nav",class:'tongjiBtn'},
          {name:'提醒',active:false,transChange:"tix",class:'tixBtn'},
        ],
        tableShowName:"outpatient",
        nowClickOver:"outpatient",
     }
  },
  methods:{
      // makeActive:function(item,index){
      //   if(this.tableShowName == item.transChange) return;
      //   this.active = item.transChange;
      //   for(var i=0;i<this.items.length;i++){
      //     this.items[i].active = false;
      //   }
      //   this.items[index].active = true;
      //   this.tableShowName = this.active;
      // },
      changeActive:function(img,index){
        if(this.nowClickOver == img.transChange) return;
        this.active = img.transChange;
        for(var i=0;i<this.imgs.length;i++){
          this.imgs[i].active = false;
        }
        this.imgs[index].active = true;
        this.nowClickOver = img.transChange;
        if(img.name == "门诊" || img.name == "住院"){
           this.tableShowName = this.active;
            this.$router.push({"path":'/'});
           
        }else if(img.name == "提醒"){
            this.$router.push({"path":'/remind'});
        }else if(img.name == "统计"){
            this.$router.push({"path":'/statistical'});
        }

        
      }
  }
}
</script>

<style>
  @import "/assets/css/common.css";
</style>
