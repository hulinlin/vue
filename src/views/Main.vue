<template>
	<section>
		<el-row class="cityCount">
			<el-col :span="6" class="textcenter">
				<div>
					<p>加盟机构总数</p>
					<h5 class="rotate">5000</h5>
				</div>
			</el-col>
			<el-col :span="6">
				<div>
					<h5>一线城市</h5>
					<p>标准诊所：600</p>
					<p>形象诊所：1000</p>
					<p>旗舰诊所：1600</p>
				</div>
			</el-col>
			<el-col :span="6">
				<div>
					<h5>二线城市</h5>
					<p>标准诊所：500</p>
					<p>形象诊所：800</p>
					<p>旗舰诊所：1000</p>
				</div>
			</el-col>
			<el-col :span="6">
				<div>
					<h5>三线城市</h5>
					<p>标准诊所：300</p>
					<p>形象诊所：500</p>
					<p>旗舰诊所：600</p>
				</div>
			</el-col>
		</el-row>
		<el-row type="flex" class="row-bg bordertop20 flowSheet" justify="space-around">
			<el-col :span="3">
				<div>
					<h5>19999.00<span>元</span></h5>
					<p>日流水总金额</p>
				</div>
			</el-col>
			<el-col :span="3">
				<div>
					<h5>99<span>人</span></h5>
					<p>日顾客上门总量</p>
				</div>
			</el-col>
			<el-col :span="3">
				<div>
					<h5>9999.00<span>元</span></h5>
					<p>当月流水累计总额</p>
				</div>
			</el-col>
			<el-col :span="3">
				<div>
					<h5>180<span>人</span></h5>
					<p>当月顾客上门总量</p>
				</div>
			</el-col>
			<el-col :span="3">
				<div>
					<h5>29999.00<span>元</span></h5>
					<p>上月流水累计总额</p>
				</div>
			</el-col>
			<el-col :span="3">
				<div>
					<h5>100<span>人</span></h5>
					<p>上月顾客上门总量</p>
				</div>
			</el-col>
			<el-col :span="3">
				<div>
					<h5>199<span>人</span></h5>
					<p>顾客总数</p>
				</div>
			</el-col>
		</el-row>
		<el-row class="bordertop20">
			<el-col :span="16" class="padding20">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="日流水排名" name="first">
						<h5>当月流水累计</h5>
						<div id="chartColumn" style="width:100%; height:400px;"></div>
					</el-tab-pane>
					<el-tab-pane label="日顾客上门量排名" name="second">日顾客上门量排名</el-tab-pane>
					<el-tab-pane label="上月流水排名" name="third">上月流水排名</el-tab-pane>
					<el-tab-pane label="上月顾客上门量排名" name="fourth">上月顾客上门量排名</el-tab-pane>
					<el-tab-pane label="加盟商顾客数量排名" name="fifth">加盟商顾客数量排名</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="8" class="borderleft20 padding20">
				<h5>日流水金额：199999元</h5>
				<div id="chartPie" style="width:100%; height:400px;"></div>
			</el-col>
		</el-row>
		<el-row class="bordertop20 padding20">
			<el-col :span="24">
				<h5>来诊顾客数量总计</h5>
				<div id="chartLine" style="width:100%; height:400px;"></div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	import echarts from 'echarts'
	/*document.getElementsByClassName('counter').countUp();*/
	export default {
		data() {
			return {
				activeName: 'first',
				chartColumn: null,
				chartLine: null,
				chartPie: null
			}
		},

		methods: {

			drawColumnChart() {
				this.chartColumn = echarts.init(document.getElementById('chartColumn'));
				let _this = this;
				this.chartColumn.setOption({
					tooltip: {
						trigger: 'axis',
						
					},
					legend: {
						
						data: ['上一个月', '本月', '下一个月']
						
					},
					
					xAxis: {
						type: 'category',
						data:(function(){
                var date=new Date;
                var year=date.getFullYear();
                var month=date.getMonth()+1;
                return _this.getDaysInMonth(year,month)
            })()

					},
					yAxis: {
						type: 'value'
					},
					grid: {
						
					},
					// Declare several bar series, each will be mapped
					// to a column of dataset.source by default.
					series: [
					{type: 'bar',data:(function(){
                var date=new Date;
                var year=date.getFullYear();
                var month=date.getMonth();
                return _this.getDaysInMonth(year,month)
            })(),name:'上一个月',showSymbol:false},
        {type: 'bar',data:(function(){
                var date=new Date;
                var year=date.getFullYear();
                var month=date.getMonth()+1;
                return _this.getDaysInMonth(year,month)
            })(),name:'本月'},
        {type: 'bar',data:(function(){
                var date=new Date;
                var year=date.getFullYear();
                var month=date.getMonth()+2;
                return _this.getDaysInMonth(year,month)
            })(),name:'下一个月',showSymbol:false},
						
					]
				});
			},
			drawLineChart() {
				this.chartLine = echarts.init(document.getElementById('chartLine'));
				this.chartLine.setOption({

					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['邮件营销', '联盟广告', '搜索引擎']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '邮件营销',
							type: 'line',
							stack: '总量',
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '联盟广告',
							type: 'line',
							stack: '总量',
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '搜索引擎',
							type: 'line',
							stack: '总量',
							data: [820, 932, 901, 934, 1290, 1330, 1320]
						}
					]
				});
			},
			drawPieChart() {
				this.chartPie = echarts.init(document.getElementById('chartPie'));
				this.chartPie.setOption({

					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						x: 'center',
						y: 'bottom',
						data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					series: [
						{
							name: '面积模式',
							type: 'pie',
							radius: [30, 110],
							center: ['75%', '50%'],
							roseType: 'area',
							data: [
								{ value: 10, name: 'rose1' },
								{ value: 5, name: 'rose2' },
								{ value: 15, name: 'rose3' },
								{ value: 25, name: 'rose4' },
								{ value: 20, name: 'rose5' },
								{ value: 35, name: 'rose6' },
								{ value: 30, name: 'rose7' },
								{ value: 40, name: 'rose8' }
							]
						}
					]
				});
			},
			getDaysInMonth(year, month) {
				month = parseInt(month, 10);  //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
				var temp = new Date(year, month, 0);
				var days = temp.getDate();
				var arr = [];
				for (var i = 1; i <= days; i++) {
					arr.push(i);
				}
				console.log(arr);
				return arr;

			},
			drawCharts() {
				this.drawColumnChart()
				this.drawLineChart()
				this.drawPieChart()
			},
		},

		mounted: function () {
			this.drawCharts()
			this.getDaysInMonth(2019,2)
		},


	}
</script>

<style scoped lang="scss">
	@import '~scss_vars';

	.breadcrumb-container {
		display: none;
	}

	h5 {
		padding: 0;
		margin: 0;
		font-size: 14px;
	}

	.cityCount {
		background: url(../assets/citycount.png) no-repeat;
		background-size: 100% auto;

		h5 {
			color: $color-primary;
			padding: 0;
			padding-top: 20px;
			margin: 0;
		}

		.rotate {
			font-size: 24px;
			padding-top: 0;
		}
	}

	.flowSheet {
		text-align: center;
		padding: 20px 0;

		h5 {
			color: $color-yellow;
			font-size: 24px;
			margin: 0;

			span {
				color: #555;
				font-size: 12px;
			}
		}

		p {
			color: #999;
			font-size: 12px;
		}
	}
</style>