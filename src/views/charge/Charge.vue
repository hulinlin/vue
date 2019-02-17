<template>
	<el-container>

		<el-col :span="24" style="padding:0 20px;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters" size="small">

						<el-form-item label="状态" prop="state">
							<el-select v-model="ruleForm.state" placeholder="请选择" size="small">
								<el-option label="待缴费" value="待缴费"></el-option>
								<el-option label="已缴费" value="已缴费"></el-option>
								<el-option label="已退费" value="已退费"></el-option>
								<el-option label="全部" value="全部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="开单日期" prop="region">
							<el-date-picker
      v-model="ruleForm.date1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
						</el-form-item>

						<el-form-item label="关键字" prop="region">
							<el-input v-model="filters.name" size="small" placeholder="请输入顾客姓名/手机号码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button size="small" v-on:click="getUsers">重置</el-button>
						</el-form-item>

					</el-form>
				</el-col>
				<el-col :span="24" class="toolbar" style="padding: 0px;">
					<el-form :inline="true" :model="filters" label-width="100px">
						<el-form-item>
							<router-link to="/statement"><el-button type="primary" size="small" v-on:click="getUsers">消费明细</el-button></router-link>
						</el-form-item>
						<el-form-item>
							<router-link to="/statement"><el-button type="primary" size="small" v-on:click="getUsers">充值记录</el-button></router-link>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">打印</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<!--列表-->
				<el-table :data="list"
						  v-loading="listLoading"
						  element-loading-text="给我一点时间"
						  height="500"
						  element-loading-background="rgba(0, 0, 0, .3)"
						  style="width: 100%">
					<el-table-column type="expand" prop="names">
						<template slot-scope="scope" >
							<el-table  :data="scope.row.names" style="width:80%;margin:0 auto;">
								<el-table-column type="index" label="序号"  align="center" width="100">

								</el-table-column>
								<el-table-column prop="name" label="项目名称" align="center">
									<template slot-scope="scope">
										<span>{{scope.row.name}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="num" label="项目金额" align="center">
									<template slot-scope="scope">
										<span>{{scope.row.num}}</span>
									</template>
								</el-table-column>
								<el-table-column prop="num" label="结算状态" align="center">
									<template slot-scope="scope">
										<span>{{scope.row.num}}</span>
									</template>
								</el-table-column>

							</el-table>
						</template>
					</el-table-column>
					<el-table-column prop="Id" label="订单编码">
					</el-table-column>
					<el-table-column prop="Id" label="会员号">
					</el-table-column>
					<el-table-column prop="Id" label="顾客姓名">
					</el-table-column>
					<el-table-column prop="Id" label="联系方式">
					</el-table-column>
					<el-table-column prop="Id" label="开单人">
					</el-table-column>
					<el-table-column prop="Id" label="开单日期">
					</el-table-column>
					<el-table-column prop="Id" label="付款总额">
					</el-table-column>
					<el-table-column prop="Id" label="状态">
					</el-table-column>
					<el-table-column  width="150" label="操作">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="settlement(scope.$index, scope.row)">结算</el-button>
							<el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">退回</el-button>
						</template>
					</el-table-column>
				</el-table>


				<!--工具条-->
				<el-col :span="24" class="toolbar">
					<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
					<!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
					</el-pagination>-->
					<el-pagination
							
							:page-sizes="[20, 50, 100]"
							:page-size="20"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
							style="text-align: center">
					</el-pagination>
				</el-col>
			</section>
		</el-col>
		<!--结算-->
		<el-dialog title="结算" :inline="true" class="middleDialog" v-model="settlementFormVisible" :close-on-click-modal="false">
			<h3>本次缴费金额：￥0.00</h3>
			<el-form :model="settlementForm" label-width="90px"  ref="editStewardForm" size="small">
				<el-col :span="12">
					<el-form-item label="现金支付" prop="name">
						<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="微信支付" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="支付宝支付" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="银联支付" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="信用卡支付" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="其他支付" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="券支付" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="小程序支付" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-col>
				<el-col :span="12">
				<el-form-item label="积分抵扣" prop="name">
					<el-input v-model="settlementForm.name" auto-complete="off"></el-input>
					<span class="themecolor">1000积分=1元</span>
				</el-form-item>
				</el-col>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
				<el-button @click.native="settlementFormVisible = false" size="small">取消</el-button>
			</div>
		</el-dialog>
	</el-container>




</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				list: [
					{
						Id: '1店',
						names: [{
							name: 'apple',
							num:1
					},{
							name: 'banana',
									num:2
						}]
					},
					{
						Id: '2店',
								names: [{
						name: 'apple',
						num:1
					},{
						name: 'banana',
								num:2
					}]
					}
				],
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				settlementFormVisible: false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				settlementForm:{
					name: '',
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				rules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					region: [
						{ required: true, message: '请选择', trigger: 'change' }
					],
					date1: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					date2: [
						{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					],
					type: [
						{ type: 'array', required: true, message: '请至少选择一个性质', trigger: 'change' }
					],
					resource: [
						{ required: true, message: '请选择资源', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '请填写形式', trigger: 'blur' }
					]
				},
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			settlement:function (index, row) {
				this.settlementFormVisible = true;
				this.settlementForm = Object.assign({}, row);
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.$router.push('/memberAdd');

			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
	.el-dialog--small{
		width:700px;
	}
</style>