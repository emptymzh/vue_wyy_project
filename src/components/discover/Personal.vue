<template>
  <div style="height: 800px">
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="个性推荐" name="first">
          <Swiper :swipers="swipers"></Swiper>
          <h2>推荐歌单</h2>
          <hr />
          <!-- 歌单组件 -->
          <MusicListItem :musicList="musicList"></MusicListItem>
        </el-tab-pane>
        <el-tab-pane label="专属定制" name="second">专属定制</el-tab-pane>
        <el-tab-pane label="歌单" name="third">歌单</el-tab-pane>
        <el-tab-pane label="排行榜" name="fourth">排行榜</el-tab-pane>
        <el-tab-pane label="歌手" name="fifth">歌手</el-tab-pane>
        <el-tab-pane label="最新音乐" name="sixth">最新音乐</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getPlayList, getMusicList, getSwiper } from "@/network/home";
import MusicListItem from "../musicList/MusicListItem";
import Swiper from "../swiper/Swiper";

export default {
  name: "Personal",
  components: { MusicListItem, Swiper },
  data() {
    return {
      musicList: [],
      swipers: [],
      activeName:"first"
    };
  },
  created() {
    this.getMusicList();
    this.getSwiper();
  },
  methods: {
    getPlayList() {
      getPlayList();
    },
    //获取推荐歌单
    async getMusicList() {
      this.musicList = await getMusicList();
    },
    //获取轮播图
    async getSwiper() {
      this.swipers = await getSwiper();
    },
  },
};
</script>

<style lang="less" scoped>
</style>