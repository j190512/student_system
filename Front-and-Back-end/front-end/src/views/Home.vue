<template>
  <el-container>
    <el-header>
      <div class="center">
        <span>
          当前位置:
          <strong>{{$route.name}}</strong>
        </span>
      </div>
      <el-button class="btn" type="primary" @click="toLogin">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "./Aside.vue";
export default {
  components: {
    Aside
  },
  mounted() {
  },
  methods: {
    toLogin() {
      // console.log(this.$route)
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
.center {
  display: inline-block;
  text-align: center;
}
.btn {
  position: fixed;
  right: 65px;
  margin-top: 10px;
}
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
  padding: 20px;
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
}
</style>
