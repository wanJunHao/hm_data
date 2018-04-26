<template>
		<tr class="tableCon">
		<td class="tdOne">{{ nowFile }}</td>
		<td>
			<select class="sumChange">
				<option value=">"> > </option>
<!-- 				<option value="<"> < </option>
				<option value="<"> >= </option>
				<option value="<"> <= </option> -->
			</select>
		</td>
		<td>
			<select class="sumChange" id="timeChangeSelect">
				<option value="30"> 30min </option>
				<option value="60" selected> 60min </option>
				<option value="90"> 90min </option>
				<option value="120"> 120min </option>
			</select>
		</td>
		<td>
			<svg style="width:20px;height:20px;">
				<rect rx="4" ry="4" width="15" height="15" fill="#FA3843" y="5" x="5"></rect>
			</svg>
		</td>
		<td @click="deleteRow" class="deleteImg">
			<img src="/static/images/delete.png">
		</td>
	</tr>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {

			}
		},
		props:{
			nowFile:{
				default:String,
			}
		},
		methods:{
			deleteRow:function(event){
				var tar = event.target;
				$(tar).parents("tr").hide();
			},
			}
	}
</script>
<style>
	.tableCon .deleteImg img{visibility: hidden}
	.tableCon:hover .deleteImg img{visibility: visible;}
</style>