<template>
	<el-container>

		<el-col :span="24" style="padding:0 20px;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters" label-width="100px" size="small">
						<el-col :span="24">
							<el-col :span="6">
								<el-form-item label="项目类型" prop="type">
									<el-select v-model="ruleForm.type" placeholder="请选择">
										<el-option label="类型一" value="shanghai"></el-option>
										<el-option label="类型二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="项目名称" prop="name">
									<el-select v-model="ruleForm.name" placeholder="请选择">
										<el-option label="名称一" value="shanghai"></el-option>
										<el-option label="名称二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="项目选择" prop="xuanze">
									<el-select v-model="ruleForm.xuanze" placeholder="请选择">
										<el-option label="选择一" value="shanghai"></el-option>
										<el-option label="选择二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="咨询管家" prop="guanjia">
									<el-select v-model="ruleForm.guanjia" placeholder="">
										<el-option label="管家一" value="shanghai"></el-option>
										<el-option label="管家二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>

						</el-col>
						<el-col :span="24">
							<el-col :span="6">
								<el-form-item label="客服人员" prop="kefu">
									<el-select v-model="ruleForm.kefu" placeholder="">
										<el-option label="客服一" value="shanghai"></el-option>
										<el-option label="客服二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="市场经理" prop="shic">
									<el-select v-model="ruleForm.shic" placeholder="">
										<el-option label="经理一" value="shanghai"></el-option>
										<el-option label="经理二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="专家医生" prop="zhuanjia">
									<el-select v-model="ruleForm.zhuanjia" placeholder="">
										<el-option label="专家一" value="shanghai"></el-option>
										<el-option label="专家二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="关键词" prop="region">
									<el-input v-model="filters.name"  placeholder="请输入商品名称"></el-input>
								</el-form-item>
							</el-col>

						</el-col>

						<el-col :span="24">
							<el-col :span="9">
								<el-form-item label="销售日期" prop="region">
									<el-date-picker
      v-model="ruleForm.date1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
								</el-form-item>
							</el-col>

							<el-col :span="15">
								<el-form-item>
									<el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
								</el-form-item>
								<el-form-item>
									<el-button size="small" v-on:click="getUsers">重置</el-button>
								</el-form-item>
								<el-form-item class="fr">
									<el-button size="small" v-on:click="getUsers">导出</el-button>
								</el-form-item>
							</el-col>
						</el-col>

					</el-form>
				</el-col>

				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
					<el-table-column prop="name" label="类型" >
					</el-table-column>
					<el-table-column prop="birth" label="项目名称">
					</el-table-column>
					<el-table-column prop="birth" label="业务次数">
					</el-table-column>
					<el-table-column prop="addr" label="疗程次数">
					</el-table-column>
					<el-table-column prop="name" label="服务次数">
					</el-table-column>
					<el-table-column prop="birth" label="剩余次数">
					</el-table-column>
					<el-table-column prop="birth" label="成交单价">
					</el-table-column>
					<el-table-column prop="addr" label="销售总额">
					</el-table-column>
					<el-table-column prop="name" label="已收款总额">
					</el-table-column>
					<el-table-column prop="birth" label="已消费金额">
					</el-table-column>
					<el-table-column prop="name" label="剩余金额">
					</el-table-column>
					<el-table-column prop="birth" label="参考成本">
					</el-table-column>
					<el-table-column prop="name" label="参考毛利">
					</el-table-column>
					<el-table-column prop="birth" label="收款方式">
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

</style>