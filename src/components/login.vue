<template>
  <div class="mainpage">
    <!--这是登录页面-->
    <div class="login">
      <!--这里可以添加图像-->
      <div>
        <img src="" />
      </div>
      <div>
        <el-form ref="form" :model="form" label-width="150px" :rules="rules">
          <div class="use">
            <el-form-item label="输入名称" prop="username" class="label-color">
              <el-input
                v-model="form.username"
                class="el-input"
                suffix-icon="el-icon-user"
              >
              </el-input>
            </el-form-item>
          </div>

          <div class="pwd">
            <el-form-item label="输入密码" prop="password" class="label-color">
              <el-input v-model="form.password" class="el-input" show-password>
              </el-input>
            </el-form-item>
          </div>

          <el-tooltip
            class="item"
            effect="dark"
            content="请确保输入了以上信息"
            placement="bottom"
          >
            <el-button type="primary" plain @click="check('form')"
              >点击登录</el-button
            >
          </el-tooltip>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {},
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 2, max: 100, message: "长度大于2", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    check() {
      var that = this;
      that.$router.push("/main");
      /*axios.post("https://zxback.tsky31.cn/api/login", this.form).then(
        (res) => {
          //console.log(res);
          if (res.data.code == 0) {
            that.$message({
              message: "登录成功",
              type: "success",
            });
            localStorage.setItem("key", res.data.code);
            that.$router.push("/main");
          }
        },
        (err) => {
          that.$message.error("登录失败");
          that.form.username = "";
          that.form.password = "";
        }
      );*/

      // 如果账号和密码都正确，则进行路由跳转
    },
  },
};
</script>

<style>
.mainpage {
  height: 716px;
  background-image: url("../assets/bgi.jpg");
  background-size: 100% 100%;
  padding-top: 45px;
  min-width: 1024px;
}
.login {
  width: 500px;
  height: 500px;
  border-radius: 10%;
  margin: 0 auto;
}
.label-color .el-form-item__label {
  color: rgb(10, 212, 248);
}
.use {
  margin-top: 145px;
  width: 400px;
}
.pwd {
  margin-top: 45px;
  margin-bottom: 45px;
  width: 400px;
}
.item {
  margin: 4px;
}
</style>
