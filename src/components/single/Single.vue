<template>
  <div class="single" :key="addKey">
    <div>
      <a href="javascript:void(0)" @click="back">
        <i
          class="el-icon-arrow-down"
          style="color: rgba(163, 161, 161, 0.8); font-size: 24px"
        ></i>
      </a>
    </div>
    <div class="single_left">
      <div class="player_bar" ref="playBar">
        <img src="@/assets/img/player_bar.png" />
      </div>
      <div class="circle" ref="playCircle">
        <div class="disc">
          <img src="@/assets/img/disc.png" />
        </div>
        <div class="main_img">
          <img :src="getNowMusicDetail.al.picUrl" alt="404" />
        </div>
      </div>
    </div>
    <div class="singer_text">
      <div class="singer_text_title">
        {{ getNowMusicDetail.name }}
        <div class="singer_text_info">
          {{ getNowMusicDetail.ar[0].name }} - {{ getNowMusicDetail.al.name }}
        </div>
      </div>
    </div>
    <!-- 歌词 -->
    <!-- 动态设置style 直接用font-wight不行,要安装eslint但是自己禁用了 -->
    <div class="lyric" ref="lyricScroll">
      <ul ref="lyric">
        <li
          v-for="(item, index) in lyricArray"
          :key="index"
          :style="{ font: lyricIndex === index ? 'normal normal 700 20px arial' : 'normal normal 400 16px arial',color:lyricIndex === index ? 'red':'black'}"
          :ref="[lyricIndex === index ? 'lyricRef' : '']"
        >
          {{ item.c }}
        </li>
      </ul>
    </div>
    <Comment :comments="songComment" :total="totalComment"> </Comment>
    <el-pagination
      background
      :page-size="limits"
      layout="prev,pager,next"
      :total="totalComment"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { getSongLyric, getSongComment } from "@/network/home";
import Comment from "./Comment";
import { mapGetters } from "vuex";
export default {
  name: "Single",
  components: {
    Comment,
  },
  data() {
    return {
      addKey: "",
      lyric: "",
      lyricArray: [],
      lyricIndex: 0,
      songComment: [],
      totalComment: 0,
      limits: 20,
      offsets: 0, //偏移数量  如:( 评论页数 -1)*20,
      rotateNum: 0,
      timer: 0,
      duration: 0, ///歌曲进度
    };
  },
  created() {
    console.log(this.getNowMusicDetail.id);
    this.getSongLyric(this.getNowMusicDetail.id);
    this.getSongComment(this.getNowMusicDetail.id);
    //唱片滚动
    this.timer = setInterval(this.rotate, 100);
  },
  methods: {
    back() {
      this.$router.back();
    },
    //获取歌词
    getSongLyric(id) {
      getSongLyric(id).then((res) => {
        this.lyric = res.lrc.lyric;
        this.resolveLyric(this.lyric);
      });
    },
    //解析歌词
    resolveLyric(lrc) {
      var oLRC = {
        ms: [], //歌词数组{t:时间,c:歌词}
      };
      if (lrc.length == 0) return;
      var lrcs = lrc.split("\n"); //用回车拆分成数组 (每一句歌词都用换行隔开了)
      for (var i in lrcs) {
        //遍历歌词数组
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        var start = 0;
        for (var k in arr) {
          start += arr[k].length; //计算歌词位置 长度叠加
        }
        var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
        for (var k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          // var t = arr[k]
          var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
          oLRC.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            // t: t,
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content === "" ? ".............." : content,
          });
        }
      }
      oLRC.ms.sort(function (a, b) {
        //按时间顺序排序
        return a.t - b.t;
      });
      for (var i in oLRC) {
        //查看解析结果
        console.log(i, ":", oLRC[i]);
      }
      this.lyricArray = oLRC.ms;
    },
    //获取歌曲评论
    getSongComment(id, limit, offset) {
      getSongComment(id, limit, offset).then((res) => {
        //  ...展开语法  如果初始offset设为大于0,那么就应该跳过热评
        if (offset > 0) {
          this.songComment = res.comments;
        } else {
          this.songComment = [...res.hotComments, ...res.comments];
        }
        this.totalComment = res.total;
      });
    },
    //唱片旋转
    rotate() {
      //  难点单纯使用rotate旋转是以中心点旋转，所以要在样式中使用transform-origin更改
      let playCircle = this.$refs.playCircle;
      playCircle.style.transform = "rotateZ(" + this.rotateNum + "deg)";
      this.rotateNum += 4;
    },
    //歌曲播放与否，改变唱片状态
    isPlaying() {
      if (this.getIsPlaying) {
        clearInterval(this.timer);
        this.timer = setInterval(this.rotate, 100);
        this.$refs.playBar.style.transform = "rotate(0deg)";
      } else {
        clearInterval(this.timer);
        this.$refs.playBar.style.transform = "rotate(-30deg)";
      }
    },
    //随着进度歌词滚动
    lyricScroll() {
      this.duration = this.getMusicDuration;
      //对每次进来的进度条进行判断
      // 跟下一句台词时长是否匹配,如果匹配则当前高亮的索引值+1
      //使用循环找到最接近当前播放时间的歌词
      for (let i = 0; i < this.lyricArray.length; i++) {
        //这里使用小于符号判断是为了 保证回退音乐进度事件的效果实现性
        //parseFloat将字符串转为浮点数,i-1才与当前的歌词匹配,
        if (this.getMusicDuration <= parseFloat(this.lyricArray[i].t)) {
          if (this.lyricIndex === i - 1) {
            break;
          }
          //找到比当前时间点 大一点的后一位的歌词的索引值
          this.lyricIndex = i - 1;
          // console.log("前"+(i-1));
          // console.log(this.lyricArray[i-1]);
          // console.log("中");
          // console.log(this.lyricArray[i]);
          // console.log("后");
          // console.log(this.lyricArray[i + 1]);
          // console.log(this.$refs.lyricRef);  打印出来居然是数组
          // console.log(this.$refs.lyricRef[0].offsetTop);
          // console.log(this.$refs.lyricScroll.scrollTop);
          // this.$refs.lyricScroll.transition = 'all .3s';
          //动态绑定ref 根据距离顶部不同的位置来控制歌词滚动 (原生的滚动条动画效果未实现，需要的话可能需要换其他滚动条，eg:bater-scroll)
          //这里加入了一个效果就是滑下去查看歌词时，不会自动滑动 只有到了高亮显示在可视区才会滚动
          // 175 是可视区的一半 55是出现离可视区距离 相当于一行高度 都可微调
          if (
            this.$refs.lyricScroll.scrollTop + 55 >
            this.$refs.lyricRef[0].offsetTop
          ) {
            console.log("不自动滑动");
          } else {
            //每行歌词的高度并不是就局限于容器那么大，所以让其等于offsetTop-150
            if (this.$refs.lyricRef[0].offsetTop > 150) {
              this.$refs.lyricScroll.scrollTop =
                this.$refs.lyricRef[0].offsetTop - 150;
            }
          }
          //如果当前是最后一句歌词 代表歌曲要放送结束了 将我们的lyricIndex(当前歌词索引值还原成0便于下一曲使用)
          if (this.lyricIndex === this.lyricArray.length - 1) {
            this.lyricIndex = 0;
          }
          break;
        }
      }
    },
    //切换评论页码
    handleCurrentChange(newPage) {
      this.offsets = (newPage - 1) * this.limits;
      this.getSongComment(this.getNowMusicDetail.id, this.limits, this.offsets);
      // this.$refs.scroll.scrollTop = 530;
    },
  },
  computed: {
    ...mapGetters(["getNowMusicDetail", "getIsPlaying", "getMusicDuration"]),
  },
  watch: {
    // 解决路由变化，页面不变化的问题
    $route: function (newUrl, oldUrl) {
      this.addKey = new Date().getTime();
      this.getSongLyric(this.getNowMusicDetail.id);
      this.getSongComment(this.getNowMusicDetail.id);
    },
    //解决如果不是路由变化，直接切换歌曲歌词评论不更新  函数名和监听的属性一样就直接这么写
    getNowMusicDetail() {
      this.rotateNum = 0;
      this.getSongComment(this.getNowMusicDetail.id);
      this.getSongLyric(this.getNowMusicDetail.id);
    },
    getIsPlaying() {
      this.isPlaying();
    },
    getMusicDuration() {
      this.lyricScroll();
    },
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.single {
  position: relative;
  width: 100%;
  height: 100%;
  left: 0;
  .single_left {
    position: absolute;
    width: 250px;
    height: 400px;
    left: 150px;
    top: 40px;
    .player_bar {
      position: absolute;
      width: 100px;
      height: 130px;
      top: 0px;
      left: 90px;
      z-index: 9999;
      transform: rotate(0deg);
      transform-origin: left top;
      transition: transform 0.5s;
    }
    .circle {
      position: absolute;
      width: 250px;
      height: 250px;
      top: 92px;
      .main_img {
        position: absolute;
        width: 150px;
        height: 150px;
        top: 54px;
        left: 50px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 150px;
        }
      }
    }
  }
  .singer_text {
    position: relative;
    width: 300px;
    height: 100px;
    text-align: center;
    top: 0px;
    left: 610px;
    .singer_text_title {
      position: absolute;
      width: 300px;
      top: 0px;
      left: -90px;
      font-weight: 400;
      font-size: 25px;
      .singer_text_info {
        font-size: 16px;
      }
    }
  }
  .lyric {
    position: relative;
    overflow: auto;
    width: 400px;
    height: 400px;
    max-height: 350px;
    top: 0px;
    left: 480px;
  }
}
.el-pagination {
  position: absolute;
  left: 240px;
  top: 515px;
}
 ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 8px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : rgb(224, 224, 224);
  }
  ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  }
</style>