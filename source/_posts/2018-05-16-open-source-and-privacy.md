layout: post
title: DCIT 與隱私
date: 2018-05-16 19:05:12
tags: [Conference, Privacy]
---

![Developer Conferences In Taiwan](/images/2018/05/16/DCIT.png)

## 前言

在臺灣，社群的興起並發展也有一段的日子， 伴隨而來的副產品是 Meetup 、 Conference 的增加，而活動的增加對我而言要關注的活動也隨之都，進一步產生時間管理上的破碎情況。

找了一下網路是否有相關整理資料，找到得資訊多半屬於國外，臺灣「那時」還沒找到相關的，在這情況下自己動手做整理一份！

<!--more-->

## DCIT 開源的那時與現在

「那時」，就是那時！

大致在整理完臺灣已知 Conference 並發佈 [Developer Conferences In Taiwan](https://github.com/IvanWei/developer-conferences-in-taiwan)(下面簡稱 DCIT ，不然好多字 ) 到 Github 後， [TGmeetup](https://github.com/TGmeetup) 團隊也放出類似想法的專案，免得要來比較一下 XD

| 項目 | DCIT | TGmeetup |
|---|---|---|
| 參與開發人數 | 1 | > 1 |
| 支援 RSS | ㄨ | 〇 |
| 友善管理活動 | ㄨ | 〇 |
| CI | ㄨ | 〇 |
| CLI | CI | ㄨ | 〇 |
| 結合 Google map | ㄨ | 〇 |
| 活動記錄量 | 只整理 Conference 、 社群 | Meetup 、 Conference 、簡報、社群通通有 |
| 活動加進 Google Calendar | 單一活動加入 | 分享所有 Calendar 活動 |

上面比較表整理完後，發現慘敗！！！

但是，就是這個但是！現況是 DCIT 可以找到超過 80% 在臺灣的 Conference 舉辦日期、活動天數、售票連結，而 TGmeetup 的資料量則緩慢成長中，這或許是因為兩個專案的出發點有所不同。 DCIT 誕生純粹是我覺得看到得活動太多，到底活動與活動間有沒有時間衝突不易知道，憤而產生 (XD) ； TGmeetup 則比較偏向藉由群眾的力量一起完善內容。

在一些未來完善的構想上，兩者有雷同也有不同處，下面就拿上面的比較表來回應

| 項目 | DCIT 回應 |
|---|---|
| 參與開發人數 | 可與不可求 |
| 支援 RSS | 還沒打算實作，因為 DCIT 可以做單一活動加進 Calendar ，使用者可以自行設定是否要提醒 |
| 友善管理活動 | 同樣預計透過 Issue ，但不同在 Issue 為提供資訊，經審查後再加入 JSON 檔裡 |
| CI | 在進行中，未來預計將 Issue 為發動點來進行 JSON 檔、 Markdown 和 Web page 更新 |
| CLI | 暫時沒考慮 |
| 結合 Google map | 預計先使用 Google Map ， 下一次考慮使用 [OpenStreetMap](https://www.openstreetmap.org/) |
| 活動記錄量 | 預計下階段加上 Meetup 與國外活動 |
| 活動加進 Google Calendar | 維持現況 |


## 隱私

![Privacy violations](/images/2018/05/16/privacy-violations.png)

為了更方便查看活動間的日期 ( 看 Markdown 還是不夠友善 ) ， 因此希望能透過 Calendar 的方式顯示 DCIT 的資料，因此找到 [NHN Entertainment](https://www.nhnent.com/ko/index.nhn) 公司的開源專案「tui.calendar」， 5000 顆的 star 品質上應該不成問題。在使用上確實沒大問題，只是一直不解為何 Browser 總會 `送 Google Analytics 的 request`

![Send GA?](/images/2018/05/16/tui.calendar-send-ga-request.png)

由於 [DCIT](https://tw-conferences.ivanwei.co/) 的網頁上我並沒有埋 GA Code ，只好發揮柯南精神，有柯南出現的地方 98% 會發生命案！( 誤 XD )

![真相只有一個](/images/2018/05/16/konan.jpg)

只要查 `UA-115377265-9` 這組 GA tracking code 的 Id ，就可以找到 NHN Entertainment 自家發的 PR ( [Here](https://www.google.com.tw/search?q=UA-115377265-9&oq=UA-115377265-9&aqs=chrome..69i57.141j0j1&sourceid=chrome&ie=UTF-8) )，接下來源頭就簡單許多。查了才發現 NHN Entertainment 應該是一家南韓公司，他們家 Open source 的專案在 `package.json` 幾乎安裝 [tui-code-snippet](https://github.com/nhnent/tui.code-snippet) 這套自家 library ，而送 GA 是透過 cell `snippet.imagePing` 這個函式，最後在 `tui-code-snippet` 的 [request.js](https://github.com/nhnent/tui.code-snippet/blob/master/src/js/request.js) 找到相關內容， 送 GA 的問題告一段落。

## 結語

從 Facebook 的劍橋事件延伸 Facebook 為什麼是免費，問題重點都在「隱私」、「資訊」上，俗話說「廠商不是吃素的」、「隱私是數位時代在最有價值的資料」， NHN Entertainment 公司的做法是否適合交給各位自行評斷，我能接受在事前告知的情況下傳送 GA 給開發公司，然而在該公司卻沒有說明，連 `tui-code-snippet` repo 的 README 都避談 request.js 的用途，好在他們的 License 是 [MIT](https://choosealicense.com/licenses/mit/) 。
