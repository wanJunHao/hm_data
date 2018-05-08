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
  					this.markShow = true;
  					this.spinner.spin(this.target);
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
	 			details:[],
	 			date:'',
	 			waringShow:false,
	 			outpatienttMapShow:false,
	 			outpatienttMapTable:true,
	 			markShow:false,
	 			tableOrMap:"table",
        		dataMap:{},
        		tableShowPx:$("body").width() -60,
        		spinner:null,
        		target:null,
        		thisMzTableRow:["所有数据","等待就诊","正在就诊","等待缴费","等待检验","等待取药","等待检查","正在检查","等待检验报告","等待检查报告"],
        		thisZyTableRow:["所有数据","等待入院","等待接诊","校对医嘱","正在手术","等待手术","等待检验","等待检查","正在检验","正在检查","等待手术方案"],

	 		}
	 	},
	 	created(){

		},
		mounted(){

			var _this = this;
			_this.outpatientTable("outpatient");
			// 门诊表格
			setInterval(function(){
				_this.outpatientTable(_this.outpatienttable);
			},60000);
			var _this = this;
			// 获取当前时间
	 		setInterval(function(){
	 			_this.getDate();
	 		},1000);
	 		this.spinnerStart();
			this.markShow = true;
  			this.spinner.spin(this.target);
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
	 		spinnerStart:function(){
	 			var opts = {
					  lines: 13, // The number of lines to draw
					  length: 0, // The length of each line
					  width: 6, // The line thickness
					  radius: 14, // The radius of the inner circle
					  scale: 1, // Scales overall size of the spinner
					  corners: 1, // Corner roundness (0..1)
					  color: '#86bbff', // CSS color or array of colors
					  fadeColor: 'transparent', // CSS color or array of colors
					  opacity: 0.25, // Opacity of the lines
					  rotate: 0, // The rotation offset
					  direction: 1, // 1: clockwise, -1: counterclockwise
					  speed: 1, // Rounds per second
					  trail: 60, // Afterglow percentage
					  fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
					  zIndex: 2e9, // The z-index (defaults to 2000000000)
					  className: 'spinner', // The CSS class to assign to the spinner
					  top: '50%', // Top position relative to parent
					  left: '50%', // Left position relative to parent
					  shadow: 'none', // Box-shadow for the lines
					  position: 'absolute' // Element positioning
					};

					this.target = $("body").get(0);
					this.spinner = new Spinner(opts);
	 		},
	 		bodyWidth:function(){
	 			return {"width":this.tableShowPx + "px"}
	 		},
	 		changeWaringStatus:function(data){
	 			this.waringShow = data.warningBolean;
	 			this.markShow = data.warningBolean;
	 			if(data.updateTable){
	 				this.outpatientTable(this.outpatienttable);
	 			}
	 		},
	 		changeTable:function(){
	 			if(this.outpatienttMapTable) return;
  				this.markShow = true;
  				this.spinner.spin(this.target);
	 			this.outpatienttMapTable = true;
	 			this.outpatienttMapShow = false;
	 			this.tableOrMap = "table";
	 			$(".showBtn").addClass("activeBtn");
	 			$(".showBtn").siblings().removeClass('activeBtn');
				if($('#tableOutpatientPanel').DataTable() != undefined){
					$('#tableOutpatientPanel').DataTable().clear();
					$('#tableOutpatientPanel').DataTable().destroy();

				}
	 			this.outpatientTable(this.outpatienttable);
	 			$(".settingBtn").css({
	 				"background":"#0B9BFB",
    				"color": "white"
	 			})
	 		},
	 		changeMap:function(){
	 			if(this.outpatienttMapShow) return;
	 			this.outpatienttMapShow = true;
	 			this.markShow = true;
  				this.spinner.spin(this.target);
	 			this.outpatienttMapTable = false;
	 			this.tableOrMap = "map";
	 			$(".mapBtn").addClass("activeBtn");
	 			$(".mapBtn").siblings().removeClass('activeBtn');
	 			$(".settingBtn").css({
					"border": "1px solid #DDD",
					"background-color": "#F5F5F5",
					"color":"#ACA899"
				})
	 		},
	 		warningSetting:function(){
	 			if(this.outpatienttMapShow) return;
	 			this.waringShow = ! this.waringShow;
	 			this.markShow = true;
	 		},
	 		   //给定datatables 所有字段column
		      dataTablesColumn:function(column){
		        var tempTableDate = [];
		        tempTableDate.push({"title":"状态","data":"status","sClass":"tableDataState"});
		        tempTableDate.push({"title":"环节信息","data":"link"})
		        for(let keys in column){
		        	if(keys == "status" || keys == "link" || keys == "time" || keys == "settime"){
		        		continue;
		        	}
		          tempTableDate.push({"title":this.dataMap[keys],"data":keys});
		        }

		        return tempTableDate;
		      },
	 		//门诊表格的加载
	 		outpatientTable:function(detail){
	 			// if(this.outpatienttMapTable == false) return;
	 			var tempThat = this;
	 			if(detail == "outpatient"){
	 				var tempUrl = "http://127.0.0.1:8887/alert/getInfo";
	 				var tempDataRow = tempThat.thisMzTableRow;
	 			}else if(detail == "inhostal"){
	 				var tempUrl = "http://127.0.0.1:8887/alert/zhuyuanInfo";
	 				var tempDataRow = tempThat.thisZyTableRow;
	 			}
	 			this.$http.get(tempUrl).then(function(response){
	 				var data = response.data.data;
	 				tempThat.details = response.data.counts;
	 				tempThat.dataMap = response.data.map;
	 				if(tempThat.outpatienttMapShow) return;
		 			var tempTableDate = tempThat.dataTablesColumn(data[0]);

		 			$(".tableShow .outpatientTable-content").html('<table cellpadding="0" cellspacing="0" class="table table-striped table-bordered" id="tableOutpatientPanel"></table>')
		 			// console.log($("#tableOutpatientPanel").width(),$(".tableShow").width())
		 			var tempInstance = $('#tableOutpatientPanel').DataTable({
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
		             	"searching":true,//搜索
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
		             	"columnDefs":[{
		             		"targets":0,
		             		"orderable":false,
		             		render:function(data, type, full, meta){
		             			if(data == "blue"){
		             				var tempColorWidth = 100;
		             			}else{
		             				var tempColorWidth = full.time/full.settime * 100;
		             			}
		             			if(tempColorWidth > 100){
		             				var tempColorWidth = 100;
		             			}
		             			if(full.settime == undefined){
		             				full.settime = 30;
		             			}
		             			if(full.time == undefined){
		             				full.time = 1;
		             			}
		             			return "<div class="+full.status+" style='width:"+tempColorWidth+"%' title='设定时间 ："+full.settime+"  当前时间 ："+full.time+"'><div>";
		             		}
		             	}]

		    		})
		 			setTimeout(function(){
		 				if(!tempThat.waringShow){
		 			   		tempThat.markShow = false;
		 			   		tempThat.spinner.stop();		 					
		 				}

		 			   $(".tableDataState").eq(0).html("").append($("<p>状态</p><select class='tableDataStateSelect'></select>"));
		 			   tempDataRow.forEach(function(ele,value){
		 			   		var tempOption = $("<option value="+ele+">"+ele+"</option>");
		 			   		$(".tableDataStateSelect").append(tempOption);
		 			   })
		 			   $(".tableDataStateSelect").comboSelect();
		 			   $(".tableDataStateSelect").unbind("chage");
		 			   $(".tableDataStateSelect").change(function(event){
		 			   		event.stopPropagation();
		 			   		setTimeout(function(){
		 			   			if($(".tableDataStateSelect").val() == "所有数据"){
		 			   				tempInstance.search("").draw();
		 			   			}else{
		 			   				tempInstance.search($(".tableDataStateSelect").val()).draw();
		 			   			}
		 			   			
		 			   		},20);
		 			   })
		 			},300);
	 			})
	 		},

	 		datatableScroll:function(){
	 			this.$nextTick(function(){
	 				if($(".dataTables_scrollHeadInner").width() > $(".tableShow").width()){
	 					$(".dataTables_scrollHead,.dataTables_scrollBody").width($(".table-striped").width());
	 				}
	 			})
	 		},
	 		mapDataSuccess:function(data){
	 			if(data["mapSuccess"]){
		 			   this.markShow = false;
		 			   this.spinner.stop();	 				
	 			}else{
						this.markShow = true;
			  			this.spinner.spin(this.target);	 				
	 			}
	 		}
	 	}
	 	
	}