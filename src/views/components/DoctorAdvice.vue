<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button size="small" type="primary" v-on:click="handleAdd">新建医嘱记录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column prop="" label="医嘱者">
            </el-table-column>
            <el-table-column prop="" label="医嘱分类">
            </el-table-column>
            <el-table-column prop="" label="医嘱类别" >
            </el-table-column>
            <el-table-column prop="" label="就诊号">
            </el-table-column>
            <el-table-column prop="" label="医嘱时间">
            </el-table-column>
            <el-table-column prop="" label="诊疗项目" >
            </el-table-column>
            <el-table-column prop="" label="药品名称">
            </el-table-column>
            <el-table-column prop="" label="剂量">
            </el-table-column>
            <el-table-column prop="" label="数量" >
            </el-table-column>
            <el-table-column prop="" label="用药途径">
            </el-table-column>
            <el-table-column prop="" label="频次">
            </el-table-column>
            <el-table-column prop="" label="备注" >
            </el-table-column>
        </el-table>
        <el-dialog title="新建医嘱记录"  v-model="approvalFormVisible" :close-on-click-modal="false" class="bigDialog">
            <el-form :model="approvalForm" :inline="true"  ref="" size="mini">
                            <el-form-item label="就诊号" >
                                    <el-input  size="small" placeholder=""></el-input>
                            </el-form-item>
                            <el-form-item label="医嘱分类" >
                                    <el-select  placeholder="" size="small">
                                        <el-option label="长期医嘱" value="shanghai"></el-option>
                                        <el-option label="短期医嘱" value="beijing"></el-option>
                                        <el-option label="临时医嘱" value="sss"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="医嘱类别" >
                                        <el-select  placeholder="" size="small">
                                            <el-option label="中医治疗" value="shanghai"></el-option>
                                            <el-option label="西医治疗" value="beijing"></el-option>
                                            <el-option label="物理治疗" value="sss"></el-option>
                                            <el-option label="饮食注意" value="shanghai"></el-option>
                                            <el-option label="输液" value="beijing"></el-option>
                                            <el-option label="用药" value="sss"></el-option>
                                        </el-select>
                                    </el-form-item>
                <el-table  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                    <el-table-column prop="" label="医嘱者">
                    </el-table-column>
                    <el-table-column prop="" label="就诊号">
                    </el-table-column>
                    <el-table-column prop="" label="医嘱时间" width="100">
                    </el-table-column>
                    <el-table-column prop="" label="诊疗项目"  width="100">
                    </el-table-column>
                    <el-table-column prop="" label="药品名称" width="100">
                    </el-table-column>
                    <el-table-column prop="" label="剂量">
                    </el-table-column>
                    <el-table-column prop="" label="数量" >
                    </el-table-column>
                    <el-table-column prop="" label="用药途径" width="100">
                    </el-table-column>
                    <el-table-column prop="" label="频次">
                    </el-table-column>
                    <el-table-column prop="" label="备注" >
                    </el-table-column>
                </el-table>
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
        name: "DoctorAdvice",
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