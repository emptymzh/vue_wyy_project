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
          <transition :name="transitionName">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-main>
        <!-- 播放条 -->
      </el-container>
      <router-view name="bottombar"></router-view>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      transitionName:''
    };
  },
  watch: {
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // console.log(to.meta.index,from.meta.index);
      if (from.meta.index == 0 && to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
        return;
      }
      if (to.meta.index == 0 && to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      }
      if (to.meta.index > 1 && to.meta.index > from.meta.index) {
        this.transitionName = "slide-com";
      }
      if (to.meta.index > 1 && to.meta.index < from.meta.index) {
        this.transitionName = "slide-back";
      }
    },
  },
};
</script>

<style>
/* 动画效果 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-com-enter-active,
.slide-com-leave-active,
.slide-back-enter-active,
.slide-back-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 100%, 0);
}
.slide-com-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-com-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-back-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-back-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
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
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background: rgb(224, 224, 224);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
}
</style>