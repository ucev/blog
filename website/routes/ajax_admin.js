const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const configs = require('../config/base.config');
const uploadPhotoDir = path.join(__dirname, '../public/images/blog');

const RECOUNT_PHOTO_GROUP_SQL = `update photogroups as pg 
             left join
             (select photogroup as gid, count(*) as cnt from photos group by photogroup) as cp
             on pg.id = cp.gid
             set pg.count = if(isnull(cp.cnt), 0, cp.cnt)`;

function strToNum(str) {
  var a = Number(str);
  return isNaN(a) ? 0 : a;
}

function emptyString(str) {
  console.log('-----------str start');
  //str = str.trim();
  console.log('str: ' + str);
  var str =  (str === null || str === undefined) ? '' : str.trim();
  return (str === '' || str === '-1') ? '' : str;
}

function transactionError(res, conn, resMsg = {code: 1, msg: '操作失败'}) {
  conn.rollback(() => {

  });
  conn.end((err) => {

  });
  res.json(resMsg);
}

router.get('/articles/modify', (req, res, next) => {
  const id = strToNum(req.query.id);
  const state = req.query.state;
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('update articles set state = ? where id = ?', [state, id],
    (err, results, fields) => {
      conn.query('select id, title, category, label, state, top, pageview from articles where id = ?',
        [id],
        (err, results, fields) => {
          var row = results.length > 0 ? results[0] : {};
          res.json({code: 0, msg: '更新成功', data: row});
          conn.end((err) => {

          });
        }
      );
    }
  );
});

router.get('/articles/get', (req, res, next) => {
  const current = strToNum(req.query.start);
  const start = current * configs.query_config.step;
  const state = emptyString(req.query.state);
  const category = strToNum(emptyString(req.query.category));
  const label = emptyString(req.query.label);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  var wheres = ' where 1';
  var whereArgs = [];
  if ( state || category || label) {
    if (state) {
      wheres += ' AND state = ?';
      whereArgs.push(state);
     }
    if (category) {
      wheres += ' AND category = ?';
      whereArgs.push(category);
    }
    if (label) {
      wheres += ' AND label = ?';
      whereArgs.push(label);
    }
  }
  conn.query('select count(*) as total from articles' + wheres, whereArgs, (err, results, fields) => {
    const total = Math.ceil((results[0]['total'] + 1)/ configs.query_config.step);
    var sql = 'select id, title, category, label, state, top, pageview from articles ';
    sql += wheres;
    sql += ' limit ?, ?';
    conn.query(sql, [...whereArgs, start, configs.query_config.step], (err, results, fields) => {
        res.json({code: 0, msg: '获取成功', data: {
          total: total,
          current: current,
          data: results
        }});
        conn.end((err) => {

        });
      }
    );
  });
});

router.get('/photos/get', (req, res, next) => {
  var params = [];
  var sql = 'select id, name, title from photos where 1';
  if (req.query.id != undefined) {
    sql += ' and id = ?';
    params.push(strToNum(req.query.id));
  } else {
    sql += ' and photogroup = ?';
    params.push(strToNum(req.query.gid));
  }
  sql += ' order by id asc';
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query(sql, params, (err, results, fields) => {
    if (err) {
      res.json({
        code: 1,
        data: '请求失败'
      });
    } else {
      res.json({
        code: 0,
        msg: '请求成功',
        data: results
      });
    }
    conn.end((err) => {

    });
  });
});

router.post('/photos/add', (req, res, next) => {
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    console.log(files);
    console.log('---------gid: ' + fields.gid);
    const gid = fields.gid;
    const tempfile = files.file[0].path;
    var dt = new Date();
    const addtime = Math.floor((dt.getTime() / 1000));
    const newname = dt.getFullYear() + dt.getTime() + path.extname(tempfile);
    const newpath = path.join(uploadPhotoDir, newname);
    console.log('------------new name: ' + newpath);
    fs.rename(tempfile, newpath, (err) => {
      if (err) {
        res.json({
          code: 1,
          msg: '添加失败'
        });
        return;
      }
      const mysql = require('mysql');
      const conn = mysql.createConnection(configs.database_config);
      conn.query('insert into photos set ?', {
        name: newname,
        title: newname,
        photogroup: gid,
        addtime: addtime
      }, (err, results, fields) => {
        if (err) {
          fs.unlink(newpath, (err) => {

          });
          res.json({
            code: 1,
            msg: '添加失败'
          });
        } else {
          conn.query('select count(*) as cnt from photos where photogroup = ?', [gid], (err, results, fields) => {
            var cnt = results[0].cnt;
            conn.query('update photogroups set count = ? where id = ?', [cnt, gid], (err, results, fields) => {
              res.json({
                code: 0,
                msg: '添加成功'
              });
            });
          });
        }
      });
    });
  });
});

/**
 * 错误更新处理及其他稍后家😊 
 */
router.get('/photos/delete', (req, res, next) => {
  var photos = req.query.photos;
  photos = photos.split(',');
  photos = photos.map((i) => (strToNum(i)));
  console.log(photos);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.beginTransaction((err) => {
    conn.query('delete from photos where id in ?', [[photos]], (err, results, fields) => {
      if (err) {
        throw err;
        transactionError(res, conn);
      } else {
        conn.query(RECOUNT_PHOTO_GROUP_SQL, (err, results, fields) => {
          if (err) {
            throw err;
            transactionError(res, conn);
          } else {
            conn.commit((err) => {
              if (err) {
                throw err;
                transactionError(res, conn);
              } else {
                res.json({code: 0, msg: '操作成功'});
                conn.end((err) => {

                });
              }
            });
          }
        });
      }
    });
  });
});

router.get('/photos/move', (req, res, next) => {
  var photos = req.query.photos;
  photos = photos.split(',');
  photos = photos.map((i) => (strToNum(i)));
  console.log(photos);
  var gid = strToNum(req.query.gid);
  console.log('***************req: ' , req.query);
  console.log('***************photos: ', photos);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.beginTransaction((err) => {
    conn.query('update photos set photogroup = ? where id in ?', [gid, [photos]], (err, results, fields) => {
      if (err) {
        throw err;
        transactionError(res, conn);
      } else {
        conn.query(RECOUNT_PHOTO_GROUP_SQL, (err, results, fields) => {
          if (err) {
            throw err;
            transactionError(res, conn);
          } else {
            conn.commit((err) => {
              if (err) {
                transactionError(res, conn);
              } else {
                res.jsonp({code: 0, msg: '更新成功'});
                conn.end((err) => {

                });
              }
            });
          }
        });
      }
    });
  });
});

router.get('/photos/rename', (req, res, next) => {
  var id = strToNum(req.query.id);
  var title = req.query.title;
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('update photos set title = ? where id = ?', [title, id], (err, results, fields) => {
    if (err) {
      res.json({code: 1, msg: '更新失败'});
    } else {
      res.json({code: 0, msg: '更新成功'});
    }
    conn.end((err) => {

    });
  });
});

router.get('/photogroup/get', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('select id, name, count from photogroups order by id asc', (err, results, fields) => {
    res.json({
      code: 0,
      msg: '获取成功',
      data: results
    });
    conn.end((err) => {

    });
  });
});

router.get('/photogroup/modify', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  const groupname = req.query.groupname;
  const addtime = Math.floor((new Date().getTime()) / 1000);
  conn.query('insert into photogroups set ?', {
    name: groupname,
    addtime: addtime
  }, (err, results, fields) => {
    res.json({
      code: 0,
      msg: '更新成功'
    });
    conn.end((err) => {

    });
  });
});

module.exports = router;