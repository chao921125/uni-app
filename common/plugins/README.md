# UniApp 插件模块文档

本目录包含经过封装的 UniApp 常用功能模块，提供统一的 API 接口和跨平台兼容性。

## 📦 模块列表

### 1. **device.js** - 设备信息模块
**功能：** 系统信息获取、网络状态、蓝牙功能、传感器监听

```javascript
import device from "@/common/plugins/device.js";

// 获取系统信息（带缓存）
const info = await device.getInfo();
console.log(info.platform); // 'mp-weixin' | 'app-plus' | 'h5'
console.log(info.isNotch);  // 是否为刘海屏
console.log(info.totalHeaderHeight); // 总头部高度

// 快捷判断
device.isAndroid(); // 是否安卓
device.isIOS();     // 是否iOS
device.isPhone();   // 是否手机

// 网络状态监听
device.onNetworkChange((status) => {
  console.log(status.connected); // 是否连接
  console.log(status.type);      // wifi/2g/3g/4g/5g
});

// 蓝牙功能
const available = await device.bluetooth.init();
const devices = await device.bluetooth.search(10000); // 搜索10秒
```

---

### 2. **http.js** - HTTP请求模块（旧版）
**功能：** 基础HTTP请求和文件上传

> ⚠️ 建议使用新版 `network.js`

---

### 3. **network.js** - 网络与WebSocket模块（增强版）
**功能：** HTTP请求拦截器、WebSocket自动重连、网络状态监听

```javascript
import { http, websocket, network } from "@/common/plugins/network.js";

// ===== HTTP请求 =====

// 添加请求拦截器
http.addRequestInterceptor((config) => {
  config.header["X-Custom-Header"] = "value";
  return config;
});

// 添加响应拦截器
http.addResponseInterceptor((response) => {
  console.log("Response:", response);
  return response;
});

// GET请求
const data = await http.get("/api/users", { page: 1 });

// POST请求
const result = await http.post("/api/users", { name: "张三" });

// 文件上传
const uploadedUrl = await http.upload("/api/upload", {
  filePath: tempFilePath,
  onProgress: (res) => {
    console.log(`进度: ${res.progress}%`);
  }
});

// 文件下载
const localPath = await http.download("/api/file.pdf", {
  onProgress: (res) => {
    console.log(`下载进度: ${res.progress}%`);
  }
});

// ===== WebSocket =====

// 创建连接
await websocket.connect("wss://example.com/ws", {
  autoReconnect: true,
  onOpen: () => console.log("已连接"),
  onMessage: (msg) => console.log("收到消息:", msg.data),
  onClose: () => console.log("连接关闭"),
  onError: (err) => console.error("错误:", err)
});

// 发送消息
websocket.send({ type: "chat", content: "Hello" });

// 监听事件
websocket.on("message", (msg) => {
  console.log("新消息:", msg);
});

// 关闭连接
websocket.close();

// ===== 网络状态 =====

// 获取当前网络
const status = await network.getStatus();
console.log(status.networkType); // wifi/4g/none等

// 监听网络变化
const unwatch = network.onStatusChange((res) => {
  console.log("网络变化:", res.isConnected);
});

// 取消监听
unwatch();

// 快捷判断
await network.isWiFi();      // 是否WiFi
await network.isConnected(); // 是否联网
```

---

### 4. **permission.js** - 权限管理模块
**功能：** 全平台权限检查和请求（App/小程序/H5）

```javascript
import { Permission } from "@/common/plugins/permission.js";

// 检查单个权限
const status = await Permission.check("camera");
// 返回值：
// -2: 不支持 | -1: 错误 | 0: 未请求 | 1: 已授权 | 2: 已拒绝 | 3: 系统关闭 | 4: 部分授权(iOS)

// 请求权限
const result = await Permission.request("location", {
  tip: "需要定位权限才能使用附近功能",
  autoOpenSetting: true // 拒绝时自动打开设置
});

// 批量检查
const statuses = await Permission.checkMulti(["camera", "album", "location"]);
console.log(statuses.camera); // 1

// 批量请求（遇到失败则停止）
const { success, failed } = await Permission.requestMulti(
  ["camera", "album"],
  { stopOnFail: false } // 继续请求所有权限
);

// 确保获得授权（检查+请求）
const granted = await Permission.ensure("notification");

// 打开应用设置页
Permission.openAppSetting();

// 获取权限描述文本
const text = Permission.getStatusText("camera", 2);
// "相机权限已被拒绝，可重新请求"
```

**支持的权限类型：**
- `location` - 地理位置
- `locationBackground` - 后台定位
- `camera` - 相机
- `record` - 麦克风
- `album` - 相册
- `bluetooth` - 蓝牙
- `notification` - 通知推送
- `calendar` - 日历
- `contact` - 通讯录
- `phone` - 电话状态（仅App）
- `sms` - 短信（仅Android）

---

### 5. **platform.js** - 平台检测模块
**功能：** 运行时平台识别和能力检测

```javascript
import Platform from "@/common/plugins/platform.js";

// 获取平台名称
console.log(Platform.name); // 'mp-weixin' | 'app-plus' | 'h5'

// 平台判断
Platform.is("mp-weixin"); // 是否微信小程序
Platform.isMp();          // 是否小程序
Platform.isApp();         // 是否App
Platform.isH5();          // 是否H5

// 能力检测
Platform.supports.websocket(); // 是否支持WebSocket
Platform.supports.bluetooth(); // 是否支持蓝牙
Platform.supports.payment();   // 是否支持支付
Platform.supports.share();     // 是否支持分享
Platform.supports.push();      // 是否支持推送
```

---

### 6. **promise.js** - Promise化工具
**功能：** 统一处理Vue2/Vue3 API返回格式差异

```javascript
import { promisify, createModule } from "@/common/plugins/promise.js";

// 单个API Promise化
const getLocation = promisify(uni.getLocation, {
  type: "gcj02"
});
const pos = await getLocation();

// 批量封装模块
const device = createModule(uni, {
  getSystemInfo: {
    transform: (res) => ({ ...res, customField: "value" })
  },
  openBluetoothAdapter: {
    errorHandler: (err) => new Error("蓝牙不可用")
  }
});
```

---

### 7. **router.js** - 路由管理模块
**功能：** 页面跳转、事件通信、登录拦截、页面栈管理

```javascript
import { Router } from "@/common/plugins/router.js";

// ===== 页面跳转 =====

// 保留当前页跳转（navigateTo）
const { eventChannel } = await Router.navigateTo("/pages/detail", {
  params: { id: 123 },
  auth: true, // 需要登录校验
  events: {
    someEvent: (data) => console.log("收到数据:", data)
  }
});

// 通过eventChannel通信
eventChannel.emit("someEvent", { message: "Hello" });

// 关闭当前页跳转（redirectTo）
await Router.redirectTo("/pages/home");

// 关闭所有页跳转（reLaunch）
await Router.reLaunch("/pages/login");

// 跳转到TabBar页（switchTab）
await Router.switchTab("/pages/tab-home");

// 返回上一页
await Router.navigateBack({ delta: 1 });

// ===== 便捷方法 =====
Router.to("/pages/detail");        // navigateTo别名
Router.replace("/pages/home");     // redirectTo别名
Router.relaunch("/pages/login");   // reLaunch别名
Router.tab("/pages/tab-home");     // switchTab别名
Router.back();                     // 返回上一页

// ===== 页面栈管理 =====
const pages = Router.getPages();           // 获取页面栈
const currentPage = Router.getCurrentPage(); // 当前页实例
const path = Router.getCurrentPath();      // 当前页路径
const params = Router.getParams();         // 当前页参数
const prevPage = Router.getPrevPage(1);    // 上一页
Router.isHome();                           // 是否首页

// ===== 参数工具 =====
Router.encodeParams({ id: 123, name: "张三" });
// "id=123&name=%E5%BC%A0%E4%B8%89"

Router.decodeParams("id=123&name=%E5%BC%A0%E4%B8%89");
// { id: "123", name: "张三" }

Router.buildPath("/pages/detail", { id: 123 });
// "/pages/detail?id=123"

// ===== 预加载 =====
await Router.preload("/pages/detail"); // 预加载页面
```

---

### 8. **storage.js** - 缓存管理模块
**功能：** 异步/同步缓存操作、过期时间、批量操作

```javascript
import storage from "@/common/plugins/storage.js";

// ===== 异步方法 =====

// 设置缓存（带过期时间）
await storage.set("user", { name: "张三" }, 3600); // 过期时间1小时

// 获取缓存
const user = await storage.get("user");

// 删除缓存
await storage.remove("user");

// 清空所有缓存
await storage.clear();

// 批量设置
await storage.setMulti({
  token: "abc123",
  config: { value: {...}, expire: 7200 }
});

// 批量获取
const data = await storage.getMulti(["token", "config"]);
console.log(data.token); // "abc123"

// 检查是否存在
const exists = await storage.has("user");

// 获取剩余过期时间（秒）
const expire = await storage.getExpire("user"); // -1表示无过期或已过期

// ===== 同步方法 =====
storage.setSync("key", "value", 3600);
const val = storage.getSync("key");
storage.removeSync("key");
storage.clearSync();
storage.hasSync("key");

// ===== 用户相关快捷方法 =====
storage.setToken("token_value");
const token = storage.getToken();

storage.setUser({ name: "张三" });
const user = storage.getUser();

// ===== 调试 =====
storage.debug(); // 打印所有缓存键（仅开发环境）
```

---

### 9. **system.js** - 系统指标模块
**功能：** 安全获取系统信息、CSS变量注入、屏幕变化监听

```javascript
import system from "@/common/plugins/system.js";

// 获取系统指标
const metrics = system.getSystemMetrics();
console.log(metrics.statusBarHeight);    // 状态栏高度
console.log(metrics.navBarHeight);       // 导航栏高度
console.log(metrics.totalHeaderHeight);  // 总头部高度
console.log(metrics.safeAreaBottom);     // 底部安全区
console.log(metrics.isIphoneX);          // 是否iPhone X
console.log(metrics.platform);           // 平台标识

// 注入CSS变量
system.injectSystemVars();
// 现在可以在样式中使用 var(--status-bar-height) 等

// 监听屏幕变化
const unwatch = system.watchSystemChange((newMetrics) => {
  console.log("屏幕尺寸变化:", newMetrics.windowWidth);
});

// 取消监听
unwatch();

// 获取微信小程序胶囊位置
const capsule = system.getCapsuleRect();
if (capsule) {
  console.log(capsule.top, capsule.left);
}

// 清除缓存
system.clearCache();

// 调试信息
const debug = system.getDebugInfo();
console.log(debug.metrics);
console.log(debug.capsule);
console.log(debug.env);
```

**可用的CSS变量：**
- `--status-bar-height` - 状态栏高度
- `--nav-bar-height` - 导航栏高度
- `--total-header-height` - 总头部高度
- `--safe-area-bottom` - 底部安全区
- `--safe-area-top` - 顶部安全区
- `--window-height` - 窗口高度
- `--window-width` - 窗口宽度
- `--screen-height` - 屏幕高度
- `--screen-width` - 屏幕宽度
- `--is-iphonex` - 是否iPhone X（1/0）
- `--platform` - 平台标识
- `--pixel-ratio` - 像素比

---

### 10. **media.js** - 媒体模块（新增）
**功能：** 图片/视频/音频/文件/扫码

```javascript
import media from "@/common/plugins/media.js";

// ===== 图片 =====

// 选择并上传图片（带压缩）
const urls = await media.image.chooseAndUpload({
  count: 9,
  compress: true,
  uploadUrl: "/api/upload",
  onProgress: (res) => console.log(`进度: ${res.progress}%`)
});

// 预览图片
media.image.preview(["url1", "url2"], 0);

// 保存到相册
await media.image.saveToAlbum(imageUrl);

// 转Base64
const base64 = await media.image.toBase64(filePath);

// ===== 视频 =====

// 选择并上传视频
const videoUrl = await media.video.chooseAndUpload({
  maxDuration: 60,
  uploadUrl: "/api/upload/video"
});

// 保存视频到相册
await media.video.saveToAlbum(videoPath);

// ===== 音频 =====

// 创建音频播放器
const audio = media.audio.createPlayer("https://example.com/music.mp3");
audio.play();
audio.pause();
audio.stop();

// 播放提示音
media.audio.playSound("success"); // success/error/warning

// ===== 文件 =====

// 下载文件（带缓存）
const localPath = await media.file.download("https://example.com/file.pdf", {
  cache: true,
  onProgress: (res) => console.log(`下载进度: ${res.progress}%`)
});

// 打开文档
await media.file.open(filePath, "pdf"); // pdf/doc/xls/ppt

// 清理临时文件
await media.file.cleanTemp();

// ===== 扫码 =====

// 扫描二维码/条形码
const result = await media.scan.code({
  scanType: ["qrCode", "barCode"],
  onlyFromCamera: true
});
console.log(result.result); // 扫描结果
console.log(result.type);   // 类型
```

---

### 11. **ui.js** - UI交互模块（新增）
**功能：** Toast/Modal/Loading/ActionSheet/Picker等

```javascript
import UI from "@/common/plugins/ui.js";

// ===== Toast提示 =====
UI.success("操作成功");
UI.error("操作失败");
UI.warning("请注意");
UI.info("纯文本提示");
UI.loading("加载中...");
UI.hideLoading();

// ===== Modal对话框 =====

// 确认对话框
const confirmed = await UI.confirm({
  title: "确认删除",
  content: "删除后无法恢复",
  confirmText: "确定",
  cancelText: "取消"
});

if (confirmed) {
  // 用户点击确定
}

// 警告对话框
await UI.alert("这是一个警告", "警告");

// 输入对话框
const input = await UI.prompt({
  title: "请输入姓名",
  placeholder: "张三",
  defaultValue: ""
});

// ===== ActionSheet =====

// 显示操作菜单
const index = await UI.actionSheet(
  ["拍照", "从相册选择", "取消"],
  { alertText: "请选择图片来源" }
);

// 分享菜单
await UI.shareMenu({
  title: "分享标题",
  summary: "分享描述",
  url: "https://example.com",
  imageUrl: "https://example.com/image.jpg"
});

// ===== Picker选择器 =====

// 日期选择
const date = await UI.datePicker({
  value: "2024-01-01",
  fields: "day" // year/month/day
});

// 时间选择
const time = await UI.timePicker({
  value: "12:00"
});

// 多列选择
const indexes = await UI.multiSelector(
  [["选项1", "选项2"], ["A", "B"]],
  { title: "请选择" }
);

// ===== 剪贴板 =====

// 复制
await UI.copyToClipboard("要复制的内容");

// 读取
const text = await UI.readFromClipboard();

// ===== 导航栏 =====
UI.setTitle("页面标题");
UI.showNavigationBarLoading();
UI.hideNavigationBarLoading();

// ===== TabBar =====
UI.setTabBarStyle({
  color: "#000",
  selectedColor: "#f00",
  backgroundColor: "#fff"
});

UI.setTabBarBadge(0, "99+"); // 设置徽标
UI.removeTabBarBadge(0);     // 移除徽标
UI.showTabBarRedDot(0);      // 显示红点
UI.hideTabBarRedDot(0);      // 隐藏红点

// ===== 下拉刷新 =====
UI.startPullDownRefresh();
UI.stopPullDownRefresh();

// ===== 滚动 =====
UI.pageScrollTo(100, { duration: 300 });

// ===== 震动反馈 =====
UI.vibrateShort(); // 短震动
UI.vibrateLong();  // 长震动
```

---

### 12. **location.js** - 地图与位置模块（新增）
**功能：** 定位/地图/地理编码/路线规划/附近搜索

```javascript
import location from "@/common/plugins/location.js";

// ===== 定位服务 =====

// 获取当前位置（带降级方案）
const pos = await location.service.getCurrentPosition({
  type: "gcj02",
  isHighAccuracy: true,
  timeout: 10000,
  fallbackToIP: true // GPS失败时使用IP定位
});
console.log(pos.latitude, pos.longitude);
console.log(pos.source); // "gps" | "ip"

// 持续监听位置变化
const unwatch = location.service.watchPosition((pos) => {
  console.log("位置更新:", pos);
});

// 取消监听
unwatch();

// ===== 地图工具 =====

// 在地图上显示位置
location.map.show({
  latitude: 39.9042,
  longitude: 116.4074,
  name: "北京",
  address: "北京市东城区"
});

// 选择地图位置
const selected = await location.map.choose({
  latitude: 39.9042,
  longitude: 116.4074
});

// 计算两点间距离（米）
const distance = location.map.calculateDistance(
  39.9042, 116.4074,
  31.2304, 121.4737
);

// ===== 地理编码 =====

// 地址转坐标
const geo = await location.geocoder.geocode("北京市朝阳区", "北京");
console.log(geo.latitude, geo.longitude);

// 坐标转地址
const address = await location.geocoder.reverseGeocode(39.9042, 116.4074);
console.log(address.formattedAddress);

// ===== 路线规划 =====

// 驾车路线
const driving = await location.route.driving({
  origin: "116.4074,39.9042",
  destination: "121.4737,31.2304",
  waypoints: ["117.2048,39.1308"] // 途经点
});
console.log(driving.distance); // 米
console.log(driving.duration); // 秒

// 步行路线
const walking = await location.route.walking({
  origin: "116.4074,39.9042",
  destination: "116.4174,39.9142"
});

// 公交路线
const transit = await location.route.transit({
  origin: "116.4074,39.9042",
  destination: "121.4737,31.2304",
  city: "北京"
});

// ===== 附近搜索 =====

const places = await location.search.nearby({
  keywords: "餐厅",
  latitude: 39.9042,
  longitude: 116.4074,
  radius: 1000, // 搜索半径1公里
  pageSize: 20
});

places.forEach(place => {
  console.log(place.name, place.distance);
});
```

> ⚠️ **注意：** 地理编码和路线规划需要配置高德地图API Key，请在代码中替换 `your_amap_key`。

---

### 13. **utils.js** - 工具函数集合（新增）
**功能：** 数据验证/格式化/防抖节流/深拷贝/数组操作

```javascript
import utils from "@/common/plugins/utils.js";

// ===== 数据验证 =====
utils.validate.isPhone("13800138000");      // true
utils.validate.isEmail("test@example.com"); // true
utils.validate.isIdCard("110101199001011234"); // true
utils.validate.isUrl("https://example.com");   // true
utils.validate.isEmpty("");                    // true
utils.validate.isNumber(123);                  // true
utils.validate.isObject({});                   // true
utils.validate.isArray([]);                    // true
utils.validate.isFunction(() => {});           // true
utils.validate.isDate(new Date());             // true
utils.validate.isJSON('{"a":1}');              // true

// ===== 数据格式化 =====

// 日期格式化
utils.format.date(new Date(), "YYYY-MM-DD");
// "2024-01-01"

utils.format.date(Date.now(), "YYYY年MM月DD日 HH:mm:ss");
// "2024年01月01日 12:00:00"

// 金额格式化
utils.format.money(1234.5);        // "¥1,234.50"
utils.format.money(1234.5, 0, "$"); // "$1,235"

// 文件大小格式化
utils.format.fileSize(1024);        // "1 KB"
utils.format.fileSize(1048576);     // "1 MB"

// 数字格式化
utils.format.number(1234567);       // "1,234,567"
utils.format.number(1234.567, 2);   // "1,234.57"

// 百分比格式化
utils.format.percent(0.1234);       // "12%"
utils.format.percent(0.1234, 2);    // "12.34%"

// 隐私格式化
utils.format.phone("13800138000");   // "138****8000"
utils.format.idCard("110101199001011234"); // "110***********1234"
utils.format.name("张三丰");          // "张*丰"

// 相对时间
utils.format.relativeTime(new Date(Date.now() - 60000));
// "1分钟前"

// ===== 防抖与节流 =====

// 防抖（延迟执行）
const debouncedFn = utils.throttle.debounce(() => {
  console.log("执行");
}, 300);

// 节流（限制频率）
const throttledFn = utils.throttle.throttle(() => {
  console.log("执行");
}, 300);

// requestAnimationFrame节流
const rafFn = utils.throttle.rafThrottle(() => {
  console.log("执行");
});

// ===== 对象操作 =====

// 深拷贝
const clone = utils.object.deepClone(obj);

// 深合并
const merged = utils.object.deepMerge(target, source1, source2);

// 扁平化对象
const flat = utils.object.flatten({ a: { b: { c: 1 } } });
// { "a.b.c": 1 }

// 还原扁平对象
const nested = utils.object.unflatten({ "a.b.c": 1 });
// { a: { b: { c: 1 } } }

// ===== 数组操作 =====

// 去重
utils.array.unique([1, 2, 2, 3]); // [1, 2, 3]
utils.array.unique(users, "id");  // 按字段去重

// 分组
const grouped = utils.array.groupBy(users, "age");
const grouped2 = utils.array.groupBy(users, u => u.age > 18 ? "adult" : "child");

// 树形转换
const tree = utils.array.toTree(list, {
  idKey: "id",
  parentKey: "parentId",
  childrenKey: "children",
  rootValue: 0
});

// 树形扁平化
const flatList = utils.array.flattenTree(tree);

// 随机打乱
const shuffled = utils.array.shuffle([1, 2, 3, 4, 5]);

// 统计
utils.array.sum(products, "price");              // 求和
utils.array.average(products, "price");          // 平均值
utils.array.max(products, "price");              // 最大值
utils.array.min(products, "price");              // 最小值

// ===== 字符串操作 =====

// 首字母大写
utils.string.capitalize("hello"); // "Hello"

// 驼峰转短横线
utils.string.camelToKebab("camelCase"); // "camel-case"

// 短横线转驼峰
utils.string.kebabToCamel("kebab-case"); // "kebabCase"

// 截断字符串
utils.string.truncate("这是一段很长的文字", 5); // "这是一段很..."

// 去除HTML标签
utils.string.stripHtml("<p>Hello</p>"); // "Hello"

// 生成随机字符串
utils.string.random(16); // "aB3dE5gH7jK9mN1p"

// UUID v4
utils.string.uuid(); // "550e8400-e29b-41d4-a716-446655440000"
```

---

## 🎯 使用建议

### 1. **模块化导入**
```javascript
// 推荐：按需导入
import { http } from "@/common/plugins/network.js";
import { Permission } from "@/common/plugins/permission.js";
import UI from "@/common/plugins/ui.js";

// 避免：全部导入（增加包体积）
import * as plugins from "@/common/plugins";
```

### 2. **全局挂载（可选）**
在 `main.js` 中全局挂载常用模块：
```javascript
import UI from "@/common/plugins/ui.js";
import storage from "@/common/plugins/storage.js";

Vue.prototype.$ui = UI;
Vue.prototype.$storage = storage;

// 使用时
this.$ui.success("成功");
this.$storage.set("key", "value");
```

### 3. **TypeScript支持**
部分模块提供 `.d.ts` 类型定义文件：
- `permission.d.ts`
- `router.d.ts`

在 TypeScript 项目中可以直接使用类型提示。

### 4. **错误处理**
所有异步方法都返回 Promise，建议使用 try-catch：
```javascript
try {
  const data = await http.get("/api/users");
  console.log(data);
} catch (error) {
  console.error("请求失败:", error.message);
}
```

### 5. **平台兼容性**
所有模块都经过多平台测试，但某些功能可能仅在特定平台可用：
- 蓝牙：仅小程序和App
- 生物认证：仅App
- WebSocket：除头条/QQ小程序外都支持

使用前可通过 `Platform.supports.xxx()` 检查能力。

---

## 📝 更新日志

### v2.0.0 (2024-01-01)
- ✨ 新增 `media.js` 媒体模块
- ✨ 新增 `ui.js` UI交互模块
- ✨ 新增 `location.js` 地图位置模块
- ✨ 新增 `network.js` 网络增强模块
- ✨ 新增 `utils.js` 工具函数集合
- 🔄 优化 `router.js` 事件通信机制
- 🔄 优化 `storage.js` 序列化逻辑
- 🐛 修复 iOS 权限检查内存泄漏

### v1.0.0 (2023-01-01)
- 初始版本发布

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
