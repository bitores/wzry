<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 3.75rem;
}

//iphoneX、iphoneXs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .van-tabbar {
    height: 50px;
    padding-bottom: 20px;
  }
}

//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .van-tabbar {
    height: 50px;
    padding-bottom: 20px;
  }
}

//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .van-tabbar {
    height: 50px;
    padding-bottom: 20px;
  }
}
</style>
