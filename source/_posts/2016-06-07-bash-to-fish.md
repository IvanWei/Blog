layout: post
title: 安裝 Fish shell 與 NVM
date: 2016-06-07 22:51:34
tags: [Shell, Nodejs]
---

## 玩過 Bash，抓 Fish 去

![Fish Shell Logo](https://blog.ivanwei.co/images/2016/06/07/FISH_SHELL_LOGO.png)

## 何為 Fish shell

fish 是一個 Unix shell ， friendly interactive shell 的縮寫，專注於互動應用、易用性和友好的使用者體驗，其設計目的是通過容易發現，記住和使用的方式為使用者提供一套豐富、強大的功能。
fish 於2005年在GNU通用公眾授權條款條款下正式釋出，是一款自由軟體。

<!--more-->

## 前言

玩過兩年的 Bash shell 跳槽 Fish shell 有三個主要原因：

1. 想換個口味
2. 小眾市場 + Open source
3. 比 Bash shell 更友善操作，如省略大小字、上下選擇等

## 更新

2016-06-09 Fisherman 取代 Oh My Fish 

## 安裝 Fish shell

Mac 有三種安裝方式，建議使用第一種方式安裝

1. 執行 `brew install fish`
2. 下載 [Installer](https://fishshell.com/files/2.3.0/fish-2.3.0.pkg "Installer") 安裝
3. 下載 [Fish shell app](https://fishshell.com/files/2.3.0/fish.app.zip "Fish shell app")

其他作業系統可以到 [Fish shell 官網](https://fishshell.com/#platform_tabs "Fish shell 官網") 找到對應的安裝方式

## 安裝 Fish Shell 插件管理

> 可以略過，沒有安裝也可以正常使用 Fish shell

什麼是 [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish "Oh My Fish") / [fisherman](http://fisherman.sh/ "fisherman") 呢？它就像 Oh my zsh 之於 Zsh shell，提供 Fish Shell 更多的 Theme、Framework 等。

Oh My Fish 與 fisherman 選擇哪一個安裝呢？以下我做一個簡易的分類
```
    - Oh My Fish： 能接受開啟 Terminal 速度慢 + 安裝 plugin 既可使用
        - 安裝
            1. 執行 `curl -L https://github.com/oh-my-fish/oh-my-fish/raw/master/bin/install | fish`
            2. 執行 `omf help`，是否沒有出現錯誤訊息
        - 移除
            1. 執行 `rm -rf ~/.config/omf`
            2. 執行 `rm -rf ~/.local/share/omf`
            3. 開啟 `~/.config/fish/config.fish` 刪除 Oh MY Fish 相關程序
            4. 重啟 Terminal
    - fisherman： 要速度且知道如何兼容性問題
        - 安裝
            1. 執行 `curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs git.io/fisher`
            2. 重啟 Terminal 
        - 其他
            1. 發生 git_is_repo 錯誤，安裝 `fisher git_util` 既可解決
```

我從 Oh My Fish 跳槽到 fisherman 的原因 (優缺點)：
- 優點
    1. Terminal 開啟速度比較快 (fisherman 使用 function 方式載入 plugin，Oh My Fish 則在開啟 Terminal 時載入所有安裝的 plugin)
    2. 兼容 Oh My Fish 所有 plugins
- 缺點
    1. 安裝 plugin 可能會比較複雜，安裝 Oh My Fish plugin 也可能無法直接使用

## 調整預設執行的 Shell

執行 `chsh -s /usr/local/bin/fish` ，重啟 Terminal 可以看到執行畫面變成底下這樣

![Fish Shell](https://blog.ivanwei.co/images/2016/06/07/FISH_SHELL.png)

如果要切換回 Bash shell，執行 `chsh -s /bin/bash` 重啟 Terminal 既可。

## 安裝 NVM

這段主要提供給在開發 Node.js 又想使用 Fish shell 的朋友們。

特別提醒一點 [nvm-fish](https://github.com/Alex7Kom/nvm-fish#user-content-install-script "nvm-fish") 作者已沒有再更新，雖然 `NVM` 可以正常安裝 node，
但會抓不到 `NPM` 指令。

- 只安裝 Fish shell
	1. [NVM fish wrapper](https://github.com/passcod/nvm-fish-wrapper#user-content-installing "NVM fish wrapper")，照上面依序執行既可
- Oh My Fish 版
	1. 執行 `omf install nvm`，安裝 [plugin-nvm](https://github.com/derekstavis/plugin-nvm "plugin-nvm")
- fisherman 版 (2 ~ 4 步驟參照 [NVM fish wrapper](https://github.com/passcod/nvm-fish-wrapper#user-content-installing "NVM fish wrapper"))
	1. 執行 `fisher nvm`
	2. 執行 `brew install nvm`
    3. 執行 `mkdir ~/.nvm`
    4. 執行 `ln -s (brew --prefix nvm)/nvm.sh ~/.nvm/nvm.sh`

其他 Fish 安裝 NVM 的方式可以到 [NVM](https://github.com/creationix/nvm "NVM") 的 Github 上找到。

## 參考資料

1. [比 Zsh 比好用的 Shell：Fish Shell 介紹與安裝](https://nodejust.com/fish-shell-zsh/ "比 Zsh 比好用的 Shell：Fish Shell 介紹與安裝")
2. [从zsh切换到fish](http://blog.just4fun.site/from-zsh-to-fish.html "从zsh切换到fish")
3. [fish shell wiki](https://zh.wikipedia.org/wiki/Fish "fish shell wik")