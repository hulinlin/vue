<template>
	<el-container>
		<el-col :span="4" style="padding:20px;">
			<el-row>
				<ul>
					<li  v-for="o in 10">部门名称<a class="fr themecolor"  @click="handleEdit">编辑</a></li>
				</ul>
				<el-button type="primary" size="small" @click="handleAdd" class="createBtn mt20">新建部门</el-button>
			</el-row>

		</el-col>
		<el-col :span="20" style="padding:0 20px;border-left:20px solid #f0f0f0;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters" size="small">
						<el-form-item>
							<el-input v-model="filters.name"  placeholder="请输入姓名/手机号码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary"  v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button  v-on:click="getUsers">重置</el-button>
						</el-form-item>
						<el-form-item class="fr">
							<router-link to="/memberAdd"><el-button type="primary">新增</el-button></router-link>

						</el-form-item>
					</el-form>
				</el-col>

				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

					<el-table-column prop="name" label="用户ID" width="120">
					</el-table-column>
					<el-table-column prop="name" label="姓名" width="120">
					</el-table-column>
					<el-table-column prop="sex" label="手机号码" width="120">
					</el-table-column>
					<el-table-column prop="age" label="所属部门" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="职位" width="120">
					</el-table-column>
					<el-table-column prop="addr" label="职务" min-width="100">
					</el-table-column>
					<el-table-column property="status" align="center" label="状态">
						<template slot-scope="scope">
							<el-switch active-color="#13ce66" inactive-color="#ff4949"  v-model="scope.row.status" @change=change(scope.$index,scope.row)>
							</el-switch>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="操作人" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="操作日期" min-width="120">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="handlePwd(scope.$index, scope.row)">重置密码</el-button>
							<el-button type="text" size="small" @click="handleUserEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button type="text"  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!--工具条-->
				<el-col :span="24" class="toolbar">
					<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
					<!--<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
					</el-pagination>-->
					<el-pagination
							
							:page-sizes="[10,20, 50, 100]"
							:page-size="10"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
							style="text-align: center">
					</el-pagination>
				</el-col>
			</section>
		</el-col>
		<!--编辑界面-->
		<el-dialog title="编辑部门" v-model="editFormVisible" :close-on-click-modal="false" :visible.sync="editFormVisible">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" size="small">
				<el-form-item label="部门名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">

				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
				<el-button @click.native="editFormVisible = false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<!--新建界面-->
		<el-dialog title="新建部门" v-model="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" size="small">
				<el-form-item label="部门名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
				<el-button @click.native="addFormVisible = false" size="small">取消</el-button>
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
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				currentPage4: 1,
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
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
			//重置密码
			handlePwd: function (index, row) {
				this.$confirm('确认重置密码吗?', '提示', {
					type: ''
				}).then(() => {
					this.$message({
						message: '重置成功',
						type: 'success'
					});
				}).catch(() => {

				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: ''
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
			handleEdit: function (index) {
				this.editFormVisible = true;
				this.editForm = Object.assign({});
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = Object.assign({});

			},
			handleUserEdit: function () {
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