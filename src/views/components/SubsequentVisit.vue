<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button size="small" type="primary" v-on:click="handleAdd">添加复诊记录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
            <el-table  highlight-current-row v-loading="listLoading"  style="width: 100%;">

                <el-table-column prop="" label="复诊时间" width="150">
                </el-table-column>
                <el-table-column prop="" label="医生姓名" width="150">
                </el-table-column>
                <el-table-column prop="" label="复诊内容" >
                </el-table-column>
            </el-table>
            <el-dialog title="复诊记录"  v-model="approvalFormVisible" :close-on-click-modal="false" :visible.sync="approvalFormVisible">
                <el-form :model="approvalForm"   ref="proTypeForm" size="mini">
                   
                    <el-form-item label="">
                        <el-input type="textarea" v-model="approvalForm.desc" size="small"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click.native="approvalSubmit" :loading="editLoading">确定</el-button>
                    <el-button @click.native="approvalFormVisible = false">取消</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "SubsequentVisit" ,
        data() {
            return {
                approvalFormVisible:false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                approvalForm:{
					type:'',
					desc:''
				},
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            //显示新增界面
			handleAdd: function (index, row) {
				this.approvalFormVisible = true;
				this.approvalForm = Object.assign({}, row);
			},
        }
    }
</script>

<style scoped>

</style>