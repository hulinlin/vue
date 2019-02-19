<template>
	<el-container>

		<el-col :span="24" style="padding:0 20px;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters" size="small">
						<el-form-item>
							<el-input v-model="filters.name" size="small" placeholder="请输入单据编码/顾客姓名"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button size="small" v-on:click="getUsers">重置</el-button>
						</el-form-item>
						<el-form-item class="fr">
							<router-link to="/memberAdd"><el-button type="primary" size="small">新增</el-button></router-link>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24" class="toolbar" style="padding: 0px;">
					<el-form :inline="true" :model="filters" label-width="100px">
						<el-form-item>
							<router-link to="/createMatericalUse"><el-button type="primary" size="small" v-on:click="getUsers">领用</el-button></router-link>
						</el-form-item>
						<el-form-item>
							<router-link to="/createMatericalReturn"><el-button type="primary" size="small" v-on:click="getUsers">归还</el-button></router-link>
						</el-form-item>
					</el-form>
				</el-col>
				<!--列表-->
				<el-table
						:data="tableData5"
						style="width: 100%"
						border
						row-key="id"
						:expand-row-keys="expands"
						@row-click="rowClick">
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left" inline class="demo-table-expand" style="width:80%;margin:0 auto;">

								<el-table :data="props.row.items" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
									<el-table-column prop="shopname" label="材料/药品名称">
									</el-table-column>
									<el-table-column prop="shopid" label="材料/药品条码">
									</el-table-column>
									<el-table-column prop="company" label="单价">
									</el-table-column>
									<el-table-column prop="num" label="应发数量">
									</el-table-column>
									<el-table-column prop="num" label="实际发放数量">
									</el-table-column>
									<el-table-column prop="company" label="是否归还">
									</el-table-column>
									<el-table-column prop="num" label="已归还数量">
									</el-table-column>
									<el-table-column prop="num" label="待归还数量">
									</el-table-column>
								</el-table>
								<el-form-item label="领用备注：" style="width:100%;">
									<span>备注内容{{ props.row.items.desc }}</span>
								</el-form-item>
								<el-form-item label="归还备注：">
									<span>备注内容{{ props.row.items.desc }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column
							label="单据编码"
							prop="id">
					</el-table-column>
					<el-table-column
							label="顾客姓名"
							prop="name">
					</el-table-column>
					<el-table-column
							label="备注"
							prop="desc">
					</el-table-column>
					<el-table-column
							label="状态"
							prop="state">
					</el-table-column>
					<el-table-column
							label="操作人"
							prop="name">
					</el-table-column>
					<el-table-column
							label="操作日期"
							prop="date">
					</el-table-column>
					<el-table-column label="操作" width="200">

						<template slot-scope="scope" >
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

				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				tableData5: [{
					id: '12987122',
					desc: '',
					name: '张三',
					date: '2019-01-01',
					state: '待归还',
					items: [{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					},{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					}],
				}, {
					id: '12987123',
					desc: '',
					name: '里斯',
					date: '2019-01-01',
					state: '待归还',
					items: [{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					},{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					}],
				}, {
					id: '12987124',
					desc: '',
					name: '王五',
					date: '2019-01-01',
					state: '已归还',
					items: [{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					},{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					}],
				}, {
					id: '12987125',
					desc: '',
					name: '张三',
					date: '2019-01-12',
					state: '待归还',
					items: [{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					},{
						shopname: '医疗器械',
						shopid: '1234567',
						desc: '',
						company: '协和',
						spec: '',
						num:1
					}],
				}],


				// 要展开的行，数值的元素是row的key值
				expands: []

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