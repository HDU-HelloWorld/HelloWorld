<script setup lang="ts" type="module">
  import { reactive,ref } from 'vue'
  import { UploadFilled } from '@element-plus/icons-vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import type { UploadProps, UploadUserFile } from 'element-plus'
  import {baseUrl} from '../../config';
  import axios from 'axios';
//   import { file } from '@babel/types'
  const active = ref(0)
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const fileList = ref<UploadUserFile[]>([])

  const next = async (formEl: FormInstance | undefined) => {
    if(formEl) await formEl.validate()
    if(active.value == 0) {
      let res = await axios.post(baseUrl+'/create',ruleForm)
      console.log(res)
    }
    if(active.value == 1) {
      if(fileList.value.length === 0){
        return ElMessage.error('请上传文件')
      }
      for(let i in fileList.value){
        if(fileList.value[i].status != `success`){
          return ElMessage.error('文件上传中，请稍后')
        }
      }
    }
    if (active.value++ == 2) active.value = 2
  }

  const prev = () => {
    if (active.value-- == 0) active.value = 0
  }

  // 表单字段
  const ruleForm = reactive({
    name: '',
    stnum:'',
    dep:'Web',
    when:null,
  })
  const theFile = reactive({
    uid:null,
  })

  //表单验证规则
  const rules = reactive<FormRules>({
    name: [
      { required: true, message: 'Please input your name', trigger: 'blur' },
      { type:'string',min: 1, max: 6, message: 'Length should be 1 to 6', trigger: 'blur' },
    ],
    stnum: [
      { required: true, message: 'Please input your student number', trigger: 'blur' },
      { type:'string', len:8, message: 'Length should be 8', trigger: 'blur' },
    ],
    dep: [
      {
        required: true,
        message: 'Please select Activity department',
        trigger: 'change',
      }
    ],
    when: [
      {
        required: true,
        message: 'Please select when homework to commit',
        trigger: 'change',
      }
    ]
  })

  const options = ref([
    {
    value: 'web',
    label: 'Web',
    },{
    value: '后端',
    label: '后端',
    },{
    value: '人工智能',
    label: '人工智能',
    },
  ])


  const options2 = ref([
    {
    value: '1',
    label: '第一次作业',
    },
  ])

  const OnSuccess: UploadProps['onSuccess'] = (response,uploadFile,uploadFiles) => {
    // uploadFile.uid =  response
    console.log(uploadFile.uid)
    console.log(response)
  }

  const beforeUpload: UploadProps['beforeUpload'] = (uploadFile, uploadFiles) => {
    theFile.uid = uploadFile.uid
  }

  const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
      `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
      async () => {
        let idx = uploadFile.name.split('.').length-1
        let type = uploadFile.name.split('.')[idx]
        let url = uploadFile.uid + "." + type
        let data ={
          name:ruleForm.name,
          stnum:ruleForm.stnum,
          dep:ruleForm.dep,
          when:ruleForm.when,
          url:url,
        }
        let res = await axios.post(baseUrl+'/delfile',data)
        // if(res.)
        console.log(res)
      },
      () => false,
    )
  }
</script>

<template>
    <div class="uploadd">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            :size="formSize"
            v-if="!active"
        >
            <el-row justify="center">
                <el-col :span="4">
                    <el-form-item label="姓名" prop="name">
                        <el-input
                            v-model="ruleForm.name"
                            class="name"
                            placeholder="请输入你的姓名"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row justify="center">
                <el-col :span="4">
                    <el-form-item label="学号" prop="stnum">
                        <el-input
                            v-model="ruleForm.stnum"
                            class="stnum"
                            placeholder="请输入你的学号"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row justify="center" class="department">
                <el-col :span="4">
                    <el-form-item label="部门" prop="dep">
                        <el-select-v2
                            v-model="ruleForm.dep"
                            :options="options"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row justify="center" class="when">
                <el-col :span="4">
                    <el-form-item label="作业时间" prop="when">
                        <el-select-v2
                            v-model="ruleForm.when"
                            :options="options2"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row justify="center">
        <el-button type="submit" plain @click="commit()">下一步</el-button>
      </el-row> -->
        </el-form>
        <el-row justify="center" v-if="active === 1">
            <el-col :span="4">
                <el-upload
                    :data="{
                        name: ruleForm.name,
                        stnum: ruleForm.stnum,
                        dep: ruleForm.dep,
                        id: theFile.uid,
                        when: ruleForm.when,
                    }"
                    ref="upload"
                    class="upload-demo"
                    drag="true"
                    v-model:file-list="fileList"
                    accept=".png,.jpg,.jpeg"
                    :before-remove="beforeRemove"
                    :on-success="OnSuccess"
                    :before-upload="beforeUpload"
                    multiple="true"
                    :show-file-list="true"
                    :action="baseUrl + '/files'"
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
        <el-result
            icon="success"
            title="Success Tip"
            sub-title="Please follow the instructions"
            v-if="active === 2"
        >
        </el-result>
        <el-row justify="center" class="progress">
            <el-col :span="4">
                <el-steps :active="active" finish-status="success">
                    <el-step title="Step 1" />
                    <el-step title="Step 2" />
                    <el-step title="Step 3" />
                </el-steps>
            </el-col>
        </el-row>
        <el-row justify="center" class="btn">
            <el-col :span="2">
                <el-button @click="prev">Prio step</el-button>
            </el-col>
            <el-col :span="2.5">
                <el-button @click="next(ruleFormRef)">Next step</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
.progress {
    margin-top: 10vh;
}
.uploadd {
    margin-top: 25vh;
}
.el-row {
    position: relative;
    margin: 20px;
}

.el-cascader {
    display: block;
    text-align: center;
    // width: 245px;
}
.el-upload {
    margin-top: 40px;
}
</style>
