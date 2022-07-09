import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
//引入仓库
import store from './store';
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
//轮播图--全局组件
import Carsousel from '@/components/Carousel';
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel)
//引入mockServer.js模拟数据
import './mock/mockServer';
//引入swiper样式
import "swiper/css/swiper.css"




new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
