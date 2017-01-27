layout: post
title: 安裝 Fish shell 與 NVM
date: 2016-06-07 22:51:34
tags: [Shell, Nodejs]
---

## 玩過 Bash，抓 Fish 去

![Fish Shell Logo](/images/2016/06/07/FISH_SHELL_LOGO.png)

## 何為 Fish shell

fish 是一個 Unix shell ， friendly interactive shell 的縮寫，專注於互動應用、易用性和友好的使用者體驗，其設計目的是通過容易發現，記住和使用的方式為使用者提供一套豐富、強大的功能。
fish 於2005年在GNU通用公眾授權條款條款下正式釋出，是一款自由軟體。

<!--more-->

## 更新

- 2017.01.27
    1. 新增 Facebook Yarn 可能導致 NVM 失效與解決方式
- 2016.06.28
    1. 更新移除 Oh My Fish 和 fisherman 的方法
    2. 調整 Oh My Fish 和 fisherman 的比較方式
    3. 新增 fisherman 官方回應 nvm 重啟後沒有載入 Global 套件的原因與解決方法

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

## 調整預設執行的 Shell

執行 `chsh -s /usr/local/bin/fish` ，重啟 Terminal 可以看到執行畫面變成底下這樣

![Fish Shell](/images/2016/06/07/FISH_SHELL.png)

如果要切換回 Bash shell，執行 `chsh -s /bin/bash` 重啟 Terminal 既可。

## 安裝 Fish Shell 插件管理

> 可以略過，沒有安裝也可以正常使用 Fish shell

什麼是 [Oh My Fish](https://github.com/oh-my-fish/oh-my-fish "Oh My Fish") / [fisherman](http://fisherman.sh/ "fisherman") 呢？它就像 Oh my zsh 之於 Zsh shell，提供 Fish Shell 更多的 Theme、Framework 等。

Oh My Fish 與 fisherman 選擇哪一個安裝呢？以下我做一個簡易的分類
```
    - Oh My Fish： 能接受開啟 Terminal 速度慢 + 安裝 plugin 既可使用
        - 安裝
            1. 執行 `curl -L https://github.com/oh-my-fish/oh-my-fish/raw/master/bin/install | fish`
            2. 執行 `omf help`，是否沒有出現錯誤訊息
        - 移除
            1. 執行 `omf destroy`
    - fisherman： 要速度且知道如何兼容性問題
        - 安裝
            1. 執行 `curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs git.io/fisher`
            2. 重啟 Terminal
        - 移除
            1. 執行 `fisher ls | fisher rm`，移除所有 fisher 已安裝的套件
            2. 執行 `fisher self-uninstall`
        - 其他
            1. 發生 git_is_repo 錯誤，安裝 `fisher git_util` 既可解決
```

fisherman 與 Oh My Fish 的比較：

| | fisherman | Oh My Fish | 原因 |
|---|---|---|---|
| 載入速度 | 勝 | | fisherman 使用 function 方式載入 plugin，<br>Oh My Fish 則在開啟 Terminal 時載入所有<br>安裝的 plugin |
| 套件資源 | | 勝 | fisherman 除自身的 plugins 外，也能夠安裝 <br>Oh My Fish 所有 plugins，但可能需要安裝<br>其他 plugin 才可正常使用 |

## 安裝 NVM

這段主要提供給在開發 Node.js 又想使用 Fish shell 的朋友們。

特別提醒一點 [nvm-fish](https://github.com/Alex7Kom/nvm-fish#user-content-install-script "nvm-fish") 作者已沒有再更新，雖然 `NVM` 可以正常安裝 node，
但會抓不到 `NPM` 指令。

- 只安裝 Fish shell
    1. [NVM fish wrapper](https://github.com/passcod/nvm-fish-wrapper#user-content-installing "NVM fish wrapper")，照上面依序執行既可
- Oh My Fish 版
    1. 執行 `omf install nvm`，安裝 [plugin-nvm](https://github.com/derekstavis/plugin-nvm "plugin-nvm")
- fisherman 版 (2 ~ 4 步驟參照 [NVM fish wrapper](https://github.com/passcod/nvm-fish-wrapper#user-content-installing "NVM fish wrapper"))
    1. 執行 `brew install nvm`
    2. 執行 `mkdir ~/.nvm`
    3. 執行 `ln -s (brew --prefix nvm)/nvm.sh ~/.nvm/nvm.sh`
    4. 執行 `fisher nvm`，會安裝 edc/bass 和 fisherman/nvm


    - 使用 `npm install -g` 安裝的套件，重啟 Terminal 後會失效，暫時解法是下 `npm` 既可。推測是因為 fisherman 摘用 function 載入造成重啟失效。
    - 承上 [fisherman 官方回應](https://github.com/fisherman/nvm/issues/3 "fisherman 官方回應")，原因是 fisherman 使用 function 方式載入導致 `npm` 屬於被動觸發，而 fisherman 正是以此方法取得快速開啟 fish shell 的效果。如果仍希望使用 fisherman 又希望能一開啟就取得 Global 的套件，可以連到 [fisherman 官方回應](https://github.com/fisherman/nvm/issues/3 "fisherman 官方回應") 裡面有說明解決方法。

### 補充資料
1. 其他 Fish 安裝 NVM 的方式可以到 [NVM](https://github.com/creationix/nvm "NVM") 的 Github 上找到。
2. 若使用 Facebook 的 [Yarn](https://yarnpkg.com/) ，強烈建議使用 `npm install yarn -g` 安裝，而非官方手冊寫得透過 Homebrew 的方式，原因是我用 Homebrew 的方式安裝過 Yarn 兩個版本（0.17.8 與 0.19.1），安裝 0.17.8 版本時一切正常，但安裝到 0.19.1 版本會發現 Homebrew 在安裝 Yarn 之前會另外安裝 node 最新的版本，而這個動作會導致原本使用的 NVM 失效（此時移除 Yarn 也無效，因為此時的 node 已經和 NVM 沒有關係）。
    － 若已經透過 Homebrew 安裝到 0.19.1 版本並想移除，可以下 `brew uninstall yarn node nvm` ，然而再重新安裝 NVM `brew install nvm` ，此時 NVM 就回來了！

## 參考資料

1. [比 Zsh 比好用的 Shell：Fish Shell 介紹與安裝](https://nodejust.com/fish-shell-zsh/ "比 Zsh 比好用的 Shell：Fish Shell 介紹與安裝")
2. [从zsh切换到fish](http://blog.just4fun.site/from-zsh-to-fish.html "从zsh切换到fish")
3. [fish shell wiki](https://zh.wikipedia.org/wiki/Fish "fish shell wiki")
