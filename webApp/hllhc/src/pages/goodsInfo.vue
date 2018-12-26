<template>
    <div>
        <el-form ref="form" :rules="rules" :aria-disabled="form.isPub" :model="form" label-width="80px">
            <el-form-item prop="productName" label="产品名称">
                <el-input v-model="form.productName"></el-input>
            </el-form-item>
            <el-form-item prop="pinpai" label="产品品牌">
                <el-input v-model="form.pinpai"></el-input>
            </el-form-item>
            <el-form-item prop="xinghao" label="产品型号">
                <el-input v-model="form.xinghao"></el-input>
            </el-form-item>
            <el-form-item prop="sumCount" label="供货总量">
                <el-input v-model="form.sumCount"></el-input>
            </el-form-item>
            <el-form-item prop="smallCount" label="最小起订量">
                <el-input v-model="form.smallCount"></el-input>
            </el-form-item>
            <el-form-item prop="price" label="产品单价">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item prop="unit" label="计量单位">
                <el-input v-model="form.unit"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateData">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data () {
        return {
            goodsId: this.$route.params.goodsId,
            form: {
                Id: '',
                city: '',
                createTime: '',
                editTime: '',
                endPubCount: 0, // 已发条数
                endTodayPubCount: 0, // 今日已发
                informationType: '', // PRODUCT 产品， NEWS 新闻
                isPub: false, // 发布状态 是否发布任务
                maxPubCount: 1000, // 最大可发条数
                pinpai: "成例", // 产品品牌
                price: "1111", // 产品单价
                productName: "洒水车", // 产品名称
                pubInterval: 60, // 发布时间间隔（s）
                pub_startTime: "2018-09-03 00:00:00", // 发布时间
                smallCount: "11111", // 最小起订量
                sumCount: "111111", // 供货总量
                unit: "辆", // 计量单位
                xinghao: "11" // 产品型号
            },
            rules: {
                productName: [
                  { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                ],
                pinpai: [
                  { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                ],
                xinghao: [
                  { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                ],
                sumCount: [
                  { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                ],
                smallCount: [
                  { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                ],
                price: [
                  { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                ],
                unit: [
                  { required: true, message: '产品名称不能为空！', trigger: 'blur' }
                ]
            }
        }
    },
    mounted: function () {
        this.init()
    },
    methods: {
        init() {
            this.getData()
        },
        getData () {
            let params = {
                productId: this.goodsId
            }
            this.$store.dispatch('getProductById', params).then(res => {
                if (res.data.code === 1) {
                    this.form = res.data.detail.product
                } else {
                    this.$message.error('获取产品信息失败！')
                }
            }).catch(err => {
                console.log(err)
                this.$message.error('获取产品信息失败！')
            })
        },
        updateData () { // 更新产品信息
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let params = {
                        params: JSON.stringify(this.form)
                    }
                    this.$store.dispatch('saveProduct', qs.stringify(params)).then(res => {
                        if (res.data.code === 1) {
                            debugger
                            this.$message.success('保存成功！')
                        } else {
                            this.$message.error('保存失败！')
                        }
                    }).catch(err => {
                        this.$message.error('保存失败！')
                    })
                } else {
                    this.$message.warning('请输入必填信息！')
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>
