<template>
	<el-container>
		<el-col :span="6" style="padding:20px;">
			<el-row>
			<Information></Information>
			</el-row>
		</el-col>
		<el-col :span="18" style="padding:20px;border-left:20px solid #f0f0f0;">
			<el-row>
			<div>
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<el-menu-item index="0" @click="tabChange(firstVisit)">首诊</el-menu-item>
					<el-menu-item index="1" @click="tabChange(subsequentVisit)">复诊</el-menu-item>
					<el-menu-item index="2"  @click="tabChange(doctorAdvice)">医嘱记录</el-menu-item>
				</el-menu>
			</div>
			<!--动态地绑定到它的 is 特性，我们让多个组件可以使用同一个挂载点，并动态切换。 -->
			<div :is="currentView"></div>
			</el-row>
		</el-col>
	</el-container>
</template>
<script>
	import util from '../../common/js/util'
	import Information from '../components/Information'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	// 导入子组件
	import FirstVisit from '../components/FirstVisit';
	import SubsequentVisit from '../components/SubsequentVisit';
	import DoctorAdvice from '../components/DoctorAdvice';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				activeIndex: '0',
				firstVisit: 'FirstVisit',
				subsequentVisit: 'SubsequentVisit',
				doctorAdvice: 'DoctorAdvice',
				currentView: 'FirstVisit', // 默认选中第一项
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
			tabChange(tabItem) {
				this.currentView = tabItem;
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
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
		components:{
			Information,
			FirstVisit,
			SubsequentVisit,
			DoctorAdvice

		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
.el-menu{
	background:#fff;
}
.el-menu-item{
	height:30px;
	line-height:30px;
	background:#fff;
	border:1px solid #f4355e;
	color:#f4355e;
}
.el-menu-item:hover,.el-menu-item.is-active{
	border-bottom:1px solid #f4355e;
	background:#f4355e;
	color:#fff;
}
.el-menu-item:nth-child(2){
	border-left:0px;
	border-right:0px;
}
</style>