<template>
	<div class="mapShow" v-show="outpatienttMapShow">
		This is mapArea.
	</div>
</template>
<script type="text/javascript">
	import outpatienttMap from "../assets/js/outpatienttMap"
	export default{
		...outpatienttMap
	}
</script>