<template>
	<div class="content">
    	<!-- 遮罩 -->
    	<div class="markShow" v-show="markShow"></div>
		<!-- 右边内容区头部 -->
		<div class="header">
			<!-- 头部门诊显示数据 -->
			<div class="detailData" id="outpatientDetail">
				<div v-for="detail in details">
					<span>{{detail.name}} : {{detail.count}}人</span>
				</div>
			</div>

			<!-- 头部右侧按钮 -->
			<div class="btnInfo">
				<div class="tableBtn activeBtn showBtn" @click='changeTable'>图表</div>
				<div class="tableBtn mapBtn" @click='changeMap'>地图</div>
				<div class="tableBtn settingBtn" @click='warningSetting'>流程设置</div>
				<!-- <div class="tableBtn computedBtn">同环比</div> -->
			</div>
		</div>
		<!-- 表格 -->
		<div class="tableShow" v-show="outpatienttMapTable" :style="bodyWidth()">
			<!-- 当前日期 -->
			<div class="tableTop">
				<p style="float:left">{{ date }}</p>
				<img src="/static/images/icon_jilu.png" alt="phone">
			</div>
			<!-- 门诊表格 -->
			<div class="outpatientTable-content" :dataTableName='outpatienttable'>
				
			</div>
			<div class="waringTextColor">
					<div class="processText" style="float:right"><span class="tableTopColor" style="background: #5BA7FF"></span><span>流程完成</span></div>
					<div class="processText" style="float:right"><span class="tableTopColor" style="background: #F53E3E"></span><span>超过预警</span></div>
					<div class="processText" style="float:right"><span class="tableTopColor" style="background: #38C634"></span><span>正在进行</span></div>
					<div class="processText" style="float:right"><span class="tableTopColor" style="background: #FFC156"></span><span>等待完成</span></div>
			</div>
		</div>

		<!-- 地图 -->
		<outpatienttMap v-bind:outpatienttMapShow="outpatienttMapShow" v-bind:outpatienttable="outpatienttable" v-on:listenToChildEventMap="mapDataSuccess"></outpatienttMap>			
		<!-- 流程设置弹框 -->
		<warningProcess v-bind:warning-show="waringShow" v-bind:outpatienttable="outpatienttable"  v-on:listenToChildEvent="changeWaringStatus"></warningProcess>

	</div>
</template>

<script>
	import outpatient from "../assets/js/outpatient"

	export default{
		...outpatient
	}
</script>

<style>
	@import "../assets/css/outpatient.css";
</style>