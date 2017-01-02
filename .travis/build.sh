#!/bin/bash
# 刪除 .deploy_git
rm -rf .deploy_git
# 複製 README.md 到 gh-pages
cp README.md source/README.md
# 複製 robots.txt 設定
cp robots.txt source/robots.txt
# 設定 NPM Server
npm config set registry https://registry.npmjs.org/
# 轉換 Markdown
npm run build
