layout: post
title: LINE Login 和 Passport.js
date: 2018-03-03 19:05:12
tags: [Nodejs, Learn]
cover: /images/2018/03/03/line-login-web.png
---

![LINE Login](/images/2018/03/03/line-login-web.png)

## 前言

之前為了接案需要寫了一個 Passport.js 版的 LINE login ([passport-line-auth](https://github.com/IvanWei/passport-line-auth)) ，大該在 17年下半年注意到 LINE Login 更新到 v2.1 版多了 [OpenID Connect](http://openid.net/connect/) 和 Email ，那時就興起改版的念頭，這兩天總算花了一些時間做完大部分我預期的功能。

<!--more-->

## v0.2.1 的變動

1. LINE login 的預設值拉出自成一個 `options.js` ，方便日後調整相關 URL。
2. 大約花 2 個小時看了 [passport](https://github.com/jaredhanson/passport) 與 [passport-oauth2](https://github.com/jaredhanson/passport-oauth2) 的 Code ，調整 passport-line-auth 之前一些 Workaround 的做法。
3. 增加 `bot_prompt` 參數，讓跳至 LINE Login 畫面時同時提供使用者加入對應的 LINE Bot。
4. 增加 example 資料夾，用新人可以參考範圍使用。

## 結語

看 Source code 還是滿有趣，可以學習到不少其他開發者的開發思維。也滿推薦開發者花點時間做一些 side project ，一方面練習實作，一方面可以檢視自己的開發能力與開發思維。
