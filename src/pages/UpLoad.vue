<!-- eslint-disable prettier/prettier -->
<script setup>
import { reactive, ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'
import baseUrl from '../../config'

const formData = reactive({
    name: '',
    stuNum: '',
    time: '',
    dep: '',
    id: null,
})
const fileList = ref([])

const formRef = reactive()
const rules = reactive({
    name: [
        {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
        },
        { min: 2, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    stuNum: [
        {
            required: true,
            message: 'Please input Activity stuNum',
            trigger: 'blur',
        },
        { min: 8, max: 8, message: 'Length should be 8', trigger: 'blur' },
    ],
    time: [
        {
            required: true,
            message: 'Please select Activity time',
            trigger: 'change',
        },
    ],
    dep: [
        {
            required: true,
            message: 'Please select Activity dep',
            trigger: 'change',
        },
    ],
})

const depOptions = ref([
    {
        value: 'web',
        label: 'web',
    },
    {
        value: '后端',
        label: '后端',
    },
    {
        value: '人工智能',
        label: '人工智能',
    },
    {
        value: '行政',
        label: '行政',
    },
])

const timeOptions = reactive([
    {
        value: 'time',
        label: '时间',
    },
])

const idx = ref(0)

const submitForm = async (formEl) => {
    if (!formEl) {
        console.log(formEl)
        return
    }
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            idx.value = 1
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = async (formEl) => {
    console.log(formEl)
    if (!formEl) return
    else{
        formData.name = ''
        formData.stuNum = ''
        formData.time = ''
        formData.dep = ''
    }
    await formEl.clearValidate()
}

const before = () => {
    idx.value = 0
}

const beforeUpload = (rawFile) => {
    formData.id = rawFile.uid
    console.log('file', rawFile)
    return true
}

const beforeRemove = async (uploadFile, uploadFiles) => {
    console.log('uploadFile', uploadFile)
    console.log('uploadFiles', uploadFiles)
    let res = await axios.post(baseUrl + 'upLoader/delete', {
        id: uploadFile.uid,
        name: formData.name,
        stuNum: formData.stuNum,
        time: formData.time,
        dep: formData.dep,
    })
    console.log(res)
    if (res.status === 200) {
        console.log('删除成功')
        return true
    } else {
        console.log('删除失败')
        return false
    }
}

// const test = () =>{
//     axios.get('http://localhost:6600/upLoader/test').then((res) => {
//         console.log(res)
//     })
// }

</script>

<template>
    <div class="UpLoad">
        <div class="process">
            <el-steps
                :active="idx + 1"
                finish-status="success"
                class="process"
                drag="true"
                style="margin-bottom: 20px"
            >
                <el-step title="表单验证" />
                <el-step title="上传文件" />
            </el-steps>
        </div>
        <div class="form" v-if="idx === 0">
            <div class="formInput">
                <el-form
                    ref="formRef"
                    :model="formData"
                    :rules="rules"
                    label-position="right"
                    label-width="100px"
                    status-icon
                >
                    <el-form-item label="姓名" prop="name">
                        <el-input
                            v-model="formData.name"
                            placeholder="请输入姓名"
                        />
                    </el-form-item>
                    <el-form-item label="学号" prop="stuNum">
                        <el-input
                            v-model="formData.stuNum"
                            placeholder="请输入学号"
                        />
                    </el-form-item>
                    <el-form-item label="部门" prop="dep">
                        <el-select
                            v-model="formData.dep"
                            placeholder="请选择部门"
                            label="部门"
                        >
                            <el-option
                                v-for="item in depOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间" prop="time">
                        <el-select
                            v-model="formData.time"
                            placeholder="请选择作业时间"
                            label="时间"
                        >
                            <el-option
                                v-for="item in timeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="formBtn">
                <el-button
                    type="primary"
                    style="margin-top: 20px"
                    @click="submitForm(formRef)"
                    >提交
                </el-button>
                <el-button
                    type="primary"
                    style="margin-top: 20px"
                    @click="resetForm(formRef)"
                    >清空
                </el-button>
            </div>
        </div>
        <div class="upLoader" v-if="idx === 1">
            <el-upload
                :before-upload="beforeUpload"
                :before-remove="beforeRemove"
                v-model="fileList"
                class="upload-demo"
                drag
                :action="baseUrl + 'upLoader/upload'"
                :data="formData"
                :name="
                    formData.stuNum + '-' + formData.name + '-' + formData.time
                "
                multiple
            >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    移动或
                    <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        尽量不要上传太大的文件，当前限制大小为 50MB
                    </div>
                </template>
            </el-upload>
            <div class="loaderBtn">
                <el-button type="primary" @click="before">上一步</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.UpLoad {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    .process {
        background: none;
        width: 60vw;
        margin: 1vh 0;
        display: flex;
        justify-content: center;
    }
    .form {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        .formInput {
            margin-right: 2vw;
        }
        .formBtn {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
    .upLoader {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        .loaderBtn {
            width: 100%;
            display: flex;
            justify-content: center;
            el-botton {
                margin: 0 1vw;
            }
        }
    }
}
</style>
