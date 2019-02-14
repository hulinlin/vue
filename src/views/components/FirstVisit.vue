<template>
    <div>
        <el-form :inline="true"  size="small">
            <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12"  class="borderStyle">
            <h5>主诉</h5>
            <el-input type="textarea" rows="10"></el-input>
        </el-col>
        <el-col :span="12" class="borderStyle">
            <h5>既往史</h5>
            <el-form-item>
            <el-checkbox-group>
                <el-checkbox label="盆腔炎" name="type"></el-checkbox>
                <el-checkbox label="阴道炎" name="type"></el-checkbox>
                <el-checkbox label="糖尿病" name="type"></el-checkbox>
                <el-checkbox label="坐骨神经" name="type"></el-checkbox>
                <el-checkbox label="慢性咳嗽" name="type"></el-checkbox>
                <el-checkbox label="肝炎" name="type"></el-checkbox>
                <el-checkbox label="肥胖" name="type"></el-checkbox>
                <el-checkbox label="尿失禁" name="type"></el-checkbox>
                <el-checkbox label="痔疮" name="type"></el-checkbox>
                <el-checkbox label="粪失禁" name="type"></el-checkbox>
                <el-checkbox label="外伤" name="type"></el-checkbox>
                <el-checkbox label="手术" name="type"></el-checkbox>
            </el-checkbox-group>
            </el-form-item>
            <el-form-item label="其他" width="100%">
                <el-input type="textarea"></el-input>
            </el-form-item>
        </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="12"  class="borderStyle">
                <h5>月经史</h5>
                    <el-form-item label="初潮年龄:">
                        <el-input  placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="月经周期:">
                        <el-input placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="经期持续时间:">
                        <el-input  placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="末次月经:">
                        <el-input placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="绝经年龄:">
                        <el-input  placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="血块:">
                    <el-radio-group>
                        <el-radio label="有"></el-radio>
                        <el-radio label="无"></el-radio>
                    </el-radio-group>
                    </el-form-item>
                        <el-form-item label="经量:">
                    <el-radio-group>
                        <el-radio label="少"></el-radio>
                        <el-radio label="中"></el-radio>
                        <el-radio label="多"></el-radio>
                    </el-radio-group>
                        </el-form-item>
                            <el-form-item label="痛经:">
                    <el-radio-group>
                        <el-radio label="有"></el-radio>
                        <el-radio label="无"></el-radio>
                    </el-radio-group>
                            </el-form-item>
            </el-col>
            <el-col :span="12"  class="borderStyle">
                <h5>临床检查</h5>
                <el-form-item label="腹直肌:">
                    <el-radio-group>
                        <el-radio label="正常"></el-radio>
                        <el-radio label="分离"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="会阴中心健:">
                    <el-radio-group>
                        <el-radio label="萎缩"></el-radio>
                        <el-radio label="张力极好"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="反射:">
                    <el-radio-group>
                        <el-radio label="肛门"></el-radio>
                        <el-radio label="阴蒂"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="阴道口:">
                    <el-radio-group>
                        <el-radio label="关闭"></el-radio>
                        <el-radio label="闭合不全"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="会阴敏感度:">
                    <el-radio-group>
                        <el-radio label="s2"></el-radio>
                        <el-radio label="s3"></el-radio>
                        <el-radio label="s4"></el-radio>

                    </el-radio-group>
                </el-form-item>
                <el-form-item label="脱垂：（多远）:">
                    <el-checkbox-group>
                        <el-checkbox label="子宫脱垂" name="type"></el-checkbox>
                        <el-checkbox label="膀胱脱垂" name="type"></el-checkbox>
                        <el-checkbox label="直肠脱垂" name="type"></el-checkbox>
                        <el-checkbox label="阴道前、后壁膨出" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="24" class="borderStyle">
                <h5>婚孕史</h5>
                <el-form-item label="结婚年龄:">
                    <el-input  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="孕产史">
                    <el-form-item label="孕">
                        <el-input  placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="产">
                        <el-input  placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="流产">
                        <el-input  placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="引流">
                    <el-input  placeholder="请输入"></el-input>
                    </el-form-item>

                </el-form-item>
                <el-form-item label="分娩方式:">
                    <el-checkbox-group>
                        <el-checkbox label="头位、正常分娩" name="type"></el-checkbox>
                        <el-checkbox label="会阴侧切裂伤" name="type"></el-checkbox>
                        <el-checkbox label="剖产" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="无痛分娩:">
                    <el-radio-group>
                        <el-radio label="有"></el-radio>
                        <el-radio label="无"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="产前尿失禁:">
                    <el-radio-group>
                        <el-radio label="有"></el-radio>
                        <el-radio label="无"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="产后尿失禁:">
                    <el-radio-group>
                        <el-radio label="有"></el-radio>
                        <el-radio label="无"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="胎儿体重:">
                    <el-input  placeholder="请输入"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="12"  class="borderStyle">
                    <h5>家族、遗传史</h5>
                    <el-input type="textarea" rows="10"></el-input>
                </el-col>
                <el-col :span="12" class="borderStyle">
                    <h5>过敏史</h5>
                    <el-input type="textarea" rows="10"></el-input>
                </el-col>
            </el-row>
            <el-row class="borderStyle">
                <el-col :span="24">
                    <h5>妇科检查</h5>
                    <el-col :span="11">
                        <h6>外阴</h6>
                        <el-input type="textarea" rows="10"></el-input>
                    </el-col>
                    <el-col :span="12" style="float:right;">
                        <h6>阴道</h6>
                        <el-input type="textarea" rows="10"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="24">
                <el-col :span="11">
                    <h6>宫颈</h6>
                    <el-input type="textarea" rows="10"></el-input>
                </el-col>
                <el-col :span="12" style="float:right;">
                    <h6>子宫</h6>
                    <el-input type="textarea" rows="10"></el-input>
                </el-col>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="11"  class="borderStyle">
                    <h5>初步诊断</h5>
                    <el-input type="textarea" rows="10"></el-input>
                </el-col>
                <el-col :span="12" class="borderStyle">
                    <h5>治疗建议</h5>
                    <el-input type="textarea" rows="10"></el-input>
                </el-col>
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "FirstVisit"
    }
</script>

<style scoped lang="scss">

</style>