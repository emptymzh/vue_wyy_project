<template>
<div class="main">
   <div class="back-img">
        <img
          src="./assets/img/preview.jpg"
          style="width:100%;filter:blur(80px);"
        />
      </div>
 <div id="app" >
    <router-view></router-view>
 </div>
</div>

</template>

<script>
export default {
  name:'app',
  data(){
    return{}
  },
}
</script>

<style lang="less" scoped>
.main{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#app {
  width: 1400px;
  height: 850px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  overflow: hidden;
  position: absolute;
  background: #fff;
}
.back-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>