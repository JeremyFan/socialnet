# socialnet
Code in 《Building Node Applications with MongoDB and Backbone》 

## Day 1
初始化项目，创建package.json。

发现书中使用的`express`，`jade` ，`mongoose`版本都比较老旧，尤其是`jade`，已经更名为`pug`。书中并没有前端的包管理，增加`bower`作为前端包管理工具。

对比：
```
// 原配置
{
  "express": "~3.0.0",
  "jade": ">= 0.0.1",
  "mongoose": ">= 2.6.5"
}

// 更新后配置
{
  "express": "~4.14.0",
  "pug": "~2.0.0-beta3",
  "mongoose": "~4.5.2",
  "bower":"1.7.9"
}
```
## Day 2
### 整理前端依赖的库
```
{
  "backbone": "~1.3.3",
  "jquery": "~3.0.0",
  "requirejs": "~2.2.0",
  "text": "requirejs-text#~2.0.15",
  "underscore": "~1.8.3"
}
```
下载到`public/js/bower_components`

### 结构
```
// 后端
app.js  					# 启动服务，配置路由
/views						# 存放`pug`模板

// 前端
/public
	/js
		/views				# Backbone视图
		boot.js				# 前端启动文件，配置requirejs，加载业务js
		socialnet.js	# 业务入口
	/styles
	/templates			# 前端模板
```