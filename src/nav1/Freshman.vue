<template>
  <div class="wrap">
    <!-- 查询 新增 -->
    <el-col style="width: 100%">
      <div class="grid-content bg-purple">
        <!-- 查询 -->
        <div class="select-new">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="selectUser" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="select">查询</el-button>
            </el-form-item>
            <!-- 新增 -->
            <el-button type="primary" @click="newUser">新增</el-button>
          </el-form>
        </div>
      </div>
    </el-col>
    <!-- 数据展示 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100" align="center"></el-table-column>

      <el-table-column type="index" width="50" label="#"></el-table-column>

      <el-table-column prop="id" label="学号" width="150" align="center" sortable></el-table-column>

      <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>

      <el-table-column
        prop="sex"
        label="性别"
        width="120"
        :formatter="formatSex"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column prop="age" label="年龄" width="120" align="center" sortable></el-table-column>
      <el-table-column prop="major" label="专业" width="180" align="center" sortable></el-table-column>

      <el-table-column label="操作" align="center" width="330">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码栏 -->
    <el-col style="width: 100%">
      <div class="grid-content bg-purple">
        <el-button size="mini" type="danger" @click="handleDelBatch()" class="delBatch">批量删除</el-button>
        <el-pagination background layout="prev, pager, next" :total="1000" class="pages"></el-pagination>
      </div>
    </el-col>

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" label-width="60px" :rules="formRules" status-icon>
        <el-form-item label="学号" prop="id">
          <el-input v-model.number="form.id" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="form.age" :min="1" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-select v-model="form.major" placeholder="请选择专业">
            <el-option :label="'语文'" value="语文">语文</el-option>
            <el-option :label="'英语'" value="英语">英语</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitForm('form')">立即创建</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let validatorId = (rule, value, callback) => {
      if (
        value === "" ||
        value.toString().length > 6 ||
        value.toString().length < 6
      ) {
        callback(new Error("请正确输入学号（6位数字）"));
      } else {
        callback();
      }
    };
    let validatorName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入名字"));
      } else if (!/^[\u4e00-\u9fa5]{2,7}$/.test(value)) {
        callback(new Error("请输入中文名字"));
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
      tableData: [
        {
          id: "10001",
          name: "王小虎",
          sex: "1",
          age: "20",
          major: "语文"
        },
        {
          id: "10002",
          name: "王小虎",
          sex: "0",
          age: "18",
          major: "语文"
        },
        {
          id: "10003",
          name: "王小虎",
          sex: "0",
          age: "18",
          major: "语文"
        },
        {
          id: "10004",
          name: "王小虎",
          sex: "1",
          age: "11",
          major: "语文"
        },
        {
          id: "10005",
          name: "王小虎",
          sex: "0",
          age: "18",
          major: "语文"
        },
        {
          id: "10006",
          name: "王小虎",
          sex: "0",
          age: "19",
          major: "语文"
        }
      ],
      delBatch: [], //存放的是 将删除的对象  （组成数组）
      delOne: "", //存放的是将删除对象的id
      selectUser: "",
      form: {
        id: "",
        name: "",
        sex: 1,
        age: "",
        major: "语文"
      },
      formRules: {
        id: [{ required: true, validator: validatorId, trigger: "blur" }],
        name: [{ required: true, validator: validatorName, trigger: "blur" }],
        sex: [{ required: false, trigger: "blur" }],
        age: [{ required: true, validator: validatorAge, trigger: "blur" }],
        major: [{ required: false, trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  methods: {
    //性别1 0转换
    formatSex(row, column) {
      return row.sex == 1 ? "男" : "女";
    },
    onSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    select() {
      console.log("select!");
    },
    newUser() {
      console.log("newUser");
    },
    //提示
    tip(del) {
      if (del == "") {
        this.$message({
          type: "info",
          message: "没有数据"
        });
        return;
      }
      this.$confirm("此操作将删除此记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.del(del);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(index, row) {
      console.log(row);
      //拷贝 Object.assign  或者 扩展运算符 （...）
      this.form = {...row}
      this.dialogVisible = true;
      // console.log(index, row);
    },
    //删除单行 将要删除数据id
    handleDelete(index, row) {
      // console.log(index, row);
      this.delOne = row.id;
      this.tip(this.delOne);
    },
    //批量选择
    handleSelectionChange(val) {
      this.delBatch = val;
    },
    //批量删除
    handleDelBatch() {
      this.tip(this.delBatch);
    },
    del(param) {
      if (!param) {
        return;
      }
      let length = this.tableData.length;
      // 判断  删除的是一个 还是 多个
      if (Array.isArray(param)) {
        // 删除多个
        let flag, id, i;
        for (let obj of param) {
          id = obj.id;
          flag = true;
          //找到结果 立马跳出此循环
          for (i = 0; flag; i++) {
            if (id == this.tableData[i].id) {
              this.tableData.splice(i, 1);
              flag = false;
            }
          }
        }
        this.delBatch = [];
      } else {
        //删除一个
        for (let index in this.tableData) {
          if (param == this.tableData[index].id) {
            this.tableData.splice(index, 1);
            this.delOne = "";
            return;
          }
        }
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
.wrap >>> .el-table thead
  color black
.wrap
  margin-left 30px
  padding 30px
.bg-purple
  background #d3dce6
.grid-content
  border-radius 4px
  min-height 50px
  position relative
  .select-new
    position absolute
    left 50px
    top 4px
  .delBatch
    position absolute
    left 20px
    top 10px
  .pages
    position absolute
    top 10px
    left 30%
</style>