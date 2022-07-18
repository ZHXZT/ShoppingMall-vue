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
//统一引入api文件夹的全部接口函数
import * as API from '@/api';

//引入表单验证插件
import VeeValidate, { Field } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
Vue.use(VeeValidate);
//验证规则
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages,
    is:(field)=>`${field}必须和密码相同！`
  },
  attributes:{
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
  }
});
//自定义验证规则
VeeValidate.Validator.extend("agree",{
  validate:(value)=>{
    return value;
  },
  getMessage:(field)=>field + "必须同意",
})


//引入自定义插件
import myPlugins from './plugins/myPlugins';
Vue.use(myPlugins);


//引入elementUI的组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//图片懒加载插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/12.gif';
Vue.use(VueLazyload,{
//懒加载默认图片
loading:atm
});

//引入全局组件分页器
import Pagination from '@/components/Pagination';
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
//轮播图--全局组件
import Carsousel from '@/components/Carousel';
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination);



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
