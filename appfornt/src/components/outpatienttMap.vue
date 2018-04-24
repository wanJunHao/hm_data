<template>
	<div class="mapShow" v-show="outpatienttMapShow">
		<!-- 地图展示 -->
		<div class="autoMapToHandle">
			
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
	.mapShow .autoMapToHandle{width: 80%;height: 80%;position:absolute;top: 0px;right: 0px;bottom: 0px;left: 0px;margin: auto}
</style>