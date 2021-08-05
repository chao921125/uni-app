# advokate 前端规范

## 1. 首先，请熟读并严格遵守以下的开发规范，减少不必要的沟通成本和修改成本

## 2. 其次，为提高个人代码质量，降低 bug 数，请开发完成之后，自己点击测试一遍，自己确认完善了，再去进行下一个模块开发

## 发版规范

1. X.X.X（大版本.生产版本.小版本迭代 bug 修复、测试）
2. 小版本 bug 修正 统统 末尾追加
3. 所有正式发布的就是生产版本
4. 发版时记得切换小程序账号和线上地址

### 版本号管理

1. vX.X.X（产品版本.计划版本.bug 修正 or 细节迭代）
2. 小版本 bug 修正 统统 末尾追加
3. git 上各自在自己的（dev\_姓名简写）分支上完成相关代码编写，需发版时，到 github 中进行 `Pull requests` 请求给管理员进行审批后，自动合并到 dev 分支
4. 提交 github 规则(v 当前版本号 '换行 ' 提交分支 修改内容备注)，示例如下

```bash
  v1.0.0
  dev 修改内容备注
```

`注意: 当前版本 v1.0.0`

## 开发规范

1. var 不允许出现
2. 常量使用 const 变量使用 let
3. 禁止使用 npm 统一使用 yarn
4. 文件名全小写中横线分词
5. 图片名全小写中横线分词
6. 所有变量命名不可以使用关键字

## html 约定（针对 H5 项目，app、小程序除外）

1. 网站项目不使用 view，块元素全部使用 div
2. 网站项目禁止使用直接的 html 元素做全局样式定义，全局必须使用.class 或者#id 进行范围控制，可以用 html 和 body，但是需要经过项目经理同意
3. 新增全局变量需要经过大家的商讨，并进行告知
4. 不允许复写 uni-app 的样式，如有任何对其修改，请自行写样式，并通过调整权重方式修改
5. CSS 样式对编写，须遵守 scss 规范，单个页面请按照横向最大块级元素为整体，进行层级嵌套和布局编写
6. 列表高度不允许写死，要通过 item 的高度和个数撑起列表。根据需要可以出现 min-height
7. 不允许直接从其他标注工具中直接 copy 源代码过来。

## vue 约定

1. vue 方法放置顺序

   1. extends: [base]
   2. components
   3. model
   4. props
   5. beforeCreate
   6. data
   7. computed
   8. created/onLoad
   9. beforeMount
   10. mounted/onReady
   11. beforeUpdate
   12. updated
   13. beforeDestroy
   14. destroyed
   15. methods
   16. watch

2. props 必须声明验证，指定验证格式，适当情况指定默认值
   prop 为单向数据流禁止子组件更新数据

   正例：
   props: {
   miniVariant: {
   type: Boolean,
   required: true
   },
   clipped: {
   type: Boolean,
   required: true
   },
   drawer: {
   type: Boolean,
   required: true
   },
   st: {
   type: String,
   required: true
   }
   }
   反例：
   props: ['miniVariant', 'clipped', 'drawer']
