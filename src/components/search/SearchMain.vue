<template>
  <div class="search">
    <h2>搜索 {{ keywords }}</h2>
    <div class="num">
      <span>找到{{ total }}首单曲</span>
    </div>
    <!-- 标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="单曲" name="first">
        <!-- 单曲表格 -->
        <div style="margin-bottom:100px">
          <el-table :data="tableData" stripe @row-dblclick="playMusic">
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="id" width="70">
              <a href="#">
                <img id="love" src="@/assets/img/喜欢.png" />
              </a>
              <div style="display: inline-block; width: 4px"></div>
              <a href="#" class="icon">
                <img id="love" src="@/assets/img/下载.png" />
              </a>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" width="480">
            </el-table-column>
            <el-table-column prop="artists[0].name" label="歌手" width="200">
            </el-table-column>
            <el-table-column prop="album.name" label="专辑" width="180">
            </el-table-column>
            <el-table-column label="时长" width="100">
              <span slot-scope="scope">{{
                scope.row.duration | timeFormat
              }}</span>
            </el-table-column>
            <!-- <el-table-column prop="dt" label="热度" width="100"> </el-table-column> -->
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="second"></el-tab-pane>
      <el-tab-pane label="专辑" name="third"></el-tab-pane>
      <el-tab-pane label="视频" name="fourth"></el-tab-pane>
      <el-tab-pane label="歌单" name="fifth"></el-tab-pane>
      <el-tab-pane label="歌词" name="sixth"></el-tab-pane>
      <el-tab-pane label="播客" name="seventh"></el-tab-pane>
      <el-tab-pane label="声音" name="eighth"></el-tab-pane>
      <el-tab-pane label="用户" name="ninth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSearch } from "@/network/search";
import { getMusicMenu, getMusicUrl } from "@/network/home";
import { songTimeFormat } from "@/common/util";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      keywords: "",
      tableData: [],
      total: 0,
      activeName: "first",
    };
  },
  created() {
    this.keywords = this.$route.params.keywords;
    this.getSearch(this.keywords, 30, 0, 1);
  },
  methods: {
    //关键词搜索
    getSearch(keywords, limit, offset, type) {
      getSearch(keywords, limit, offset, type).then((res) => {
        this.total = res.result.songCount;
        this.tableData = res.result.songs;
        res.result.songs.forEach((item) => {
          //将所有歌曲地址保存
          getMusicUrl(item.id).then((res) => {
            this.$store.commit("setMusicListUrls", res.data[0].url);
            //将每首歌曲id保存
            this.$store.commit("setSongIDS", item.id);
          });
        });
      });
    },
    //播放当前音乐
    playMusic(row) {
      this.getMusicUrl(row.id);
      this.getMusicMenu(row.id);
      this.$store.commit("setTime");
      // 如果没有点击播放所有,直接点击某首歌就单曲循环 
      this.$store.commit("setListPlay", false);
    },
    //获取当前歌曲详情
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        this.$store.commit("setNowMusicMenu", res.songs[0]);
      });
    },
    //获取当前歌曲Url
    getMusicUrl(id) {
      getMusicUrl(id).then((res) => {
        this.$store.commit("setMusicListUrl", res.data[0].url);
      });
    },
  },
  filters: {
    timeFormat(value) {
      return songTimeFormat(value);
    },
  },
  computed: {
    ...mapGetters(["getNowMusic"]),
  },
  watch: {
    /* 监听路由变化 */
    $route: function (to, from) {
      // this.addKey = new Date().getTime(); 使用这个刷新的方法没用 所以用下面的
      if (to.params.keywords === undefined) return;
      this.keywords = to.params.keywords;
      this.getSearch(this.keywords, 30, 0, 1);
    },
    //使用左右按钮切换上下首，更新歌曲详情
    getNowMusic: function () {
      // console.log("歌曲Id"+this.$store.state.nowMusicID);
      this.getMusicMenu(this.$store.state.nowMusicID);
    },
  },
};
</script>

<style lang="less" scoped>
.num {
  position: relative;
  left: 950px;
  top: 30px;
  font-size: 12px;
  color: rgb(159, 159, 159);
}
.el-table {
  #love {
    width: 16px;
    height: 16px;
  }
}
</style>