<template>
  <div class="comment">
    <div class="title">
      全部评论（{{ total }}）
      <div style="height:50px">
      </div>
      <!-- 使用两个flex布局 -->
      <div class="userComment" v-for="(item, index) in comments" :key="index">
        <div class="userImg">
          <img :src="item.user.avatarUrl" alt="404" />
          <div class="talk">
            <a href="#">{{ item.user.nickname }}:</a>
            <span>{{ item.content }}</span>
            <!-- 单竖线是添加过滤器 -->
            <p>{{ item.time | showDate }}</p>
          </div>
        </div>
        <div class="operating">
          <span class="to">举报 |</span>
          <span
            ><i class="el-icon-thumb"></i
            >{{ item.likedCount > 0 ? `(${item.likedCount})` : "" }}</span
          >| <span>分享</span>|
          <span>回复</span>
        </div>
      </div>
      <div class="occupy"></div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/common/util";

export default {
  data() {
    return {};
  },
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
a {
  text-align: none;
}
.comment {
  position: relative;
  left: 250px;
  top: 0px;
  .title {
    position: absolute;
    width: 200px;
    left: 0px;
    top: 0px;
    font-weight: 700;
    font-size: 18px;
  }
  .userComment {
    position: relative;
    width: 650px;
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    border-bottom: 1px solid #f0f0f0;
    padding: 15px 0;
    font-size: 13px;
    font-weight: 400;
    a {
      color: rgb(132, 162, 199);
    }
    .userImg {
      display: flex;
      justify-content: space-between;
      margin-right: 5px;
      .talk {
        padding-left: 10px;
      }
      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }
    }

    .operating {
      position: absolute;
      bottom: 10px;
      right: 0;
      font-size: 12px;
      cursor: pointer;
      span {
        margin: 0 8px;
      }
      .to {
        display: none;
      }
    }
    .operating:hover .to {
      display: inline;
    }
  }
  .occupy {
    width: 200px;
    height: 200px;
  }
}
</style>

<style>
</style>
