title: 透過 Github Issue 更新 Blog 內容 (Firebase 版)
date: 2019-07-02 04:28:36
updated: 2022-02-27 14:21:47
tags: []
cover: https://user-images.githubusercontent.com/6157049/60430761-af01ba00-9c30-11e9-8c8d-fa07116b5e22.png
---

主流寫文章的網站有 [Pixnet](https://www.pixnet.net/) 、  [Medium](https://medium.com/) 、 [Github page](https://pages.github.com/) 、 [ghost](https://ghost.org) 等，除了 Github page 
 外其餘皆自帶即時的 **內容管理** ；然而 Github page 是許多剛入門寫程式人第一個架站的首選或架 Blog ，卻無法隨地更新 Blog 內容，進而讓我懶得更新 Blog。

苦思之後有了今天這篇，分享如何讓 Github Issue 成為 Blog 的內容管理器。

<!--more-->

## 第零步 - 準備好使用到的服務

1. Github
    - 使用其 Issue 、 Webhook 、 API 、 Developer 身份 (Free)
2. Travis CI
    - 需要透過 Travis CI 的手動觸發進行部署
    - [Circle CI](https://circleci.com/) 尚未支援手動觸發
3. 準備一臺 Server
    - 部署 Github 的 Webhook 使用
    - 範列使用 [Firebase functions](https://firebase.google.com/docs/functions) ，使用此方法先確認自己有能使用的信用卡，為了解除某些限制而不得不的處理
4. Node.js v8.9.0 or above

## 第一步 - 下載 Issue 的 Markdown 內容

### 取得 Repository 操作權限

1. 在 Profile 中進入 Developer settings
    ![Developer settings](https://user-images.githubusercontent.com/6157049/60479293-da7bb780-9cb7-11e9-8df2-67dee6b1a156.png)

2. 選擇建立 **Personal access tokens**
    ![Personal access tokens](https://user-images.githubusercontent.com/6157049/60480720-35fc7400-9cbd-11e9-823f-2761bee37eab.png)

3. 授權範圍選擇 public_repo ，若指定的 Repository 是 Private 則必須勾所有控制權
    ![Repository controller](https://user-images.githubusercontent.com/6157049/60481253-2c740b80-9cbf-11e9-87d6-6d02ad71ff14.png)

4. 記住產生出來的 Token ，試試能否取到 Repository 裡的 issues ，正確會吐 Array 回來，而 issue 的內容存在 body 中
    `$ curl -H "Authorization: token [Token]" https://api.github.com/repos/[user id]/[repository name]/issues`

5. 上一步沒問題既可透過 Ajax 方式取得 Response 後，將 issue 存成 Markdown 檔，下面以 fetch 為範例
    ```JavaScript
    const fetch = require('node-fetch');

    fetch('https://api.github.com/repos/ivanwei/blog/issues', {
      method: 'GET',
      headers: {
        'Authorization': `token ${gitToken}`,
      }
    })
    .then(async (response) => {
      const result = await response.json();
      console.log('result 的跑迴圈取一個 body');
    })
    .catch((error) => {
      console.log('error handler')
    });
    ```

### issue 存成 Markdown

```JavaScript
const fs =require('fs');
const util =require('util');

// 將 fs.writeFile 包成 Promise
const writeFile = util.promisify(fs.writeFile);

// 建立檔案或覆寫檔案
writeFile(`${outputPath}/$ci-gh-integration.md`, content)
.then(() => {
    console.log('File was created.');
})
.catch((error) => {
    console.log('File was not created.');
});
```

### 第一步 - 小結，還是使用寫好的工具做比較簡單

以上兩者結合既完成 issue 轉成 Markdown ，若覺得過程可以使用 [@ivanwei/blog-content-source-cli](https://github.com/IvanWei/blog-content-source-cli) ，將上述打包在一起，用法也相對簡單許許。

#### 安裝 @ivanwei/git-issue-hexo-cli

> $ yarn add @ivanwei/git-issue-hexo-cli

#### 使用方式

> $ b.content refresh -R \<Repository\> -u \<username\> -l <Issue 有這 label 既存成 MD 檔> --git-token <Github Personal access token> -o <存檔的資料夾>

接下來會使用 [@ivanwei/git-issue-hexo-cli](https://github.com/IvanWei/git-issue-hexo-cli) 來操作 issue 部分，有興趣自己手動做可以看 [Github API](https://developer.github.com/v3/issues/#list-issues-for-a-repository) ，因為前者也是使用同樣的內容加上一些步驟集結而成。

## 第二步 - 設定 Github Webhook

此處內容以 firebase functions 配上 Express 為範例， firebase 相關設定可以看[這篇](https://firebase.google.com/docs/functions/get-started) 或按下面步驟建立

### 建立 Firebase 專案

首到 [Firebase 建立專案](https://console.firebase.google.com)

### 安裝 Firebase CLI

> $ npm install -g firebase-tools / $ yarn global add firebase-tools

### 登入 Firebase

> $ firebase login

### 初始化 firebase functions

> $ firebase init functions

### 設定 Firebase project

#### 索取 Firebase 現有的 Project 清單
> $ firebase list

![Firebase List](https://user-images.githubusercontent.com/6157049/60560406-432f6680-9d82-11e9-88e9-4b776f2dd14e.png)

#### 指定 Firebase 使用的專案
> $ firebase use <project id>

### 撰寫 Serverless 內容

#### 切換到 functions 資料夾

> $ cd functions

#### 安裝 express 和 node-fetch

> $ npm install express node-fetch / yarn add express node-fetch

#### 更新 index.js

```JavaScript
const functions = require('firebase-functions');
const express = require('express');
const fetch = require('node-fetch');

const server = express();
server.use(express.json());

server.post('/', async (req, res, next) => {
  const {issue} = req.body;
  const {title, state, body} = issue;

  try {
    // 判斷 Issue 是否被關閉
    if (state === 'open') {
      res.status(200).send('Publish!!');

    } else {
      res.status(200).send('No Publish, status is not open!!')

    }
  } catch(err) {
    res.status(500).send(err);
    return next(err);
  }
});

exports.github = functions.https.onRequest(server);
```

#### 部署到 Firebase functions

> $ firebase deploy --only functions

部署後 Terminal 會回傳一串 URL ，此時可以使用 cURL 、 Postman 或寫個 Ajax 程序試送 request ，試試看是否能收到 response。

Firebase 回傳的 URL 會長得像

> https://<你選得專案地方>-<專案 ID>.cloudfunctions.net/<export 的名稱>

若沒看到或忘記這串 URL ，可以到指定的 Firebase 專案點 functions ，找找要的 `export 名稱`

![Firebase menu](https://user-images.githubusercontent.com/6157049/60562044-78d74e00-9d88-11e9-98e6-a52a8c884ddd.png)

#### 最後一步，準備好信用卡

**綁定信用卡會收到 40 臺幣信用卡的過卡費，如果選擇 Blaze 方案可以使用的免費額度有些不同，詳細可以到底部參考資料查閱。**

因為 [Firebase functions 免費版](https://firebase.google.com/pricing)對外送 Request 限定只能是 Google service ，需要升級解除此項限制。

![Firebase quota](https://user-images.githubusercontent.com/6157049/60562403-00718c80-9d8a-11e9-8c30-0e02acb0d8a9.png)


## 第三步 - 設定手動觸發 Travis CI

透過 [Travis CI API](https://docs.travis-ci.com/user/triggering-builds/) 來觸發，操作方式就直接 Show code；至於 Travis CI 對 Repository 操作權限，可以看 Tommy Chen 的 [用 Travis CI 自動部署網站到 GitHub](https://zespia.tw/blog/2015/01/21/continuous-deployment-to-github-with-travis/)

### 設定 Travis CI 要做的事

#### 參數設定

這裡的設定可以參考 [.travis.yml](https://docs.travis-ci.com/user/job-lifecycle/) 的寫法，設定則寫在 config 裡面。

```JavaScript
const body = {
  "request": {
    "branch":"master",
    "config": {
      "node_js": ["8"],
      "before_install": [
        "export TZ=Asia/Taipei",
        "openssl aes-256-cbc -K $XXXX_key -iv $OOOO_iv -in ./.travis/id_rsa.enc -out ~/.ssh/id_rsa -d",
        "chmod 600 ~/.ssh/id_rsa",
        "eval $(ssh-agent)",
        "ssh-add ~/.ssh/id_rsa",
        "cp .travis/ssh_config ~/.ssh/config",
        "npm config set registry https://registry.npmjs.org/",

        # Travis CI 預設使用 https ，為了後續操作則更新為 git
        "git remote set-url origin git@github.com:IvanWei/blog.git",

        # 下載 Issue 內容，然後轉存成 MD 檔
        "npm install -g @ivanwei/blog-content-source-cli",
        "b.content refresh -R <Repo> -u <username> -l <發佈的目標 Label> --git-token <Github 的 Personal access token> -o <存 Markdown 的資料夾>",

        # 將更動的檔案更新到目標 Repository
        "git checkout master",
        "git add .",
        "git status",
        "git commit -m \"Write something\"",
        "git push origin master"
      ],
      "script": [
        "echo \"OK!!\""
      ]
    }
  }
};
```

#### 送 Ajax request

打 request 有幾點需要注意
1. URL 的 `%2F` 不可替換成 `/`
2. headers 四項都需要設定上
    - `'Content-Type': 'application/json'`
    - `'Accept': 'application/json'`
    - `'Travis-API-Version': 3`
    - `'Authorization': 'token ' + travis_token`
3. 注意使用哪一種 Travis CI ，內容上可以參考 [這裡](https://developer.travis-ci.org/gettingstarted)
    - 參考資料 Private 部分不確定是否是漏洞，免費版的 `.org` 也是可以觸發 Private repository
4. Travis CI API 免費版 1 小時能打 10 次，而回補次數是按時間一點一點回復，而非下一個小時一次回復成 10 次
5. Travis CI 的 token 取得方式
    - 方式一使用 [Travis CLI 取得](https://developer.travis-ci.org/authentication)
    - 方式二從 [API explorer](https://developer.travis-ci.org/explore/#explorer) 取得 (黑色區塊滑鼠移過去會顯示出 Token)，_沒有直接操作 Travis CI 需求的話建議使用此方法_
![API explorer](https://user-images.githubusercontent.com/6157049/60505575-8f34c980-9cf6-11e9-85b4-084dd5af8410.png)
6. 最後別忘了要寫成 Ajax 送 request
    - 以下是範例
        ```JavaScript
        const response = await fetch(`https://api.travis-ci.org/repo/${username}%2F${repo}/requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Travis-API-Version': 3,
            'Authorization': `token ${travis_token}`,
          },
          body: JSON.stringify(body),
        });
        ```

## 參考資料
1. [Firebase Blaze 方案免費額度](https://firebase.google.com/support/faq/#pricing)