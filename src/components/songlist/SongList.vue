<template>
  <div
    :key="addKey"
    style="height: 850px; overflow: auto"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <!-- 歌曲表格上方 -->
    <div class="right_top_musiclist">
      <!--  v-if="songList.coverImgUrl"-->
      <div v-if="songList.coverImgUrl" class="right_coverImg">
        <img :src="songList.coverImgUrl" alt="404" />
      </div>
      <div class="right_title">
        <span>{{ songList.name }}</span>
      </div>
      <div class="right_center">
        <div class="right_userImg">
          <img :src="user.avatarUrl" alt="404" />
        </div>
        <div class="right_time">
          <span>{{ user.nickname }}</span>
          <span>创建</span>
        </div>
      </div>
      <div class="right_btn">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-video-play"
          @click="playAll"
        >
        </el-button>
        <el-button size="small" icon="el-icon-star-off"
          >收藏({{ songList.subscribedCount }})</el-button
        >
        <el-button size="small" icon="el-icon-thumb"
          >分享({{ songList.shareCount }})</el-button
        >
        <el-button size="small" icon="el-icon-download">下载全部</el-button>
      </div>
      <div class="right_bottom">
        <div class="tag">标签: <a href="#">添加标签</a></div>
        <div class="song">
          歌曲:{{ songList.trackCount }}&nbsp;&nbsp;&nbsp;&nbsp; 播放:{{
            songList.playCount
          }}
        </div>
        <div class="brief">添加: <a href="#">添加简介</a></div>
      </div>
    </div>
    <!-- 歌曲表格 -->
    <div class="song_table">
      <el-tabs v-model="activePage">
        <el-tab-pane label="歌曲列表" name="first">
          <SongTable></SongTable>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second"></el-tab-pane>
        <el-tab-pane label="收藏者" name="third"></el-tab-pane>
      </el-tabs>
      <!-- 搜索框 -->
      <div class="search">
        <el-input
          v-model="input"
          placeholder="搜索歌单音乐"
          size="mini"
          suffix-icon="el-icon-search"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import SongTable from "./SongTable";
import { getSongListInfo, getMusicUrl } from "@/network/home";

export default {
  name: "SongList",
  components: {
    SongTable,
  },
  data() {
    return {
      addKey: "",
      activePage: "first",
      input: "",
      id: 0,
      songList: {}, //存某个歌单的数据
      user: [], //用户信息
      loading: true,
    };
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.getSongListInfo(this.id);
  },
  methods: {
    //获取歌单详情
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
        this.songList = res.playlist;
        this.user = res.playlist.creator;
        // console.log("用户信息" + this.user);
      });
      this.loading = false;
    },
    playAll() {
      this.$store.commit("setMusicListUrl", this.$store.state.musicListUrls[0]);
      this.$store.commit("setListPlay", true);
      /* bottombar 监听着setTime变化，进度条随之变化 */
      this.$store.commit("setTime");
    },
  },
  watch: {
    // 解决路由变化，页面不变化的问题
    $route: function (newUrl, oldUrl) {
      this.addKey = new Date().getTime();
      //拿到id再次请求歌单详情
      //这里加个判断，因为single页面也会被监听
      if (newUrl.params.id === undefined) {
        return;
      } else {
        this.id = parseInt(newUrl.params.id);
        this.getSongListInfo(this.id);
      }
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-align: none;
  color: #82dddd;
}
img {
  width: 100%;
  height: 100%;
}
.right_top_musiclist {
  position: relative;
  left: 0;
  height: 250px;
  width: 80%;
  .right_coverImg {
    width: 180px;
    height: 180px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .right_title {
    position: absolute;
    left: 190px;
    top: 0px;
  }
  .right_center {
    position: absolute;
    left: 190px;
    top: 40px;
    width: 200px;
    height: 24px;
    .right_userImg {
      width: 24px;
      height: 24px;
      img {
        border-radius: 50%;
      }
    }
    .right_time {
      position: absolute;
      width: 200px;
      left: 30px;
      top: 0px;
    }
  }
  .right_btn {
    position: absolute;
    width: 600px;
    left: 190px;
    top: 80px;
  }
  .right_bottom {
    position: absolute;
    width: 200px;
    left: 190px;
    top: 100px;
    .tag {
      position: absolute;
      width: 150px;
      left: 0px;
      top: 20px;
    }
    .song {
      position: absolute;
      width: 250px;
      left: 0px;
      top: 45px;
    }
    .brief {
      position: absolute;
      width: 150px;
      left: 0px;
      top: 69px;
    }
  }
}
.song_table {
  position: relative;
  width: 100%;
  left: 0;
}
.search {
  width: 180px;
  height: 30px;
  position: absolute;
  top: 0px;
  left: 900px;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  // box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(224, 224, 224);
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
}
</style>