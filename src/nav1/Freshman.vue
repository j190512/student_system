<template>
<div class="wrap">
<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="100"
      align="center"
      >
      </el-table-column>

    <el-table-column type="index" width="50" align="center">
			</el-table-column>

    <el-table-column prop="id" label="学号"  width="150" align="center" sortable>
    </el-table-column>
        
        <el-table-column prop="name" label="姓名"  width="150" align="center" >
    </el-table-column>

    <el-table-column prop="sex" label="性别"  width="120" align="center" sortable>
    </el-table-column>
        <el-table-column prop="age" label="年龄"  width="120" align="center" sortable>
    </el-table-column>
        <el-table-column prop="major" label="专业"  width="180" align="center" sortable>
    </el-table-column>

    <el-table-column label="操作" align="center" width="330">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
</div>
  <el-col :span="12"><div class="grid-content bg-purple">dada</div></el-col>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '10001',
          name: '王小虎',
          sex: '男',
          age: '20',
          major: '自动化工程',
        },{
          id: '10162',
          name: '王小虎',
          sex: '男',
          age: '18',
          major: '自动化工程',
        },{
          id: '16501',
          name: '王小虎',
          sex: '女',
          age: '18',
          major: '自动化工程',
        },{
          id: '10651',
          name: '王小虎',
          sex: '男',
          age: '11',
          major: '自动化工程',
        },{
          id: '16001',
          name: '王小虎',
          sex: '男',
          age: '18',
          major: '自动化工程',
        },{
          id: '10901',
          name: '王小虎',
          sex: '女',
          age: '19',
          major: '自动化工程',
        },]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSelectionChange(val) {
        console.log(val)
      }
    }
  }
</script>
<style lang='stylus' scoped>
  .wrap >>> .el-table thead
    color black
  .wrap
    margin-left 30px
    padding 30px
  .wrap >>> .el-table--scrollable-x .el-table__body-wrapper 
    overflow-x hidden
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>