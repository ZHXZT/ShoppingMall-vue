import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from './router'
//引入仓库
import store from './store';
//引入mockServer.js模拟数据
import './mock/mockServer';
//引入swiper样式
import "swiper/css/swiper.css"

//引入elementUI的组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入全局组件分页器
import Pagination from '@/components/Pagination';
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
//轮播图--全局组件
import Carsousel from '@/components/Carousel';
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination);



//统一引入api文件夹的全部接口函数
import * as API from '@/api';


new Vue({
  render: h => h(App),

  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册router，让全部组件都可以获取到$route和$router属性
  router,
  //注册store，让每一个组件身上都有$store属性
  store
}).$mount('#app')
