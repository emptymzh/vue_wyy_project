<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="2" id="img1">
        <router-link to="/">
          <a href="#" id="logo"> <img src="../assets/wyy_logo.jpg" alt="" /></a>
          <a href="#" id="font1">网易云</a>
        </router-link>
      </el-col>
      <!-- 搜索区 -->
      <el-col :span="12" id="c2">
        <el-button
          id="btn1"
          size="mini"
          type="info"
          circle
          icon="el-icon-arrow-left"
        ></el-button>
        <el-button
          id="btn2"
          size="mini"
          type="info"
          circle
          icon="el-icon-arrow-right"
        ></el-button>
        <!-- 如果是原生的input，使用 @keyup.enter就可以，若是使用了element-ui，则要加上native限制符，因为element-ui把input进行了封装，原事件就不起作用了， -->
        <el-input
          v-model="keywords"
          size="mini"
          clearable
          placeholder="搜索"
          prefix-icon="el-icon-search"
          @keyup.enter.native="toSearch"
        ></el-input>
        <el-button
          id="mic"
          size="small"
          type="info"
          circle
          icon="el-icon-microphone"
        ></el-button>
      </el-col>
      <!-- 登录 -->
      <!-- keep-alve 中include等值是组件export中的name -->
      <router-view name="top"></router-view>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keywords: "",
    };
  },
  methods: {
    toSearch() {
      if(this.keywords!==''){
      this.$router.push("/search" +this.keywords);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#img1 {
  position: relative;
  height: 60px;
  #logo {
    position: relative;
    display: block;
    width: 60px;
    height: 60px;
    img {
      position: absolute;
      border-radius: 50%;
      top: 50%;
      margin-top: -25%;
      left: 50%;
      margin-left: -25%;
      width: 50%;
      height: 50%;
    }
  }
  #font1 {
    display: block;
    position: absolute;
    text-decoration: none;
    color: white;
    height: 18px;
    top: 30px;
    margin-top: -9px;
    left: 50px;
  }
}
#c1 {
  position: relative;
  height: 60px;
  font-size: 18px;
  a {
    display: block;
    position: absolute;
    color: white;
    height: 18px;
    top: 25px;
    margin-top: -9px;
  }
}
#c2 {
  position: relative;
  height: 60px;
  #btn1 {
    position: absolute;
    top: 30px;
    margin-top: -14px;
    border-color: #d93b3b;
    background-color: #d93b3b;
  }
  #btn2 {
    position: absolute;
    top: 30px;
    margin-top: -14px;
    left: 32px;
    border-color: #d93b3b;
    background-color: #d93b3b;
  }
  .el-input {
    position: absolute;
    top: 30px;
    margin-top: -15px;
    left: 80px;
    max-width: 200px;
    max-height: 40px;
    /* style要求scoped(每个样式都会有个哈希值，防止污染全局)，只修改本组件下的样式。修改第三方组件样式(默认只给第一层哈希值，里面的要手动使用>>>和/deep/来选择子组件 less下就用/deep/*/
    /deep/.el-input__inner {
      background-color: rgba(225, 62, 62,0.8);
      color: white;
      border-radius: 20px;
      border: none;
    }
  }
  #mic {
    position: absolute;
    top: 30px;
    margin-top: -14px;
    border-color: #d93b3b;
    background-color: #d93b3b;
    left: 290px;
  }
}
#c3 {
  #user {
    margin: 5px;
    background: #e0e0e0;
    border: none;
  }
  a {
    color: #fffcfc;
  }
  #down {
    border: none;
    color: #fffcfc;
    background-color: #ec4141;
  }
}
</style>