<template>
  <div>
    <el-table :data="tableData" @row-dblclick="playMusic" stripe>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="id" label="操作" width="70">
        <a href="#">
          <img id="love" src="@/assets/img/喜欢.png" />
        </a>
        <div style="display: inline-block; width: 4px"></div>
        <a href="#" class="icon">
          <img id="love" src="@/assets/img/下载.png" />
        </a>
      </el-table-column>
      <el-table-column prop="name" label="标题" width="480"> </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="200">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" width="180">
      </el-table-column>
      <el-table-column prop="dt" label="时间" width="100"> </el-table-column>
    </el-table>
    <div style="height: 200px">
      <span>标有</span>
      <img src="@/assets/img/云盘.png" style="width: 16px; height: 16px" />
      <span>的音乐是我的云盘文件，其他用户无法查看</span>
    </div>
  </div>
</template>

<script>
import { getSongListInfo, getMusicUrl, getMusicMenu } from "@/network/home";
import { mapGetters } from "vuex";
import { songTimeFormat } from "@/common/util";

export default {
  name: "SongTable",
  data() {
    return {
      tableData: [],
      id: "",
      loading: true,
    };
  },
  created() {
    console.log("歌单的id：" + this.$store.state.songSheetID);
    this.$store.commit("setMusicListUrlsNull");
    this.getSongListInfo(this.$store.state.songSheetID);
  },
  methods: {
    /* 根据歌单id获取其中所有的歌曲信息*/
    getSongListInfo(id) {
      getSongListInfo(id).then((res) => {
        res.playlist.tracks.forEach((item) => {
          item.dt = songTimeFormat(item.dt);
          //将所有歌曲地址保存
          getMusicUrl(item.id).then((res) => {
            this.$store.commit("setMusicListUrls", res.data[0].url);
            //将每首歌曲id保存
            this.$store.commit("setSongIDS", item.id);
          });
        });
        this.tableData = res.playlist.tracks;
      });
    },
    playMusic(row) {
      // scope.row的简化
      console.log(row.id);
      this.$store.commit('setIsPlaying',true)
      this.getMusicUrl(row.id);
      this.getMusicMenu(row.id);
      /* bottombar 监听着setTime变化，进度条随之变化 */
      this.$store.commit("setTime");
      // 如果没有点击播放所有,直接点击某首歌就单曲循环 
      this.$store.commit("setListPlay", false);
    },
    //设置播放地址
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit("setMusicListUrl", res.data[0].url);
      });
    },
    //获取歌曲详情
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit("setNowMusicMenu", res.songs[0]);
      });
    },
  },
  computed: {
    ...mapGetters(["getNowMusic"]),
  },
  watch: {
    //使用左右按钮切换上下首，更新歌曲详情
    getNowMusic: function () {
      // console.log("歌曲Id"+this.$store.state.nowMusicID);
      this.getMusicMenu(this.$store.state.nowMusicID);
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  #love {
    width: 16px;
    height: 16px;
  }
}
</style>