import {
    reqCarList,
    reqDeleteCartById,
    reqUpdateCheckedByid
} from "@/api";

// 购物车仓库
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    //获取购物车列表
    async getCartList({
        commit
    }) {
        let result = await reqCarList();
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
            console.log(result);
        }
    },
    //删除购物车商品
    async deleteCartListBySkuId({
        commit
    }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    //修改购物车商品选中状态
    async updateCheckedById({
        commit
    }, {
        skuId,
        isChecked
    }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error('失败'));
        }
    },
    //删除全部勾选商品
    //context:小仓库数据；dispatch：派发action；
    deleteAllCheckedCart({
        dispatch,
        getters
    }) {
        let PromiseAll = [];
        //遍历购物车的每种商品，删除选中的
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            PromiseAll.push(promise);
        });
        //   有一个失败就返回失败，全部成功返回成功
        return Promise.all(PromiseAll);
    },
    //全选按钮
    updateAllCartIsChecked({
        dispatch,
        state
    }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch("updateCheckedById", {
                skuId: item.skuId,
                isChecked
            });
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}