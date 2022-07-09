import Mock from 'mockjs';
//把json数据引入（webpack默认对外暴露图片和json数据格式）
import banner from './banner.json';
import floor from './floor.json';

//模拟数据：第一个参数为请求地址，第二个参数为请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});
