# HTTP Request && API

Store

# pages/demo 目录下页面需要手动添加path访问，并且部分引用文件需要自行修改对应的正确的目录
# pages/components 目录下页面需要手动引用，针对性引用，并非所有页面都适合
# uni-modules 目录下文件无需引用直接使用，此类组件封装注意兼容性
# components 根目录下这个目录存放的是公共的组件，和uni-modules类似，但是需要自行引用

 + env(safe-area-inset-bottom)

## 适配暗黑模式，还未测试
https://developers.weixin.qq.com/miniprogram/dev/framework/ability/darkmode.html
1、小程序和H5一定要用UNI的判断隔断，同时配置好代理
2、调试小程序的时候一定将请求地址修改为IPV4，即非127.0.0.1和localhost的地址
