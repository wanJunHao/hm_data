<template>
	<div class="mapShow" v-show="outpatienttMapShow" :style="bodyWidthHandle()">
		<div class="mapShowHandle-content">
		<!-- title -->
		<div class="mapShow-title">
			<div class="mapShow-title-list clear">
				<!-- 科室 -->
				<select class="mapShow-title-list-select">
					<option value="全部科室">全部科室</option>
				</select>
				<!-- 病种 -->
				<select class="mapShow-title-list-select">
					<option value="全部病种">全部病种</option>
				</select>				

				<!-- 时间区间 -->
				<select class="mapShow-title-list-select">
					<option value="时间区间">时间区间</option>
				</select>
				<!-- 日期选择 -->
				<div class="mapShow-data">
					<input type="text" id="mapShowData-start" class="mapShowData-change" :value="nowDate + ' 00:00'">
					<!-- <input type="text" id="mapShowData-end" class="mapShowData-change" :value="nowDate + ' 23:59'"> -->
				</div>
				<div class="mapShow-data">
					<!-- <input type="text" id="mapShowData-start" class="mapShowData-change" :value="nowDate + ' 00:00'"> -->
					<input type="text" id="mapShowData-end" class="mapShowData-change" :value="nowDate + ' 23:59'">
				</div>
			</div>
		</div>
		<!-- 地图展示 -->
		<div class="autoMapToHandle">
			
		</div>
	</div>
	</div>
</template>
<script type="text/javascript">
	import outpatienttMap from "../assets/js/outpatienttMap"
	export default{
		...outpatienttMap
	}
</script>
<style type="text/css">
	.mapShow{background: white;background-clip: content-box;min-width: 1000px;}
	.mapShow .mapShowHandle-content{width: 100%;height: 100%;border:1px solid #DEDEDE;}
	.mapShow .autoMapToHandle{width: 70%;height: 70%;position:absolute;top: 40px;right: 0px;bottom: 0px;left: 0px;margin: auto}
	.mapShow .mapShow-title{width: 100%;height:50px;border-bottom:2px solid #0B9BFB;}
	.mapShow .mapShow-title .combo-select,.mapShow .mapShow-title .mapShow-data{width: 130px;height: 24px;float: left;font-size: 12px;line-height:24px;margin:13px 10px;cursor:pointer; }
	.mapShow .mapShow-title .mapShow-data{border: 1px solid #DEDEDE;border-radius: 2px;}
	.mapShow .mapShow-title .combo-select .combo-input{padding: 0px !important;text-indent:5px;}
	.mapShow .mapShow-title .mapShowData-change{text-indent: 3px;width: 80%;height: 100%;float: left;}
	.mapShow-data img{float: left;margin-left: 8px;margin-top: 5px;}
	.ui-timepicker-div .ui-widget-header { margin-bottom: 8px; }
	.ui-timepicker-div dl { text-align: left; }
	.ui-timepicker-div dl dt { float: left; clear:left; padding: 0 0 0 5px; }
	.ui-timepicker-div dl dd { margin: 0 10px 10px 45%; }
	.ui-timepicker-div td { font-size: 90%; }
	.ui-tpicker-grid-label { background: none; border: none; margin: 0; padding: 0; }
	.ui-timepicker-rtl{ direction: rtl; }
	.ui-timepicker-rtl dl { text-align: right; padding: 0 5px 0 0; }
	.ui-timepicker-rtl dl dt{ float: right; clear: right; }
	.ui-timepicker-rtl dl dd { margin: 0 45% 10px 10px; }
</style>