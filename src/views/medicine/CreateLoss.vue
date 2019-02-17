<template>
	<el-container>

		<el-col :span="24" style="padding:20px;">
			<section>
				<el-form :model="proTypeForm"  label-width="90px"  ref="proTypeForm" size="small">
					<el-form-item label="单据类型：" style="width:50%;">
						<el-select  placeholder="请选择">
							<el-option label="报废单" value="shanghai"></el-option>
							<el-option label="丢失单" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="商品名称" style="width:50%;">
							<el-select filterable remote
    reserve-keyword
    placeholder="请输入"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option>
    </el-option>
  </el-select>
						</el-form-item>
					<el-form-item label="数量：" style="width:50%;">
						<el-input v-model="proTypeForm.num" size="small" auto-complete="off" style="width:80%;float:left;"></el-input>
						<el-button type="primary" size="small" style="float:right;">加入列表</el-button>
					</el-form-item>
					<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 80%;">
						<el-table-column prop="name" label="商品条码" width="120">
						</el-table-column>
						<el-table-column prop="birth" label="商品名称" min-width="120">
						</el-table-column>
						<el-table-column prop="birth" label="单位" width="120">
						</el-table-column>
						<el-table-column prop="addr" label="规格" min-width="120">
						</el-table-column>
						<el-table-column prop="birth" label="丢失/报废数量" width="120">
						</el-table-column>
						<el-table-column label="操作" width="200">
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
								<el-button type="text"  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-form-item label="备注：" style="width:50%;margin-top:20px;">
						<el-input type="textarea" v-model="proTypeForm.desc" auto-complete="off"></el-input>
					</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">提交申请</el-button>
							<el-button type="primary" size="small" v-on:click="getUsers">保存</el-button>
							<el-button type="primary" size="small" v-on:click="getUsers">取消</el-button>
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
				orderDetailFormVisible: false,
				proTypeFormVisible:false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				proTypeForm:{
					type:''
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
			//显示采购信息
			purchase: function (index, row) {
				this.orderDetailFormVisible = true;
			},
			//新增采购信息
			createType: function () {
				this.proTypeFormVisible = true;
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
			proTypeSubmit: function (){
				console.log(this.proTypeForm.type);
				this.$router.push({path:'/uapbd/paraset/edit',query:{type:this.proTypeForm.type}});
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