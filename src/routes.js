import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Member from './views/system/Member.vue'
import MemberAdd from './views/system/MemberAdd.vue'
import Job from './views/system/Job.vue'
import Department from './views/system/Department.vue'
import Channel from './views/system/Channel.vue'
import Consulting from './views/system/Consulting.vue'
import Visit from './views/system/Visit.vue'
import Customer from './views/customer/Customer.vue'
import Returnvisit from './views/customer/Returnvisit.vue'
import Electronic from './views/customer/Electronic.vue'
import Order from './views/appointment/Order.vue'
import Triage from './views/appointment/Triage.vue'
import WaitingRoom from './views/waitingRoom/WaitingRoom.vue'
import TreatmentRoom from './views/treatmentRoom/TreatmentRoom.vue'
import Charge from './views/charge/Charge.vue'
import Refund from './views/charge/Refund.vue'
import Statement from './views/charge/Statement.vue'
import PurchasingRequisition from './views/medicine/PurchasingRequisition.vue'
import ProcurementWarehousing from './views/medicine/ProcurementWarehousing.vue'
import PurchaseReturn from './views/medicine/PurchaseReturn.vue'
import ProcurementOutbound from './views/medicine/ProcurementOutbound.vue'
import MaterialsRecipients from './views/medicine/MaterialsRecipients.vue'
import CustomersMedicine from './views/medicine/CustomersMedicine.vue'
import MedicineRecord from './views/medicine/MedicineRecord.vue'
import LossAbandonment from './views/medicine/LossAbandonment.vue'
import InventoryManagement from './views/medicine/InventoryManagement.vue'
import DifferenceAdjustment from './views/medicine/DifferenceAdjustment.vue'
import WarehouseReport from './views/medicine/WarehouseReport.vue'
import ApprovalOrder from './views/approval/ApprovalOrder.vue'
import ApprovalLoss from './views/approval/ApprovalLoss.vue'
import ApprovalRefund from './views/approval/ApprovalRefund.vue'
import ApprovalRefundGoods from './views/approval/ApprovalRefundGoods.vue'
import DataAnalysis from './views/approval/DataAnalysis.vue'
import ReportRevenue from './views/report/ReportRevenue.vue'
import ReportDrawer from './views/report/ReportDrawer.vue'
import ReportChannel from './views/report/ReportChannel.vue'
import ReportProjectSales from './views/report/ReportProjectSales.vue'
import ReportMerchandiseSales from './views/report/ReportMerchandiseSales.vue'
import ReportBalanceDetails from './views/report/ReportBalanceDetails.vue'
import ReportOperatedItems from './views/report/ReportOperatedItems.vue'
import ReportTransactionOrder from './views/report/ReportTransactionOrder.vue'
import ReportRegionalInformation from './views/report/ReportRegionalInformation.vue'
import ReportConsultationProject from './views/report/ReportConsultationProject.vue'
import ReportConsultationProjectM from './views/report/ReportConsultationProjectM.vue'
import ReportConsumptionDetails from './views/report/ReportConsumptionDetails.vue'
import ReportDevelopmentBusiness from './views/report/ReportDevelopmentBusiness.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/member', component: Member, name: '成员管理'},
            { path: '/memberAdd', component: MemberAdd, name: '添加成员', hidden: true },
            { path: '/job', component: Job, name: '职位管理' },
            { path: '/department', component: Department, name: '部门管理' },
            { path: '/basics', component: Table, name: '基础设置' },
            { path: '/channel', component: Channel, name: '渠道管理' },
            { path: '/consulting', component: Consulting, name: '诊室管理' },
            { path: '/visit', component: Visit, name: '回访设置' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '顾客管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/customer', component: Customer, name: '顾客管理' },
            { path: '/returnVisit', component: Returnvisit, name: '回访管理' },
            { path: '/electronic', component: Electronic, name: '电子病历' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '预约来院/分诊',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/order', component: Order, name: '预约管理' },
            { path: '/triage', component: Triage, name: '分诊管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '候诊室管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/waitingRoom', component: WaitingRoom, name: '候诊室管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '治疗室管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/treatmentRoom', component: TreatmentRoom, name: '治疗室管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '收费管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/charge', component: Charge, name: '收费管理' },
            { path: '/refund', component: Refund, name: '顾客退款' },
            { path: '/statement', component: Statement, name: '储值消费明细' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '药房管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/purchasingRequisition', component: PurchasingRequisition, name: '采购申请' },
            { path: '/procurementWarehousing', component: ProcurementWarehousing, name: '采购入库' },
            { path: '/purchaseReturn', component: PurchaseReturn, name: '采购退货' },
            { path: '/procurementOutbound', component: ProcurementOutbound, name: '采购出库' },
            { path: '/materialsRecipients', component: MaterialsRecipients, name: '材料领用' },
            { path: '/customersMedicine', component: CustomersMedicine, name: '顾客取药' },
            { path: '/medicineRecord', component: MedicineRecord, name: '取药记录' },
            { path: '/lossAbandonment', component: LossAbandonment, name: '丢失与报废' },
            { path: '/inventoryManagement', component: InventoryManagement , name: '盘点管理' },
            { path: '/differenceAdjustment', component: DifferenceAdjustment, name: '盘点差异调整' },
            { path: '/warehouseReport', component: WarehouseReport, name: '仓储报表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '财务管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/approvalOrder', component: ApprovalOrder, name: '采购订单审批' },
            { path: '/approvalLoss', component: ApprovalLoss, name: '丢失与报废审批' },
            { path: '/approvalRefund', component: ApprovalRefund, name: '顾客退款审批' },
            { path: '/approvalRefundGoods', component: ApprovalRefundGoods, name: '采购退货审批' },
            { path: '/dataAnalysis', component: DataAnalysis, name: '进销存数据分析' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '统计报表',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/reportRevenue', component: ReportRevenue, name: '院内营收统计查询' },
            { path: '/reportDrawer', component: ReportDrawer, name: '开单人综合报表' },
            { path: '/reportChannel', component: ReportChannel, name: '渠道数据报表' },
            { path: '/reportProjectSales', component: ReportProjectSales, name: '项目销售分析报表' },
            { path: '/reportMerchandiseSales', component: ReportMerchandiseSales, name: '商品销售情况报表' },
            { path: '/reportBalanceDetails', component: ReportBalanceDetails, name: '顾客余额消费明细' },
            { path: '/reportOperatedItems', component: ReportOperatedItems, name: '已操作项目记录表' },
            { path: '/reportTransactionOrder', component: ReportTransactionOrder, name: '已成交订单记录' },
            { path: '/reportRegionalInformation', component: ReportRegionalInformation, name: '区域信息统计表' },
            { path: '/reportConsultationProject', component: ReportConsultationProject, name: '咨询项目情况统计' },
            { path: '/reportConsultationProjectM', component: ReportConsultationProjectM, name: '咨询项目情况统计（咨询医生）' },
            { path: '/reportConsumptionDetails', component: ReportConsumptionDetails, name: '顾客消费情况明细' },
            { path: '/reportDevelopmentBusiness', component: ReportDevelopmentBusiness, name: '开发业务顾客成交表' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;