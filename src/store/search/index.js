import { reqGetSearchInfo } from "@/api";


//search的小仓库
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    //search模块数据
    async getSearchList({commit},params={}){
        //params是形参，保证至少传递一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            commit("GETSEARCHLIST",result.data);
        }
    }
};
//getters用于简化仓库的数据
const getters = {
goodsList(state){
    return state.searchList.goodsList||[];
},
trademarkList(state){
    return state.searchList.trademarkList;
},
attrsList(state){
    return state.searchList.attrsList;
}
};

export default {
    state,
    mutations,
    actions,
    getters,
}
