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
      if (err) {
        res.json({code: 1, msg: '更新失败'});
      } else {
        res.json({code: 0, msg: '更新成功'});
      }
    }
  );
});

router.get('/articles/getsingle/', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('select id, title, category, label, state, top, pageview from articles where id = ?', [id],
    (err, results, fields) => {
      if (err) {
        res.json({code: 1, msg: '请求失败'});
      } else {
        res.json({code: 0, msg: '请求成功', data: results[0]});
      }
    }
  );
});

router.get('/articles/get', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  if (req.query.id != undefined) {
    const id = req.query.id;
    conn.query('select id, title, category, label, state, top, pageview from articles where id = ?', [id],
      (err, results, fields) => {
        if (results.length > 0) {
          res.json({code: 0, msg: '请求成功', data: results[0]});
        } else {
          res.json({code: 1, msg: '请求失败'});
        }
        conn.end((err) => {

        })
      }
    );
  } else {
    const current = strToNum(req.query.start);
    const start = current * configs.query_config.step;
    const state = emptyString(req.query.state);
    const category = strToNum(emptyString(req.query.category));
    const label = emptyString(req.query.label);
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
      const total = Math.ceil(results[0]['total'] / configs.query_config.step);
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
  }
});

router.post('/categories/add', (req, res, next) => {
  var form = new multiparty.Form();
  /*form.parse(req, (err, fields, files) => {
    if (err) {
      console.log('-------- parse err ----');
      console.log(err);
    }
    console.log('fields: ' + JSON.stringify(fields));
    var name = fields.name;
    var parent = fields.parent;

    parent = 0;

    var descp = fields.descp;*/
    var name = req.body.name;
    var parent = req.body.parent;
    parent = strToNum(parent);
    var descp = req.body.descp;
    var addtime = Math.floor(new Date().getTime() / 1000);
    const mysql = require('mysql');
    const conn = mysql.createConnection(configs.database_config);
    conn.query('insert into categories set ?', {
      name: name,
      parent: parent,
      descp: descp,
      addtime: addtime
    }, (err, results, fields) => {
      if (err) {
        console.log(err);
      } else {
        res.json({code: 0, msg: '添加成功'});
      }
      conn.end((err) => {

      });
    })
  //})
})

router.get('/cagetories/get', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('select * from categories', (err, results, next) => {
    res.json({code: 0, msg: '获取成功', data: results});
    conn.end((err) => {

    });
  })
});

router.get('/labels/get', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('select * from labels', (err, results, fields) => {
    if (err) {
      res.json({code: 1, msg: '获取失败'});
    } else {
      res.json({code: 0, msg: '获取成功', data: results});
    }
  })
});

router.get('/photos/get', (req, res, next) => {
  var params = [];
  var sql = 'select id, name, title from photos where 1';
  if (req.query.id != undefined) {
    sql += ' and id = ?';
    params.push(strToNum(req.query.id));
  } else {
    if (req.query.gid != -1) {
      sql += ' and photogroup = ?';
      params.push(strToNum(req.query.gid));
    }
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
    const gid = fields.gid < 1 ? 1 : fields.gid;
    const tempfile = files.file[0].path;
    var dt = new Date();
    const addtime = Math.floor((dt.getTime() / 1000));
    const newname = dt.getFullYear() + dt.getTime() + path.extname(tempfile);
    const newpath = path.join(uploadPhotoDir, newname);
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

router.get('/photos/delete', (req, res, next) => {
  var photos = req.query.photos;
  photos = photos.split(',');
  photos = photos.map((i) => (strToNum(i)));
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
  var gid = strToNum(req.query.gid);
  gid = gid < 1 ? 1 : gid;
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
    var cnt = results.reduce((sum, row) => (sum + row.count), 0);
    var groups = [{id: -1, name: '全部分组', count: cnt}, ...results];
    res.json({
      code: 0,
      msg: '获取成功',
      data: groups
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

router.get('/photogroup/remove', (req, res, next) => {
  var gid = req.query.gid;
  if (gid < 2) {
   res.json({code: 0, msg: '删除成功'});
   return; 
  }
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.beginTransaction((err) => {
    conn.query('update photos set photogroup = 1 where photogroup = ?', [gid], (err, results, fields) => {
      if (err) {
        transactionError(res, conn, {code: 1, msg: '0'});
      } else {
        conn.query('delete from photogroups where id = ?', [gid], (err, results, fields) => {
          if (err) {
            transactionError(res, conn, {code: 1, msg: '1'});
          } else {
            conn.query(RECOUNT_PHOTO_GROUP_SQL, (err, results, fields) => {
              if (err) {
                transactionError(res, conn, {code: 1, msg: '2'});
              } else {
                conn.commit((err) => {
                  if (err) {
                    transactionError(res, conn, {code: 1, msg: '3'});
                  } else {
                    res.json({code: 0, msg: '操作成功'});
                    conn.end((err) => {

                    });
                  }
                })
              }
            })
          }
        })
      }
    })
  })
});

router.get('/photogroup/rename', (req, res, next) => {
  var gid = req.query.gid;
  if (gid < 2) {
    res.json({code: 1, msg: '更新失败'});
    return;
  }
  var name = req.query.name;
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('update photogroups set name = ? where id = ?', [name, gid], (err, results, fields) => {
    if (err) {
      res.json({code: 1, msg: '更新失败'});
    } else {
      res.json({code: 0, msg: '更新成功'});
    }
    conn.end((err) => {

    })
  })
})

module.exports = router;