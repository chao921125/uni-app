```text
1. vant 样式修改方式：1、行内；2、标签加名称，内容额外使用view等内置组件；3、添加 ::v-deep 修改
2. pages/demo 目录下页面需要手动添加path访问，并且部分引用文件需要自行修改对应的正确的目录
3. pages/components 目录下页面需要手动引用，针对性引用，并非所有页面都适合
4. uni-modules 目录下文件无需引用直接使用，此类组件封装注意兼容性
5. components 根目录下这个目录存放的是公共的组件，和uni-modules类似，但是需要自行引用
6. cover-image 不再使用，使用 image 替换 cover-view 使用 view 替换
7. 静态图片直接使用绝对路径即可，请勿再import
8. 如果无法正常打开开发者工具，请将/src/manifest.json中的微信ID删除掉即可
9. vant-weap 无需引入 common definitions mixins wxs
10. vant-weap 废弃 panel
```

# 注意：此项目仅支持微信小程序，其他端一概没有做适配，请勿运行。

# 推荐UI及各种插件 [点击前往](https://github.com/chao921125/vue-vite)

# APP 离线打包
###### [APK](https://nativesupport.dcloud.net.cn/AppDocs/download/android.html)
###### [IOS](https://nativesupport.dcloud.net.cn/AppDocs/download/ios.html)
