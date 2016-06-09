title: package.json 裡版本號前的符號代表的意義
date: 2016-03-27 17:42:33
tags: [Nodejs]
---

## 此說明適用在 Nodejs 的 package.json 和 Bower.io 的 bower.json

![Version control](https://blog.ivanwei.co/images/2016/03/27/VERSION_CONTROL.png)

<!--more-->

| 符號 | 說明 |
|---|---|
| ~ | 安裝小版號的最新版。E.g. ~1.2.1，現在最新 1.3.0，1.2.X 最後的小版號是 8，此時只安裝 1.2.8，miss 1.3.0 |
| ^ | 安裝第 2 個數字下的最新號。E.g. 1.2.1，現在最新 2.1.0，1.X.X 最後的版號是 1.7.3，此時只安裝 1.7.3 |
| \* | 安裝最新版 |

從以上說明可以得到

`*` 包含 `^`，`^` 包含 `~`


## 參考資料

1. [Difference between tilde(~) and caret(^) in package.json](http://stackoverflow.com/questions/22343224/difference-between-tilde-and-caret-in-package-json)

---
