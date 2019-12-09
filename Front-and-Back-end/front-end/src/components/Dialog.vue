<template>
  <el-dialog :title="title" width="40%" :visible.sync="dialogVisible">
    <el-form ref="form" :model="form" label-width="60px" :rules="formRules" status-icon>
      <el-form-item label="学号" prop="id">
        <el-input v-model.number="form.id" clearable placeholder="5位数字"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" clearable placeholder="2-7个汉字"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="200"></el-input-number>
      </el-form-item>
      <el-form-item label="专业">
        <el-select v-model="form.major" placeholder="请选择专业">
          <el-option :label="'语文'" value="语文">语文</el-option>
          <el-option :label="'英语'" value="英语">英语</el-option>
          <el-option :label="'数学'" value="数学">数学</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitForm('form')">立即{{title}}</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { modify } from "../api/api";
import { getStudents } from "../api/api";
import { add } from "../api/api";
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  },
  watch: {
    visible: function() {
      this.dialogVisible = this.visible;
    },
    dialogVisible: function() {
      if (this.dialogVisible) {
        return;
      }
      this.clearValidate("form");
      this.$emit("diologClose", this.dialogVisible);
    },
    form: function() {
      this.id = this.form.id;
      this.form.sex = String(this.form.sex)
    }
  },
  data() {
    let validatorId = (rule, value, callback) => {
      let tempId = -1;
      //vuex 查 id 重复
      if (this.form.id) {
        tempId = this.id;
      }
      for (let obj of this.$store.state.data) {
        if (value.toString() == obj.id) {
          if (value.toString() == tempId) {
            callback();
          }
          callback(new Error("学号已使用"));
        }
      }
      if (value === "" || value.toString().length != 5) {
        callback(new Error("请正确输入学号（5位数字）"));
      } else {
        callback();
      }
    };
    let validatorName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入名字"));
      } else if (!/^[\u4e00-\u9fa5]{2,7}$/.test(value)) {
        callback(new Error("请输入中文名字(2-7个汉字)"));
      } else {
        callback();
      }
    };
    let validatorAge = (rule, value, callback) => {
      if (value == undefined) {
        callback(new Error("年龄有误"));
      } else {
        callback();
      }
    };
    return {
      formRules: {
        id: [{ required: true, validator: validatorId, trigger: "blur" }],
        name: [{ required: true, validator: validatorName, trigger: "blur" }],
        age: [{ required: true, validator: validatorAge, trigger: "blur" }]
      },
      dialogVisible: false,
      id: -1,
    };
  },
  methods: {
    close() {
      this.dialogVisible = false;
      this.$emit("close", this.dialogVisible);
    },
    // 更改/新增 数据
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit("changeForm", this.form); //存 form 避免dialog关闭 form清空

          //修改数据
          if (this.title == "编辑") {
            let temp = { ...this.form, oldId: this.$store.state.oldId };
            let params = this.$qs.stringify(temp);
            modify(params)
              .then(response => {
                if (response.data.code == "106") {
                  this.$message({
                    type: "success",
                    message: `${this.title}成功!`
                  });
                  // 修改成功 修改vuex中的数据
                  this.$store.dispatch("setS", {
                    form: this.$store.state.form,
                    oldId: this.$store.state.oldId
                  });
                  // console.log(this.$store.state.form+' 编辑  '+this.$store.state.oldId)
                  this.close();
                  return;
                }
                this.$message({
                  type: "error",
                  message: "修改失败!请稍后再试"
                });
                return;
              })
              .catch(() => {
                this.$message({
                  type: "error",
                  message: "修改失败!请稍后再试"
                });
                return;
              });
            //
          }

          //更新数据
          else if (this.title == "新增") {
            let temp = { ...this.form };
            let params = this.$qs.stringify(temp);
            add(params)
              .then(response => {
                if (response.data.code == "108") {
                  //新增成功 重新请求数据
                  this.$message({
                    type: "success",
                    message: `${this.title}成功!`
                  });
                  getStudents()
                    .then(response => {
                      if (response.data.code != "101") {
                        this.$store.commit("initData", response.data);
                        this.close(); //通知父组件关闭dialog
                        return;
                      } else {
                        this.$message({
                          type: "error",
                          message: "1获取数据失败,请稍后尝试!"
                        });
                        return;
                      }
                    })
                    .catch((err) => {
                      // console.log(err)
                      this.$message({
                        type: "error",
                        message: "2获取数据失败,请稍后尝试!"
                      });
                    });
                  return;
                } else {
                  this.$message({
                    type: "error",
                    message: "新增失败!请稍后再试"
                  });
                  return;
                }
              })
              .catch(() => {
                this.$message({
                  type: "error",
                  message: "新增失败!请稍后再试"
                });
                return;
              });
          } else {
            return false;
          }
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },
    //清除提示语
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    }
  }
};
</script>

<style>
</style>