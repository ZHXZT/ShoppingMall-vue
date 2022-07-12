// 对api进行统一管理
//引入二次封装的axios
import requests from "./request";
//引入模拟数据的mock
import mockRequests from './mockAjax';

// 三级联动接口
export const reqCategoryList = ()=>requests.get('/product/getBaseCategoryList');

//home首页轮播图接口
export const reqGetBannerList = ()=>mockRequests.get('/banner');
//home首页的floor轮播图
export const reqFloorList = ()=>mockRequests.get('/floor');
//搜索模块的
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params});
//商品详情页的
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});
