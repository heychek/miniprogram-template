## 一、简介
微信小程序模板, 使用 WebStorm, grace, less, eslint 以及包含一些工具类的简单模板, 用于快速创建项目, 直接clone即可使用

## 二、使用

### 1. eslint
项目中有使用 eslint 进行代码规范, 所以 clone 之后, 需要安装 eslint

- Node 安装eslint   
安装完会显示安装位置, 安装示例如下
```
➜  kevin sudo npm install eslint -g
Password:
/usr/local/bin/eslint -> /usr/local/lib/node_modules/eslint/bin/eslint.js
+ eslint@6.0.1
added 121 packages from 75 contributors in 157.481s
➜  kevin
```

- WebStorm 安装 eslint   
如果你的 WebStorm 没有安装 eslint, 请先安装:
    - `preferences-->plugins—>搜索eslint-->install`
    - 安装好之后，找到 `preferences-->ESLint Settings`
    - 选中，就会进入配置页面，勾选 Enable
    - 第一项配置自己安装 nodejs 目录如 `/usr/local/bin/node`
    - 第二项配置 eslint 安装位置, 即可执行文件位置如当前项目中 `/usr/local/bin/eslint`
    - 第三项改成 `.eslintrc.js`, 点击应用即可
    

- 缩进   
别忘了把 WebStorm 的缩紧设置成跟 eslint 配置中的缩进一致

### 2. less 的 watcher
由于小程序不支持 less, 所以此处的 less 还需要转换为 wxss, 这里使用 WebStorm 的 File Watcher 实现

#### 安装 less
如果你已经安装过 less, 这一步可以跳过, 终端输入
```
# sudo npm install less -g
/Users/kevin/.nvm/versions/node/v8.9.4/bin/lessc -> /Users/kevin/.nvm/versions/node/v8.9.4/lib/node_modules/less/bin/lessc
# 
```

#### WebStorm 配置
1. 先在 preferences —> editor —> File Types —> Cascading Style Sheet 中添加 *.wxss 的类型
2. 打开 `preferences -> tool  —> file watchers`
3. 添加 less 的 watcher, 修改程序的路径, 程序路径 program 是前面安装的 less 路径如 `/Users/kevin/.nvm/versions/node/v8.9.4/lib/node_modules/less/bin/lessc`
4. 输出路径这个地方修改一下, 将原来默认的 .css 改成 .wxss
5. argument 也改成`$FileName$ $FileNameWithoutExtension$.wxss`

#### 验证
1. 我们在编辑器中验证下是否生效。添加一个less文件，我们会发现编辑器自动给我添加了一个相应的wxss文件。
2. 编写less文件，然后保存，再打开wxss文件，发现编译成功，那我们大功告成了。

### 3. 组件的使用
在 comps 目录下放了一些常用组件

#### Img
Img 组件使用说明
```
// json
{
  "component": true,
  "usingComponents": {
    "Img": "../../comps/Img/Img"
  }
}
// wxml
<view class="root">
  <Img src="{{img}}" />
</view>
```
关于 Img 的大小, 使用以下方式控制 Img 大小, 该样式必须写, 否则不显示
```
// wxml
<view class="root">
  <Img src="{{img}}" img-class="Img" />
</view>
// wxss
.Img {
  width: 600rpx;
  height: 400rpx;
}
```
当传入的 src 为空或图片不存在时, 会显示 404 缺省图, 如不需要显示该图片, 传入 isDefault(Boolean 类型) 为 false 即可
```
<view class="root">
  <Img src="{{img}}" img="Img" isDefault="{{isDefault}}"/>
</view>
```
获取默认 404 图片路径
```
var plugin = requirePlugin("ImgPlugin")
Page({
  data: {},
  onLoad: function() {
    console.log(plugin.defaultImg)
  },
  methods: {}
});
```