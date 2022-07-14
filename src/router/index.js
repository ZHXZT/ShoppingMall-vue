import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';

// 保存原来的push和replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push、replace
VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

// 配置路由
export default new VueRouter({
    routes:[
        {
            path:"/shopcart",
            component:ShopCart,
            meta:{show:true},
            name:"shopcart"
        },
        {
            path:"/addcartsuccess",
            component:AddCartSuccess,
            meta:{show:true},
            name:"addcartsuccess"
        },
        {
            path:"/detail/:skuid?",
            component:Detail,
            meta:{show:true}
        },
        {
            path:"/home",
            component:Home,
            meta:{show:true}
        },
        {
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true},
            name:"search"
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false} 

        },
        {
            path:"/login",
            component:Login,
            meta:{show:false}

        },
        {
            path:'/',
            redirect:"/home",
            meta:{show:true}

        }

    ],
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        //代表滚动条在最上
        return{y:0};
    }
})
