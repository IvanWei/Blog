title: '[Hexo] Gtihub 上架 Blog'
date: 2015-10-11 16:21:08
tags: [Github, Blog]
---

1. 2016-03-27 新增 Hexo 內建的功能
 - 使用 Read more 按鈕
 - 透過 Hexo 佈署與不轉換特定的 Markdown 檔
2. 2015-10-11 新增用 Hexo 寫 Blog

## Blog framework 的選擇

查詢 `github blog framework` 可以很輕易找到三個 framework
1. [Jekyll](http://jekyllrb.com/) ( [Github 官方推薦](https://pages.github.com/#next-steps))
2. [Octopress](http://octopress.org/) ( 基於 Jekyll 延伸開發 )
3. [Hexo](https://hexo.io/) ( 以 JS 為基礎 + 開發者是臺灣人 )

不想用這三個 Blog framework 有其他選擇嗎？有的！

<!--more-->

例如：
1. [Hugo](http://gohugo.io/)
2. [Pelican](http://blog.getpelican.com/)

想知道更多 Blog framework 可以到下面的網站，先和大家說一聲，

裡面的 framework 不全然都是 Statics blog framework。
https://www.staticgen.com/

---

## Hexo 架 Blog 環境與發文兩部分

### [Part 1] Hexo 安裝 +　初始化

首先要安裝　Git 和 Nodejs，如果已經安裝可以略過。

#### 安裝　Git

- Windows： 下載並安裝 [Git](https://git-scm.com/download/win)
- Mac：XCode 內有 Git，如果無法使用可以用 [Homebrew](http://mxcl.github.com/homebrew/) 或 [Git](http://sourceforge.net/projects/git-osx-installer/files/git-2.5.3-intel-universal-mavericks.dmg/download?use_mirror=autoselect) 下載並安裝
- Linux (Fedora, Red Hat, CentOS)： `sudo yum install git-core`
- Linux (Ubuntu, Debian)： `sudo apt-get install git-core`

#### 安裝　Nodejs

下列兩個安裝方式，推薦使用 NVM 方式安裝

1. NVM： `nvm install 0.12`
2. 安裝檔： https://nodejs.org/en/blog/release/v0.12.7/

#### 安裝　Hexo

```
npm install hexo-cli -g
```

#### 開始架 Blog + 切換資料夾 + 安裝套件

```
hexo init blog
cd blog
npm install
```

#### Hexo Blog 設定 (\_config.yml)

這檔案是設定頁面上基礎的資訊的設定，例如標題、Widget等。
正常會看到兩個 \_config.yml 檔，一個在 `/blog` 下，另一個在 `/blog/themes/使用的樣版` 下
themes 可以在 /blog/\_config.yml 設定，theme 可以到 https://hexo.io/themes/ 下載

#### 使用 Hexo Deploy 佈署

Hexo 佈署的設定放在 blog/\_config.yml 的 deploy
目前提供 Git、Heroku、Rsync、OpenShift、FTPSync
要佈署的環境若不在上述 5 種，可以將 blog/public 下的檔案複製到你的伺服器上。

設定方式（以 Github 為例）：

先安裝 `hexo-deployer-git`，並在 config 中設定佈署的相關內容。
```
deploy:
  type: git
  repo: git@github.com:你的 Github 帳號/專案名稱.git
  branch: gh-pages（沒有設定，系統會自動選其中一個分支當做佈署）
  message: "自訂定 Commit 訊息"（預設 Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}）
```

#### 佈署時不轉換特定 Markdown 檔 （以 README.md 為例）

只需要三個步驟既可完成

1. blog/source 新增 README.md ，執行 `hexo generate`
2. blog/\_config.yml 的 skip_render 加上 README.md
3. 最後執行 `hexo deploy` 之後在 github 在既可看到 README.md 的內容

![Deploy readme](http://blog.ivanwei.co/images/hexo/deploy-readme.png)

如果要略過多個檔案或資料夾則 skip_render 改為
```
skip_render:
  - README.md
  - images/**
```

#### 增加 Read more 按鈕

在撰寫的文章中加入 `<!--more-->` 既可。

### [Part 2] Hexo 常用指令

| 指令 | 說明 |
|---|---|
| `hexo server` | 啟動 Server |
| `hexo clean`  | 清除產生的靜態網頁 |
| `hexo generate -w` | 產生靜態網頁並在檔案有變更就更新靜態網頁 |
| `hexo new 'Title'` | 產生新貼文的 Markdown 檔 |
| `hexo deploy` | 佈署內容 |

### 參照資料

1. [Hexo 官網](https://Hexo.io)
2. [如何不处理source目录下某个子目录的所有文件，仅仅是将其copy到public目录中对应目录？](https://github.com/hexojs/hexo/issues/1146#issuecomment-88798481)
