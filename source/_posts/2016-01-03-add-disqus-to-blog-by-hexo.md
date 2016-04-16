title: '[Hexo] 加入 Disqus 讓 Blog多個留言功能'
date: 2016-01-03 19:55:16
tags: [Github, Blog, Disqus]
---

## 注意事項

1. 此篇以 Hexo 3 為範例，其他 Blog framework 可能不適用
2. Blog 內至少有一篇文章才看得到 Disqus 的留言功能
3. 使用的 Hexo theme 為 landscape，其餘 theme 可能不適用

---

## Disqus 是什麼

- 簡單的說明：整合型的留言板
 - 適合擁有多個 Blog 平臺的人
 - 看文章標題知道怎麼回文的人
- 複雜的說明：Google 是你的好朋友，有很多相關資料
 - 提供一組關鍵字 「disqus + 什麼」

<!--more-->

## Disqus 註冊 + 設定

### Disqus 的首頁

[Disqus 首頁](https://disqus.com)

### 註冊帳號

點 SignUp 註冊

![Singup](http://blog.ivanwei.co/images/disqus/signUp.png)

### 設定留言板

1. 點右上角 Setting
2. 點 Add Disqus To Site
3. 填入留言板名稱和 Shortname (專屬的留言板網址)
 - Shortname 是紅色框起來的部分
 - 如果忘記 Shortname 晚一點會提

 ![Registered](http://blog.ivanwei.co/images/disqus/reg.png)

## Hexo 設定 Disqus

1. 開啟 Blog 下的 \_config.yml
2. 最後面新增
 ```
 # Disqus
 disqus_shortname: 這裡填剛剛的 Shortname
 ```
3. 推上 Github

## 忘記 Disqus 的 Shortname

1. 點右上角 Setting 的 Admin
 ![Menu](http://blog.ivanwei.co/images/disqus/menu.png)
2. 進入後點上方 Setup
3. Site Identity 下的 Shortname 既是我們要的
