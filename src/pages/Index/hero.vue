<template>
  <div class="hero">
    <van-search
      v-model="keyWord"
      class="search-input"
      placeholder="请输入英雄信息"
      shape="round"
      @input="onSearch"
      input-align="center"
    />
    <van-collapse v-model="activeP" accordion :border="false">
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
            :desc="equipment(item.equipment[0].list)"
            :title="`${item.tit}(${item.category}-${item.type})`"
            :thumb="item.icon"
          >
            <van-grid slot="desc" :column-num="6">
              <van-grid-item
                v-for="i in item.equipment[0].list"
                :key="i.name"
                :icon="i.icon"
              >
                <p slot="text">{{ i.name }}</p>
              </van-grid-item>
            </van-grid>
            <div slot="footer">
              <van-collapse-item
                title="出装分析"
                :name="`${item.index}-detail`"
                :border="false"
              >
                <div>{{ item.equipment[0].detail }}</div>
              </van-collapse-item>
              <van-collapse-item
                title="英雄属性"
                :name="item.index"
                :border="false"
              >
                <van-row>
                  <van-col span="12">
                    <van-cell-group>
                      <van-field
                        v-for="p in allProps[0]"
                        :key="p"
                        :label="`${p}: `"
                        :value="item[p]"
                        readonly
                      />
                    </van-cell-group>
                  </van-col>
                  <van-col span="12">
                    <van-field
                      v-for="p in allProps[1]"
                      :key="p"
                      :label="`${p}: `"
                      :value="item[p]"
                      readonly
                    />
                  </van-col>
                </van-row>
              </van-collapse-item>
            </div>
          </van-card>
        </van-list>
      </van-pull-refresh>
    </van-collapse>
  </div>
</template>

<script>
import heroes from "../../data/wzry-hero";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      keyWord: "",
      activeP: ["1"],
      allProps: [
        [
          //基础属性
          "最大生命",
          "最大法力",
          "物理攻击",
          "法术攻击",
          "物理防御",
          "法术防御",
          // 防御属性
          "韧性",
          "生命回复",
          "法力回复"
        ],
        // ["物理减伤率", "法术减伤率"],
        [
          // 攻击属性
          "移速",
          "物理穿透",
          "法术穿透",
          "攻速加成",
          "暴击几率",
          "暴击效果",
          "物理吸血",
          "法术吸血",
          "冷却缩减"
          // "攻击范围"
        ]
      ]
    };
  },

  methods: {
    equipment(v) {
      return v.map(i => i.name).join(",");
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }

        for (let i = 0, index = this.list.length; i < 10; i++, index++) {
          if (index < heroes.length) {
            this.list.push(heroes[index]);
          }
        }
        // this.list = heroes;
        this.loading = false;

        if (this.list.length === heroes.length) {
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
        let arr = v.split("");
        let str = arr.reduce(
          (t, val, ind) => {
            // console.log(t)
            t.push(val, "\\S*");
            return t;
          },
          ["\\S*"]
        );

        let reg = new RegExp(str.join(""));

        let ret = heroes.filter(item => {
          // console.log(item.city, reg, reg.test(item.city));
          return (
            reg.test(item.tit) || reg.test(item.category) || reg.test(item.type)
          );
        });

        this.list = ret;
        console.log("结果", this.list);
        //
      } else {
        this.list = heroes;
      }
    }
  }
};
</script>

<style lang="less">
.hero {
  .van-grid-item__content {
    padding: 10px 0 0 0;
    background-color: transparent;

    p {
      height: 40px;
    }
  }

  .van-card__price {
    width: 100%;
  }

  .van-collapse-item {
    text-align: left;
  }

  .van-collapse-item__content {
    padding: 0;
  }
}
</style>