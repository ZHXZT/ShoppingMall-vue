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
const getters = {}
export default{
    state,
    mutations,
    actions,
    getters
}