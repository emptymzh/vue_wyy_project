<template>
  <div>
    <!-- 页面主体 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <!-- Logo -->
     <Header></Header>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="220px">
          <keep-alive>
            <router-view name="aside"></router-view>
          </keep-alive>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <!-- 播放条 -->
      </el-container>
      <router-view name="bottombar"></router-view>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header"

export default {
  name: "Home",
  components:{
    Header
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.el-main {
  // width: 900px;
  height: 790px;
}

.el-header {
  background-color: #ec4141;
}
 ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background   : rgb(224, 224, 224);
  }
  ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  }
</style>