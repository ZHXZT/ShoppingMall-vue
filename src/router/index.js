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

import store from "@/store";


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
let router = new VueRouter({
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

//全局路由守卫
router.beforeEach(async(to,from,next)=>{
    // to:可获取到跳转到的路由信息
    //from：可获取到从那个路由来的信息
    // next：放行函数
    let token = store.state.user.token;
    //用户信息
    let name = store.state.user.userInfo.name;
    //用户已经登录
    if(token){
        //已经登录还去login，留在首页
        if(to.path == '/login'){
            next('/home');
        }else{
            //登录，去的不是login
            //如果用户名已经有
            if(name){
                next();
            }else{
                //没有用户信息，派发action，让仓库存储用户信息在跳转
                try{
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                }catch(error){
                    //token失效获取不到用户信息。重新登录
                    await store.dispatch('userLoginout');
                    next('/login');
                }
            }
        }
    }else{
        //未登录暂时未处理
        next();
    }
});

export default router;
