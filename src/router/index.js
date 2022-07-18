import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter);

// 引入路由组件(替换成 路由懒加载写法 )
// import Home from '@/pages/Home';
// import Search from '@/pages/Search';
// import Register from '@/pages/Register';
// import Login from '@/pages/Login';
// import Detail from '@/pages/Detail';
// import AddCartSuccess from '@/pages/AddCartSuccess';
// import ShopCart from '@/pages/ShopCart';
// import Trade from '@/pages/Trade';
// import Pay from '@/pages/Pay';
// import PaySuccess from '@/pages/PaySuccess';
// import Center from '@/pages/Center';
//二级路由
// import MyOrder from '@/pages/Center/myOrder';
// import GroupOrder from '@/pages/Center/groupOrder';


//引入仓库
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

//当项目打包时，js包会变得非常大影响页面加载；
//路由懒加载：把不同路由对应的组件分割成不同代码快，当被访问才加载对应组件
// 配置路由
let router = new VueRouter({
    routes:[
        {
            path:"/center",
            component:()=>import('@/pages/Center'),
            meta:{show:true},
            name:"center",
            children:[
                {
                    path:"myorder", 
                    component:()=>import('@/pages/Center/myOrder'),
                },
                {
                    path:"grouporder",
                    component:()=>import('@/pages/Center/groupOrder'),
                },
                //路由重定向，默认显示myorder
                {
                    path:"/center",
                    redirect:'/center/myorder'
                }
            ]
        },
        {
            path:"/paysuccess",
            component:()=>import('@/pages/PaySuccess'),
            meta:{show:true},
            name:"paysuccess"
        },
        {
            path:"/pay",
            component:()=>import('@/pages/Pay'),
            meta:{show:true},
            name:"pay",
            //路由独享守卫
            beforeEnter:(to,from,next)=>{
                if(from.path == '/trade' || from.path == '/'){
                    next()
                }else{
                    next(false);
                }
            }

        },
        {
            path:"/trade",
            component:()=>import('@/pages/Trade'),
            meta:{show:true},
            name:"trade",
            //路由独享守卫
            beforeEnter:(to,from,next)=>{
                //只能从购物车页面跳到交易页
                if(from.path == '/shopcart' || from.path == '/' ){
                    next();
                }else{
                    next(false);
                }
            },
        },
        {
            path:"/shopcart",
            component:()=>import('@/pages/ShopCart'),
            meta:{show:true},
            name:"shopcart"
        },
        {
            path:"/addcartsuccess",
            component:()=>import('@/pages/AddCartSuccess'),
            meta:{show:true},
            name:"addcartsuccess"
        },
        {
            path:"/detail/:skuid?",
            component:()=>import('@/pages/Detail'),
            meta:{show:true}
        },
        {
            path:"/home",
            component:()=>import('@/pages/Home'),
            meta:{show:true}
        },
        {
            path:"/search/:keyword?",
            component:()=>import('@/pages/Search'),
            meta:{show:true},
            name:"search"
        },
        {
            path:"/register",
            component:()=>import('@/pages/Register'),
            meta:{show:false} 

        },
        {
            path:"/login",
            component:()=>import('@/pages/Login'),
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
        if(to.path == '/login' || to.path == '/register' ){
            next('/');
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
        //未登录
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //把未登录时进不去的地址存储到地址栏
            next('/login?redirect=' + toPath);
        }else{
            next();        
        }
    }
});

export default router;
