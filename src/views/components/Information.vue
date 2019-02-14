<template>
    <div class="basicInformation">
        <div class="basic">
            <h3>庞小君（女士）<span>2018-01-01 10:00</span></h3>
            <p>客户意向：3级</p>
        </div>
        <div v-for="list in list">
            <h5>{{list.name}}</h5>
            <ul>
                <li v-for="item in list.item">
                    <span>{{ item.name}}:</span>{{ item.content}}
                </li>
            </ul>
        </div>


    </div>
</template>

<script>
    export default {
        name: "Information",
        data() {
            return {
                list:[
                    { name: '基本信息', item: [
                            { name: '编码',content:'01234567' },
                            { name: '生日',content:'1990-01-01' },
                            { name: '年龄',content:'25' },
                            { name: '邮箱',content:'01234567@163.com' },
                            { name: '微信',content:'01234567' },
                            { name: '籍贯',content:'北京市朝阳区' },
                            { name: '电话',content:'01234567' },
                            { name: '婚姻状态',content:'未婚' }
                        ] },
                    { name: '在院信息', item: [
                            { name: '渠道名称',content:'01234567' },
                            { name: '私密管家',content:'1990-01-01' },
                            { name: '专家医生',content:'25' },
                            { name: '市场经理',content:'01234567@163.com' },
                            { name: '客服人员',content:'01234567' },
                            { name: '推荐人',content:'北京市朝阳区' },
                            { name: '客户意向',content:'01234567' },
                            { name: '需求项目',content:'未婚' },
                            { name: '渠道来源',content:'01234567' },
                            { name: '备注',content:'未婚' }
                        ] },
                ]

            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~scss_vars';
.basicInformation{
    .basic{
        border-bottom:1px solid #ccc;
        h3{
            color:$color-primary;
            line-height:24px;
            margin:0;
            span{
                float:right;
                font-size:0.8em;
                color:#ccc;
                font-weight: normal;
            }
        }
    }
    h5{
        font-size:1em;
        margin: 0;
        line-height: 3em;
    }
    ul{
        margin:0;padding:0;
        li{
            line-height:24px;
            list-style: none;
            span{
                color:#777;margin-right:10px;
            }
        }
    }


}
</style>