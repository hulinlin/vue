<template>
	<el-container>

		<el-col :span="20" style="padding:20px;">
			<section>
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-row>
						<el-col :span="8">
							<el-form-item label="诊室名称" prop="name">
								<el-input v-model="addForm.name" auto-complete="off"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="诊室类型" prop="type">
								<el-select v-model="addForm.type" placeholder="请选择">
									<el-option label="手术室" value="shanghai"></el-option>
									<el-option label="治疗室" value="beijing"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="状态">
								<el-radio-group v-model="addForm.sex">
									<el-radio class="radio" :label="1">启用</el-radio>
									<el-radio class="radio" :label="0">禁用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="关联人员">
						<el-input v-model="addForm.name" auto-complete="off"></el-input>
						<tree-transfer :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}"
							@addBtn='add' @removeBtn='remove' :mode='mode' width='550px' openAll ref="from-tree">
						</tree-transfer>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" v-model="addForm.addr"></el-input>
					</el-form-item>

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
	import treeTransfer from 'el-tree-transfer'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default {
		data() {
			return {
				mode: "transfer", // transfer addressList
				fromData: [
					{
						id: "1",
						pid: 0,
						lv: 0,
						label: "一级 1",
						children: [
							{
								id: "1-1",
								pid: "1",
								label: "二级 1-1",
								children: []
							},
							{
								id: "1-2",
								pid: "1",
								label: "二级 1-2",
								children: [
									{
										id: "1-2-1",
										pid: "1-2",
										children: [],
										label: "二级 1-2-1"
									},
									{
										id: "1-2-2",
										pid: "1-2",
										children: [],
										label: "二级 1-2-2"
									}
								]
							}
						]
					},
				],

				toData: [],
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
					addr: '',
					type: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '启用' : row.sex == 0 ? '禁用' : '未知';
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
			},
			// 监听穿梭框组件添加
			add(fromData, toData, obj) {
				// 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的        {keys,nodes,halfKeys,halfNodes}对象
				// 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
				console.log("fromData:", fromData);
				console.log("toData:", toData);
				console.log("obj:", obj);
			},
			// 监听穿梭框组件移除
			remove(fromData, toData, obj) {
				// 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
				// 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
				console.log("fromData:", fromData);
				console.log("toData:", toData);
				console.log("obj:", obj);
			}
		},
		components: {
			treeTransfer
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>