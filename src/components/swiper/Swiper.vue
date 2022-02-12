<template>
  <div class="swiper">
    <el-carousel :interval="2000" type="card" height="180px">
      <el-carousel-item v-for="(item, index) in swipers" :key="index">
        <el-image :src="item.imageUrl" fit="contain"> </el-image>
        <el-tag
          :type="item.typeTitle === '活动' ? 'danger' : 'primary'"
          effect="dark"
          style="
            position: absolute;
            top: 76%;
            right: 0;
            border-radius: 10px 0 0 10px;
            height: 25px;
            line-height:25px;
          "
        >
          {{ item.typeTitle }}
        </el-tag>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    swipers: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 1200px;
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>