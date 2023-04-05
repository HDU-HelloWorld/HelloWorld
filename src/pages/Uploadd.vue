<template>
  <div class="page">
    <el-row justify="center">
      <el-col :span="5" >
        <span class="items-center">姓名</span>
        <el-input
          v-model="input1"
          class="name"
          placeholder="请输入你的姓名"
        />
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="5" >
      <span class="items-center">学号</span>
        <el-input
          v-model="input2"
          class="stdnum"
          placeholder="请输入你的学号"
        />
      </el-col>
    </el-row>
    <el-row justify="center" class="department">
      <el-col :span="5" >
        <p>部门</p>
        <el-cascader v-model="value" :options="options" @change="handleChange" />
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col span="10">
        <el-upload
          class="upload-demo"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
          </template>
        </el-upload>
      </el-col>
    </el-row>
  </div>

  

</template>





<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'

const input1 = ref('')
const input2 = ref('')



const value = ref([])

const handleChange = (value) => {
console.log(value)

}
const options = ref([
{
  value: 'web',
  label: 'Web',
},{
  value: 'hd',
  label: '后端',
},{
  value: 'rgzn',
  label: '人工智能',
},
])
</script>



<style lang="scss">
  .page{
    position: absolute;
    top: 8%;
  }
  .el-row {
  margin-bottom: 20px;
}

 .upload-demo{
  width: 200px;
 }
</style>