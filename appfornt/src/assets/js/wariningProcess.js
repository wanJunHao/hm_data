export default{
	name:"warningProcess",
	props:{
		warningShow:{
			type:Boolean,
			default:false,
		}
	},
	mounted:function(){
		
	},
	data(){
		return {
			requestData:[],

			left:70,

			top:0,

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
	            connector: [ "Flowchart", { stub: [1, 6], gap: 3, cornerRadius: 1, alwaysRespectStubs: true } ],
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
						this.top = $(".warningProcess-content .settingPanel-content").height()/2-20;
					}
					
				}
			})
		}
	},
	methods:{
		addRow:function(){
			var trDetail = $("<tr class='tableCon'><td class=tdOne></td><td>><img src='/static/images/more.png' alt='' class='moreCompare' @click='showCompare'></td><td>1h15min<img src='/static/images/more.png' alt='' class='moreWaitTime' @click='showWait'></td><td><svg style=width:20px;height:20px;><rect rx=4 ry=4 width=15 height=15 fill=#FA3843 y=5 x=5></rect></svg></td><td class=deleteRow></td></tr>");				
			trDetail.insertBefore($(".addRow"));  
			$(trDetail).mouseenter(function(){
				$(this).find("td:eq(4)").html($("<img src=/static/images/delete.png>"));
			})
			$(trDetail).mouseleave(function(){
				$(this).find("td:eq(4)").html("");
			})
			$(".deleteRow").click(function(){
				$(this).parents("tr").remove();
			})
			var text = $(".warning-setting table tbody tr:eq(0) .tdOne").html();
			$(".tdOne").html(text);
		},
		enter:function(event){
			var tar = event.target;
			$(tar).find("td:eq(4)").html($("<img src=/static/images/delete.png>"));
			// $("#warningPanelSetting table tbody tr.tableCon").find("td:eq(4)").html($("<img src=/static/images/delete.png>"));
		},
		leave:function(event){
			var tar = event.target;
			$(tar).find("td:eq(4)").html("");
			// $("#warningPanelSetting table tbody tr").find("td:eq(4)").html("");
		},
		deleteRow:function(event){
			var tar = event.target;
			$(tar).parents("tr").remove();
			// $("#warningPanelSetting table tbody tr td:eq(4)").parent("tr").remove();
		},
		sendMsgToParent(){
			this.$emit("listenToChildEvent",false)
		},
		closeSetBtn:function(){
 			this.warningPopUp = false;
 		},
 		cancleSetBtn:function(){
 			this.warningPopUp = false;
 		},
 		confirmSetBtn:function(){
 			this.warningPopUp = false;
 		},
 		canclePanelBtn:function(){
 			// this.warningShow = false;
 			this.sendMsgToParent();
 		},	
 		savePanelBtn:function(){
 			this.sendMsgToParent();
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
 		},
 		jsPlumbHandle:function(){
 			var _this = this;
			jsPlumb.ready(function(){
			 _this.instance = jsPlumb.getInstance({
					DragOptions: { cursor: "pointer", zIndex: 2000 },
					ConnectionsDetachable:false,
				 	ReattachConnections:false,
					ConnectionOverlays:[
						["Custom",{
							create:function(component){if($(component.source).attr("commondata").split("_yzy_").length > 1 && $(component.source).attr("commondata").split("_yzy_")[0] != "缴费时间"){return $("<img src='/static/images/lianj_03.png'/>")};return $("<img src='/static/images/lianj_03.png'/>")},
							loaction:0.5,
							cssClass:"awarningconnectionImg",
							id:"connFlag",
							events:{
								click:function(jsPlumb){

									// if($(jsPlumb.component.target).hasClass("jtk-overlay")){
									// 	$(jsPlumb.component.target).trigger("click");
									// 	return;
									// }
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
	//连线
	awarningTableDrag:function(ele,eleList){
		var _this = this;
		this.instance.batch(function () {
			$(eleList).each(function(index,ele){
				$(ele).find(".awarning-process-item").each(function(indexs,eles){
					_this._addEndpoints($(eles).attr("id"), ["LeftMiddle","RightMiddle"], ["TopCenter","BottomCenter"]);
						
						if(indexs > 0){
						if(_this.requestData[index][indexs].split("_yzy_").length > 1 && indexs+1 < _this.requestData[index].length){
							_this.instance.connect({uuids: [$(eles).attr("id")+"LeftMiddle", $(ele).find(".awarning-process-item").eq(indexs-1).attr("id")+"LeftMiddle"], editable: true});
							if(index > 1){
								_this.instance.connect({uuids: [$(eles).attr("id")+"RightMiddle", $(ele).find(".awarning-process-item").eq(indexs-1).attr("id")+"RightMiddle"], editable: true});
							}
							return;
						}

						 var tempIndexs = $(eles).attr("dataindex");
				
						_this.instance.connect({uuids: ["jsplumb"+index + (tempIndexs-1) +"RightMiddle", "jsplumb"+index + tempIndexs +"LeftMiddle"], editable: true});
					}
				})
				if(index > 0){
					var tempParent = _this.arrHandleChart(_this.requestData,_this.requestData[index][0],index).replace("_yzy_","");
					// _this.instance.connect({uuids: ["jsplumb"+String(tempParent)+"RightMiddle", "jsplumb"+String(index)+"1LeftMiddle"], editable: true});
				}
				// _this.instance.connect({uuids: ["jsplumb11LeftMiddle", "jsplumb21LeftMiddle"], editable: true});
				// 	_this.$nextTick(function(){
				// 		_this._addEndpoints($(".jtk-overlay").eq(index).attr("id"), ["LeftMiddle"],[]);
				// 		_this.instance.connect({uuids: ["jsplumb02RightMiddle", "jsPlumb_2_46LeftMiddle"], editable: true});
				// 		$(".jtk-overlay").eq(index).hide();
				// 	})
			});
			
			_this.instance.connect({uuids: ["jsplumb11RightMiddle", "jsplumb22LeftMiddle"], editable: true});
	        $(".jtk-endpoint").not(".jtk-endpoint-connected").remove();
	       })
	},
	warningProcessStatus:function(){
		if(this.warningShow){
			this.requestData = [["分诊时间","挂号时间","就诊时间"],["就诊时间","缴费时间_yzy_sameLeave","住院流程_yzy_sameLeave"],["缴费时间_yzy_sameLeave","检查_yzy_sameLeave","送检_yzy_sameLeave","取药_yzy_sameLeave"]];
			// this.secondArrDataHandle(this.ceshi);
		}
		return true;
	},
	itemStyle:function(index){
		if(index > 0){
			if(index > 1){
				return  {"top":this.tempTop - 100 + "px","left":this.tempLeft + 195 +"px","width":this.width + this.left + 'px'}
			}
			 return  {"top":this.tempTop+ "px","left":this.tempLeft+"px","width":(this.requestData[index].length-1) * this.width + (this.requestData[index].length-1) * this.left + 'px'}
		
			// this.tempLeft += (this.requestData[index].length-1) * this.width + (this.requestData[index].length-1) * this.left;
		}else{
			this.tempLeft =this.requestData[index].length * this.width + (this.requestData[index].length) * this.left;
			this.tempTop = (index+1) * this.top;
			return {"top":(index+1) * this.top + "px","left":0 + "px","width":this.requestData[index].length * this.width + (this.requestData[index].length) * this.left + 'px'}
		}
	},
	itemsStyle:function(index,indexs){
		if(index < 1 || this.requestData[index][indexs].split("_yzy_").length <= 1) return;
		if(this.requestData[index][indexs].split("_yzy_")[1] == "sameLeave"){
				return {"position":"absolute","top":(indexs - 2.5 +index) * 50 + "px"}

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
		//元素位置
		var tempElementTarget = jsPlumb._jsPlumb.component;
		this.warningPopUp = !this.warningPopUp;
		if(this.warningPopUp){
			this.$nextTick(function(){
				this.awarningDarg();
				if(tempElementTarget.id == 'con_17'){
					$(".tableCon .tdOne").html('等待就诊');
				}
			})
		}
	}


}


}