<template>
  <el-form
    :model="ruleForm2"
    status-icon
    :rules="rules2"
    ref="ruleForm2"
    label-width="100px"
    class="demo-ruleForm login-wrap"
  >
    <h3 class="title">登录</h3>
    <el-form-item label="账号" prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="btn"
        :loading="loading"
        element-loading-background="rgba(0,0,0,0.3)"
        @click="submitForm('ruleForm2')"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { login } from "../api/api";
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        account: "admin",
        pass: "123456"
      },
      rules2: {
        account: [
          { required: true, validator: validateAccount, trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }]
      },
      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.loading = true;
        if (valid) {
          let dataForm = this.$qs.stringify(this.ruleForm2);
          // alert("submit!");
          login(dataForm)
            .then(response => {
              if (response.data.code == "103") {
                this.loading = false;
                let admin = {account:"admin"}
                sessionStorage.setItem("admin", JSON.stringify(admin));
                this.$router.push({ path: `/home/first` });
                return;
              }
              if (response.data.code == "102") {
                this.loading = false;
                this.$message({
                  type: "error",
                  message: "账号或密码错误!"
                });
                return;
              }
              this.loading = false;
              this.$message({
                type: "error",
                message: "请稍后尝试!"
              });
              return;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.login-wrap
  margin 150px auto
  width 340px
  border 1px solid #9e9e94
  box-shadow 0 0 25px #cac6c6
  padding 15px 55px 0px 0px
  .title
    text-align center
    padding 20px
    margin-left 70px
  .btn
    margin-left -35px
    width 110%
</style>