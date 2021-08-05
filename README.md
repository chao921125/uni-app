# mini-app（小程序专属，其他不支持）

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```
┌─uniCloud              云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
├─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                App端存放本地html文件的目录，详见
├─platforms             存放各平台专用页面的目录，详见
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─uni_modules           存放[uni_module](/uni_modules)规范的插件。
├─wxcomponents          存放小程序组件的目录，详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
```
```
有效目录	说明
app-plus	App
h5	H5      请忽略该项以及所有关于h5配置，（TMD报错）
mp-weixin	微信小程序
mp-alipay	支付宝小程序
mp-baidu	百度小程序
```
```
┌─wxcomponents                  微信小程序自定义组件存放目录
│   └──custom                   微信小程序自定义组件
│        ├─index.js
│        ├─index.wxml
│        ├─index.json
│        └─index.wxss
├─mycomponents                  支付宝小程序自定义组件存放目录
│   └──custom                   支付宝小程序自定义组件
│        ├─index.js
│        ├─index.axml
│        ├─index.json
│        └─index.acss
├─swancomponents                百度小程序自定义组件存放目录
│   └──custom                   百度小程序自定义组件
│        ├─index.js
│        ├─index.swan
│        ├─index.json
│        └─index.css
├─pages
│  └─index
│        └─index.vue
│
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

# 注意点
所有用到的图片需要转成base64 \
~@添加路径前缀

只有使用HBuildX工具开发需要修改node-sass包里的文件 \
darwin-x64-72_binding.node(此文件需要跟随node版本进行下载替换) \
node-sass/vendor/darwin-x64-72/binding.node
