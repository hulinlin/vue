<template>
	<section>
		<!--工具条-->
		<el-row>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form  :model="filters" label-width="90px" size="small">
				<el-row>
					<el-col :span="18">
						<el-col :span="8">
				<el-form-item label="医院名称">
					<el-input v-model="filters.name" placeholder=""></el-input>
				</el-form-item>
						</el-col>
						<el-col :span="8">
				<el-form-item label="医院电话">
					<el-input v-model="filters.phone" placeholder=""></el-input>
				</el-form-item>
						</el-col>
						<el-col :span="8">
				<el-form-item label="医院地址">
					<el-input v-model="filters.addr" placeholder=""></el-input>
				</el-form-item>
						</el-col>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
				<el-form-item label="底部自定义">
					<el-input type="textarea" placeholder=""></el-input>
				</el-form-item>
					</el-col>
				</el-row>
				<el-form-item>
					<el-button type="primary" size="small" v-on:click="">保存</el-button>
					<el-button type="primary" size="small" v-on:click="">预览</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		</el-row>
		<el-row class="padding20">
			<el-col :span="20" :offset="2" class="padding20 preview">
				<h5 class="textcenter">私密家园妇科门诊部</h5>
				<p class="previewbasics"><span>类别：消费会员</span><span>诊疗号：1234567</span><span>责任咨询师：张医生</span><span>姓名：张忆莎</span><span>日期：2019-01-01</span><span>流水号：111111111111</span></p>
				<p class="fr">No.2132424323212121</p>
				<el-table  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

					<el-table-column prop="id" label="类型" width="120">
					</el-table-column>
					<el-table-column prop="name" label="项目" width="120">
					</el-table-column>
					<el-table-column prop="sex" label="开发人员" width="120">
					</el-table-column>
					<el-table-column prop="age" label="数量" width="200">
					</el-table-column>
					<el-table-column prop="birth" label="应付金额" width="120">
					</el-table-column>
					<el-table-column prop="addr" label="实付（现金券/余额/券额）" min-width="120">
					</el-table-column>
					<el-table-column prop="name" label="积分兑换" width="120">
					</el-table-column>
					<el-table-column prop="name" label="其他支付" width="120">
					</el-table-column>
				</el-table>
				<p class="fr"><span>缴费细节（微信支付：190）</span><span>合计：190 （账户剩余额：0 券额：0）</span></p>

				<p class="fr">（合计两笔 第一页/共一页）</p>

				<div>
					<p>如需开具发票，请于本月内凭此票前来换开发票<span class="fr">收银员：张宏 打印时间：2019-01-01</span></p>
				</div>
			</el-col>
		</el-row>


	</section>
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
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
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
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
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

<style scoped lang="scss">
	@import '~scss_vars';
	.preview{
		background:$color-bgcolor;
		.previewbasics{
			span{
				margin-right:50px;
			}
		}
	}

</style>