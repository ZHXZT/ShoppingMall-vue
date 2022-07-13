import { reqGoodsInfo } from "@/api"
const state = {
    goodInfo:{}
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