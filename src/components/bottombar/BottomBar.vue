<template>
  <div class="playerbar">
    <el-row type="flex" justify="space-between">
      <el-col :span="10">
        <a href="javascript:void(0)">
          <div class="left_img" @click.stop="toSingle">
            <img :src="getNowMusicDetail.al.picUrl" alt="404" />
            <div class="left_m_img">
              <a href="javascript:void(0)" @click.stop="toSingle">
                <i
                  class="el-icon-arrow-up"
                  style="color: rgba(255, 255, 255, 0.8); font-size: 24px"
                ></i>
              </a>
            </div>
            <div class="left_font1">
              {{ getNowMusicDetail.name }}
            </div>
            <div class="left_font2">
              {{ getNowMusicDetail.ar[0].name }}
            </div>
          </div>
        </a>
      </el-col>
      <el-col :span="10">
        <div style="height: 30px">&nbsp;</div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="#" @click="preMusic"><img src="@/assets/img/上一首.png" /></a>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <a @click="pauseMusic(), isShow1()" v-if="isPlay" href="#"
          ><img src="@/assets/img/播放.png"
        /></a>
        <a @click="playMusic(), isShow2()" v-if="isPause" href="#"
          ><img src="@/assets/img/暂停.png"
        /></a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="#" @click="nextMusic"><img src="@/assets/img/下一首.png" /></a>
        <!-- 进度条 -->
        <div class="start">
          <span>{{ formatStart }}</span>
        </div>
        <el-slider
          class="progress"
          v-model="musicTime"
          :max="totalDuration"
          @change="musicDurationChange(), handleChange()"
          :show-tooltip="false"
        ></el-slider>
        <div class="end">
          <span>{{ formatEnd }}</span>
        </div>
      </el-col>
      <el-col :span="4">
        <div style="height: 30px">&nbsp;</div>
        <div class="volume" @mouseover="showVolume" @mouseout="hiddenVolume">
          <a href="#" v-if="!isMute" @click="toMute"
            ><img src="@/assets/img/音量.png"
          /></a>
          <a href="#" v-if="isMute" @click="toMute"
            ><img src="@/assets/img/静音.png"
          /></a>
          <!-- 音量条 -->
          <el-slider
            v-show="volumeShow"
            class="volume_slider"
            v-model="volume"
            @change="changeVolume"
            vertical
            height="50px"
          >
          </el-slider>
          <audio
            ref="audio"
            :src="getMusicListUrl"
            autoplay
            :loop="loop"
          ></audio>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMusicUrl, getSongListInfo } from "@/network/home";
import { formatTime } from "@/common/util";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isPlay: true,
      isPause: false,
      isUrl: true,
      isMute: false,
      volumeShow: false,
      volume: 50, //音量,
      musicTime: 0, //当前音乐播放时间
      totalDuration: 0, //总时长
      formatStart: "00:00",
      formatEnd: "00:00",
      loop: false,
    };
  },
  methods: {
    showVolume() {
      this.volumeShow = true;
    },
    hiddenVolume() {
      this.volumeShow = false;
    },
    toSingle() {
      this.$router.push("/single");
    },
    isShow1() {
      this.isPlay = !this.isPlay;
      this.isPause = !this.isPause;
    },
    isShow2() {
      this.isPause = !this.isPause;
      this.isPlay = !this.isPlay;
    },
    //控制是否静音
    toMute() {
      if (!this.isMute) {
        this.volume=0
        this.changeVolume()
        // this.$refs.audio.volume = 0;
        this.isMute = !this.isMute;
      } else {
        this.volume=50
        this.changeVolume()
        // this.$refs.audio.volume = 0.5;
        this.isMute = !this.isMute;
      }
    },
    playMusic() {
      this.$refs.audio.play();
      this.$store.commit("setIsPlaying", true);
    },
    pauseMusic() {
      this.$refs.audio.pause();
      this.$store.commit("setIsPlaying", false);
    },
    changeVolume() {
      let audio = this.$refs.audio;
      audio.volume = this.volume / 100;
    },
    preMusic() {
      this.$store.commit("setIsPlaying", true);
      this.getPreUrl;
      this.$store.state.musicListUrl = this.$store.state.nowMusic;
    },
    nextMusic() {
      this.$store.commit("setIsPlaying", true);
      //由于直接用getNextUrl返回url再赋值会undefined,所以用了nowMusic曲线救国
      this.getNextUrl;
      //直接赋值不太好，最好还是在mutations中写好
      this.$store.state.musicListUrl = this.$store.state.nowMusic;
    },
    //移动滑块改变当前音乐进度
    handleChange() {
      let audio = this.$refs.audio;
      audio.currentTime = this.musicTime;
    },
    //随着音乐播放音乐进度变化
    musicDurationChange() {
      let audio = this.$refs.audio;
      //监听时间变化,timeupdate是自带的
      audio.addEventListener("timeupdate", () => {
        this.musicTime = audio.currentTime;
        this.$store.commit("setMusicDuration", this.musicTime);
        this.totalDuration = audio.duration;
        let nowTime = formatTime(audio.currentTime);
        this.formatStart = nowTime;
        let duration = formatTime(audio.duration);
        this.formatEnd = duration;
        // 当歌曲播放结束，如果点击了列表播放就按列表顺序播放
        //没用箭头函数直接用function this指向不一样，导致报错state无法读取
        audio.addEventListener("ended", () => {
          //即使属性直接设为loop，时间到了不会跳下一首，所以只能先设属性loop为false
          if (this.$store.state.isListPlay) {
            this.nextMusic();
          } else {
            // 如果没有点击播放所有,直接点击某首歌就单曲循环  loop动态绑定失效,所以用下面的方法）
            // console.log("单曲循环");
            audio.currentTime = 0;
            audio.play();
          }
        });
      });
    },
  },
  computed: {
    ...mapGetters([
      "getMusicListUrl",
      "getPreUrl",
      "getNextUrl",
      "getUpdateTime",
      "getNowMusicDetail",
    ]),
  },
  watch: {
    getUpdateTime: function () {
      this.musicDurationChange();
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: black;
}
.playerbar {
  position: sticky;
  bottom: 0;
  background-color: rgb(252, 248, 248);
  // background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); /* 渐变 */
  img {
    width: 25px;
    height: 25px;
  }
  .left_img {
    position: absolute;
    height: 60px;
    width: 60px;
    top: 10px;
    left: 20px;
    img {
      border-radius: 5px;
    }
    .left_m_img {
      position: absolute;
      height: 24px;
      width: 24px;
      top: 10px;
      left: 20px;
    }
    .left_font1 {
      position: absolute;
      width: 300px;
      left: 80px;
      top: 10px;
    }
    .left_font2 {
      position: absolute;
      width: 200px;
      left: 80px;
      top: 40px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-row {
    height: 88px;
  }
  .start {
    position: absolute;
    width: 50px;
    left: 515px;
  }
  .progress {
    position: absolute;
    width: 250px;
    left: 570px;
    bottom: 1px;
  }
  .end {
    position: absolute;
    width: 50px;
    left: 830px;
  }
  .volume {
    .volume_slider {
      position: absolute;
      left: 1160px;
      bottom: 60px;
    }
  }
}
</style>
<style>
/* 不分两个style写进度条样式不生效 */
.progress .el-slider__bar {
  background: #ec4141;
}
.volume_slider .el-slider__bar {
  /* 线性渐变 */
  background: linear-gradient(#ec4141 0%, #f0dddd 100%);
}
.el-slider__button {
  width: 8px;
  height: 8px;
  border: 2px solid #ec4141;
  background-color: #ec4141;
}
</style>