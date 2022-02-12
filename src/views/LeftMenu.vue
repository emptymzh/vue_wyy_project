<template>
  <div style="height: 850px; overflow: auto">
    <el-menu default-active="1" active-text-color="red">
      <el-menu-item-group>
        <el-menu-item index="1-1" @click="toHome"> 发现音乐 </el-menu-item>
        <el-menu-item index="1-2"> 播客 </el-menu-item>
        <el-menu-item index="1-3"> 关注 </el-menu-item>
        <el-menu-item index="1-4"> 直播 </el-menu-item>
        <el-menu-item index="1-5"> 私人FM </el-menu-item>
      </el-menu-item-group>
      <el-submenu index="2">
        <template slot="title">我的音乐</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"
            ><i class="el-icon-download"></i>本地与下载</el-menu-item
          >
          <el-menu-item index="2-2"
            ><i class="el-icon-pie-chart"></i>最近播放</el-menu-item
          >
          <el-menu-item index="2-3"
            ><i class="el-icon-cloudy"></i>我的音乐云盘</el-menu-item
          >
          <el-menu-item index="2-4"
            ><i class="el-icon-coin"></i>我的播客</el-menu-item
          >
          <el-menu-item index="2-5"
            ><i class="el-icon-star-off"></i>我的收藏</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">创建的歌单</template>
        <el-menu-item-group>
          <el-menu-item
            @click="toSongList(item.id)"
            :index="'3-' + index"
            v-for="(item, index) in getUserSongList"
            :key="item.id"
          >
            <i :class="index === 0 ? 'el-icon-star-on' : 'el-icon-s-data'"></i
            >{{ item.name.length>6 ? item.name.slice(0,7)+'...' : item.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getUserSongList,getStatus } from "@/network/login";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addKey:''
    };
  },
  methods: {
    toSongList(id) {
      this.$store.commit("setSongSheetID", id);
      this.$router.push("/songs" + id);
      getStatus().then((res)=>{
        console.log(res.data);
      })
    },
    toHome(){
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["getUserSongList"]),
  },
};
</script>

<style lang="less" scoped>
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
  // box-shadow   :inset 0 0 5px  rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  // background   : rgba(255, 255, 255, 0.8)
  }
</style>