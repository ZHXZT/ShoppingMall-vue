//自定义插件

// vue插件对外暴露一个对象
let myPlugins = {};

myPlugins.install = function(){
    console.log('自定义插件调用了');
}

export default myPlugins;