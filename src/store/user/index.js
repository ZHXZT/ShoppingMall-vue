//登录和注册的仓库

import {reqGetCode,reqUserLogin,reqUserRegister,reqUserInfo,reqLogout} from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token';

const state = {
    code:"",
    token:getToken(),
    userInfo:'', 
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = '';
        removeToken();
    }

};
const actions = {
    //获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        console.log(result);
        if(result.code == 200){
            commit("GETCODE",result.data);
            return "ok"
        }else{
            return Promise.reject(new Error('失败'));
        }
    },
    //用户注册
    async userRegister ({commit},user){
        let result = await reqUserRegister(user);
        if(result.code == 200){
            console.log(result);
            return "ok";
        }else if(result.code == 223){
            console.log(result);
            return Promise.reject(new Error('手机号已被注册'));
        }else{
            return Promise.reject(new Error("失败"))
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if(result.code == 200){
            commit('USERLOGIN',result.data.token);
            //设置localStorage持久化存储
            setToken(result.data.token);

            console.log(result);
            return "ok"
        }else if(result.code == 207){
            console.log(result);
            return Promise.reject(new Error("账号或密码不正确"))
        }else{
            console.log(result);

            return Promise.reject(new Error("失败"))
        }
    },
    //获取用户登录信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code == 200){
            commit("GETUSERINFO",result.data);
            console.log(result);
            return "ok"
        }else if(result.code == 208){
            console.log(result);

        }else{
            return Promise.reject(new Error('失败'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout();
        if(result.code == 200){
            console.log(result);
            commit("CLEAR");
            return "ok";
        }else{
            return Promise.reject(new Error('失败'));
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