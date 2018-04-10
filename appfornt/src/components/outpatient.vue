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
			<!-- 头部住院显示数据 -->
			<div class="detailData" id="HospitalDetail" style="display:none;">
				<div v-for="detail in details1">
					<span>{{detail.name}}{{detail.count}}人</span>
				</div>
			</div>
			<!-- 头部右侧按钮 -->
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
		            	<!-- <td>{{item.state}}</td> -->
		            	<td v-if="item.state=='绿色'">
		            		<svg style="width:20px;height:20px;">
								<circle cx="10" cy="12" r="7" stroke-width="2" fill="green" />
							</svg>
						</td>
						<td v-else-if="item.state=='黄色'">
		            		<svg style="width:20px;height:20px;">
								<circle cx="10" cy="12" r="7" stroke-width="2" fill="yellow" />
							</svg>
						</td>
						<td v-else>
		            		<svg style="width:20px;height:20px;">
								<circle cx="10" cy="12" r="7" stroke-width="2" fill="red" />
							</svg>
						</td>
		            	<td>{{item.info}}</td>
		            	<td>{{item.id}}</td>
		            	<td>{{item.name}}</td>
		            	<td>{{item.addr}}</td>
		            	<td>{{item.tel}}</td>
		            </tr>
				</tbody>
			</table>
			<!-- 住院表格 -->
			<table id="tableHospitalPanel" class="display" style="width:100%;text-align:center;display:none;">
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
		            <tr v-for="item in items1">
		            	<!-- <td>{{item.state}}</td> -->
		            	<td v-if="item.state=='绿色'">
		            		<svg style="width:20px;height:20px;">
								<circle cx="10" cy="12" r="7" stroke-width="2" fill="green" />
							</svg>
						</td>
						<td v-else-if="item.state=='黄色'">
		            		<svg style="width:20px;height:20px;">
								<circle cx="10" cy="12" r="7" stroke-width="2" fill="yellow" />
							</svg>
						</td>
						<td v-else>
		            		<svg style="width:20px;height:20px;">
								<circle cx="10" cy="12" r="7" stroke-width="2" fill="red" />
							</svg>
						</td>
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
					<div class="close" @click="closeSetBtn">
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
								<tr>
									<td></td>
									<td>
										>
										<img src='/static/images/more.png' alt='' class='moreCompare' @click='showCompare'>
									</td>
									<td>
										1h15min
										<img src='/static/images/more.png' alt='' class='moreWaitTime' @click='showWait'>
									</td>
									<td>
										<svg style="width:20px;height:20px;">
											<circle cx="10" cy="12" r="7" stroke-width="2" fill="red" />
										</svg>
									</td>
									<td></td>
								</tr>
							</table>
							<div id="compareSelects" style="display: none;">
								<div>></div>
								<div><</div>
							</div>
							<div id="waitSelects" style="display: none;">
								<div>1h</div>
								<div>2h</div>
								<div>3h</div>
							</div>
						</div>
					</div>
				</div>
				<div class="empty" style="height:50px;background: transparent;"></div>
				<div class="common-filter-footer">
					<a href="javascript:void(0)" class="cancleBtn" @click="cancleSetBtn">取消</a>
					<a href="javascript:void(0)" class="confirmBtn" @click="confirmSetBtn">确定</a>
				</div>
			</div>
			<!-- 按钮 -->
			<div class="settingPanelBtn">
				<a href="javascript:void(0)" class="cancleBtn" @click="canclePanelBtn">取消</a>
				<a href="javascript:void(0)" class="saveBtn" @click="savePanelBtn">保存</a>
			</div>
		</div>
	</div>
</template>

<script>
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
	 			details1:[
	 				{name:"挂号",count:"20"},
	 				{name:"正在诊断"},
	 				{name:"初诊完毕"},
	 				{name:"候检"},
	 				{name:"就检"},
	 				{name:"检查完毕"},
	 			],
	 			items:[
	 				{"state":"绿色","info":"住院","id":'1',"name":"战三","tel":"12312","addr":"陕西省"},
	 				{"state":'红色',"info":"等待","id":'2',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 				{"state":'绿色',"info":"就诊","id":'3',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 				{"state":'黄色',"info":"取药","id":'4',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"就诊","id":'5',"name":"花花","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"取药","id":'6',"name":"艾尔","tel":"12312","addr":"陕西省"},
	 				{"state":'黄色',"info":"住院","id":'7',"name":"战三","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"等待","id":'8',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 				{"state":'绿色',"info":"就诊","id":'9',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 				{"state":'红色',"info":"取药","id":'10',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"就诊","id":'11',"name":"花花","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"取药","id":'12',"name":"艾尔","tel":"12312","addr":"陕西省"}				
	 			],
	 			items1:[
	 				{"state":'黄色',"info":"住院","id":'1',"name":"战三","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"出院","id":'2',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 				{"state":'红色',"info":"检查","id":'3',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 				{"state":'红色',"info":"手术","id":'4',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 				{"state":'黄色',"info":"检查","id":'5',"name":"花花","tel":"12312","addr":"陕西省"},
	 				{"state":'黄色',"info":"取药","id":'6',"name":"艾尔","tel":"12312","addr":"陕西省"},
	 				{"state":'黄色',"info":"住院","id":'7',"name":"战三","tel":"12312","addr":"陕西省"},
	 				{"state":'绿色',"info":"出院","id":'8',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 				{"state":'黄色',"info":"等待住院","id":'9',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 				{"state":'绿色',"info":"取药","id":'10',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 				{"state":'黄色',"info":"出院","id":'11',"name":"花花","tel":"12312","addr":"陕西省"},
	 				{"state":'黄色',"info":"手术","id":'12',"name":"艾尔","tel":"12312","addr":"陕西省"}				
	 			],
	 		}
	 	},
	 	created:function(){
			// this.getData();
		},
		mounted(){
			// 门诊表格初始化
			$('#tableOutpatientPanel').DataTable({
    		 	"bPaginate": false, //翻页功能
             	"bLengthChange":false, //改变每页显示数据数量
             	"bFilter": false, //过滤功能
             	"bInfo":false,//页脚信息
    		});
    		// 住院表格初始化
    		$("#tableHospitalPanel").DataTable({
                "bPaginate": false, //翻页功能
                "bLengthChange":false, //改变每页显示数据数量
                "bFilter": false, //过滤功能
                "bInfo":false,//页脚信息
            });
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
	 		},
	 		closeSetBtn:function(){
	 			$("#warningPanelSetting").hide();
	 		},
	 		cancleSetBtn:function(){
	 			$("#warningPanelSetting").hide();
	 		},
	 		confirmSetBtn:function(){
	 			$("#warningPanelSetting").hide();
	 		},
	 		canclePanelBtn:function(){
	 			$(".settingPanel").hide();
	 		},	
	 		savePanelBtn:function(){
	 			$(".settingPanel").hide();
	 		},
	 		showCompare:function(){
	 			$("#compareSelects").show();
	 			$("#compareSelects div").unbind("mouseenter");
				$("#compareSelects div").bind("mouseenter",function(){
					$(this).css("background","#DDDDDD");
					$(this).siblings().css("background","");
				})
				$("#compareSelects").unbind("mouseleave");
				$("#compareSelects").bind("mouseleave",function(){
					$(this).hide();
				})
	 		},
	 		showWait:function(){
	 			$("#waitSelects").show();
	 			$("#waitSelects div").unbind("mouseenter");
				$("#waitSelects div").bind("mouseenter",function(){
					$(this).css("background","#DDDDDD");
					$(this).siblings().css("background","");
				})
				$("#waitSelects").unbind("mouseleave");
				$("#waitSelects").bind("mouseleave",function(){
					$(this).hide();
				})	
	 		}
	 	}
	 	
	}
</script>

<style>
	@import "../assets/css/outpatient.css";
</style>