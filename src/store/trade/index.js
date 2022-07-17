import {reqAddressInfo,reqOrderInfo} from '@/api';


const state = {
    address:[],
    orderInfo:{}
};
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo;
    }
};
const actions = {
    //交易页获取用户信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo();
        if(result.code == 200){
            console.log(result);
            commit("GETUSERADDRESS",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    // 交易页获取商品清单
    async getOrderInfo({commit}){
        let result = await reqOrderInfo();
        if(result.code == 200){
            console.log(result);
            commit("GETORDERINFO",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error('失败'))
        }
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}