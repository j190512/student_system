<template>
  <div class="wrap">
    <!-- 查询 新增 -->
    <el-col style="width: 100%">
      <div class="grid-content bg-purple">
        <!-- 查询 -->
        <div class="select-new">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="学号">
              <el-input v-model="selectStu" placeholder="学号" @keyup.native="inputNumber" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="select">查询</el-button>
            </el-form-item>
            <!-- 新增 -->
            <el-button type="primary" @click="handleEdit">新增</el-button>
          </el-form>
        </div>
      </div>
    </el-col>
    <!-- 数据展示 -->
    <el-table
      :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange"
      v-loading="loading"
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
    <!-- 批量删除 页码栏 -->
    <el-col style="width: 100%">
      <div class="grid-content bg-purple">
        <el-button size="mini" type="danger" @click="handleDelBatch()" class="delBatch">批量删除</el-button>
        <el-pagination
          background
          layout="total,prev, pager, next"
          class="pages"
          :page-size="pageSize"
          :total="tableData.length"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-col>
    <!-- 编辑 & 新增 -->
    <Dialog :form="form" :visible="show" :title="dialogTitle" @close="closed" />
  </div>
</template>
<script>
import Dialog from ".././components/Dialog.vue";
// import { mapState } from 'vuex'
export default {
  components: {
    Dialog
  },
  props: {
    grade: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      tableData: [],
      delBatch: [], //存放的是 将删除的对象  （组成数组）
      delOne: "", //存放的是将删除对象的id
      selectStu: "",
      form: {
        id: "",
        name: "",
        sex: "1",
        age: "",
        major: "语文",
        grade: this.grade
      },
      show: false,
      dialogTitle: "",
      loading: false,
      currentPage: 1,
      pageSize: 6
    };
  },
  methods: {
    //获取列表
    getData() {
      this.tableData = this.$store.getters.getData(this.grade);
      this.loading = false;
    },
    inputNumber() {
      this.selectStu = this.selectStu.replace(/[^\d.]/g, "");
    },
    closed(flag) {
      this.show = flag;
      //关闭dialog form重置
      this.form = {
        id: "",
        name: "",
        sex: "1",
        age: "",
        major: "语文",
        grade: this.grade
      };
      this.getData();
    },
    //性别1 0转换
    formatSex(row, column) {
      return row.sex == 1 ? "男" : "女";
    },
    select() {
      let item = {};
      let temp = [];
      // item = [...this.$store.getters.getSelect(this.selectStu)]
      // item=this.$store.state.data.filter(item => item.id == this.selectStu)
      if (this.selectStu != "") {
        this.loading = true;
        for (let i of this.$store.state.data) {
          if (i.id == this.selectStu) {
            item = { ...i };
            item.name += `(${i.grade}年级)`;
            temp.push(item);
            this.tableData = temp;
            this.loading = false;
            return;
          }
        }
      } else {
        this.$message({
          type: "error",
          message: "没有数据!"
        });
        this.getData();
      }
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
          this.loading = true;
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
    //编辑 & 新增
    handleEdit(index, row) {
      // console.log(row);
      //拷贝 Object.assign  或者 扩展运算符 （...）
      if (row) {
        console.log("编辑");
        this.dialogTitle = "编辑";
        this.form = { ...row, index };
      } else {
        this.dialogTitle = "新增";
      }
      this.show = true;
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
      // 判断  删除的是一个 还是 多个
      if (Array.isArray(param)) {
        this.$store.dispatch("delBatch", param);
        this.getData();
        this.delBatch = [];
      } else {
        //删除一个
        this.$store.dispatch("del", param);
        this.getData();
        this.delOne = "";
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
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
.wrap >>>.el-table--enable-row-hover .el-table__body tr:hover>td
  background-color #b3c0d1 !important
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