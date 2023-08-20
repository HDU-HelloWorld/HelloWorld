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
                <el-form-item label="学号" prop="stuNum">
                    <el-input v-model="formLabelAlign.stuNum" />
                </el-form-item>
                <el-form-item label="QQ号" prop="QQnum">
                    <el-input v-model="formLabelAlign.QQnum" />
                </el-form-item>
                <el-form-item label="hdu密码" prop="HDUkey">
                    <el-input v-model="formLabelAlign.HDUkey" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        Create
                    </el-button>
                    <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { baseUrl } from '../../config'
import { ElMessage } from 'element-plus'

const bindUrl = baseUrl + '/binder'

const formLabelAlign = reactive({
    stuNum: '',
    QQnum: '',
    HDUkey: '',
})

const ruleFormRef = reactive()

const ruleForm = reactive({
    stuNum: [
        {
            required: true,
            message: 'Please input Activity stuNum',
            trigger: 'blur',
        },
        { min: 8, max: 8, message: 'Length should be 8', trigger: 'blur' },
    ],
    QQnum: [
        {
            required: true,
            message: 'Please select Activity QQnum',
            trigger: 'blur',
        },
    ],
    HDUkey: [
        {
            required: true,
            message: 'Please select Activity dep',
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
                console.log(res)
                ElMessage({
                    message: '绑定成功',
                    type: 'success',
                })
            } catch (e) {
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
}
</style>
