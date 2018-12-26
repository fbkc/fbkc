<template>
    <div class="goods-list">
        <div class="buttons">
            <el-button @click="newGoods">新建</el-button>
        </div>
        <div class="goods-item" @click="goToGoods(item)" v-for="(item, index) in list" :key="index">
            <span>产品名称: {{item.productName}}</span>
        </div>
        <el-dialog append-to-body title="新建产品" :visible.sync="newGoodsDialogVisiable">
            <el-form :model="form">
                <el-form-item label="产品名称" :label-width="formLabelWidth">
                  <el-input v-model="form.productName"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-radio v-model="form.informationType" label="PRODUCT">产品</el-radio>
                    <el-radio v-model="form.informationType" label="NEWS">新闻</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newGoodsDialogVisiable = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data () {
        return {
            list: [],
            newGoodsDialogVisiable: false,
            formLabelWidth: '120px',
            form: {
                Id: 0,
                productName: '',
                informationType: 'PRODUCT'
            }
        }
    },
    mounted: function () {
        this.init()
    },
    methods: {
        init () {
            this.getproductlist()
        },
        getproductlist () {
            this.$store.dispatch('getproductlist').then(res => {
                if (res.data.code === 1) {
                    this.list = res.data.detail.productList
                }
            })
        },
        goToGoods (item) {
            let toPath = '/main/goods/' + item.Id
            this.$router.push({
                path: toPath
            })
        },
        newGoods () {
            // let url = location.origin + '/#/newGoods'
            // window.open(url)
            this.newGoodsDialogVisiable = true
        },
        add () {
            let params = {
                params: JSON.stringify(this.form)
            }
            this.$store.dispatch('addNewProduct', qs.stringify(params)).then(res => {
                if (res.data.code === 1) {
                    this.newGoodsDialogVisiable = false
                    this.init()
                } else {
                    this.$message.error('添加失败！')
                }
            }).catch(() => {
                this.$message.error('添加失败！')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.goods-list{
    .buttons{

    }
    .goods-item{
        float: left;
        margin: 12px;
        background: gray;
        width: 240px;
        height: 240px;
        text-align: center;
        span{
            display: block;
        }
    }
}
</style>
