<template>
  <div>
    <component :is="part"></component>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/hero" icon="home-o">英雄池</van-tabbar-item>
      <van-tabbar-item to="/equip" icon="search">装备库</van-tabbar-item>
      <van-tabbar-item to="/rune" icon="search">铭文库</van-tabbar-item>
      <van-tabbar-item to="/issue" icon="search">试炼题库</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Hero from "./hero";
import Equip from "./equip";
import Rune from "./rune";
import Issue from "./issue";
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    Hero,
    Equip,
    Rune,
    Issue
  },
  beforeMount() {
    let active = ["/hero", "/equip", "/rune", "/issue"].indexOf(
      this.$route.path
    );

    console.log(this.$route, active);

    this.active = active < 0 ? 0 : active;

    console.log(this.active);
  },
  computed: {
    part() {
      return ["hero", "equip", "rune", "issue"][this.active];
    }
  }
};
</script>

<style>
</style>