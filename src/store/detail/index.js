import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from "@/utils/uuid_token";
const state = {
    goodInfo:{},
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
}
const actions = {
    //获取商品详情
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code == 200){
            commit("GETGOODINFO",result.data);
        }else{
            console.log(result);
        }
    },
    //将产品加入购物车和修改购物车商品数目
    //加入购物车后服务器并没有返回数据，不需要三连环存储数据
     async addOrUpdateShopCart({commit},{skuId,skuNum}){
         let result = await reqAddOrUpdateShopCart(skuId,skuNum);
         if(result.code == 200){
             return "ok"
         }else{
             return Promise.reject(new Error('失败'))
         }
     }
}
//简化数据用的
const getters = {
    //简化路径导航
    categoryView(state) {
        //state.goodInfo初始为空对象，空对象的categoryView属性值为undefined
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //简化产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}