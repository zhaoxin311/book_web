<template>
  <AppContainer :main-height.sync="mainHeight">
<el-upload drag action="https://jsonplaceholder.typicode.com/posts/" :multiple="true" ref="upload" list-type="file" accept=".txt, .jpg, .jpeg, .png"
               :show-file-list="false" :http-request="uploadFa" :before-upload="beforeExcelUpload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将.fa或者.fasta文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传.txt文件或.fa文件</div>
    </el-upload>
          <div><li v-for="(value,index) in filename" :key="index">{{value}}</li></div>

  </AppContainer>
</template>

<script>
import AppContainer from '@/components/AppContainer/AppContainer.vue'
export default {
  name: 'Dashboard',
  components: {
    AppContainer
  },
  data() {
    return {
      mainHeight: 0,
      filename:[]
    }
  },

  mounted() {
  },
  methods: {
    uploadFa(item) {
        this.readFile(item.file)
        // 处理文件上传
      },
readFile(file) {
        console.info(file.name,'file')
        this.filename.push(file.name)
        console.log(this.filename,'name');
        const reader = new FileReader()
        reader.onload = e => this.$emit('load', this.dealNum(e.target.result))
        reader.readAsBinaryString(file)
      },
      dealNum(item) {
        console.log(item)
        // 将item展示到需要地方
      },
      beforeExcelUpload(file) {
        const isLt200K = file.size / 1024 < 200
        if (!isLt200K) {
          this.$message.error('上传文件大小不能超过 200k!')
        }
        return isLt200K
      }
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    height: 81vh;
    background: url(../../assets/img/book2.png) no-repeat;
  }
  &-text {
    font-size: 30px;
    font-weight: bold;
    line-height: 46px;
    margin-top: 30px;
    text-align: center;
  }
  &-text1 {
    font-size: 16px;
    font-weight: bold;
    line-height: 0px;
    margin-top: 15px;
    color: #333;
    text-align: center;
  }
}
.info-container{
  width: 60%;
  height: 350px;
  background: rgb(246,246,246,0.5);
}
.center{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
</style>
