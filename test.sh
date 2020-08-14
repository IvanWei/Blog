#!/bin/bash
GIT_TOKEN=zX1om36FM0swHnkc97ELPA
USERNAME=ivanwei
REPO=blog

body='{
  "request": {
    "branch":"master",
    "config": {
      "node_js": ["8"],
      "before_install": [
        "export TZ=Asia/Taipei",
        "openssl aes-256-cbc -K $encrypted_ea8e3056d329_key -iv $encrypted_ea8e3056d329_iv -in ./.travis/id_rsa.enc -out ~/.ssh/id_rsa -d",
        "chmod 600 ~/.ssh/id_rsa",
        "eval $(ssh-agent)",
        "ssh-add ~/.ssh/id_rsa",
        "rm -rf .deploy_git blog",
        "cp .travis/ssh_config ~/.ssh/config",
        "git config --global user.name \"WE Bot\"",
        "git config --global user.email \"ivanwei_slack@outlook.com\"",
        "npm config set registry https://registry.npmjs.org/",
        "git remote set-url origin git@github.com:IvanWei/blog.git",
        "npm install -g @ivanwei/blog-content-source-cli",
        "b.content refresh -R $REPO -u $USERNAME -l $PUBLISHED_LABEL --git-token $GIT_TOKEN -o $OUTPUT_FOLDER",
        "git checkout master",
        "git add source/_posts/zh-tw",
        "git status",
        "git commit -m \"Last update: `date` from Issue\"",
        "git push origin master"
      ],
      "script": []
    }
  }
}'

curl -s -X POST \
   -H "Content-Type: application/json" \
   -H "Accept: application/json" \
   -H "Travis-API-Version: 3" \
   -H "Authorization: token ${GIT_TOKEN}" \
   -d "$body" \
   https://api.travis-ci.org/repo/$USERNAME%2F$REPO/requests


