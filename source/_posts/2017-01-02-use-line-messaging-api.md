layout: post
title: 做個 Line Bot 來玩玩
date: 2017-01-02 02:14:16
tags: [Nodejs, Learn]
---

![Line Bot With Line Messaging API](/images/2017/01/02/LINE-MESSAGING-API.png)

## 前言

Bot 已成為一門顯學，從 Telegram 、 Facebook 、 Skype 、 Slack 到 Line 釋出相關的 API 給開發者。翻翻各家 API 都可以發現 Bot 說穿是釋出各家 Chat 的 API 接口 + Webhooks 攔截 User Request 後進行轉發，說穿這門技術就現今而言門檻很低。

<!--more-->

### 為何選 Line Bot

市占率與 APP 的定位！

- 市占率
    在臺灣應該是成現 Line > Facebook Messenger > Slack >= Telegram / Skype ，因此為了之後辦活動時可以使用， Line 就很理成章成了最佳選擇。
- 定位
    - Slack：加速團隊溝通，減少訊息的等待空窗期
    - Telegrame：和 Line 定位相近，主打安全性，在 Line 還沒為訊息加密時，它一開始就是加密，不過 [8 月爆出被駭](http://technews.tw/2016/08/03/the-super-security-telegram-is-hacked-user-should-use-two-factor-authentication/))
    - Messenger Platform：一樣使用 Facebook Messenger ，不過主要是供 Fans Page 使用，其服務對象是粉絲對 Fans Page 發訊息
    - Skype：通話是 Skype 的價值核心

## Line Bot 實作注意事項

1. Line Bot API 在今年做了一次大改版，舊版的 [Bot API](https://developers.line.me/bot-api/overview) 已被放進汰除名單，取而代之是 [Message API](https://developers.line.me/messaging-api/overview) ，別使用到舊得 API 。
2. 實作 Framework 使用 Koa@2 + Babel (為了 async/await )

## Line Bot 帳號申請

1. 到 [Line Business](https://business.line.me) 登入
    ![Line Business 畫面](/images/2017/01/02/LINE-BUSINESS-WEBSITE.jpg)
2. 輸入 Line 的 Email 與密碼，手機要準備好，登入時需要在 Line APP 上輸入驗證碼
    ![登入 Line](/images/2017/01/02/LOGIN-LINE-BY-WEBSITE.png)
3. 新增公司，因為 Line Messaging API 需要綁在公司下
    ![新增公司資料](/images/2017/01/02/REGISTER-A-COMPANY.png)
4. 建立商用帳號
    ![建立 Line Bot 的商用帳號](/images/2017/01/02/CREATE-LINE-BOT-OF-COMPANY.png)
5. Messaging API 選 開始使用Messaging API 或開始使用Developer Trial
    - 回應功能： 開始使用 **Messaging API**
    - 回應 + 主動推訊息： 開始使用 **Developer Trial**
    ![選擇申請的 Messaging API 權限](/images/2017/01/02/APPLY-MESSGING-API.png)
6. 建立 Line Bot 帳號
    ![填寫 Line Bot 資料](/images/2017/01/02/LINE-LINE-BOT-DATA.png)
7. 前進 LINE@MESSAGER
    ![LINE@MESSAGER](/images/2017/01/02/GO-LINE-MESSAGER.png)
8. 開始使用 API
    ![開啟 Messging API 的注意需知](/images/2017/01/02/USE-API.png)
9. Webhook傳訊 改為 允許
    ![開啟 Webhooks 功能](/images/2017/01/02/APPLY-WEBHOOKS.png)

## Koa 與 Line Messging API 的合作

1. 到 Line Business 帳號清單，選要實作的 Bot 並點 **LINE Developers** ，將 Channel Serect 的密碼留下來
    ![Line Bot 設定](/images/2017/01/02/GET-CHANNEL-SECRET.png)
2. 掛載 Babel
  ```
  require('babel-core/register')({
    plugins: ['transform-async-to-generator']
  });
  ```
3. 使用 Koa 建立 Webhooks + 身份認證
  ```
  const koa = require('koa');
  const app = koa();
  // 送 Request 用 ( 也要安裝 request package )
  const request = require('request-promise');
  // 載入 crypto ，等下要加密
  const crypto = require('crypto');
  // 放 Line Bot 的 Channel Secret
  const channelSecret = '...';
  // 按 Line 的規定設定加密
  const hash = crypto.createHmac('sha256', channelSecret)
            .update(Buffer.from(JSON.stringify(koaRequest.body), 'utf8'))
            .digest('base64');

  const router = require('koa-router');
  router.post('/webhooks', async (ctx, next) => {
      // 取 User 傳送得資料
      // 和 Request 送來做比對 ( Status Code 這階段會有 200 / 401 )
      if ( koaRequest.headers['x-line-signature'] === hash ) {
        ctx.status = 200;

        // User 送來的訊息
        ctx.request.events

        // 回覆給 User 的訊息
        let options = {
          method: 'POST',
          uri: 'https://api.line.me/v2/bot/message/reply',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
          body: {
            replyToken: replyMessage.replyToken,
            messages: [{
                type: 'text',
                text: '是文字',
              }],
          },
          json: true,
        }

        await request(options);

      } else {
        ctx.body = 'Unauthorized! Channel Serect and Request header aren\'t the same.';
        ctx.status = 401;
      }
  });

  app.use(router);

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  });
  ```
4. 以上完成基礎 Line Bot 的建置內容，接下來將 Code 放入 PaaS 等空間與到 Line Developers 設定對應的 Webhooks 的位置既可讓自己的 Bot 運作。

## 成品分享

![正確回覆訊息的 Line Bot](/images/2017/01/02/SHOW-RESULT.png)

[Easy Line Bot](https://github.com/IvanWei/easy-line-bot)

有需要的人可以 Fork 回去或發 PR 給我，想要玩玩可以掃下方 QR Code 加 Bot 為好友（若 Bot 沒有反應，等它一下。因為放 Heroku ，此服務一段時間沒有使用會將 Server 進行睡眠，等有人使用再喚醒）

![Line Bot 的 QR Code](/images/2017/01/02/LINE-BOT-FREE-QR-CODE.png)

## 參考資料
1. 聊天 APP 的 Bot API
    - [Slack Bot](https://api.slack.com/bot-users)
    - [Telegram Bot](https://core.telegram.org/bots/api)
    - [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform)
    - [Skype Bot](https://docs.botframework.com/en-us/skype/getting-started)
2. [Line Messging API](https://devdocs.line.me/en/)
3. [Bundit J. - linebot](https://github.com/boybundit/linebot)
4. [Ivan Wei - 從零開始認識 Node.js](http://ithelp.ithome.com.tw/users/20102342/ironman/995)
