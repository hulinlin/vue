<template>
	<el-container>

			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="small" style="padding:20px;">
				<el-col :span="24">
				<el-col :span="6">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				</el-col>
					<el-col :span="6">
				<el-form-item label="有效证件类型" prop="type">
					<el-select v-model="ruleForm.type" placeholder="请选择">
						<el-option label="身份证" value="shanghai"></el-option>
						<el-option label="护照" value="beijing"></el-option>
					</el-select>
				</el-form-item>
					</el-col>
				<el-col :span="6">
				<el-form-item label="有效证件号码">
					<el-input v-model="ruleForm.name"></el-input>

				</el-form-item>
				</el-col>
					<el-col :span="6">
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="ruleForm.sex">
								<el-radio label="男"></el-radio>
								<el-radio label="女"></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-col>
				<el-col :span="24">

				<el-col :span="6">
					<el-form-item label="出生日期">
						<el-col>
							<el-form-item prop="date1">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
							</el-form-item>
						</el-col>

					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="民族" prop="ninzu">
						<el-input v-model="ruleForm.ninzu"></el-input>
					</el-form-item>
				</el-col>
					<el-col :span="6">
						<el-form-item label="手机号码" prop="phone">
							<el-input v-model="ruleForm.phone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="微信号" prop="wechat">
							<el-input v-model="ruleForm.wechat"></el-input>
						</el-form-item>
					</el-col>
				</el-col>
				<el-col :span="24">

				<el-col :span="6">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="ruleForm.email"></el-input>
					</el-form-item>
				</el-col>
					<el-col :span="6">
						<el-form-item label="医护技his编码" prop="hisid">
							<el-input v-model="ruleForm.hisid"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="执业范围" >
							<el-select v-model="ruleForm.fanwei" placeholder="请选择">
								<el-option label="外科" value="shanghai"></el-option>
								<el-option label="内科" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态" prop="state">
							<el-radio-group v-model="ruleForm.state">
								<el-radio label="启用"></el-radio>
								<el-radio label="禁用"></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-col>

				<el-col :span="24">
				<el-col :span="6">
					<el-form-item label="所属部门">
						<el-select v-model="ruleForm.bumen" placeholder="请选择">
							<el-option label="部门一" value="shanghai"></el-option>
							<el-option label="部门二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="职位" >
						<el-select v-model="ruleForm.zhiwei" placeholder="请选择">
							<el-option label="职位一" value="shanghai"></el-option>
							<el-option label="职位二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="职务">
						<el-select v-model="ruleForm.zhiwu" placeholder="请选择">
							<el-option label="职务一" value="shanghai"></el-option>
							<el-option label="职务二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
					<el-col :span="6">
						<el-form-item label="执业证书编码" prop="code">
							<el-input v-model="ruleForm.code"></el-input>
						</el-form-item>
					</el-col>
				</el-col>
				<el-col :span="24">

				<el-col :span="6">
					<el-form-item label="资格证书编码" prop="zicode">
						<el-input v-model="ruleForm.zicode"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="执业注册地" prop="zhiaddr">
						<el-input v-model="ruleForm.zhiaddr"></el-input>
					</el-form-item>
				</el-col>
					<el-col :span="6">
						<el-form-item label="处方有效标志">
							<el-select v-model="ruleForm.chuf" placeholder="请选择">
								<el-option label="标志一" value="shanghai"></el-option>
								<el-option label="标志二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="开始执业时间">
							<el-col>
								<el-form-item prop="date1">
									<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>

						</el-form-item>
					</el-col>
				</el-col>
				<el-col :span="24">
					<el-col align="center">
						<el-form-item>
							<el-button type="primary" @click="onSubmit">立即创建</el-button>
							<el-button @click="$router.go(-1)">取消</el-button>
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