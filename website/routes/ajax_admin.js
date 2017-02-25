const express = require('express');
const router = express.Router();
const multiparty = require('multiparty');

const Articles = require('../class/article.db');
const __articles = new Articles();
const Categories = require('../class/category.db');
const __categories = new Categories();
const Labels = require('../class/label.db');
const __labels = new Labels();
const Photos = require('../class/photo.db');
const __photos = new Photos();
const PhotoGroups = require('../class/photogroup.db');
const __photogroups = new PhotoGroups();

function strToNum(str) {
  var a = Number(str);
  return isNaN(a) ? 0 : a;
}

function emptyString(str) {
  var str =  (str === null || str === undefined) ? '' : str.trim();
  return (str === '' || str === '-1') ? '' : str;
}

router.post('/articles/delete', (req, res, next) => {
  var id = strToNum(req.body.id);
  __articles.delete(
    id, 
    () => {
      res.json({code: 0, msg: '删除成功'});
    },
    () => {
      res.json({code: 1, msg: '删除失败'});
    }
  )
})

router.get('/articles/get', (req, res, next) => {
  if (req.query.id != undefined) {
    const id = req.query.id;
    __articles.getsingle(
      id,
      function(r) {
        res.json({code: 0, msg: '请求成功', data: r});
      }, 
      function() {
        res.json({code: 1, msg: '请求失败'});
      }
    );
  } else {
    const start = strToNum(req.query.start);
    const state = emptyString(req.query.state);
    const category = strToNum(emptyString(req.query.category));
    const label = emptyString(req.query.label);
    var where = {};
    if (state) {
      where.state = state;
    }
    if (category) {
      where.category = category;
    }
    if (label) {
      where.label = label;
    }
    __articles.getByCond({where: where, start: start}, 
      function(r) {
        res.json({code: 0, msg: '获取成功', data: r});
      },
      function() {
        res.json({code: 1, msg: '获取失败'});
      }
    )
  }
});

router.get('/articles/move', (req, res, next) => {
  var ids = req.query.id;
  ids = ids.split(',');
  var gid = req.query.gid;
  __articles.move(
    ids, gid,
    () => {
      res.json({code: 0, msg: '更新成功'});
    },
    () => {
      res.json({code: 1, msg: '更新失败'});
    }
  )
})

router.get('/articles/state', (req, res, next) => {
  var ids = req.query.id;
  ids = ids.split(',');
  const state = req.query.state;
  __articles.updateState(
    ids, state,
    (r) => {
      res.json({code: 0, msg: '更新成功', data: r});
    },
    () => {
      res.json({code: 1, msg: '更新失败'});
    }
  )
});

router.post('/categories/add', (req, res, next) => {
    var name = req.body.name;
    var parent = req.body.parent;
    parent = strToNum(parent);
    var descp = req.body.descp;
    var addtime = Math.floor(new Date().getTime() / 1000);
    __categories.add({
        name: name,
        parent: parent,
        descp: descp,
        addtime: addtime
      },
      () => {
        res.json({code: 0, msg: '添加成功'});
      },
      () => {
        res.json({code: 1, msg: '添加失败'});
      }
    )
})

router.post('/categories/delete', (req, res, next) => {
  var id = req.body.id;
  if (id < 1) {
    res.json({code: 1, msg: '更新失败'});
    return;
  }
  __categories.delete(
    id,
    () => {
      res.json({code: 0, msg: '删除成功'});
    },
    () => {
      res.json({code: 1, msg: '删除失败'});
    }
  );
})

router.post('/categories/modify', (req, res, next) => {
  var id = strToNum(req.body.id);
  var name = req.body.name;
  // 错误检查
  var parent = req.body.parent;
  var descp = req.body.descp;
  __categories.update({
      id: id,
      name: name,
      parent: parent,
      descp: descp,
    },
    () => {
      res.json({code: 0, msg: '更新成功'});
    },
    () => {
      res.json({code: 1, msg: '更新失败'});
    }
  )
})

router.get('/categories/get', (req, res, next) => {
  __categories.get(
    (r) => {
      res.json({code: 0, msg: '获取成功', data: r});
    },
    () => {
      res.json({code: 0, msg: '获取成功', data: []});
    }
  )
});

router.get('/labels/get', (req, res, next) => {
  __labels.get(
    (r) => {
      res.json({code: 0, msg: '获取成功', data: r});
    },
    () => {
      res.json({code: 1, msg: '获取失败'});
    }
  )
});

router.get('/photos/get', (req, res, next) => {
  var where = {};
  if (req.query.id != undefined) {
    where.id = strToNum(req.query.id);
  } else {
    if (req.query.gid != -1) {
      where.photogroup = strToNum(req.query.gid);
    }
  }
  __photos.get({
      where: where
    },
    (r) => {
      res.json({code: 0, msg: '请求成功', data: r});
    },
    () => {
      res.json({code: 1, msg: '请求失败'});
    }
  )
});

router.post('/photos/add', (req, res, next) => {
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    const gid = fields.gid < 1 ? 1 : fields.gid;
    const tempfile = files.file[0].path;
    var dt = new Date();
    const addtime = Math.floor((dt.getTime() / 1000));
    const newname = dt.getFullYear() + dt.getTime() + path.extname(tempfile);

    __photos.add({
        photogroup: gid, addtime: addtime, name: newname, file: tempfile
      },
      () => {
        res.json({code: 0, msg: '添加成功'});
      },
      () => {
        res.json({code: 1, msg: '添加失败'});
      }
    )
  });
});

router.get('/photos/delete', (req, res, next) => {
  var photos = req.query.photos;
  photos = photos.split(',');
  photos = photos.map((i) => (strToNum(i)));
  __photos.delete(
    photos,
    () => {
      res.json({code: 0, msg: '操作成功'});
    },
    () => {
      // 成功或失败都更新
      res.json({code: 0, msg: '操作失败'});
    }
  )
});

router.get('/photos/move', (req, res, next) => {
  var photos = req.query.photos;
  photos = photos.split(',');
  photos = photos.map((i) => (strToNum(i)));
  var gid = strToNum(req.query.gid);
  gid = gid < 1 ? 1 : gid;
  __photos.move({
      ids: photos, photogroup: gid
    },
    () => {
      console.log('-----------succ');
      res.json({code: 0, msg: '更新成功'});
    },
    () => {
      // 成功与否都刷新
      res.json({code: 0, msg: '更新失败'});
    }
  )
});

router.get('/photos/rename', (req, res, next) => {
  var id = strToNum(req.query.id);
  var title = req.query.title;
  __photos.rename({
      id: id, title: title
    },
    () => {
      res.json({code: 0, msg: '更新成功'});
    },
    () => {
      res.json({code: 1, msg: '更新失败'});
    }
  )
});

router.get('/photogroup/get', (req, res, next) => {
  __photogroups.get(
    (r) => {
      res.json({code: 0, msg: '获取成功', data: r});
    },
    (r) => {
      // 成功与否都刷新
      res.json({code: 0, msg: '获取失败', data: r});
    }
  )
});

router.get('/photogroup/modify', (req, res, next) => {
  const groupname = req.query.groupname;
  const addtime = Math.floor((new Date().getTime()) / 1000);
  __photogroups.add({
      name: groupname, addtime: addtime
    },
    () => {
      res.json({code: 0, msg: '更新成功'});
    },
    () => {
      // 成功与否都刷新
      res.json({code: 0, msg: '更新失败'})
    }
  )
});

router.get('/photogroup/remove', (req, res, next) => {
  var gid = req.query.gid;
  if (gid < 2) {
   res.json({code: 0, msg: '删除成功'});
   return; 
  }
  __photogroups.delete(
    gid,
    () => {
      res.json({code: 0, msg: '操作成功'});
    },
    () => {
      res.json({code: 1, msg: '操作失败'});
    }
  )
});

router.get('/photogroup/rename', (req, res, next) => {
  var gid = req.query.gid;
  if (gid < 2) {
    res.json({code: 1, msg: '更新失败'});
    return;
  }
  var name = req.query.name;
  __photogroups.rename({
      id: gid,
      name: name
    },
    () => {
      res.json({code: 0, msg: '更新成功'});
    },
    () => {
      res.json({code: 1, msg: '更新失败'});
    }
  )
})

module.exports = router;