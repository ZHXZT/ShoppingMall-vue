// 对axios进行二次封装
import axios from "axios";
// 引入进度条插件
import nprogress from "nprogress";
import "nprogress/nprogress.css"


// 利用axios方法create创建一个axios实例
const requests = axios.create({
    //基础路径
    baseURL:"/mock",
    // 请求超时时间
    timeout:5000,
});

// 请求拦截器，发送请求前做一些事情
requests.interceptors.request.use((config)=>{
    // 进度条开始
    nprogress.start();
    // 配置对象，里面的headers请求头很重要
    return config;

});

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('false'))
});


// 对外暴露
export default requests;