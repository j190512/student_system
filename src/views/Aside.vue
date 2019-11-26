<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo menu"
      @open="handleOpen"
      @close="handleClose"
      :default-active="$route.path"
      router
      unique-opened
    >
      <el-submenu index="1">
        <template slot="title">
          <span>学生</span>
        </template>
        <template>
          <div v-for="(item,index) in $router.options.routes[1].children" :key="index">
            <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
          </div>
        </template>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <span>导航2</span>
        </template>
        <el-menu-item >选项1</el-menu-item>
        <el-menu-item >选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>导航3</span>
        </template>
        <el-menu-item >选项1</el-menu-item>
        <el-menu-item >选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang='stylus'>
.menu >>> .el-submenu span
  font-weight 700
  font-size 16px
.menu >>> .el-menu-item
  font-size 12px
.menu >>> .el-menu
  background-color #C4CED9
.menu
  overflow hidden
.el-menu
  background-color #d3dce6
.el-menu li .is-active
  background-color #c4ced9
.el-menu .el-menu-item:hover
  background-color #E9EEF3
</style>