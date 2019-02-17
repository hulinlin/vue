<template>
	<el-container>

		<el-col :span="24" style="padding:0 20px;">
			<section>
				<!--工具条-->
				<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
					<el-form :inline="true" :model="filters" size="small">
						<el-col :span="24">
							<el-col :span="6">
								<el-form-item label="渠道来源" prop="laiyuan">
									<el-select v-model="ruleForm.laiyuan" placeholder="请选择" size="small">
										<el-option label="一" value="shanghai"></el-option>
										<el-option label="二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="顾客需求" prop="xuqiu">
									<el-select v-model="ruleForm.xuqiu" placeholder="请选择" size="small">
										<el-option label="一" value="shanghai"></el-option>
										<el-option label="二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="预约项目" prop="xiangmu">
									<el-select v-model="ruleForm.xiangmu" placeholder="请选择" size="small">
										<el-option label="一" value="shanghai"></el-option>
										<el-option label="二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="关键字" prop="region">
									<el-input v-model="filters.name" size="small" placeholder="请输入顾客姓名/手机号码"></el-input>
								</el-form-item>
							</el-col>

						</el-col>
						<el-col :span="24">
							<el-form-item label="回访日期" prop="region">
								<el-date-picker
								v-model="ruleForm.date1"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期">
							  </el-date-picker>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
							</el-form-item>
							<el-form-item>
								<el-button size="small" v-on:click="getUsers">重置</el-button>
							</el-form-item>

						</el-col>


					</el-form>
				</el-col>
				<el-col :span="24" class="toolbar" style="padding: 0px;">
					<el-form :inline="true" :model="filters" label-width="100px">
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="ordered">确认到店</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="getUsers">取消预约</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" v-on:click="record">调整预约时间</el-button>
						</el-form-item>
						<el-form-item>
							<router-link to="/memberAdd"><el-button type="primary" size="small">新建预约</el-button></router-link>
						</el-form-item>

					</el-form>
				</el-col>
				<!--列表-->
				<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
					<el-table-column prop="name" label="姓名" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="年龄" width="">
					</el-table-column>
					<el-table-column prop="birth" label="地区" width="120">
					</el-table-column>
					<el-table-column prop="addr" label="联系电话" min-width="120">
					</el-table-column>
					<el-table-column prop="name" label="微信" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="渠道来源" width="">
					</el-table-column>
					<el-table-column prop="birth" label="顾客需求" width="120">
					</el-table-column>
					<el-table-column prop="addr" label="预约项目" min-width="120">
					</el-table-column>
					<el-table-column prop="name" label="预约医生" width="120">
					</el-table-column>
					<el-table-column prop="birth" label="预约时间" width="">
					</el-table-column>
					<el-table-column prop="birth" label="预约来院状态" width="">
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
		<!--确认到店-->
		<el-dialog title="确认到店" v-model="orderedFormVisible" :close-on-click-modal="false">
			<el-form :model="orderedForm" label-width="90px" :rules="editFormRules" ref="orderedForm" size="small">
				<el-form-item label="短信验证码" class="code">
					<el-input v-model="Register.sendcode" placeholder="请输入验证码"></el-input>
					<el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==false">发送验证码
					</el-button>
					<el-button type="button" @click="sendcode" :disabled="disabled" v-if="disabled==true">{{btntxt}}
					</el-button>
				</el-form-item>
				<el-form-item label="来诊方式" prop="region">
					<el-select v-model="ruleForm.region" placeholder="请选择">
						<el-option label="出诊" value="shanghai"></el-option>
						<el-option label="复诊" value="beijing"></el-option>
						<el-option label="复查" value="shanghai"></el-option>
						<el-option label="再消费" value="beijing"></el-option>
						<el-option label="其他" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="私密管家" prop="name">
					<el-input v-model="orderedForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="专家医生" prop="name">
					<el-input v-model="orderedForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="客服人员" prop="name">
					<el-input v-model="orderedForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">

				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
				<el-button @click.native="orderedFormVisible = false" size="small">取消</el-button>
			</div>
		</el-dialog>
		<!--调整预约时间-->
		<el-dialog title="调整预约时间" v-model="recordFormVisible" :close-on-click-modal="false" showClose=false>
			<el-form :model="orderedForm" label-width="80px" :rules="editFormRules" ref="orderedForm" size="small">
				<el-form-item prop="date1" label="预约时间">
					<el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">确定</el-button>
				<el-button @click.native="recordFormVisible = false" size="small">取消</el-button>
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
				Register: {
					phone: '',
					sendcode: '',
				},
				disabled: false,
				time: 0,
				btntxt: "重新发送",
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				orderedFormVisible: false,
				recordFormVisible: false,//编辑界面是否显示
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				recordForm:{
					name: '',
				},
				orderedForm:{
					desc:''
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
						{ required: true, message: '请选择', trigger: 'change' }
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
			//手机验证发送验证码
			sendcode() {
				/*const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
				if (this.Register.phone == '') {
					this.$message({
						message:'手机号不能为空',
						center: true
					})
					return
				}
				if (!reg.test(this.Register.phone)) {
					this.$message({
						message:'请输入正确的手机号',
						center:true
					})
					return
				} else {*/
					console.log(this.Register.phone);
					this.$message({
						message: '发送成功',
						type: 'success',
						center:true
					});
					this.time = 60;
					this.disabled = true;
					this.timer();
				//}
			},
			//60S倒计时
			timer() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + "s后获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled = false;
				}
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
			//显示预约界面
			ordered: function (index, row) {
				this.orderedFormVisible = true;
				this.orderedForm = Object.assign({}, row);
			},
			//显示记录界面
			record: function (index, row) {
				this.recordFormVisible = true;
				this.recordForm = Object.assign({}, row);
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

<style scoped lang="scss">
	.code {
	.el-input {
		width: 55%;
		border-radius: 0px;
		float: left;
		display: inline-block;
	}
	.el-button {
		width: 45%;
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
		border-left: 0px;
		float: left;
		display: inline-block;
	}
	}
</style>