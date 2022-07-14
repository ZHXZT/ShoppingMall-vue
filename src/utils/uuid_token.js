import {v4 as uuidv4} from 'uuid';
//随机生成一个字符串作为游客身份

export const getUUID = ()=>{
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if(!uuid_token) {
        //生成游客临时身份
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}