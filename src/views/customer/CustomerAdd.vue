<template>
	<el-container>

			<el-form :model="ruleForm" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm" size="small" style="padding:20px;">
				<el-col :span="12" class="borderright1 paddingright20">
					<h5>基本信息</h5>
				<el-col :span="12">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				</el-col>
					<el-col :span="12">
						<el-form-item label="昵称" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别" prop="resource">
							<el-radio-group v-model="ruleForm.resource">
								<el-radio label="男"></el-radio>
								<el-radio label="女"></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="生日">
							<el-col>
								<el-form-item prop="date1">
									<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号码" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="电子邮箱" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="籍贯" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="微信" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="婚姻状态" prop="name">
							<el-radio-group v-model="ruleForm.resource">
								<el-radio label="已婚"></el-radio>
								<el-radio label="离异"></el-radio>
								<el-radio label="未婚"></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="公司名称" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="公司规模" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="公司行业" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所在城市" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="公司地址" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="秘书姓名" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="家庭状况" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="上过课程" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="和谁最好" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="说过的话" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="服务记录" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="关键指标" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="第一次见面" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="最值得表扬的地方" prop="name">
							<el-input type="textarea" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>

				</el-col>

				<el-col :span="12" class="padding20 pt0">
					<h5>在院信息</h5>
					<el-col :span="12">
						<el-form-item label="私密管家" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择">
								<el-option label="管家一" value="shanghai"></el-option>
								<el-option label="管家二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="专家医生" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择">
								<el-option label="医生一" value="shanghai"></el-option>
								<el-option label="医生二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="客户意向" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择">
								<el-option label="意向一" value="shanghai"></el-option>
								<el-option label="意向二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="需求项目" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择">
								<el-option label="项目一" value="shanghai"></el-option>
								<el-option label="项目二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="渠道来源" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择">
								<el-option label="来源一" value="shanghai"></el-option>
								<el-option label="来源二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="市场经理" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择">
								<el-option label="经理一" value="shanghai"></el-option>
								<el-option label="经理二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="客服人员" prop="name">
							<el-select v-model="ruleForm.name" placeholder="请选择">
								<el-option label="客服一" value="shanghai"></el-option>
								<el-option label="客服二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="推荐人" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="备注" prop="name">
							<el-input type="textarea" v-model="ruleForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col align="center">
						<el-form-item>
							<el-button type="primary" size="small" @click="onSubmit">确定</el-button>
							<el-button type="primary" size="small" @click="onSubmit">保存并分诊</el-button>
							<el-button size="small">取消</el-button>
						</el-form-item>
					</el-col>
				</el-col>
			</el-form>

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
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					region: [
						{ required: true, message: '请选择活动区域', trigger: 'change' }
					],
					date1: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					date2: [
						{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
					],
					type: [
						{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
					],
					resource: [
						{ required: true, message: '请选择活动资源', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '请填写活动形式', trigger: 'blur' }
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