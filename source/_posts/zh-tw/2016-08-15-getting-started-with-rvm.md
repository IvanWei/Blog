layout: post
title: 安裝 RVM 輕鬆跳躍在每個版本間
date: 2016-08-15 00:58:16
tags: [Shell, Ruby, Learn]
cover: /images/2016/08/15/RVM-LOGO.png
---

![遇見 紅寶貝(Ruby) 群](/images/2016/08/15/RVM-LOGO.png)

## 前言

[Ruby Version Manager(RVM)](https://rvm.io/  'Ruby Version Manager(RVM)') 是 Ruby 的一種版本管理工具，功能與我熟悉的 [Node Version Manager(NVM)](https://github.com/creationix/nvm 'Node Version Manager(NVM)')  相同，可以輕鬆在各個版本間做切換。

需要 Ruby 的原因有兩個

1. 安裝 [Compass](http://compass-style.org/ 'Compass') 需要
2. 以後跳進 Ruby 時方便

<!--more-->

## OSX 安裝 RVM

### Bash Shell
1. 執行 `curl -sSL https://get.rvm.io | bash -s stable`
2. 執行 `rvm` 測試是否安裝正確

### Fish Shell
1. 執行 `curl -sSL https://get.rvm.io | bash -s stable`
2. 執行 `omf install rvm`，跳出 omf 的錯誤請安裝 Oh My Fish，安裝教學可以到我之前寫的 [安裝 Fish shell 與 NVM](https://blog.ivanwei.co/2016/06/07/2016-06-07-bash-to-fish/#安裝-Fish-Shell-插件管理 '安裝 Fish shell 與 NVM') 教學文的「插件管理」了解
3. 執行 `rvm` 測試是否安裝正確

## 常用指令

| 指令 | 說明 |
|---|---|
| `rvm list` | 列出本機已安裝的版本 |
| `rvm list known` | 列出 RVM 已知的 Ruby 版本 |
| `rvm install X.X.X` | 安裝 Ruby X.X.X 版 |
| `rvm use X.X.X` | 切換到 X.X.X 版 |
| `rvm use X.X.X  --default` | 設定成默許啟動的版本號 |
| `rvm remove X.X.X` | 移除 X.X.X 版 |

## 常見問題
1. 執行 rvm 跳出 `/var/folders/...: shell_session_update: command not found`
  - 執行 `rvm get head`，更新 RVM

## 參考資料
1. [RVM](https://rvm.io/ 'RVM')
2. [RVM 跳 shell_session_update: command not found](http://superuser.com/questions/1044130/why-am-i-having-how-can-i-fix-this-error-shell-session-update-command-not-f 'shell_session_update: command not found')
3. [Ruby China RVM 手冊](https://ruby-china.org/wiki/rvm-guide 'Ruby China RVM 手冊')
