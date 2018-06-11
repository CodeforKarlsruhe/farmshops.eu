#!/bin/bash
echo $1
if [[ `git status --porcelain` ]]; then
git pull origin master
  echo 'changes'
else

  echo 'no changes'
fi



