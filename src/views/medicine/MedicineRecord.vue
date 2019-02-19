<template>
	<el-container>

		<el-col :span="24" style="padding:0 20px;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters" size="small">

						<el-form-item label="取药日期" prop="region">
							<el-date-picker
      v-model="filters.date1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
						</el-form-item>

						<el-form-item label="关键字" prop="region">
							<el-input v-model="filters.name" size="small" placeholder="请输入顾客姓名/手机号码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button size="small" v-on:click="getUsers">重置</el-button>
						</el-form-item>

					</el-form>
				</el-col>
				<el-col :span="24" class="toolbar" style="padding: 0px;">
					<el-form :inline="true" :model="filters" label-width="100px">
						<el-form-item>
							<router-link to="/statement"><el-button type="primary" size="small" v-on:click="getUsers">今天</el-button></router-link>
						</el-form-item>
						<el-form-item>
							<router-link to="/statement"><el-button type="primary" size="small" v-on:click="getUsers">昨天</el-button></router-link>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">本月</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">上月</el-button>
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
								<h3>取药列表</h3>
								<el-table :data="props.row.items" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
									<el-table-column prop="shopid" label="药品条码">
									</el-table-column>
									<el-table-column prop="shopname" label="药品名称">
									</el-table-column>
									<el-table-column prop="company" label="单价">
									</el-table-column>
									<el-table-column prop="num" label="应发数量">
									</el-table-column>
									<el-table-column prop="num" label="实际发放数量">
									</el-table-column>
								</el-table>

							</el-form>
						</template>
					</el-table-column>
					<el-table-column
							label="订单编码"
							prop="id">
					</el-table-column>
					<el-table-column
							label="会员号"
							prop="id">
					</el-table-column>
					<el-table-column
							label="顾客姓名"
							prop="name">
					</el-table-column>
					<el-table-column
							label="联系方式"
							prop="id">
					</el-table-column>
					<el-table-column
							label="私密管家"
							prop="name">
					</el-table-column>
					<el-table-column
							label="发放日期"
							prop="date">
					</el-table-column>
					<el-table-column
							label="发药人"
							prop="name">
					</el-table-column>
					<el-table-column label="操作" width="200">

						<template slot-scope="scope" >
							<el-button type="text" size="small" @click="medicineGrant(scope.$index, scope.row)">申请退货</el-button>
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
		<el-dialog title="选择退货药品" class="middleDialog" v-model="medicineFormVisible" :close-on-click-modal="false" :visible.sync="medicineFormVisible">
			<el-form  label-width="90px"   size="mini">
			<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
				<el-table-column prop="name" label="药品条码">
				</el-table-column>
				<el-table-column prop="name" label="药品名称">
				</el-table-column>
				<el-table-column prop="name" label="单位">
				</el-table-column>
				<el-table-column prop="name" label="已发数量">
				</el-table-column>
				<el-table-column prop="name" label="退货数量">
				</el-table-column>
			</el-table>
				<el-form-item label="退货原因" class="mt20">
					<el-input type="textarea" size="small"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">申请退货</el-button>
				<el-button @click.native="medicineFormVisible = false" size="small">取消</el-button>
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
					name: '',
					date1:''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				medicineFormVisible: false,//编辑界面是否显示
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
					state: '待审批',
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
					state: '待审批',
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
					state: '已驳回',
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
					state: '审批通过',
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
			medicineGrant:function (index, row) {
				this.medicineFormVisible = true;
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