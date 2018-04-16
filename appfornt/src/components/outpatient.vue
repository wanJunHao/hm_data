<template>
	<div class="content">
		<!-- 右边内容区头部 -->
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
			<div class="outpatientTable-content">
				
			</div>
<!-- 			<table id="tableOutpatientPanel" class="display" style="width:100%;text-align:center;">
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
		            <tr v-for="item in items"> -->
		            	<!-- <td>{{item.state}}</td> -->
<!-- 		            	<td v-if="item.state=='绿色'">
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
			</table> -->
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
		<warningProcess v-bind:warning-show="waringShow"></warningProcess>
	</div>
</template>

<script>
import warningProcess from "@/components/warningProcess"
	export default {
	 	name: 'outpatient',
	 	components:{
      		warningProcess
  		},
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
	 			// items:[
	 			// 	{"state":"绿色","info":"住院","id":'1',"name":"战三","tel":"12312","addr":"陕西省"},
	 			// 	{"state":'红色',"info":"等待","id":'2',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 			// 	{"state":'绿色',"info":"就诊","id":'3',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 			// 	{"state":'黄色',"info":"取药","id":'4',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 			// 	{"state":'绿色',"info":"就诊","id":'5',"name":"花花","tel":"12312","addr":"陕西省"},
	 			// 	{"state":'绿色',"info":"取药","id":'6',"name":"艾尔","tel":"12312","addr":"陕西省"},
	 			// 	{"state":'黄色',"info":"住院","id":'7',"name":"战三","tel":"12312","addr":"陕西省"},
	 			// 	{"state":'绿色',"info":"等待","id":'8',"name":"李四","tel":"12312","addr":"山东省临清市"},
	 			// 	{"state":'绿色',"info":"就诊","id":'9',"name":"旺旺","tel":"12312","addr":"陕西省西安市"},
	 			// 	{"state":'红色',"info":"取药","id":'10',"name":"莉莉","tel":"12312","addr":"陕西省"},
	 			// 	{"state":'绿色',"info":"就诊","id":'11',"name":"花花","tel":"12312","addr":"陕西省"},
	 			// 	{"state":'绿色',"info":"取药","id":'12',"name":"艾尔","tel":"12312","addr":"陕西省"},

	 			// ],
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
	 			waringShow:true,
	 		}
	 	},
	 	created(){
			// this.$http.get("http://jsonplaceholder.typicode.com/users").then((data)=>{
			// 	console.log(data);
			// 	this.items1 = data.data;
			// })
		},
		mounted(){
			// 门诊表格
			this.outpatientTable();

		},
	 	methods:{
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
	 			this.waringShow = ! this.waringShow;
	 		},
	 		   //给定datatables 所有字段column
		      dataTablesColumn:function(column){
		        var tempTableDate = [];
		        tempTableDate.push({"title":"color","data":"color"})
		        for(let keys in column){
		        	if(keys == "color"){
		        		continue;
		        	}
		          tempTableDate.push({"title":keys,"data":keys});
		        }

		        return tempTableDate;
		      },
	 		//门诊表格的加载
	 		outpatientTable:function(){
	 			var tempThat = this;
	 			this.$http.get("http://127.0.0.1:8887/alert/").then(function(response){
	 				var data = response.data;
		 			var tempTableDate = tempThat.dataTablesColumn(data["detail"][0]);
		 			$(".tableShow .outpatientTable-content").html('<table cellpadding="0" cellspacing="0" class="table table-striped table-bordered" id="tableOutpatientPanel"></table>');
		 			$('#tableOutpatientPanel').DataTable({
					language:{
				        "sProcessing": "处理中...",
				        "sLengthMenu": "显示 _MENU_ 项结果",
				        "sZeroRecords": "没有匹配结果",
				        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
				        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
				        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
				        "sInfoPostFix": "",
				        "sSearch": "搜索:",
				        "sUrl": "",
				        "sEmptyTable": "表中数据为空",
				        "sLoadingRecords": "载入中...",
				        "sInfoThousands": ",",
					},
						"aaSorting":[1,"desc"],
		    		 	"bPaginate": true, //翻页功能
		             	"bLengthChange":true, //改变每页显示数据数量
		             	"bFilter": true, //过滤功能
		             	"bInfo":true,//页脚信息
		             	"paging":false,
		             	"select":true,
		             	"scrollY":"469px",
		             	"data":data["detail"],
		             	"columns":tempTableDate
		    		})
	 			})
	 		},


	 	}
	 	
	}
</script>

<style>
	@import "../assets/css/outpatient.css";
</style>