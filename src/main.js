import Vue from 'vue'
import App from './App.vue'
import "./index.less"
import VueRouter from 'vue-router';
import routes from './router'
import { Tab, Tabs, List, PullRefresh, Card, Tabbar, TabbarItem, Search, Grid, GridItem, Collapse, CollapseItem, Cell, CellGroup, Field, Col, Row } from 'vant';

Vue.config.productionTip = false
Vue.use(VueRouter).use(Tab).use(Tabs).use(List).use(PullRefresh).use(Card).use(Tabbar).use(TabbarItem).use(Search).use(Grid).use(GridItem).use(Collapse).use(CollapseItem).use(Field).use(Col).use(Row).use(Cell).use(CellGroup);

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
