<template>
	<el-container>

		<el-col :span="24" style="padding:0 20px;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters">
						<el-form-item>
							<el-input v-model="filters.name" size="small" placeholder="请输入入库单编码"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button size="small" v-on:click="getUsers">重置</el-button>
						</el-form-item>
						<el-form-item class="fr">
							<el-button type="primary" size="small" v-on:click="createType">新增</el-button>
						</el-form-item>
					</el-form>
				</el-col>

				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
					<el-table-column prop="name" label="采购入库单编码" width="150">
					</el-table-column>
					<el-table-column prop="birth" label="来源采购订单" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="备注" min-width="200">
					</el-table-column>
					<el-table-column prop="name" label="操作人" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="操作日期" width="120">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="purchase(scope.$index, scope.row)">查看</el-button>
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
		<el-dialog title="查看" class="middleDialog" v-model="orderDetailFormVisible" :close-on-click-modal="false" :visible.sync="orderDetailFormVisible">
			<p>采购订单：<span>内部采购/采购订单</span></p>
			<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange">
				<el-table-column prop="name" label="商品名称">
				</el-table-column>
				<el-table-column prop="name" label="商品条码">
				</el-table-column>
				<el-table-column prop="name" label="单位">
				</el-table-column>
				<el-table-column prop="name" label="规格">
				</el-table-column>
				<el-table-column prop="name" label="采购数量">
				</el-table-column>
			</el-table>
			<p>备注：<span>内部采购</span></p>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="orderDetailFormVisible = false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="选择采购申请单"  v-model="proTypeFormVisible" :close-on-click-modal="false" :visible.sync="proTypeFormVisible">
			<el-form :model="proTypeForm" label-width="90px"  ref="proTypeForm" size="small">
				<el-form-item label="采购类型">
					<el-radio-group v-model="proTypeForm.type">
						<el-radio label="外部采购"></el-radio>
						<el-radio label="内部采购"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="采购订单">
					<el-input v-model="proTypeForm.orderid" size="small" placeholder="请输入采购订单编码"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="proTypeSubmit" :loading="editLoading" size="small">下一步</el-button>
				<el-button @click.native="proTypeFormVisible = false" size="small">取消</el-button>
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
					type:'',
					orderid:''
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
				this.$router.push({name:'新建采购入库申请',params:{type:this.proTypeForm.type,orderid:this.proTypeForm.orderid}});
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