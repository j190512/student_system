<template>
  <el-container>
    <el-header>
      <span>{{$route.path}}</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
          <Aside></Aside>
          </el-aside>
      <el-main>
        <router-view></router-view>
        <button @click="b">12</button>
      </el-main>
      
    </el-container>
  </el-container>
</template>

<script>
import Aside from './Aside.vue'
export default {
    components:{
        Aside
    },
    methods:{
      b(){
        console.log(this.$router.options.routes[1].children)
      }
    }
};
</script>

<style scoped>
.title-name {
  color: red;
  text-decoration: underline;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  height: 100%;
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
  .el-main {
    /* overflow-y: scroll; */
    padding:20px;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>
