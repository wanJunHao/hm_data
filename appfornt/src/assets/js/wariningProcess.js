import tableTrAdd from "@/components/tableTrComponent"
export default{
	name:"warningProcess",
 	components:{
		tableTrAdd,
	},
	props:{
		warningShow:{
			type:Boolean,
			default:false,
		},
		outpatienttable:{
			type:String
		}
	},
	mounted:function(){
		
	},
	data(){
		return {
			requestData:[],

			left:70,

			top:100,

			width:125,

			instance:null,

			jsPlumbEle:null,

			jsPlumbEleList:null,

			sourceEndpoint:{
	            endpoint: "Dot",
	            paintStyle: {
	                stroke: "#5ba7ff",
	                fill: "#5ba7ff",
	                radius: 3,
	                strokeWidth: 1
	            },
	            isSource: false,
	            connector: [ "Flowchart", { stub: [1, 50], gap: 3, cornerRadius: 1, alwaysRespectStubs: true } ],
	            connectorStyle:{strokeWidth: 1,stroke: "#5ba7ff",joinstyle: "round",outlineStroke: "white",outlineWidth: 2},
	            // hoverPaintStyle:{strokeWidth: 3,stroke: "#216477",outlineWidth: 5,},
	            // connectorHoverStyle:{fill: "#216477",stroke: "#216477"},
	            maxConnections:3,
	            dragOptions: {},
			},
			jsplumbLocation:[],
			tempArrCount:null,
			warningPopUp:false,
			tempLeft:0,
			tempTop:0,
			processTableShow:["等待就诊","正在就诊","等待缴费","等待取药","等待检查","等待检验","正在检查","等待检验报告","等待检验报告","入院流程","复诊"],
			customCount:-1,
			nowFile:null,
			changeNowFile:null,
			processTableData:null,
			nowElementJsplumb:null,
			processTableDataChangeArr:{"data":[]},
			processTableSaveFileName:[],

		}
	},
	filters:{
		dataStrHandle:function(value){
			if(value == "") return;
			return value.split("_yzy_")[0];
		}
	},
	watch:{
		instance:function(){
			this.$nextTick(function(){
				this.jsPlumbEle = jsPlumb.getSelector(".awarning-process-item");
				this.jsPlumbEleList = jsPlumb.getSelector(".awarning-process-wrap");
				this.awarningTableDrag(this.jsPlumbEle,this.jsPlumbEleList);

			})
		},
		warningShow:function(){
			this.$nextTick(function(){
				if(this.warningShow){
					this.warningProcessStatus();
					if(this.instance == null){
						this.jsPlumbHandle();
					}
					
				}
			})
		},

	},
	methods:{
		addRow:function(){
			if($(".tableCon").css("display") == "block") return;
			$(".tableCon").show();
		},
		sendMsgToParent(){
			this.$emit("listenToChildEvent",false);
		},
		closeSetBtn:function(){
 			this.warningPopUp = false;
 		},
 		cancleSetBtn:function(){
 			this.warningPopUp = false;
 		},
 		confirmSetBtn:function(){
 			this.warningPopUp = false;
 			var tempName = $("#warningPanelSetting .warning-body .warning-setting .warning-setting-area table .tableCon td").eq(0).text();
 			if(this.processTableData[tempName]["new"] != "" && this.processTableData[tempName]["new"] != $("#warningPanelSetting .warning-body .warning-name-input-div input").val() || this.processTableData[tempName]["times"] != $("#warningPanelSetting .warning-body .warning-setting .warning-setting-area table .tableCon #timeChangeSelect").val()){
  				this.processTableData[tempName]["new"] = $("#warningPanelSetting .warning-body .warning-name-input-div input").val();
 				this.processTableData[tempName]["times"] =  $("#warningPanelSetting .warning-body .warning-setting .warning-setting-area table .tableCon #timeChangeSelect").val();
				this.nowElementJsplumb.find("img").attr("src","/static/images/lianj_03.png");
				console.log($.inArray(tempName,this.processTableSaveFileName))
				if($.inArray(tempName,this.processTableSaveFileName) >= 0){
					this.processTableDataChangeArr["data"].splice($.inArray(tempName,this.processTableSaveFileName),1);
					this.processTableDataChangeArr["data"].push({"link":tempName,"new":$("#warningPanelSetting .warning-body .warning-name-input-div input").val(),"times":$("#warningPanelSetting .warning-body .warning-setting .warning-setting-area table .tableCon #timeChangeSelect").val()});
					this.processTableSaveFileName.splice($.inArray(tempName,this.processTableSaveFileName),1);
					this.processTableSaveFileName.push(tempName);
					return;
				}
				this.processTableDataChangeArr["data"].push({"link":tempName,"new":$("#warningPanelSetting .warning-body .warning-name-input-div input").val(),"times":$("#warningPanelSetting .warning-body .warning-setting .warning-setting-area table .tableCon #timeChangeSelect").val()});
				this.processTableSaveFileName.push(tempName);
 			}

 		},
 		canclePanelBtn:function(){
 			if(this.warningPopUp)return;
 			// this.warningShow = false;
 			this.sendMsgToParent();
 		},	
 		savePanelBtn:function(){
 			if(this.warningPopUp)return;
 			this.sendMsgToParent();
 			if(this.outpatienttable == "outpatient"){
 				var tempPostUrl = "http://127.0.0.1:8887/alert/setTime";
 			}
 			console.log(this.processTableDataChangeArr)
 			this.$http.post(tempPostUrl,JSON.stringify(this.processTableDataChangeArr)).then(function(response){
 				console.log(response)
 			})
 		},
 		awarningDarg:function(){
 			$("#warningPanelSetting").draggable({
 				containment:$("#warningProcess-contenta"),
 				handle:$("#warningPanelSetting .common-head"),
 			});
 		},
 		showCompare:function(){
 			$("#compareSelects").show();
 			$("#compareSelects div").unbind("mouseenter");
			$("#compareSelects div").bind("mouseenter",function(){
				$(this).css("background","#DDDDDD");
				$(this).siblings().css("background","");
				$(this).click(function(){
					$(".tableCon td:eq(1) span").html($(this).html());
				})
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
				$(this).click(function(){
					$(".tableCon td:eq(2) span").html($(this).html());
				})
			})
			$("#waitSelects").unbind("mouseleave");
			$("#waitSelects").bind("mouseleave",function(){
				$(this).hide();
			})
 		},
 		jsPlumbHandle:function(){
 			var _this = this;
 			_this.customCount = -1;
			jsPlumb.ready(function(){
			 _this.instance = jsPlumb.getInstance({
					DragOptions: { cursor: "pointer", zIndex: 2000 },
					ConnectionsDetachable:false,
				 	ReattachConnections:false,
					ConnectionOverlays:[
						["Custom",{
							create:function(component){_this.customCount++;;return $("<div><img src='/static/images/lianj_icon_nor.png'/><span>"+_this.processTableShow[_this.customCount]+"</span></div>")},
							loaction:0.5,
							cssClass:"awarningconnectionImg",
							id:"connFlag",
							events:{
								click:function(jsPlumb){
									_this.customClickHandle(jsPlumb);
								}
							}
						}]
					],
					Container:"settingPanel"
			});

			});
	},
	_addEndpoints:function(toId, sourceAnchors, targetAnchors){
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            this.instance.addEndpoint(toId, this.sourceEndpoint, {
                anchor: sourceAnchors[i], uuid: sourceUUID
            });
        }
        if(targetAnchors.length == 0) return;
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            this.instance.addEndpoint(toId, this.sourceEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
        }

	},
	outpatientLine:function(ele,eleList){
		var _this = this;
		this.instance.batch(function () {
			$(eleList).each(function(index,ele){
				$(ele).find(".awarning-process-item").each(function(indexs,eles){
					_this._addEndpoints($(eles).attr("id"), ["LeftMiddle","RightMiddle"], ["TopCenter","BottomCenter"]);
					if(index > 0){
						$(eles).css("marginRight","20px")
					}
					if(indexs > 0){

						if(_this.requestData[index][indexs].split("_yzy_").length > 1 && indexs+1 < _this.requestData[index].length){
							
							_this.instance.connect({uuids: [$(eles).attr("id")+"TopCenter", $(ele).find(".awarning-process-item").eq(indexs-1).attr("id")+"TopCenter"], editable: true});
							return;
						}

						 var tempIndexs = $(eles).attr("dataindex");
						
						_this.instance.connect({uuids: ["jsplumb"+index + (tempIndexs-1) +"RightMiddle", "jsplumb"+index + tempIndexs +"LeftMiddle"], editable: true});
					}
				})

					_this.$nextTick(function(){
						if(index == 1){
							_this.instance.connect({uuids: ["jsplumb03RightMiddle","jsplumb12TopCenter"], editable: true});
						}else if(index == 2){
							_this.instance.connect({uuids: ["jsplumb13BottomCenter","jsplumb21TopCenter"], editable: true});
						}else if (index == 3){
							_this.instance.connect({uuids: ["jsplumb12BottomCenter","jsplumb31TopCenter"], editable: true});
							_this.instance.connect({uuids: ["jsplumb21BottomCenter","jsplumb31RightMiddle"], editable: true});
						}else if(index == 4){
							_this.instance.connect({uuids: ["jsplumb41LeftMiddle","jsplumb02TopCenter"], editable: true});
							_this.instance.connect({uuids: ["jsplumb31LeftMiddle","jsplumb01BottomCenter"], editable: true});
						}
						
					})

			});
			
	        setTimeout(function(){
	        	$(".jtk-endpoint").not(".jtk-endpoint-connected").remove();
	        	$(".awarningconnectionImg:last").find("img").hide();
	        },10);
	       })		
	},
	//连线
	awarningTableDrag:function(ele,eleList){
		if(this.outpatienttable == "outpatient"){
			this.outpatientLine(ele,eleList);
		}
	},
	warningProcessStatus:function(){
		var _this = this;
		if(this.warningShow){
			if(this.outpatienttable == "outpatient"){
					this.requestData = [["分诊时间","挂号时间(开始就诊)","结束就诊时间","缴费时间"],["缴费时间","取药完毕_yzy_sameLeave","检验开始_yzy_sameLeave","检查开始_yzy_sameLeave"],["检查开始_yzy_sameLeave","检查结果"],["检验开始_yzy_sameLeave","取到报告"],["结束就诊时间","办理入院"]];
					var tempPostUrl = "http://127.0.0.1:8887/alert/setTime";
			}
			
			this.$http.get(tempPostUrl).then(function(response){
				_this.processTableData = response.data.data;
			})
		}
		return true;
	},
	itemStyle:function(index){
		if(this.outpatienttable == "outpatient"){
			if(index > 0){
				if(index == 2){
					return  {"top":this.tempTop + 220 + "px","left":this.tempLeft + 290 +"px","width":this.width  + 'px'}
				}else if (index == 3){
					return  {"top":this.tempTop+ 300 + "px","left":this.tempLeft + 145 +"px","width":this.width  + 'px'}
				}else if(index == 4){
					return  {"top":this.tempTop -90 + "px","left":this.tempLeft  +"px","width":this.width  + 'px'}
				}
				 return  {"top":this.tempTop+ 120+ "px","left":this.tempLeft+"px","width":(this.requestData[index].length-1) * this.width + (this.requestData[index].length - 3.1) * this.left + 'px'}
		
				// this.tempLeft += (this.requestData[index].length-1) * this.width + (this.requestData[index].length-1) * this.left;
			}else{
				this.tempLeft =(this.requestData[index].length-1) * this.width + (this.requestData[index].length-1) * this.left;
				this.tempTop = (index+1) * this.top;
				return {"top":(index+1) * this.top + "px","left":0 + "px","width":this.requestData[index].length * this.width + (this.requestData[index].length) * this.left + 'px'}
			}			
		}

	},

	arrHandleChart:function(arr,str,noFor){
		var _this = this;
		for(var index = 0; index < arr.length;index++){
			if($.inArray(str,arr[index]) != -1 && index != noFor && index < noFor){
				_this.tempArrCount = index+"_yzy_"+$.inArray(str,arr[index]);
				break;
			}			
		}
		return _this.tempArrCount;
	},

	customClickHandle:function(jsPlumb){
		var _this = this;
		_this.nowElementJsplumb = $(jsPlumb.canvas);
		if($(jsPlumb.canvas).find("span").text() == "复诊") return;
		//元素位置
		var tempElementTarget = jsPlumb._jsPlumb.component;
		this.warningPopUp = !this.warningPopUp;
		if(this.warningPopUp){
			this.$nextTick(function(){
				this.awarningDarg();
				this.nowFile = $(jsPlumb.canvas).find("span").text();
				console.log(this.processTableData)
				if(this.processTableData[this.nowFile]["new"] != ""){
					this.changeNowFile = this.processTableData[this.nowFile]["new"];
				}else{
					this.changeNowFile = $(jsPlumb.canvas).find("span").text();
				}
				$("#timeChangeSelect option").removeProp("selected")
				$("#timeChangeSelect option[value="+this.processTableData[this.nowFile]["times"]+"]").prop("selected","selected")
				
				$(".sumChange").comboSelect();
			})
		}
	}


}


}