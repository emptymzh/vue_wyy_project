<template>
  <!-- 登录 -->
  <el-col :span="6" id="c3">
    <el-button
      v-if="show1"
      id="user"
      size="medium"
      type="info"
      circle
      icon="el-icon-user"
    ></el-button>
    <div class="imgLog" v-if="show2">
      <a  href="#"><img :src="img" /></a>
    </div>
    <a v-if="show1" @click="login" href="#">请登录</a>
    <a v-if="show2" @click="out" href="#">退出</a>
    <!-- 登录对话框 -->
    <el-dialog title="网易云登录" :visible.sync="loginFormVisible" width="20%">
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="100px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="loginForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            v-model="loginForm.pass"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="loginDialog">确 定</el-button>
      </div>
    </el-dialog>
    <el-button id="down" size="small" icon="el-icon-caret-bottom"></el-button>
  </el-col>
</template>


<script>
import { getPhoneLogin } from "../network/login";
import { getPhoneOut } from "../network/login";
import { getUserSongList } from "@/network/login";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        phone: "",
        pass: "",
      },
      loginFormRules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginFormVisible: false,
      img: "",
      show1: true,
      show2: false,
    };
  },

  methods: {
    login() {
      this.loginFormVisible = true;
    },
    /* 获取用户歌单 */
    async getUserSongList2() {
      let uid = this.$store.state.uID;
      this.$store.commit(
        "setUserSongList",
        await getUserSongList(uid).then((res) => {
          return res.playlist;
        })
      );
    },
    loginDialog() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        getPhoneLogin(this.loginForm.phone, this.loginForm.pass).then((res) => {
          if (res.code === 400) {
            this.$message.info("该手机号未注册");
          } else if (res.code !== 200) {
            this.$message.error(res.message);
            return;
          } else {
            this.$store.commit("setUID", res.account.id);
            console.log("用户id：" + res.account.id);
            this.getUserSongList2();
            //保存token
            // window.localStorage["token"] =
            //   "c6eb1fa0d31ce8fe6114a3f60d0b9fab4725a358bd645c9278161f9ae2d4808d993166e004087dd3d78b6050a17a35e705925a4e6992f61d07c385928f88e8de";
            this.$message.success("登录成功");
            this.isLogin = "退出登录";
            this.img = res.profile.avatarUrl;
            this.show1 = false;
            this.show2 = true;
          }
        });
      });

      this.loginFormVisible = false;
    },
    out() {
      getPhoneOut().then((res) => {
        if (res.code === 200) {
          this.$message.success("退出登录成功");
          this.show1 = true;
          this.show2 = false;
          this.$router.push("/personalized");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.imgLog {
  display: inline-block;
  position: relative;
  top: 50%;
  transform: translateY(25%);
  width: 34px;
  height: 34px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.el-header {
  background-color: #ec4141;
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
      margin-top: -20px;
      left: 80px;
      max-width: 200px;
      max-height: 40px;
      /* style要求scoped，只修改本组件下的样式，使用>>>和/deep/来选择子组件 less下就用/deep/*/
      /deep/.el-input__inner {
        background-color: #d93b3b;
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
}
</style>