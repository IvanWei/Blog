layout: post
title: Socket.io 無限連線請求的問題
date: 2018-02-24 11:22:00
tags: [Nodejs, Learn]
---

![Socket.io](/images/2018/02/24/socket-io-logo.svg)

## 前言

最近再玩 [Feathers.js](https://feathersjs.com/) 串 [Socket.io](https://socket.io/) 發生 Server 有收到 Client 連線請求並送出回應， Client 卻一直沒收到 socket ID ， 導致 Client 再收到 Server 回應後又送一次沒有 socket ID 的請求，然後 Server 又收到沒有 socket ID 的連線請求， … (無限迴圈) 。

<!--more-->

## 前言的結果

在 Browser 的 Network 會看到以下畫面

![Many connect's request by Client side](/images/2018/02/24/connect-request.png)

然後你的電腦會變成暖暖包！

## 解法

檢查 Server side 和 Client side 的 Socket.io 的大版號！

Server side 使用 v2 ， Client side 使用 v1 時既會發生無限連線請求的情況；
Server side 使用 v1 ， Client side 使用 v1 / v2 皆可以正常運作。

畫成表格會長這樣

| | Socket.io@1 (Server) | Socket.io@2 (Server) |
|---|---|---|
| Socket.io@1 (Client) | ✔ | ✖ |
| Socket.io@2 (Client) | ✔ | ✔ |

## 結語

沒有錯誤訊息的問題，加上 Server 和 Client 都有收到回應與請求，因此花了一些時間找問題。

建議 Server 和 Client 使用 Socket.io 時，使用同樣的大版號，可以避免此情況的發生。
