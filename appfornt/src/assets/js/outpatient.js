//引入预警流程弹窗设置组件
import warningProcess from "@/components/warningProcess"
//移入全流程地图组件
import outpatienttMap from "@/components/outpatienttMap"
	export default {
	 	name: 'outpatient',
	 	components:{
      		warningProcess,
      		outpatienttMap
  		},
  		props:{
  			outpatienttable:{
  				type:String,
  				default:"outpatient"
  			}
  		},
  		watch:{
  			outpatienttable:function(){
  				this.$nextTick(function(){
  					console.log(this.outpatienttable)
  				})
  			}
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

	 			waringShow:false,
	 			outpatienttMapShow:false,
	 			outpatienttMapTable:true,
	 			markShow:false,
	 			tableOrMap:"table",

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
	 		changeWaringStatus:function(data){
	 			this.waringShow = data;
	 			this.markShow = data;
	 		},
	 		changeTable:function(){
	 			this.outpatienttMapTable = true;
	 			this.outpatienttMapShow = false;
	 			this.tableOrMap = "table";
	 			$(".showBtn").addClass("activeBtn");
	 			$(".showBtn").siblings().removeClass('activeBtn');
	 		},
	 		changeMap:function(){
	 			this.outpatienttMapShow = true;
	 			this.outpatienttMapTable = false;
	 			this.tableOrMap = "map";
	 			$(".mapBtn").addClass("activeBtn");
	 			$(".mapBtn").siblings().removeClass('activeBtn');
	 		},
	 		warningSetting:function(){
	 			if(this.outpatienttMapShow) return;
	 			this.waringShow = ! this.waringShow;
	 			this.markShow = true;
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
		 			$(".tableShow .outpatientTable-content").html('<table cellpadding="0" cellspacing="0" class="table table-striped table-bordered" id="tableOutpatientPanel"></table>')
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
		             	"searching":false,//搜索
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