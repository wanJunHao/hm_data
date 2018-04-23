<template>
	<div class='waringProcess-only-wrap'>
		<div class="warningProcess-content"  v-show="warningShow" id="warningProcess-contenta">
		<!-- title -->
		<div class="wariningProcess-title">
			<p>门诊流程</p>
		</div>
		<div class="settingPanel-content">
			<div class="settingPanel" id="settingPanel">
				<!-- 流程设置 -->
				<div v-for="(item,index) in ceshi" :dataindex="index" :style="itemStyle(index)" class="awarning-process-wrap clear">
					<template v-for="(items,indexs) in item">
						<div class="awarning-process-item" :dataindex="indexs" v-if="!(index > 0 && indexs == 0)" :commonData="items"
						:id="'jsplumb'+index+indexs" :style="itemsStyle(index,indexs)">
							<p>{{ items }}</p>
						</div>
					</template>
				</div>
			</div>
		</div>
		<!-- 设置内容弹框 -->
		<div id="warningPanelSetting" v-if="warningPopUp">
			<div class="topline"></div>
			<div class="common-head">
				<span class="logo">预警条件设置</span>
				<div class="close" @click="closeSetBtn">
					<img src="/static/images/close.png" alt="" title="关闭" />
				</div>
			</div>
			<div class="warning-body">
				<div class="warning-name-input-div">
					<span class="logo">监测名称:</span>
					<input type="text" class="listenInput">
				</div>
				<div class="warning-setting">
					<div class="warning-setting-area">
						<table cellspacing="0" cellpadding="0">
							<tr class="title">
								<td>当前表标题</td>
								<td>关系</td>
								<td>时间设定</td>
								<td>预警颜色</td>
								<td></td>
							</tr>
							<tr>
								<td></td>
								<td>
									>
									<img src='/static/images/more.png' alt='' class='moreCompare' @click='showCompare'>
								</td>
								<td>
									1h15min
									<img src='/static/images/more.png' alt='' class='moreWaitTime' @click='showWait'>
								</td>
								<td>
									<svg style="width:20px;height:20px;">
										<circle cx="10" cy="12" r="7" stroke-width="2" fill="red" />
									</svg>
								</td>
								<td></td>
							</tr>
						</table>
						<div id="compareSelects" style="display: none;">
							<div>></div>
							<div><</div>
						</div>
						<div id="waitSelects" style="display: none;">
							<div>1h</div>
							<div>2h</div>
							<div>3h</div>
						</div>
					</div>
				</div>
			</div>
			<div class="empty" style="height:50px;background: transparent;"></div>
			<div class="common-filter-footer">
				<a href="javascript:void(0)" class="cancleBtn" @click="cancleSetBtn">取消</a>
				<a href="javascript:void(0)" class="confirmBtn" @click="confirmSetBtn">确定</a>
			</div>
		</div>
		<!-- 按钮 -->
		<div class="settingPanelBtn">
			<a href="javascript:void(0)" class="cancleBtn" @click="canclePanelBtn">取消</a>
			<a href="javascript:void(0)" class="saveBtn" @click="savePanelBtn">保存</a>
		</div>
	</div>
	</div>

</template>
<script>
	import warningProcess from "../assets/js/wariningProcess"

	export default{
		...warningProcess
	}
</script>
<style>
  @import "../assets/css/warningProcess.css";
</style>