<template>
  <div>
    <div class="center">
      <div class="musiclistitem" v-for="item in musicList" :key="item.id">
        <div class="right_title">
          <i
            class="el-icon-caret-right"
            style="paddingtop: 4px; paddingleft: 15px"
          ></i>
          <span>{{
            item.playCount >= 10000
              ? (item.playCount / 10000).toFixed(0) + "万"
              : item.playCount
          }}</span>
        </div>
        <a href="#">
          <img :src="item.picUrl" class="image" />
        </a>

        <a href="#">{{ item.name }}</a>
      </div>
      <!-- <ul>
        <li v-for="item in musicList" :key="item.id">
          <div class="right_title">
            <i
              class="el-icon-headset"
              style="paddingtop: 4px; paddingleft: 15px"
            ></i>
            <span>{{
              item.playCount >= 10000
                ? (item.playCount / 10000).toFixed(0) + "万"
                : item.playCount
            }}</span>
          </div>
          <a href="#">
            <img :src="item.picUrl" class="image" />
          </a>
          <a href="#">{{ item.name }}</a>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicListItem",
  props: {
    musicList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.center {
  width: 1200px;
  margin-bottom:200px;
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    color: pink;
  }
  .musiclistitem {
    display: inline-block;
    position: relative;
    width: 200px;
    height: 260px;
    /*不加overflow item会出现所在的高度不同*/
    overflow: hidden;
    padding: 10px;
    cursor: pointer;
    .right_title {
      position: absolute;
      right: 20px;
      font-size: 12px;
      color: #fff;
    }
  }
  .image {
    height: 200px;
    width: 200px;
    border-radius: 5px;
  }
}
</style>