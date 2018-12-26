<template>
 <div>
      <div class="upload-buttons">
        <el-button type="primary" @click="dialogVisible=true">上传图片</el-button>
      </div>
      <div class="image-list">
        <div class="image-item" v-for="(item, index) in imageList" :key="index">
          <div class="image-item-remove"><span @click="remove(item, index)"><i class="el-icon-delete"></i></span></div>
          <img :src="urlOrign + item.imageURL"/>
        </div>
      </div>
      <el-dialog
        class="upload-dialog"
        append-to-body
        title="建议图片尺寸为600px*400px"
        :visible.sync="dialogVisible"
        width="34%">
        <div>
          <el-upload
            action=""
            class="upload-demo"
            :before-upload="beforeAvatarUpload"
            drag
            multiple
            :limit="20"
            :http-request="upload"
            :file-list="fileList"
            :show-file-list="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处上传</div>
            <el-button size="small" type="primary">点击选择图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      urlOrign: 'http://39.105.196.3:1874',
      id: '',
      data: 'default value!',
      fileList: [],
      currentUploadeImageUrl: '',
      imageList: [],
      currentMouseIn: '',
      productId: this.$route.params.goodsId
    }
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      let params = {
        productId: this.productId
      }
      this.$store.dispatch('getPictureList', params).then(res => {
        if (res.data.code === 1) {
          this.imageList = res.data.detail.picList
        } else {
          this.$message.error('获取图片失败！')
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    upload(e){
        let file = e.file;
        let fileData = new FormData(); //创建form对象
        fileData.append('file',file);//通过append向form对象添加数据
        let params = {
          fileData: fileData,
          productId: this.productId
        }
        this.$store.dispatch('uploadFile', params).then(res => {
          if(res.data.code === 1) {
            this.$message.success('上传成功！')
            this.currentUploadeImageUrl = res.data.detail.imgUrl
            this.init()
          }
        })
    },
    remove (data, index) {
      let _this = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            Id: data.Id,
            imageURL: data.imageURL
          }
          _this.$store.dispatch('removeImage', params).then(res => {
            if (res.data.code === 1) {
              _this.imageList.splice(index, 1)
              _this.$message.success('删除成功！')
            } else {
              _this.$message.error('删除失败！')
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消！'
          });          
        });
    },
    changeMouseInIndex(index) {
      this.currentMouseIn=index
    }
  }
}
</script>
<style lang="less">
.image-list{
  margin-top: 12px;
  .image-item{
    display: inline-table;
    width: 100px;
    height: 100px;
    padding: 12px;
    img{
      width: 185px;
      height: 185px;
    }
  }
  .image-item:hover .image-item-remove{ visibility: visible; }
  .image-item-remove{
    visibility: hidden;
    position: relative;
    top: 26px;
    span{
      color: red;
      position: relative;
      left: 142px;
      cursor: pointer;
      height: 17px;
      width: 35px;
      color: red;
      display: inline-block;
      text-align: center;
    }
  }
}
.upload-dialog{
  .el-dialog{
    .el-dialog__body{
      text-align: center;
    }
  }
}
</style>
