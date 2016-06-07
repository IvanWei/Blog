layout: post
title: 安裝 Fish shell 與 NVM
date: 2016-06-07 22:51:34
tags: [Shell, Nodejs]
---

## 玩過 Bash，抓 Fish 去

![Fish Shell Logo](https://blog.ivanwei.co/images/2016/06/07/FISH_SHELL_LOGO.png)

## 前言

玩過兩年的 Bash shell 跳槽 Fish shell 有三個主要原因：

1. 想換個口味
2. 小眾市場 + Open source
3. 比 Bash shell 更友善操作，如省略大小字、上下選擇等

<!--more-->

## 安裝 Fish shell

Mac 有三種安裝方式

1. 執行 `brew install fish`
2. 下載 [Installer](https://fishshell.com/files/2.3.0/fish-2.3.0.pkg "Installer") 安裝
3. 下載 [Fish shell app](https://fishshell.com/files/2.3.0/fish.app.zip "Fish shell app")

其他作業系統可以到 [Fish shell 官網](https://fishshell.com/#platform_tabs "Fish shell 官網") 找到對應的安裝方式

## 安裝 Oh My Fish

> Oh My Fish 可以略過，因為沒有安裝也可以正常使用 Fish shell

什麼是 Oh My Fish 呢？它就像 Oh my zsh 之於 Zsh shell，提供 Fish Shell 更多的 Theme、Framework 等。 

1. 執行 `curl -L https://github.com/oh-my-fish/oh-my-fish/raw/master/bin/install | fish`
2. 執行 `omf help`，是否沒有出現錯誤訊息

## 調整預設執行的 Shell

執行 `chsh -s /usr/local/bin/fish` ，重啟 Terminal 可以看到執行畫面變成底下這樣

![Fish Shell](https://blog.ivanwei.co/images/2016/06/07/FISH_SHELL.png)

如果要切換回 Bash shell，執行 `chsh -s /bin/bash` 重啟 Terminal 既可。

## 安裝 NVM

這段主要提供給在開發 Node.js 又想使用 Fish shell 的朋友們。

特別提醒一點 [nvm-fish](https://github.com/Alex7Kom/nvm-fish#user-content-install-script "nvm-fish") 作者已沒有再更新，雖然 `NVM` 可以正常安裝 node，
但會抓不到 `NPM` 指令。

1. 只安裝 Fish shell
 - [NVM fish wrapper](https://github.com/passcod/nvm-fish-wrapper#user-content-installing "NVM fish wrapper")，照上面依序執行既可
2. 有安裝 Oh My Fish
 - 執行 `omf install nvm`

其他 Fish 安裝 NVM 的方式可以到 [NVM](https://github.com/creationix/nvm "NVM") 的 Github 上找到。

## 參考資料

1. [比 Zsh 比好用的 Shell：Fish Shell 介紹與安裝](https://nodejust.com/fish-shell-zsh/ "比 Zsh 比好用的 Shell：Fish Shell 介紹與安裝")
2. [从zsh切换到fish](http://blog.just4fun.site/from-zsh-to-fish.html "从zsh切换到fish")
3. [NVM - Github](https://github.com/creationix/nvm "NVM - Github")
4. [plugin-nvm](https://github.com/derekstavis/plugin-nvm "plugin-nvm")
5. [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish "Oh My Fish")