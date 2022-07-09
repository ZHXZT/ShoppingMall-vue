import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api";
//home的小仓库
const state = {
    //home仓库三级菜单的数据
    categoryList:[],
    //hoem轮播图的数据
    bannerList:[],
    //floor轮播图数据
    floorList:[],
};
//唯一修改state的地方
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
//处理用户派发action的地方
const actions = {
    //获取三级联动的数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code == 200){
            commit("CATEGORYLIST",result.data);
        }
    },
//获取轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code == 200){
            commit("GETBANNERLIST",result.data);
        }
    },
    //获取floor轮播图数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code == 200){
            commit("GETFLOORLIST",result.data);
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}
