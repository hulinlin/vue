<template>
	<el-container>

		<el-col :span="20" style="padding:20px;">
			<section>
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-row>
						<el-col :span="12">
							<el-form-item label="职位名称" prop="name">
								<el-input v-model="addForm.name" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="状态">
								<el-radio-group v-model="addForm.sex">
									<el-radio class="radio" :label="1">启用</el-radio>
									<el-radio class="radio" :label="0">禁用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="备注">
						<el-input type="textarea" v-model="addForm.addr"></el-input>
					</el-form-item>
					<el-form-item label="权限设置" class="borderbottom1">
					</el-form-item>
							<el-row type="flex" class="row-bg" justify="space-between" >

								<el-col :span="12"  class=" borderStyle pt0" >
									<p>栏目权限<span class="color_ccc">&nbsp;&nbsp;注：只要勾选的栏目频道，即表示授权给用户登录后看到栏目频道</span></p>
									<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
									<div style="margin: 15px 0;"></div>
									<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
										<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
									</el-checkbox-group>
								</el-col>
								<el-col :span="12" class="borderStyle pt0">
									<p>操作功能权限<span class="color_ccc">&nbsp;&nbsp;注：只要勾选的功能，即用户操作功能授权</span></p>
									<el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox>
									<div style="margin: 15px 0;"></div>
									<el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
										<el-checkbox v-for="city1 in cities1" :label="city1" :key="city1">{{city}}</el-checkbox>
									</el-checkbox-group>
								</el-col>
							</el-row>
					<el-form-item>
						<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
						<el-button @click.native="editFormVisible = false">取消</el-button>
					</el-form-item>
				</el-form>
			</section>
		</el-col>

	</el-container>




</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	const cityOptions = ['用户管理', '媒体分类管理', '媒体发布'];
	const cityOptions1 = ['创建', '编辑', '删除','查看','搜索'];
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				checkAll: false,
				checkedCities: [],
				cities: cityOptions,
				isIndeterminate: true,
				checkAll1: false,
				checkedCities1: [],
				cities1: cityOptions,
				isIndeterminate1: true,
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
				return row.sex == 1 ? '启用' : row.sex == 0 ? '禁用' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			handleCheckAllChange(event) {
				this.checkedCities = event.target.checked ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			handleCheckAllChange1(event) {
				this.checkedCities1 = event.target.checked ? cityOptions1 : [];
				this.isIndeterminate1 = false;
			},
			handleCheckedCitiesChange1(value) {
				let checkedCount = value.length;
				this.checkAll1 = checkedCount === this.cities1.length;
				this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities1.length;
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
				this.addForm = Object.assign({}, row);

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