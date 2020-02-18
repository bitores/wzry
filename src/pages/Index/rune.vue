<template>
  <div>
    <van-search
      v-model="keyWord"
      class="search-input"
      placeholder="请输入铭文名"
      shape="round"
      @input="onSearch"
      input-align="center"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="item in list"
          :key="item.index"
          :desc="item.info.category | f"
          :title="item.name"
          :thumb="item.info.icon"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import data from "../../data/wzry-rune";
const runes = Object.values(data);
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      keyWord: ""
    };
  },
  filters: {
    f(v) {
      return v.join(",");
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0, ind = this.list.length; i < 10; i++, ind++) {
          if (ind < runes.length) {
            this.list.push(runes[ind]);
          }
        }
        // this.list = this.runes;
        this.loading = false;

        if (this.list.length === runes.length) {
          this.finished = true;
        }
      }, 0);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onSearch(v) {
      this.keyWord = v;
      if (v.length > 0) {
        let parts = v.split(",");
        let str = parts.reduce((it, v, i) => {
          let arr = v.split("");
          let ss = arr.reduce(
            (t, val, ind) => {
              // console.log(t)
              t.push(val, "\\S*");
              return t;
            },
            ["\\S*"]
          );

          it.push(ss.join(""));
          return it;
        }, []);

        let reg = new RegExp(str.join("|"));

        let ret = runes.filter(item => {
          // console.log(item.city, reg, reg.test(item.city));
          return (
            reg.test(item.name) ||
            reg.test(item.category) ||
            reg.test(item.color)
          );
        });

        this.list = ret;
        this.finished = true;
        console.log("结果", this.list);
        //
      } else {
        this.refreshing = true;
        this.onRefresh();
        // this.list = runes;
      }
    }
  }
};
</script>

<style>
</style>