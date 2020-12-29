#!/bin/bash
#sh update.sh u p
#Wenn p sonderzeichen enthält, dann muss es mit hochstrichen eingereicht werden
echo $1
git pull origin master

u=$1
p=$2


if [[ `git status --porcelain` ]]; then
  echo 'changes detected'
  git pull origin master
  node update_data.js
else
  echo 'no changes detected'
  node update_data.js
fi
echo 'loop finished'

number=$(find data -type f | wc -l)
let number-=2
echo "Anzahl der Nodes: $number"
git add data/*
git commit -m "🗃 - Datenupdate $number"

if [[ $1 && $2 ]]; then
  echo 'push with variables'
  git push https://$u:$p@github.com/CodeforKarlsruhe/direktvermarkter.git
else
  echo 'push normaly'
  git push origin master
fi