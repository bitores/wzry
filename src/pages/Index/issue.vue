<template>
  <div>
    <van-search
      v-model="keyWord"
      class="search-input"
      placeholder="请输入题目关键词"
      shape="round"
      @input="onSearch"
      input-align="center"
    />
    <van-collapse v-model="activeIssue">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-collapse-item
            v-for="(item, ind) in list"
            :key="ind"
            :title="item.issue"
            :name="`${ind}-i`"
            >{{ item.ans }}</van-collapse-item
          >
        </van-list>
      </van-pull-refresh>
    </van-collapse>
  </div>
</template>

<script>
import issues from "../../data/wzry-issue";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      keyWord: "",
      activeIssue: []
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
          if (ind < issues.length) {
            this.list.push(issues[ind]);
          }
        }
        // this.list = this.runes;
        this.loading = false;

        if (this.list.length === issues.length) {
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

        let ret = issues.filter(item => {
          // console.log(item.city, reg, reg.test(item.city));
          return reg.test(item.issue);
        });

        this.list = ret;
        this.finished = true;
        console.log("结果", this.list);
        //
      } else {
        // this.list = issues;
        this.refreshing = true;
        this.onRefresh();
      }
    }
  }
};
</script>

<style>
</style>