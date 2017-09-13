# Personnel Blog
This is a one-user blog website powered by [express](http://expressjs.com). Anyone who want to use this to set up his own blog must have nodejs on their computer.

To config the webiste, copy base.config_origin.js in directory website/config to base.config.js, and specify options there.


database can be built with scripts under tools/mysql

## To Do
* logger 需要修改
* error handler 需要调整
* css 整合入相应的 js 文件中
* webpack 的配置文件需要整合
* 框架换成 koa 之后，数据库的接口统一了，前端调用有的地方需要修改
* flux 换成 redux
* 加上 ReactRouter
* article 页面过滤动作要添加