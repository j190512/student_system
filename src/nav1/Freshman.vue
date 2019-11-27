<template>
  <div class="wrap">
    <template>
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

        <el-table-column prop="sex" label="性别" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="age" label="年龄" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="major" label="专业" width="180" align="center" sortable></el-table-column>

        <el-table-column label="操作" align="center" width="330">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 页码栏 -->
    <el-col style="width: 100%">
      <div class="grid-content bg-purple-dark">
        <el-button size="mini" type="danger" @click="handleDelBatch()" class="delBatch">批量删除</el-button>
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "10001",
          name: "王小虎",
          sex: "男",
          age: "20",
          major: "自动化工程"
        },
        {
          id: "10002",
          name: "王小虎",
          sex: "男",
          age: "18",
          major: "自动化工程"
        },
        {
          id: "10003",
          name: "王小虎",
          sex: "女",
          age: "18",
          major: "自动化工程"
        },
        {
          id: "10004",
          name: "王小虎",
          sex: "男",
          age: "11",
          major: "自动化工程"
        },
        {
          id: "10005",
          name: "王小虎",
          sex: "男",
          age: "18",
          major: "自动化工程"
        },
        {
          id: "10006",
          name: "王小虎",
          sex: "女",
          age: "19",
          major: "自动化工程"
        }
      ],
      delBatch: [], //存放的是 将删除的对象  （组成数组）
      delOne: "" //存放的是将删除对象的id
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    //删除单行 将要删除数据id
    handleDelete(index, row) {
      // console.log(index, row);
      this.delOne = row.id;
      this.del(this.delOne);
    },
    //批量选择
    handleSelectionChange(val) {
      this.delBatch = val;
    },
    //批量删除
    handleDelBatch() {
      this.del(this.delBatch);
    },
    del(param) {
      if (!param) {
        return;
      }
      let length = this.tableData.length;
      // 判断  删除的是一个 还是 多个
      if (Array.isArray(param)) {
        // 删除多个
        let flag,id,i
        for (let obj of param) {
          id = obj.id
          flag = true
          //找到结果 立马跳出此循环
          for (i = 0; flag; i++) {
            if (id == this.tableData[i].id) {
              this.tableData.splice(i, 1);
              flag = false
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
.wrap >>> .el-table thead {
  color: black;
}

.wrap {
  margin-left: 30px;
  padding: 30px;

  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
}

.wrap >>> .el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}
</style>