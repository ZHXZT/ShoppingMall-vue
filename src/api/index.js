// 对api进行统一管理
//引入二次封装的axios
import requests from "./request";
//引入模拟数据的mock
import mockRequests from './mockAjax';
// import trade from "@/store/trade";


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
//将产品添加到购物车
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"});
//获取购物车列表
export const reqCarList = ()=>requests({url:'/cart/cartList',method:'get'});
//删除购物车商品
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});
//更改购物车商品选中状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});
//获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});
//注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});
//登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});
//获取用户登录情况信息
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});
//退出登录
export const reqLogout = ()=>requests({url:"/user/passport/logout",method:'get'});
//交易页面获取用户信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});
//交易页获取商品清单
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});
//提交订单
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});
//获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});
//查询订单支付状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});
//获取订单中心数据
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});
