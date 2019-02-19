<template>
	<el-container>
		<el-col :span="4" style="padding:20px;">
			<el-row>
				<ul>
				<li  v-for="o in 10">渠道名称<span class="fr themecolor"  v-on:click="handleParentEdit">编辑</span></li>
				</ul>
				<el-button type="primary" size="small" v-on:click="handleParentAdd" class="createBtn mt20">新建渠道</el-button>
			</el-row>

		</el-col>
		<el-col :span="20" style="padding:0 20px;border-left:20px solid #f0f0f0;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters" size="small">
						<el-form-item>
							<el-input v-model="filters.name"  placeholder="请输入渠道名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary"  v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button  v-on:click="getUsers">重置</el-button>
						</el-form-item>
						<el-form-item class="fr">
							<el-button type="primary" v-on:click="handleAdd">新建</el-button>
						</el-form-item>
					</el-form>
				</el-col>

				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

					<el-table-column prop="id" label="渠道ID" width="120">
					</el-table-column>
					<el-table-column prop="name" label="渠道名称" width="120">
					</el-table-column>
					<el-table-column prop="sex" label="是否返点" width="120">
					</el-table-column>
					<el-table-column prop="age" label="返点信息" width="200">
					</el-table-column>
					<el-table-column prop="birth" label="操作人" width="120">
					</el-table-column>
					<el-table-column prop="addr" label="操作日期" min-width="120">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
							
							:page-sizes="[20, 50, 100]"
							:page-size="20"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
							style="text-align: center">
					</el-pagination>
				</el-col>
			</section>
		</el-col>
		<!--编辑界面-->
		<el-dialog title="编辑渠道" v-model="editParentFormVisible" :close-on-click-modal="false" :visible.sync="editParentFormVisible">
			<el-form :model="editParentForm" label-width="80px" :rules="editFormRules" ref="editForm" size="small">
				<el-form-item label="渠道名称" prop="name">
					<el-input v-model="editParentForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">

				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
				<el-button @click.native="editParentFormVisible = false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<!--新建界面-->
		<el-dialog title="新建渠道" v-model="addParentFormVisible" :close-on-click-modal="false" :visible.sync="addParentFormVisible">
			<el-form :model="addParentForm" label-width="80px" :rules="addFormRules" ref="addForm" size="small">
				<el-form-item label="渠道名称" prop="name">
					<el-input v-model="addParentForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
				<el-button @click.native="addParentFormVisible = false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<!--编辑界面-->
		<el-dialog title="编辑子渠道" v-model="editFormVisible" :close-on-click-modal="false" :visible.sync="editFormVisible">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm" size="small">
				<el-form-item label="渠道名称" prop="name">
					父渠道名称
				</el-form-item>
				<el-form-item label="子渠道名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否返点">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="返点信息">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">

				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
				<el-button @click.native="editFormVisible = false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<!--新建界面-->
		<el-dialog title="新建子渠道" v-model="addFormVisible" :close-on-click-modal="false" :visible.sync="addFormVisible">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm" size="small">
				<el-form-item label="渠道名称" prop="name">
					父渠道名称
				</el-form-item>
				<el-form-item label="子渠道名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否返点">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">是</el-radio>
						<el-radio class="radio" :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="返点信息">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
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
				editParentFormVisible: false,
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
				//编辑界面数据
				editParentForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				addParentFormVisible: false,
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
				},
				addParentForm: {
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

			},
			//显示编辑界面
			handleParentEdit: function (index, row) {
				this.editParentFormVisible = true;
				this.editParentForm = Object.assign({}, row);
			},
			//显示新增界面
			handleParentAdd: function () {
				this.addParentFormVisible = true;

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