<template>
    <div class="page">
        <div class="login-box">
            <div class="left-box">
                <img src="../../assets/images/login-bac.jpg" alt="login" />
            </div>
            <div class="right-box">
                <div class="title">登陆</div>
                <div class="input">
                    <div class="tag">用户名</div>
                    <el-input
                        v-model="username"
                        placeholder="请输入用户名"
                    ></el-input>
                </div>
                <div class="input">
                    <div class="tag">密码</div>
                    <el-input
                        v-model="username"
                        placeholder="请输入用户名"
                    ></el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="less">
.page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        width: 780px;
        height: 520px;
        // background-color: #000;
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        display: flex;

        .left-box {
            width: 45%;
            background-color: #000;
            overflow: hidden;
            display: flex;
            justify-content: center;

            img {
                height: 100%;
            }
        }

        .right-box {
            width: 55%;
            background-color: #fff;
            border-radius: 0 15px 15px 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .title {
                margin: -50px 50px 50px 50px;
                display: flex;
                justify-content: center;
                font-size: 20px;
                font-weight: bold;
            }

            .input {
                width: 60%;

                .tag {
                    margin: 10px 0;
                }
            }
        }
    }
}
</style>
