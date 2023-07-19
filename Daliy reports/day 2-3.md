# Day 2-3

## npm

### 使用 npm 命令安装模块
> npm install \<Module Name>

以下实例使用 npm 命令安装常用的 Node.js web框架模块 express:

> npm install express

安装好之后，express 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 require('express') 的方式就好，无需指定第三方包路径。

>var express = require('express');

### 全局安装与本地安装
>npm install express          # 本地安装
npm install express -g      # 全局安装

### 查看安装信息
可以使用以下命令来查看所有全局安装的模块：

> npm list -g

如果要查看某个模块的版本号，可以使用命令如下：

> npm list grunt

### Package.json 属性说明
* name - 包名。

* version - 包的版本号。

* description - 包的描述。

* homepage - 包的官网 url 。

* author - 包的作者姓名。

* contributors - 包的其他贡献者姓名。

* dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。

* repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。

* main - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。

* keywords - 关键字

### 卸载 更新 搜索模块
可以使用以下命令来卸载 Node.js 模块。

> npm uninstall express

卸载后，可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

> npm ls

可以使用以下命令更新模块：

> npm update express

使用以下来搜索模块：

> npm search express

### 创建模块
package.json 文件是必不可少的。可以使用 NPM 生成 package.json 文件。

> npm init -y

这里的-y是默认配置

### npm set 设置环境变量

> npm set init-author-name 'my name jerry'
 set init-author-email '12345@qq.com'
 set init-author-url 'http://yourdomain.com'
 npm set init-license 'MIT'

### npm run 执行脚本
package.json的scripts字段，可以用于指定脚本命令，供npm直接调用。npm run会创建一个Shell，执行指定的命令。

两个命令简写，start和test属于特殊命令，可以省略run,其余的都得带上run。

如果不加任何参数，直接运行，会列出package.json里面所有可以执行的脚本命令

可配置参数 格式是加上两个连词线（--）
>---package.json文件--- 
"scripts": { "test": "mocha test/" }

>-------终端------- 
 npm run test -- anothertest.js 等同于直接执行 $ mocha test/ anothertest.js

pre-和post-两个钩子（hook）
npm会先查看有没有定义prelint和postlint两个钩子，如果有的话，就会先执行npm run pre-命令名，然后执行npm run 命令名，最后执行npm run post-命令名。

>---package.json文件---
"scripts": {
    "lint": "eslint --cache --ext .js --ext .jsx src",
    "test": "karma start --log-leve=error karma.config.js --single-run=true",
    "pretest": "npm run lint",
    "posttest": "echo 'Finished running tests'"
  }
  
>-------终端-------
$ npm run lint
//直接执行 npm run lint 结束

>$ npm run test
//因为有定义了两个钩子pretest、posttest。
//所以先执行 npm run pretest
//然后执行 npm run test
//最后执行 npm run posttest

### npm yarn pnpm的区别
npm是Node.js的默认包管理器，它使用扁平的node_modules目录结构来存储依赖关系。npm安装速度相对较慢，因为它需要遍历所有项目依赖关系，然后再决定如何生成扁平的node_modules目录结构。

yarn是一个新的包管理器，它也使用扁平的node_modules目录结构，但是它优化了安装过程，可以并行安装多个包，因此安装速度比npm快。yarn还提供了离线模式，可以在没有互联网连接的情况下安装本地缓存的依赖项。

pnpm是另一个新的包管理器，它使用嵌套的node_modules目录结构来存储依赖关系。这种方式更有效地存储依赖关系，可以减少磁盘空间占用。pnpm安装速度比npm和yarn都快，因为它只需链接全局存储中的文件，而不需要复制文件。


## 持久化

我使用了localStorage来存储class的属性。

### localStorage和sessionStroage的区别

localStorage 中的数据在浏览器关闭后仍然存在，即使关闭浏览器并重新打开它，数据仍然存在。这意味着可以使用 localStorage 来存储需要在多个会话之间保留的数据，例如用户偏好设置。

sessionStorage 中的数据在浏览器关闭后会被清除。这意味着当关闭浏览器时，存储在 sessionStorage 中的所有数据都将丢失。因此，可以使用 sessionStorage 来存储仅在当前会话中有效的数据，例如表单数据或购物车内容。

除了数据持久性之外，localStorage 和 sessionStorage 还有一个区别：作用域。localStorage 中的数据在同一浏览器中的所有窗口和标签页之间共享，而 sessionStorage 中的数据仅在当前窗口或标签页中可用。

## 代码风格

修改了一下码风，把常量名改成了大写，使用模板字符串代替加号连接。

使用了事件委托优化了代码，对于大量的DOM操作，准备之后替换为模板字面量试试。