```
{  
"id": "H512345",               //必填  
"name": "应用名称",             //必填  
"version": {  
"name": "1.0",             //必填，推荐使用.分割，如1.0  
"code": "10"               //必填，纯数字  
},  
"launch_path": "入口页面",      //必填  
"description": "应用描述信息",  //可选  
"icons": {                     //可选，以分辨率为索引键名  
"72": "图标路径"  
},  
"developer": {  //选填，开发者信息  
"name": "开发者名称",  
"email": "开发者邮箱地址",   
"url": "开发者网站"  
},  
"screenOrientation": [ //应用支持的屏幕方向  
"portrait-primary",   //竖屏  
"portrait-secondary", //竖屏（反向），上下颠倒  
"landscape-primary",  //横屏，Home键在右侧  
"landscape-secondary" //横屏（反向），Home键在左侧  
],  
"permissions": {  //5+模块，uni-app项目对应节点为"app-plus" -> "modules"  
"Accelerometer": {  
"description": "加速度传感器"  
}  
},  
"plus": {   // 5+扩展配置, uni-app项目对应节点为"app-plus"  
"allowsInlineMediaPlayback":"true|false",  //可选，是否允许video标签非全屏播放 （仅iOS生效）  
"mediaPlaybackRequiresUserAction":"true|false", //可选，可通过此属性配置h5中的音频是否自动播放，注意当设置为false时开启自动播放，默认为true（仅iOS生效 HX3.0.1 + 版本支持）  
"appWhitelist": [    //可选，应用白名单列表（Android平台为apk下载地址，iOS平台为appstore地址）  
],  
"arguments": "",    //可选，预设应用的启动参数  
"cache": {          //可选，缓存配置  
},  
"cers": {           //可选，异常错误反馈配置  
},  
"channel": "",       //可选，渠道信息  
"confusion": {       //可选，原生js文件混淆配置  
},  
"distribute": {      //必选，云端打包配置  
},  
"error": {          //可选，错误页面配置  
},  
"locales": {         //可选，国际化配置  
}  
"nativePlugins": {    //可选，原生插件相关配置  
},  
"popGesture": "none|close|hide",    //可选，侧滑返回功能配置  
"kernel": {          //可选，Webview渲染内核配置  
},  
"runmode": "normal|liberate",      //可选，运行模式  
"safearea": {        //可选，安全区域配置  
},  
"schemeWhitelist":[  //可选，Scheme白名单列表https://ask.dcloud.net.cn/article/94  
],  
"splashscreen": {    //可选，splash界面配置  
},  
"ssl": {             //可选，SSL配置  
},  
"softinput": {       //可选，软键盘配置  
},  
"statusbar": {       //可选，系统状态栏配置  
},  
"useragent": {       //可选，UA配置  
},  
"launchwebview": {   //可选，应用首页配置  
},  
"secondwebview": {   //可选，应用双首页配置  
},  
"uni-app": {        //可选，uni-app应用的配置  
},  
"compatible": {      //可选，编译器兼容性配置  
},  
"wap2app": {         //可选，wap2app相关配置  
},  
}  
}
```
