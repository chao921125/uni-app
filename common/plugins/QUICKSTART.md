# UniApp 插件快速开始指南

## 🚀 5分钟上手

### 1️⃣ 安装（无需安装）

所有插件已经封装完成，直接使用即可！

### 2️⃣ 基础使用

#### 方式一：按需导入（推荐）

```javascript
// 在页面或组件中
import UI from "@/common/plugins/ui.js";
import storage from "@/common/plugins/storage.js";

// 使用
UI.success("操作成功");
await storage.set("key", "value");
```

#### 方式二：全局挂载

在 `main.js` 中：

```javascript
import UI from "@/common/plugins/ui.js";
import storage from "@/common/plugins/storage.js";
import { http } from "@/common/plugins/network.js";

// Vue 3
const app = createApp(App);
app.config.globalProperties.$ui = UI;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$http = http;

// Vue 2
Vue.prototype.$ui = UI;
Vue.prototype.$storage = storage;
Vue.prototype.$http = http;
```

然后在组件中使用：

```javascript
// this.$ui.success("成功");
// this.$storage.get("key");
// this.$http.get("/api/users");
```

---

## 📚 常用场景示例

### 场景1：用户登录

```javascript
import { http } from "@/common/plugins/network.js";
import storage from "@/common/plugins/storage.js";
import UI from "@/common/plugins/ui.js";
import { Router } from "@/common/plugins/router.js";

async function login(username, password) {
  try {
    UI.loading("登录中...");
    
    const res = await http.post("/api/login", {
      username,
      password
    });
    
    // 保存Token
    storage.setToken(res.token);
    storage.setUser(res.user);
    
    UI.success("登录成功");
    
    // 跳转到首页
    Router.relaunch("/pages/tab-home");
    
  } catch (error) {
    UI.error(error.message || "登录失败");
  } finally {
    UI.hideLoading();
  }
}
```

### 场景2：上传图片

```javascript
import media from "@/common/plugins/media.js";
import { Permission } from "@/common/plugins/permission.js";
import UI from "@/common/plugins/ui.js";

async function uploadImage() {
  try {
    // 检查权限
    const granted = await Permission.ensure("album");
    if (!granted) {
      UI.warning("需要相册权限");
      return;
    }
    
    // 选择并上传
    const [imageUrl] = await media.image.chooseAndUpload({
      count: 1,
      compress: true,
      uploadUrl: "/api/upload"
    });
    
    console.log("上传成功:", imageUrl);
    UI.success("上传成功");
    
  } catch (error) {
    UI.error("上传失败");
  }
}
```

### 场景3：获取位置

```javascript
import location from "@/common/plugins/location.js";
import UI from "@/common/plugins/ui.js";

async function getLocation() {
  try {
    UI.loading("定位中...");
    
    const pos = await location.service.getCurrentPosition({
      type: "gcj02",
      timeout: 10000
    });
    
    console.log("位置:", pos.latitude, pos.longitude);
    
    // 显示在地图上
    location.map.show({
      latitude: pos.latitude,
      longitude: pos.longitude,
      name: "当前位置"
    });
    
  } catch (error) {
    UI.error("定位失败");
  } finally {
    UI.hideLoading();
  }
}
```

### 场景4：HTTP请求

```javascript
import { http } from "@/common/plugins/network.js";
import UI from "@/common/plugins/ui.js";

// GET请求
async function getUsers() {
  try {
    const users = await http.get("/api/users", {
      page: 1,
      pageSize: 20
    });
    console.log(users);
  } catch (error) {
    UI.error("获取用户列表失败");
  }
}

// POST请求
async function createUser(data) {
  try {
    const user = await http.post("/api/users", data);
    UI.success("创建成功");
    return user;
  } catch (error) {
    UI.error("创建失败");
  }
}

// 带拦截器
http.addRequestInterceptor((config) => {
  config.header["X-Request-ID"] = Date.now();
  return config;
});
```

### 场景5：数据格式化

```javascript
import { format, validate } from "@/common/plugins/utils.js";

// 验证手机号
if (!validate.isPhone(phone)) {
  UI.error("手机号格式错误");
  return;
}

// 格式化日期
const dateStr = format.date(new Date(), "YYYY-MM-DD");
// "2024-01-01"

// 格式化金额
const money = format.money(1234.5);
// "¥1,234.50"

// 相对时间
const timeAgo = format.relativeTime(post.createdAt);
// "5分钟前"

// 隐私保护
const maskedPhone = format.phone("13800138000");
// "138****8000"
```

### 场景6：路由跳转

```javascript
import { Router } from "@/common/plugins/router.js";

// 普通跳转
Router.to("/pages/detail", {
  params: { id: 123 },
  auth: true // 需要登录
});

// 返回上一页
Router.back();

// 切换到TabBar
Router.tab("/pages/tab-home");

// 获取当前页参数
const params = Router.getParams();
console.log(params.id); // "123"
```

---

## 🎯 模块速查表

| 模块 | 导入方式 | 主要功能 |
|------|---------|---------|
| **UI交互** | `import UI from "@/common/plugins/ui.js"` | Toast/Modal/Loading等 |
| **存储** | `import storage from "@/common/plugins/storage.js"` | 缓存管理 |
| **网络** | `import { http } from "@/common/plugins/network.js"` | HTTP请求 |
| **路由** | `import { Router } from "@/common/plugins/router.js"` | 页面跳转 |
| **权限** | `import { Permission } from "@/common/plugins/permission.js"` | 权限管理 |
| **媒体** | `import media from "@/common/plugins/media.js"` | 图片/视频/音频 |
| **位置** | `import location from "@/common/plugins/location.js"` | 定位/地图 |
| **工具** | `import { format } from "@/common/plugins/utils.js"` | 格式化/验证 |
| **设备** | `import device from "@/common/plugins/device.js"` | 系统信息 |
| **平台** | `import Platform from "@/common/plugins/platform.js"` | 平台检测 |

---

## 💡 最佳实践

### ✅ 推荐做法

```javascript
// 1. 使用 async/await
try {
  const data = await http.get("/api/users");
} catch (error) {
  UI.error(error.message);
}

// 2. 及时隐藏Loading
try {
  UI.loading("加载中...");
  const data = await fetchData();
} finally {
  UI.hideLoading();
}

// 3. 权限检查后再操作
const granted = await Permission.ensure("camera");
if (granted) {
  // 使用相机
}

// 4. 使用防抖处理频繁事件
import { throttle } from "@/common/plugins/utils.js";

const onScroll = throttle.debounce(() => {
  console.log("滚动");
}, 300);
```

### ❌ 避免做法

```javascript
// 1. 不要嵌套Promise
// ❌ 错误
uni.request({
  success: (res) => {
    uni.request({
      success: (res2) => {
        // ...
      }
    });
  }
});

// ✅ 正确
const res1 = await http.get("/api/data1");
const res2 = await http.get("/api/data2");

// 2. 不要忘记错误处理
// ❌ 错误
await http.post("/api/users", data);

// ✅ 正确
try {
  await http.post("/api/users", data);
} catch (error) {
  UI.error(error.message);
}

// 3. 不要硬编码路径
// ❌ 错误
uni.navigateTo({ url: "/pages/detail?id=123" });

// ✅ 正确
Router.to("/pages/detail", { params: { id: 123 } });
```

---

## 🔍 常见问题

### Q1: 如何判断当前平台？

```javascript
import Platform from "@/common/plugins/platform.js";

if (Platform.isMp()) {
  console.log("小程序环境");
} else if (Platform.isApp()) {
  console.log("App环境");
} else if (Platform.isH5()) {
  console.log("H5环境");
}
```

### Q2: 如何处理WebSocket断线重连？

```javascript
import { websocket } from "@/common/plugins/network.js";

await websocket.connect("wss://example.com/ws", {
  autoReconnect: true, // 自动重连
  onOpen: () => console.log("已连接"),
  onClose: () => console.log("连接关闭，正在重连...")
});
```

### Q3: 如何批量检查权限？

```javascript
import { Permission } from "@/common/plugins/permission.js";

const { success, failed } = await Permission.requestMulti(
  ["camera", "album", "location"],
  { stopOnFail: false } // 继续请求所有权限
);

console.log("成功的权限:", success);
console.log("失败的权限:", failed);
```

### Q4: 如何缓存数据并设置过期时间？

```javascript
import storage from "@/common/plugins/storage.js";

// 缓存1小时
await storage.set("userData", data, 3600);

// 获取缓存
const cached = await storage.get("userData");
if (cached) {
  console.log("使用缓存数据");
} else {
  console.log("缓存已过期，重新获取");
}
```

### Q5: 如何实现下拉刷新？

```javascript
import UI from "@/common/plugins/ui.js";

// 在页面的 onPullDownRefresh 中
onPullDownRefresh(async () => {
  try {
    await loadData();
    UI.success("刷新成功");
  } catch {
    UI.error("刷新失败");
  } finally {
    UI.stopPullDownRefresh();
  }
});
```

---

## 📖 更多文档

- 📘 [完整API文档](./README.md)
- 📗 [封装总结](./SUMMARY.md)
- 🌐 [uni-app官方文档](https://uniapp.dcloud.net.cn/api/)

---

## 🎉 开始开发

现在你已经掌握了基本用法，开始构建你的UniApp应用吧！

如有问题，请查阅文档或联系技术支持。
