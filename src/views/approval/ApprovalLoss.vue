<template>
	<el-container>

		<el-col :span="24" style="padding:0 20px;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						<el-form-item label="取药日期" prop="region">
							<el-col :span="11">
								<el-form-item prop="date1">
									<el-date-picker type="date" placeholder="选择开始日期" size="small" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col class="line" :span="1">-</el-col>
							<el-col :span="11">
								<el-form-item prop="date2">
									<el-time-picker type="date" placeholder="选择结束日期" size="small" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
								</el-form-item>
							</el-col>
						</el-form-item>
						<el-form-item label="单据类型" prop="region">
							<el-select v-model="ruleForm.region" placeholder="">
								<el-option label="报废单" value="shanghai"></el-option>
								<el-option label="丢失" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="关键字">
							<el-input v-model="filters.name" size="small" placeholder="请输入订单编码"></el-input>
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
								<el-form-item label="备注：">
									<span>备注内容{{ props.row.items.desc }}</span>
								</el-form-item>
								<el-table :data="props.row.items" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
									<el-table-column prop="shopname" label="商品名称">
									</el-table-column>
									<el-table-column prop="shopid" label="商品条码">
									</el-table-column>
									<el-table-column prop="company" label="单价">
									</el-table-column>
									<el-table-column prop="num" label="数量">
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
							label="单据类型"
							prop="type">
					</el-table-column>
					<el-table-column
							label="备注"
							prop="desc">
					</el-table-column>

					<el-table-column
							label="申请日期"
							prop="date">
					</el-table-column>
					<el-table-column
							label="单据状态"
							prop="state">
					</el-table-column>
					<el-table-column label="操作" width="200">

						<template slot-scope="scope" >
							<div v-if="scope.row.state==='审批中'">
								<el-button type="text" size="small" @click="approval(scope.$index, scope.row)">审批</el-button>
							</div>
							<div v-else>
								<el-button type="text" size="small" >--</el-button>
							</div>
						</template>

					</el-table-column>
				</el-table>

				<!--工具条-->
				<el-col :span="24" class="toolbar">

					<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage4"
							:page-sizes="[20, 50, 100]"
							:page-size="20"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
							style="text-align: center">
					</el-pagination>
				</el-col>
			</section>
		</el-col>
		<el-dialog title="审批"  v-model="approvalFormVisible" :close-on-click-modal="false">
			<el-form :model="approvalForm" label-width="90px"  ref="proTypeForm" size="mini">
				<el-form-item label="操作行为">
					<el-radio-group v-model="approvalForm.type">
						<el-radio label="通过"></el-radio>
						<el-radio label="驳回"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="操作意见">
					<el-input type="textarea" v-model="approvalForm.desc" size="small"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="approvalSubmit" :loading="editLoading">确定</el-button>
				<el-button @click.native="approvalFormVisible = false">取消</el-button>
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
				approvalFormVisible:false,
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
				},
				approvalForm:{
					type:'',
					desc:''
				},
				tableData5: [{
					id: '12987122',
					desc: '',
					type: '报废单',
					date: '2019-01-01',
					state: '审批中',
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
					type: '报废单',
					date: '2019-01-01',
					state: '审批中',
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
					type: '丢失单',
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
					type: '报废单',
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
			//显示新增界面
			handleAdd: function () {
				this.$router.push('/memberAdd');

			},
			approval:function (index, row) {
				this.approvalFormVisible = true;
				this.approvalForm = Object.assign({}, row);
			},
			approvalSubmit:function(){

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