<template>
    <el-container>
        <el-col :span="6" style="padding:20px;">
            <el-row>
                <Information></Information>
            </el-row>
        </el-col>



        <el-col :span="18" style="border-left:20px solid #f0f0f0;">
            <el-row class="padding20" style="border-bottom:20px solid #f0f0f0;">
                <el-button type="primary" size="small" v-on:click="orderForm">开单</el-button>
                <el-button type="primary" size="small" v-on:click="getUsers">治疗单</el-button>
                <el-button type="primary" size="small" v-on:click="ordered">预约下次来访</el-button>
            </el-row>
            <el-col style="border-bottom:20px solid #f0f0f0;">
                <el-col >
                    <el-row type="flex" class="row-bg" justify="space-between" >

                        <el-col :span="12"  class=" bgwhitecolor padding20 pt0" >
                            <h5>沟通记录</h5>
                            <el-input type="textarea" rows="7"></el-input>
                        </el-col>
                        <el-col :span="12" class="bgwhitecolor padding20 pt0" style="border-left:20px solid #f0f0f0;">
                            <h5>回访记录</h5>
                            <el-input type="textarea" rows="7"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
            </el-col>
            <el-row class="padding20">
                <section>

                    <!--工具条-->
                    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                        <el-form :inline="true" :model="filters" size="small">
                           
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                                <el-menu-item index="0" @click="tabChange(treatmentRecord)">治疗记录</el-menu-item>
                                <el-menu-item index="1" @click="tabChange(firstVisit)">首诊</el-menu-item>
                                <el-menu-item index="2" @click="tabChange(subsequentVisit)">复诊</el-menu-item>
                                <el-menu-item index="3"  @click="tabChange(doctorAdvice)">医嘱记录</el-menu-item>
                            </el-menu>
                            <el-form-item label="项目名称" prop="region"  style="margin-left:50px;">
                                <el-input v-model="filters.name" size="small" placeholder="请输入项目名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
                            </el-form-item>
                                <el-form-item style="float:right;">
                                    <el-button type="primary" size="small" v-on:click="getUsers">打印</el-button>
                                </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="24">
                    <div :is="currentView"></div>
                    </el-col>

                </section>
            </el-row>
        </el-col>
        <!--预约下次来院-->
        <el-dialog title="预约来院" v-model="orderedFormVisible" :close-on-click-modal="false" :visible.sync="orderedFormVisible">
            <el-form :model="orderedForm" label-width="80px" :rules="editFormRules" ref="orderedForm" size="small">
                <el-form-item prop="date1" label="预约时间">
                    <el-date-picker type="date" placeholder="选择开始日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
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
                <el-button @click.native="orderedFormVisible = false" size="small">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading" size="small">提交</el-button>
            </div>
        </el-dialog>
        <!--查看沟通记录-->
        <el-dialog title="沟通记录" v-model="recordFormVisible" :close-on-click-modal="false" :visible.sync="recordFormVisible">
            <ul>
                <li>预约：确定后，数据进入预约管理页面；分诊：确定后，数据进入
                    分诊管理和业务管理页面分诊：选择分诊后，预约时间置灰不可选
                    择；</li>
            </ul>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="recordFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>
        <!--查看沟通记录-->
        <el-dialog title="开单" v-model="orderFormVisible" :close-on-click-modal="false" class="middleDialog" :visible.sync="orderFormVisible">
            <el-form :model="orderForm" label-width="80px"  ref="orderedForm">
                <el-checkbox-group>
                    <el-checkbox label="材料开单"></el-checkbox>
                    <el-checkbox label="处方药品"></el-checkbox>
                    <el-checkbox label="手术"></el-checkbox>
                    <el-checkbox label="治疗"></el-checkbox>
                    <el-checkbox label="套餐"></el-checkbox>
                </el-checkbox-group>
                <el-row :span="24" class="mt20">
                    <el-col :span="18">
                        <el-input  auto-complete="off" size="small"></el-input>
                    </el-col>
                    <el-col :span="4" class="fr">
                        <el-button type="primary" size="small">查询</el-button>
                    </el-col>
                </el-row>
                <el-row :span="24" class="mt20">
                    <el-col :span="9">
                        <el-form-item label="次数:" prop="name">
                            <el-input  auto-complete="off"  size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="总价:" prop="name">
                            <el-input  auto-complete="off"  size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="单价:" prop="name">
                            <span>200</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :span="24">
                    <el-col :span="9">
                        <el-form-item label="折扣:" prop="name">
                            <el-input  auto-complete="off"  size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="赠送项目:" prop="name">
                            <el-input  auto-complete="off"  size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" class="fr">
                        <el-button type="primary" size="small">加入列表</el-button>
                    </el-col>
                </el-row>
                <el-table  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

                    <el-table-column prop="name" label="项目名称" width="100">
                    </el-table-column>
                    <el-table-column prop="name" label="单价">
                    </el-table-column>
                    <el-table-column prop="name" label="数量" >
                    </el-table-column>
                    <el-table-column prop="name" label="折扣">
                    </el-table-column>
                    <el-table-column prop="name" label="总价" >
                    </el-table-column>
                    <el-table-column prop="name" label="赠送项目" width="100">
                    </el-table-column>
                    <el-table-column prop="name" label="操作" width="130">
                        <template slot-scope="scope">
                            <el-button type="text"  size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="text"  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">确认开单</el-button>
                <el-button @click.native="orderFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
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
    import TreatmentRecord from '../components/TreatmentRecord';
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                activeIndex: '0',
                treatmentRecord:'TreatmentRecord',
                firstVisit: 'FirstVisit',
                subsequentVisit: 'SubsequentVisit',
                doctorAdvice: 'DoctorAdvice',
                currentView: 'TreatmentRecord', // 默认选中第一项
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                orderedFormVisible: false,
                recordFormVisible: false,
                orderFormVisible: false,
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
            //显示预约界面
            ordered: function (index, row) {
                this.orderedFormVisible = true;
                this.orderedForm = Object.assign({}, row);
            },
            //显示沟通记录界面
            record: function (index, row) {
                this.recordFormVisible = true;
                this.recordForm = Object.assign({}, row);
            },
            //创建沟通记录界面
            orderForm: function (index, row) {
                this.orderFormVisible = true;
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
            TreatmentRecord,
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
        float:left;
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