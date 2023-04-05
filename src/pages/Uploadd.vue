<template>

  <div class="page">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    :size="formSize">
      <el-row justify="center" prop="name">
        <el-col :span="4" >
          <span class="items-center">姓名</span>
          <el-input
            v-model="input1"
            class="name"
            placeholder="请输入你的姓名"
          />
        </el-col>
      </el-row>
      <el-row justify="center" prop="stnum">
        <el-col :span="4" >
        <span class="items-center">学号</span>
          <el-input
            v-model="input2"
            class="stdnum"
            placeholder="请输入你的学号"
          />
        </el-col>
      </el-row>
      <el-row justify="center" class="department" prop="dep">
        <el-col :span="4" >
          <span>部门</span>
          <el-cascader v-model="value" :options="options" @change="handleChange" />
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="4">
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
      <el-row justify="center">
        <el-button type="submit" plain>提交</el-button>
      </el-row>
    </el-form>
    
  </div>
</template>



<script setup lang="ts">
import { reactive,ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  name: ' ',
  stnum:' ',
  dep:' ',

})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input your name', trigger: 'blur' },
    { type:'string',min: 1, max: 6, message: 'Length should be 1 to 6', trigger: 'blur' },
  ],
  stnum: [
    { required: true, message: 'Please input your student number', trigger: 'blur' },
    { type:'number', len:8, message: 'Length should be 8', trigger: 'blur' },
  ],

  dep: [
    {
      required: true,
      message: 'Please select Activity department',
      trigger: 'change',
    },
  ],
})

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

  .el-cascader {
    position: fixed;
    display: block;
    text-align: center;
    width: 245px;
  }
</style>