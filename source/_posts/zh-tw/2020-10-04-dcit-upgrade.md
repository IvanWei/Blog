layout: post
title: DCIT 改版 Part 1
date: 2020-10-04 17:35:12
tags: [Conference, Privacy]
cover: /images/2018/05/16/DCIT.png
---

![Developer Conferences In Taiwan](/images/2018/05/16/DCIT.png)

## 前言

DCIT 開源超過兩年，也是到了該改版的時間點，這次修正 API 長久以來的 Bug 和讓 Github action 正常恢復工作 🧐

<!--more-->

## 什麼是 DCIT

DCIT 全名 [Developer Conferences In Taiwan](https://github.com/IvanWei/developer-conferences-in-taiwan) 是專門收集在臺灣開發研討會時間、地點的計劃，資訊來源主要來自閒逛 FB 、廣告、社群取得與整理至 [Google Sheet](https://docs.google.com/spreadsheets/d/1WFxqI3Ow_9GC_h5Xd7NUy_b1X-U8Ptb-u-arLGYtmGQ/edit#gid=0) ，來源基本可靠。

歡迎各路朋友一同參與維護 DCIT。

## DCIT 運作流程

Google Sheet 新增 / 修改資料 → Github action 定時執行 Makefile 下載 Google Sheet 內容和取得 [活動組織者清單](https://github.com/IvanWei/developer-conferences-in-taiwan/blob/master/data/list-of-organizations.json) → 匯出新的 README.md → 更新到 Repository

## 待執行或改善項目

- 開放 Google sheet 權限
- 調整 Github action 更新 DCIT 流程
