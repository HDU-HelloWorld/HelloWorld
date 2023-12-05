<template>
  <div class="page">
    <div class="register">
      <el-form
        ref="ruleFormRef"
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 500px"
        :rules="ruleForm"
      >
        <el-form-item label="学号" prop="hdu_account">
          <el-input v-model="formLabelAlign.hdu_account" />
        </el-form-item>
        <el-form-item label="hdu密码" prop="hdu_pin">
          <el-input v-model="formLabelAlign.hdu_pin" />
        </el-form-item>
        <el-form-item label="验证码" prop="user_id">
          <el-input v-model="formLabelAlign[findStr]" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Create
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-tag v-if="findStr !== ''" class="tag" type="warning"
        >请不要随意修改验证码</el-tag
      >
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { baseUrl } from '../../config.js'
import { ElMessage } from 'element-plus'

const bindUrl = baseUrl + '/binder'

// 解析query参数
const route = useRoute()
const findStr = ref('')
// form表单定义
const formLabelAlign = reactive({
  hdu_pin: '',
  hdu_account: '',
})
const ruleFormRef = ref()
const ruleForm = reactive({
  hdu_account: [
    {
      required: true,
      message: 'Please input Activity stuNum',
      trigger: 'blur',
    },
    { min: 8, max: 8, message: 'Length should be 8', trigger: 'blur' },
  ],
  user_id: [
    {
      required: true,
      message: 'Please input Activity Verification code',
      trigger: 'blur',
    },
  ],
  hdu_pin: [
    {
      required: true,
      message: 'Please input Activity hdu_pin',
      trigger: 'change',
    },
  ],
})
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        let res = await axios.post(bindUrl + '/bind', formLabelAlign)
        const resType = res.data
        console.log(resType)
        if (resType === 'update') {
          ElMessage({
            message: '覆盖数据',
            type: 'success',
          })
        } else if (resType === 'create') {
          ElMessage({
            message: '创建数据',
            type: 'success',
          })
        }
      } catch (e) {
        console.log(e)
        ElMessage.error('绑定失败,请核对信息')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl) => {
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  console.log(route.query.user_id_qq | route.query.user_id_qqguild)
  for (let key in route.query) {
    if (key === 'user_id_qq' || key === 'user_id_qqguild') {
      findStr.value = key
      formLabelAlign[key] = route.query[key]
    }
  }
  console.log(formLabelAlign)
})
</script>

<style scoped lang="less">
.page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  .register {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    margin-top: 20vh;
  }
  .tag {
    margin-left: 50px;
  }
}
</style>
