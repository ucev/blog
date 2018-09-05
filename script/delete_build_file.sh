#! /bin/bash

delete_file_if_exists () {
  if [ -e $1 ]
  then
  rm $1
  fi
}

delete_file_if_exists ./public/js/article_edit.min.js
delete_file_if_exists ./public/js/my_struct.min.js
delete_file_if_exists ./public/js/client_struct.min.js
delete_file_if_exists ./public/css/article_edit.min.css
delete_file_if_exists ./public/css/my_struct.min.css
delete_file_if_exists ./public/css/client_struct.min.css
