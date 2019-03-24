layout: post
title: 喝杯 Mocha 輕鬆打造 Node.js 的 TDD 生產線
date: 2016-07-25 17:53:16
tags: [Testing, Nodejs, Learn]
---

## 一群人協作就是要測試一下

![測試 測試 123](/images/2016/07/25/TESTING-123.jpg)

## 前言

最近在公司導入 TDD，因此將這段程過記錄免得未來不記得怎麼設定。

先說我很愛 TDD ([Test-driven development](https://zh.wikipedia.org/wiki/%E6%B5%8B%E8%AF%95%E9%A9%B1%E5%8A%A8%E5%BC%80%E5%8F%91 'Test-driven development'))，簡單幾點原因：

1. 簡單化 - 執行對應指令既可確認 API 輸出入的正確性
2. 清單化 - 每寫一個測試 = Checklist 多一個確認項目
3. 可重覆使用

基於以上 3 點再撘配 [Grunt](http://gruntjs.com/ 'Grunt')、[Gulp](http://gulpjs.com/ ' Gulp')、[Webpack](https://webpack.github.io/ 'Webpack') 做流程的控管，過去許多煩雜的事情都變得如此簡單，例如要 [ESLint](http://eslint.org/ 'ESLint') 檢查 code，通過再進行測試 API，最後產出 API 文件。

事前說明：

1. 本篇使用 [Mocha](https://mochajs.org/ 'Mocha') 實作 TDD
2. 在公司分享的簡報連結放在文中最後的參考資料，需要的請內取

<!--more-->

## 開始手動

### 事前準備

#### 方法一
1. 執行 `npm init`
2. 執行 `npm install --save express`
3. 執行 `npm install --save-dev supertest should`
4. 執行 `npm install -g mocha`

#### 方法二
1. 執行 `git clone https://github.com/IvanWei/tdd-example-express.git`
2. 執行 `npm install`
3. 執行 `npm install -g mocha`

### 架 express Server
1. 在根目錄新增一個 app.js 並將下面程式碼貼上後存儲

  ```js
  const express = require('express');
  const app = express();
  const http = require('http');

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  http.createServer(app)
  .listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
  ```
2. 執行 `node app.js` 可以 Terminal 上可以看到下面的畫面，此時瀏覽器連 `localost:3000` 可以看見 Hello World! 既表示 HTTP 連線正確

### 設定 mocha

1. 新增存放測試檔案的資料夾
  - Demo 將其存放在 `./test/spec` 裡，之後範例都會以這為主要路徑
  - 沒建立過，可以下 `mkdir -p ./test/spec` 幫忙建立
2. 在 `./test` 新增 `mocha.opts`
3. 設定 Timeout 時間、啟動時預先載入的 Library、app.js 等，以下是 Demo 的設定

  ```
  --timeout 500000
  --require should
  --reporter spec
  --ui bdd
  --recursive ./app.js
  ```

  - ui 採用 bdd 方式撰寫以使用情境為出發點，此處也可以換成 tdd，但接下來的 Demo 會以 bdd 方式進行

### 寫個測試試試

1. 設一個 Object 內容如下

  ```js
  const contents = {
    string: '測試',
    number: 100
  };
  ```
2. 測試條件如下，比對 contents 的型態和裡面的內容

  ```js
  describe('contents is an Object,', () => {
    it('contents have string and number fields.', (done) => {
      contents.should.be.an.Object();
      contents.should.have.keys('string', 'number');
      contents.string.should.be.String();
      contents.string.should.be.equal('測試');
      contents.number.should.be.Number().and.equal(100);
      return done();
    });
  });
  ```

3. 執行 mocha 測試

  ```shell
  mocha test/spec/demo.spec.js
  ```

  執行完畢後會看到下面成功畫面

  ![範列 TDD 成功](/images/2016/07/25/TDD-SIMPLE-SUCCESS.png)

4. 再來將 contents 的 number 改個值

  ```js
  const contents = {
    string: '測試',
    number: 90
  };
  ```

5. 再執行一次 mocha 進行測試，此時會看見 mocha 回傳的錯誤畫面

  ![範列 TDD 失敗](/images/2016/07/25/TDD-SIMPLE-FAILED.png)

以上就完成基本 mocha 的 TDD 測試。

如果要測試 Sequelize.js 和其他 Server 端的服務，測試方式和前面教得雷同，將上面的 contents 改為回傳的 result 即可。
接下來說明接口 API 的測試方式

## API 測試

1. 安裝 supertest

  ```shell
  npm install --save-dev supertest
  ```

2. app.js 加入 supertest，並設為 global

  ```js
  const express = require('express');
  const app = express();
  const http = require('http');
  global.request = require('supertest'); //不必在每個檔案都 require 一次
  request = request('http://localhost:' + process.env.PORT); // 設定 API 前面的主機位置

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  http.createServer(app)
  .listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
  ```

3. test/spec/demo.spec.js 加入 API 的測試

  ```js
  describe('Test API,', () => {
    it('Demo.', (done) => {

      request.get('/demo').end((err, res) => {
        if (err) return done(err); // 與 Server 相關錯誤
        if (res.statusCode !== 200) return done(res.body); // 與 API 有關的錯誤

        const result = res.body;

        result.should.be.Object();
        result.should.have.keys('message');
        result.message.should.be.equal('Use API!');
        return done();
      });
    });
  });
  ```

4. 執行 mocha 測試，這次會多一個 API 的測試結果

  ```shell
  mocha test/spec/demo.spec.js
  ```

  註：API 測試和實際前端送 request 的方式相同，主要歸功於 [supertest](https://github.com/visionmedia/supertest 'supertest')。

  ![API 測試](/images/2016/07/25/TDD-SIMPLE-API-SUCCESS.png)


## 參考資料
1. [懶人包：TDD is Dead 戰文總整理](http://joe-dev.blogspot.tw/2014/06/tdd-is-dead.html '懶人包：TDD is Dead 戰文總整理')
2. [Getting started with TDD (公司分享的簡報)](http://www.slideshare.net/Ivan_wei/getting-started-with-tdd-63869156 'Getting started with TDD  (公司分享的簡報)')
3. [How to build and test your Rest API with Node.js, Express and Mocha ...](https://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/ 'How to build and test your Rest API with Node.js, Express and Mocha ...')
