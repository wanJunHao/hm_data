export default{
	name:"warningProcess",
	mounted:function(){
		this.jsPlumbHandle();
	},
	props:{
		warningShow:{
			type:Boolean,
		}
	},
	data(){
		return {
			ceshi:[["预约时间","挂号时间","就诊时间","开药时间","取药时间"],["就诊时间","住院时间","出院时间"]],

			left:155,

			top:100,

			color:"red",
		}
	},
	methods:{
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
 		},
 		jsPlumbHandle:function(){
			jsPlumb.ready(function(){
			var instance = jsPlumb.getInstance({
					DragOptions: { cursor: "pointer", zIndex: 2000 },
					ConnectionsDetachable:true,
				 	ReattachConnections:true,
					ConnectionOverlays:[
						["Custom",{
							create:function(component){return $("<img src='/static/images/lianj_03.png'/>")},
							loaction:0.5,
							cssClass:"awarningconnectionImg",
							id:"connFlag"
						}]
					],
					Container:"waringSystem-content"
			});

			});


	},
	warningProcessStatus:function(){
		if(this.warningShow){
			
		}
		return true;
	},

}

}