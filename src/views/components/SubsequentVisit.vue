<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-button size="small" type="primary" v-on:click="getUsers">添加复诊记录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
            <el-table  highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">

                <el-table-column prop="" label="复诊时间" width="150">
                </el-table-column>
                <el-table-column prop="" label="医生姓名" width="150">
                </el-table-column>
                <el-table-column prop="" label="复诊内容" >
                </el-table-column>
            </el-table>

    </div>
</template>

<script>
    export default {
        name: "SubsequentVisit" ,
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>