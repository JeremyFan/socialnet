# socialnet
Code in 《Building Node Applications with MongoDB and Backbone》 

（加黑部分是和书中不一样的地方）

## Day 1
初始化项目，创建package.json。

**发现书中使用的`express`，`jade` ，`mongoose`版本都比较老旧，尤其是`jade`，已经更名为`pug`。书中并没有前端的包管理，增加`bower`作为前端包管理工具**。

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

## Day 3
实现了简单的用户管理，包括身份验证，注册，忘记密码，重置密码等功能。

开始使用`mongoose`操作数据库，新引入`nodemailer`处理邮件相关功能（发送密码重置链接邮件）。

`nodemailer`版本更新为`2.4.2`。

（隔了很多天...）

## Day 4
**修改调试代码，需要经常手动重启服务，很烦。所以引入了`nodemon`。**

**由于pug更新，模板接收数据和书中不一样：**

现在
```
res.render('resetpassword.pug', {
  accountId: accountId
});

// 模板
input(type='hidden',name='accountId',value=locals.accountId)
```

书中
```
res.render('resetpassword.pug', {
  locals: {
    accountId: accountId
  }
});

// 模板
input(type='hidden',name='accountId',value='#{locals.accountId}')
```

用户管理功能完成，总结一下

### 关于安全
数据库是不存密码的，存的是加密后的串。注册时加密存进数据库，登录时也是判断加密后的串。但仍然觉得有问题：客户端请求的时候发送的是原始密码，这一步应该也需要加密。

### 找回密码功能
并不是很复杂。有这么几步：

1. 一般来说都是让用户填个邮箱，然后发个请求；
2. 服务端处理请求，根据邮箱在数据库找到用户id，把这个id作为参数拼接到修改密码页url，然后邮件给用户；
3. 用户收到邮件点击链接，服务端监听修改密码页路由，取id参数写进一个`type="hideen"`的`input`，设置密码。密码、隐藏的id一起再请求服务端；
4. 服务端根据id数据库找到用户，update密码。

### 路由/接口
目前路由、接口都写在`app.js`里，有点乱。

## Day 5

### 功能
实现简单的用户界面：
- **用户资料：**展示个人信息和最近更新的状态列表。
- **状态流：**首页改为展示用户好友的状态流。
- **发状态功能：**首页增加发状态框。

（大概类似微博的“首页”和“个人主页”，首页展示好友的微博流，可以发微博；个人主页展示个人信息和自己发过的微博。）

（现在首页的状态都是自己的，还没有好友这个功能）


### 两个技术细节
#### `_.template()`变更
书中使用`underscore`的`_.template()`渲染视图：
```javascript
this.$el.html(_.template(profileTemplate, this.model.toJSON()));
```
**`underscore 1.6`版本之后，`_.template()`不再直接接收数据作为第二个参数。**所以现在应该是：
```javascript
var template = _.template(profileTpl);
this.$el.html(template(this.model.toJSON()));
```

#### `Backbone.Model`的`urlRoot`属性
这个属性指定之后，调用`URL`就会自动变成`[urlRoot]/id`的形式。



























