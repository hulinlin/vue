<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button size="small" type="primary" v-on:click="getUsers">新建医嘱记录</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "DoctorAdvice"
    }
</script>

<style scoped>

</style>