<template>
	<div class="content">
		<!-- 右边头部 -->
		<div class="header">
			<!-- 头部门诊显示数据 -->
			<div class="detailData" id="outpatientDetail">
				<div v-for="detail in details">
					<span>{{detail.name}}{{detail.count}}人</span>
				</div>
			</div>
			<div class="btnInfo">
				<div class="tableBtn activeBtn showBtn" @click='changeTable'>表格</div>
				<div class="tableBtn mapBtn" @click='changeMap'>地图</div>
				<div class="tableBtn settingBtn" @click='setting'>流程设置</div>
				<div class="tableBtn computedBtn">同环比</div>
			</div>
		</div>
		<!-- 表格 -->
		<div class="tableShow">
			<!-- 门诊表格 -->
			<table id="tableOutpatientPanel" class="display" style="width:100%;text-align:center;">
				<thead>
		            <tr>
		                <th>状态</th>
		                <th>环节信息</th>
		                <th>ID</th>
		                <th>姓名</th>
		                <th>地址</th>
		                <th>联系电话</th>
		            </tr>
		        </thead>
		        <tbody>
		            <tr v-for="item in items">
		            	<td>{{item.state}}</td>
		            	<td>{{item.info}}</td>
		            	<td>{{item.id}}</td>
		            	<td>{{item.name}}</td>
		            	<td>{{item.addr}}</td>
		            	<td>{{item.tel}}</td>
		            </tr>
				</tbody>
			</table>
		</div>
		<!-- 地图 -->
		<div class="mapShow" style="display:none;">
			This is mapArea.
		</div>
		<!-- 流程设置弹框 -->
		<div class="settingPanel" style="display:none;">
			<!-- 设置内容弹框 -->
			<div id="warningPanelSetting" style="display:block;">
				<div class="topline"></div>
				<div class="common-head">
					<span class="logo">预警条件设置</span>
					<div class="close">
						<img src="/static/images/close.png" alt="" title="关闭" />
					</div>
				</div>
				<div class="warning-body">
					<div class="warning-name-input-div">
						<span class="logo">监测名称:</span>
						<input type="text" class="listenInput">
					</div>
					<div class="warning-setting">
						<div class="warning-setting-area">
							<table cellspacing="0" cellpadding="0">
								<tr class="title">
									<td>当前表标题</td>
									<td>关系</td>
									<td>时间设定</td>
									<td>预警颜色</td>
									<td></td>
								</tr>
								<tr class='table-con'>
									<td></td>
									<td>
										>
										<img src='more.png' alt='' class='moreCompare'>
									</td>
									<td>
										1h15min
										<img src='more.png' alt='' class='moreWaitTime'>
									</td>
									<td></td>
									<td></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
				<div class="empty" style="height:50px;background: transparent;"></div>
				<div class="common-filter-footer">
					<a href="javascript:void(0)" class="cancleBtn">取消</a>
					<a href="javascript:void(0)" class="confirmBtn">确定</a>
				</div>
			</div>
			<!-- 按钮 -->
			<div class="settingPanelBtn">
				<a href="javascript:void(0)" class="cancleBtn">取消</a>
				<a href="javascript:void(0)" class="confirmBtn">保存</a>
			</div>
		</div>
	</div>
</template>

<script>
	$(document).ready(function() {
    	$('#tableOutpatientPanel').DataTable();
	});
	export default {
	 	name: 'outpatient',
	 	data(){
	 		return{
	 			details:[
	 				{name:"挂号",count:"10"},
	 				{name:"正在诊断"},
	 				{name:"初诊完毕"},
	 				{name:"候检"},
	 				{name:"就检"},
	 				{name:"检查完毕"},
	 			],
	 			items:[
	 				{"state":'绿色',"info":"住院","id":'1',"name":"战三","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"等待","id":'2',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 				{"state":'绿色',"info":"就诊","id":'3',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 				{"state":'绿色',"info":"取药","id":'4',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"就诊","id":'5',"name":"花花","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"取药","id":'6',"name":"艾尔","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"住院","id":'7',"name":"战三","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"等待","id":'8',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 				{"state":'绿色',"info":"就诊","id":'9',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 				{"state":'绿色',"info":"取药","id":'10',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"就诊","id":'11',"name":"花花","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"取药","id":'12',"name":"艾尔","tel":"12312","addr":"陕西省"}				
	 			]
	 		}
	 	},
	 	created:function(){
			this.getData();
		},
	 	methods:{
	 		getData:function(){
	 			// var url="";
     //            this.$http.get(url).then(function(res){
     //                this.items = res.data;
     //            },function(response){
     //                console.log(response);
     //            })
	 		},
	 		changeTable:function(){
	 			$(".tableShow").show();	
	 			$(".mapShow").hide();
	 			$(".showBtn").addClass("activeBtn");
	 			$(".showBtn").siblings().removeClass('activeBtn');
	 		},
	 		changeMap:function(){
	 			$(".mapShow").show();
	 			$(".tableShow").hide();
	 			$(".mapBtn").addClass("activeBtn");
	 			$(".mapBtn").siblings().removeClass('activeBtn');
	 		},
	 		setting:function(){
	 			$(".settingPanel").show();
	 		}
	 	}
	 	
	}
</script>

<style>
	@import "../assets/css/outpatient.css";
</style>