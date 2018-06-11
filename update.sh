#!/bin/bash
echo $1
if [[ `git status --porcelain` ]]; then
  echo 'changes detected'
  git pull origin master
  node update_data.js
  echo 'finished'
else
  echo 'no changes detected'
  node update_data.js
  echo 'finished'
fi
echo 'loop finished'

git add data/*
git commit -m "Datenupdate"
git push origin master



