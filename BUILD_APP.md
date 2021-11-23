# 请阅读：配置文件在config目录下
# [UniAPP官方文档地址](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/ios)
# Android 为安卓打包项目以及配置
# 前置条件
```
1、发行、打包APP、生成本地APP资源，记住当前的appid，对应uniapp开发者后台的那个id
2、将打包后的资源复制到离线SDK那个项目目录下
3、用android studio生成key，keytool -list -v -keystore myKey.keystore 查看sh1对应的值(https://ask.dcloud.net.cn/article/35777)
4、找到包路径，然后一起将sh1的值，在管理后台生成hash值
5、多个包需要修改 android:authorities="${applicationId}.fileprovider"
6、每一次打包都需要修改的文件
    HBuilder-Integrate-AS/simpleDemo/build.gradle
    HBuilder-Integrate-AS/simpleDemo/src/main/AndroidManifest.xml
    HBuilder-Integrate-AS/simpleDemo/src/main/res/values/strings.xml
    HBuilder-Integrate-AS/simpleDemo/src/main/assets/data/dcloud_control.xml

```
![截图](./build.screen.jpg)
<!-- [![截图](/build.screen.jpg "Shiprock")](https://markdown.com.cn) -->
## 0、HBuilder-Integrate-AS/simpleDemo/src/main/assets/apps/** 替换掉当前目录下的内容，此内容由HbuilderX打包获得

## 1、HBuilder-Integrate-AS/simpleDemo/build.gradle
```
android.defaultConfig.applicationId // 包路径及名称，打包之后唯一标识 \
android.signingConfigs.config // 签名配置修改一次即可 \
```

## 2、HBuilder-Integrate-AS/simpleDemo/src/main/AndroidManifest.xml
```
android:icon="@drawable/icon" // 修改icon \
android:label="@string/app_name" // 修改apk名称 \
<meta-data> android:name="dcloud_appkey" // appkey名称，可不修改 \
<meta-data> android:value="3db99e9802e5126b890b10b9cb4ba022" // 签名SH1与HBuilder-Integrate-AS\simpleDemo\src\main\apps\**的SH1对应，需要将SH1上传到uniapp对应的项目下获取key \
<uses-permission android:name="android.permission.NFC"/> \
```

## 3、HBuilder-Integrate-AS/simpleDemo/src/main/assets/data/dcloud_control.xml
```
 appid="**" // 与HBuilder-Integrate-AS\simpleDemo\src\main\apps\**的首层目录名对应
```

## 4、HBuilder-Integrate-AS/simpleDemo/src/main/res/drawable
```
替换当前目录下所有图标
```

## 5、HBuilder-Integrate-AS/simpleDemo/src/main/res/values/strings.xml
```
<string name="app_name">apk name</string>
```

## 6、HBuilder-Integrate-AS/simpleDemo/src/main/res/values/styles.xml
```
一些样式配置如有需要请修改
```
## 7、HBuilder-Integrate-AS/simpleDemo/src/main/assets/data/dcloud_properties.xml
```
如果打包后apk文件安装后打开，报打包时未添加oauth模块，在dcloud_properties.xml文件在assets/data目录下添加，同样对于其他模块提示一样需要如此，有些包同时需要从SDK目录拷贝到libs目录
<feature name="OAuth" value="io.dcloud.feature.oauth.OAuthFeatureImpl">
	<module name="OAuth-IGETui" value="io.dcloud.feature.igetui.GeTuiOAuthService"/>
</feature>
详见(https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/oauth)
```
## 8、manifest.json
```
可以在manifest.json文件的源码视图中配置忽略H5版本提醒，方式如下：
"app-plus": {  
    "compatible": {  
        "ignoreVersion": true //true表示忽略版本检查提示框，HBuilderX1.9.0及以上版本支持  
    },  
}, 
```

# IOS 为iPhone等打包项目以及配置
## 0、HBuilder-Hello/HBuilder-Hello/Pandora/apps/** 替换掉当前目录下的内容，此内容由HbuilderX打包获得

## 1、HBuilder-Hello/HBuilder-Hello/control.xml
```
<app appid="**" appver="1.0.1"/> // 与HBuilder-Integrate-AS\simpleDemo\src\main\apps\**的首层目录名对应
```

## 2、HBuilder-Hello/HBuilder-Hello/HBuilder-Hello-Info.plist
```
dcloud_appkey // 签名配置修改一次即可 \
Bundle identifier // 包路径及名称需要自定义，可不修改 \
```

## 3、HBuilder-Hello/HBuilder-Hello/TAERGETS/Info
```
dcloud_appkey // 签名配置修改一次即可 \
Bundle identifier // 包路径及名称需要自定义，可不修改 \
```

## 4、HBuilder-Hello/HBuilder-Hello/TAERGETS/Build Phases/Link Binary With Libraries
```
添加SDK或者其他依赖（去掉模块缺失提示）
```

## 5、HBuilder-Hello/HBuilder-Hello/LaunchScreenAD.storyboard | LaunchScreen.storyboard
```
修改启动页面logo及文案
```

## 6、HBuilder-Hello/HBuilder-Hello/InfoPlist.strings
```
修改应用名称
```

## 7、HBuilder-Hello/HBuilder/Images.xcassets/AppIcon.appiconset
```
修改应用logo
```
