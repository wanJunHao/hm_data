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
  					
  					if($('#tableOutpatientPanel').DataTable() != undefined){
  						$('#tableOutpatientPanel').DataTable().clear();
  						$('#tableOutpatientPanel').DataTable().destroy();

  					}

  					this.outpatientTable(this.outpatienttable);
  				})
  			}
  		},
	 	data(){
	 		return{
	 			details:[
	 				{name:"总挂号数",count:"40"},
	 				{name:"等待就诊",count:"12"},
	 				{name:"就诊",count:"5"},
	 				{name:"初诊完毕",count:"3"},
	 				{name:"候检",count:"12"},
	 				{name:"就检",count:"5"},
	 				{name:"检查完毕",count:"3"}
	 			],
	 			details1:[
	 				{name:"总挂号数",count:"20"},
	 				{name:"等待就诊",count:"10"},
	 				{name:"就诊",count:"1"},
	 				{name:"初诊完毕",count:"2"},
	 				{name:"候检",count:"6"},
	 				{name:"就检",count:"5"},
	 				{name:"检查完毕",count:"3"}
	 			],
	 			date:'',
	 			waringShow:false,
	 			outpatienttMapShow:false,
	 			outpatienttMapTable:true,
	 			markShow:false,
	 			tableOrMap:"table",
	 			testData : {
		            "inhostal":[
		            	{"link": "1", "state": 80, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":"a","ssss":""},
		                {"link": "2", "state": 13, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":"b","ssss":""},
		                {"link": "等待检查", "state": 24, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":"c","ssss":""},
		                {"link": "等待检验", "state": 18, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":"d","ssss":""},
		                {"link": "等待取药", "state": 15, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":"","ssss":""},
		                {"link": "等待就诊", "state": 77, "name": "李白", "address": "临清1区", "card_no": "3194193t1", "tel": "13738776521","color":"","ssss":""},

		            ]
		            
        }

	 		}
	 	},
	 	created(){

		},
		mounted(){
			var _this = this;
			_this.outpatientTable("outpatient");
			// 门诊表格
			setInterval(function(){
				_this.outpatientTable("outpatient");
			},60000);
			var _this = this;
			// 获取当前时间
	 		setInterval(function(){
	 			_this.getDate();
	 		},1000);
		},
	 	methods:{
	 		getDate:function(){
				var myDate = new Date();

				var year=myDate.getFullYear();
				var month=myDate.getMonth()+1;
				var date=myDate.getDate(); 

				var h=myDate.getHours();    
				var m=myDate.getMinutes();
				var s=myDate.getSeconds();  

				function checkTime(value){
					return value < 10 ? '0' + value: value;
				}

				this.date = year+'/'+checkTime(month)+"/"+checkTime(date)+" "+checkTime(h)+':'+checkTime(m)+":"+checkTime(s);
	 			
	 			//时钟动态变化
	 			let _this = this;
    			setTimeout(() => {
      				_this.getDate();
   				}, 1000)
	 		},
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
		        tempTableDate.push({"title":"状态","data":"status","sClass":"tableDataState","render":function(data, type, full, meta){return "<div class="+data+"></div>"}});
		        tempTableDate.push({"title":"环节信息","data":"link"})
		        for(let keys in column){
		        	if(keys == "status" || keys == "link"){
		        		continue;
		        	}
		          tempTableDate.push({"title":keys,"data":keys});
		        }

		        return tempTableDate;
		      },
	 		//门诊表格的加载
	 		outpatientTable:function(detail){
	 			var tempThat = this;
	 			this.$http.get("http://127.0.0.1:8887/alert/getInfo").then(function(response){
	 				var data = response.data.data;
		 			var tempTableDate = tempThat.dataTablesColumn(data[0]);
		 			$(".tableShow .outpatientTable-content").html('<table cellpadding="0" cellspacing="0" class="table table-striped table-bordered" id="tableOutpatientPanel"></table>')
		 			// console.log($("#tableOutpatientPanel").width(),$(".tableShow").width())
		 			$('#tableOutpatientPanel').DataTable({
					language:{
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
						"aaSorting":[3,"desc"],
		    		 	"bPaginate": false, //翻页功能
		             	"bLengthChange":true, //改变每页显示数据数量
		             	"bFilter": true, //过滤功能
		             	"searching":false,//搜索
		             	"bInfo":true,//页脚信息
		             	"paging":true,
		             	"select":true,
		             	"scroller":{
		             		loadingIndicator: false
		             	},
		             	"scrollX":tempThat.datatableScroll(),
		             	"scrollY":data.length > 15 ? $("#app .content .tableShow").height() - 150 + 'px':false,
		             	"data":data,
		             	"columns":tempTableDate,

		    		})

	 			})
	 		},

	 		datatableScroll:function(){
	 			this.$nextTick(function(){
	 				if($(".dataTables_scrollHeadInner").width() > $(".tableShow").width()){
	 					$(".dataTables_scrollHead,.dataTables_scrollBody").width($(".table-striped").width());
	 				}
	 			})
	 		}
	 	}
	 	
	}