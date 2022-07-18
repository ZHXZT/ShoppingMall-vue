module.exports = {
    // 打包不输出map文件
    productionSourceMap:false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
      proxy: {
        "/api": {
          target: "http://gmall-h5-api.atguigu.cn",
        },
      },
    },
  };
   