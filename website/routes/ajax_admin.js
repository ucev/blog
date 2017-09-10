const router = new require('koa-router')()
const multiparty = require('multiparty');
const path = require('path');
const busboy = require('koa-busboy')

const uploader = busboy()

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

const __log = require('../utils/log');

function strToNum(str) {
  var a = Number(str);
  return isNaN(a) ? 0 : a;
}

function emptyString(str) {
  var str = (str === null || str === undefined) ? '' : str.trim();
  return (str === '' || str === '-1') ? '' : str;
}

// 😢 
async function getCategoryRefactItemDetail(ctx, id, type) {
  try {
    var art = await __articles.getsingle({
            id: id,
            queryfields: ['id', 'title', 'descp', 'suborder']
          })
    art.type = type;
    ctx.body = { code: 0, msg: '请求成功', data: art }
  } catch (err) {
    ctx.body = { code: 1, msg: '请求失败' }
  }
}

router.post('/articles/delete', async (ctx, next) => {
  var request = ctx.request.body
  var ids = request.id
  ids = ids.split(',')
  __log.debug('here')
  try {
    await __articles.delete(ids)
    ctx.body = { code: 0, msg: '删除成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '删除失败' }
  }
})

router.get('/articles/get', async (ctx, next) => {
  if (ctx.query.id != undefined) {
    try {
      const id = ctx.query.id;
      var res = await __articles.getsingle({
                  id: id,
                  queryfields: ['id', 'title', 'category', 'label', 'state', 'top', 'pageview']
                })
      ctx.body = { code: 0, msg: '请求成功', data: res}
    } catch (err) {
      ctx.body = { code: 1, msg: '请求失败' }
    }
  } else {
    const start = strToNum(ctx.query.start);
    const state = emptyString(ctx.query.state);
    const category = strToNum(emptyString(ctx.query.category));
    const label = emptyString(ctx.query.label);
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
    try {
      var res = await __articles.getByCond({
                  where: where,
                  start: start,
                  client: false,
                  queryfields: ['id', 'title', 'category', 'label', 'state', 'top', 'pageview']
                })
      ctx.body = { code: 0, msg: '获取成功', data: res}
    } catch (err) {
      ctx.body = { code: 1, msg: '获取失败' }
    }
  }
})

router.get('/articles/move', async (ctx, next) => {
  var ids = ctx.query.id;
  __log.debug(ids);
  ids = ids.split(',');
  var gid = ctx.query.gid;
  try {
    await __articles.move(ids, gid)
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/articles/order', async (ctx, next) => {
  var id = ctx.query.id;
  var ord = ctx.query.order;
  try {
    await __articles.updateOrder({
            id: id,
            ord: ord
          })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/articles/state', async (ctx, next) => {
  var ids = ctx.query.id;
  ids = ids.split(',');
  const state = ctx.query.state;
  try {
    var res = await __articles.updateState(ids, state)
    ctx.body = { code: 0, msg: '更新成功', data: r }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.post('/categories/add', async (ctx, next) => {
  var request = ctx.request.body
  var name = request.name
  var parent = request.parent
  parent = strToNum(parent)
  var descp = request.descp
  var addtime = Math.floor(new Date().getTime() / 1000)
  try {
    await __categories.add({
            name: name,
            parent: parent,
            descp: descp,
            addtime: addtime
          })
    ctx.body = { code: 0, msg: '添加成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '添加失败' }
  }
})

router.post('/categories/delete', async (ctx, next) => {
  var request = ctx.request.body
  var id = request.id
  if (id < 1) {
    return ctx.body = { code: 1, msg: '更新失败' }
  }
  try {
    await __categories.delete(id)
    ctx.body = { code: 0, msg: '删除成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '删除失败' }
  }
})

router.post('/categories/modify', async (ctx, next) => {
  var request = ctx.request.body
  var id = strToNum(request.id)
  var data = {}
  var name = request.name
  if (request.name) {
    data.name = request.name;
  }
  // 错误检查
  if (request.parent) {
    data.parent = request.parent;
  }
  if (request.descp) {
    data.descp = request.descp;
  }
  if (request.order) {
    data.mainorder = request.order;
  }
  try {
    await __categories.update({
            id: id,
            data: data
          })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/categories/get', async (ctx, next) => {
  try {
    var res = await __categories.get()
    ctx.body = { code: 0, msg: '获取成功', data: res}
  } catch (err) {
    ctx.body = { code: 0, msg: '获取成功', data: [] }
  }
})

router.get('/categories/preface', async (ctx, next) => {
  var category = ctx.query.category
  var preface = ctx.query.preface
  var isSet = ctx.query.isSet === 'true'
  __log.debug(ctx.query)
  try {
    await __categories.setPreface({
            id: category,
            preface: preface,
            isSet: isSet
          })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/categories/refact/get', async (ctx, next) => {
  var type = ctx.query.type;
  var id = ctx.query.id;
  if (type == 'dir') {
    try {
      var cat = await __categories.getById({
              id: id
            })
      await getCategoryRefactItemDetail(ctx, cat.preface, type);
    } catch (err) {
      ctx.body = { code: 1, msg: '获取失败' }
    }
  } else {
    await getCategoryRefactItemDetail(ctx, id, type);
  }
})

router.get('/categories/tree', async (ctx, next) => {
  var id = ctx.query.id;
  try {
    var tree = await __categories.getTree(id)
    __log.debug(JSON.stringify(tree))
    ctx.body = { code: 0, msg: '获取成功', data: tree }
  } catch (err) {
    ctx.body = { code: 0, msg: '获取失败', data: [] }
  }
})

router.get('/labels/get', async (ctx, next) => {
  var queryData = {}
  var start = ctx.query.start ? ctx.query.start : 0;
  queryData.start = start;
  if (ctx.query.orderby) {
    var lb = ctx.query.orderby;
    var asc = ctx.query.asc ? ctx.query.asc : 'asc';
    queryData['orderby'] = {
      lb: lb,
      asc: asc
    }
  }
  try {
    var res = await __labels.get(queryData)
    ctx.body = { code: 0, msg: '获取成功', data: res }
  } catch (err) {
    ctx.body = { code: 1, msg: '获取失败' }
  }
})

router.get('/photos/get', async (ctx, next) => {
  var where = {};
  if (ctx.query.id != undefined) {
    where.id = strToNum(ctx.query.id);
  } else {
    if (ctx.query.gid != -1) {
      where.photogroup = strToNum(ctx.query.gid);
    }
  }
  try {
    var res = await __photos.get({
            where: where
          })
    ctx.body = { code: 0, msg: '请求成功', data: r }
  } catch (err) {
    ctx.body = { code: 1, msg: '请求失败' }
  }
})

// 😢 
router.post('/photos/add', uploader, async (ctx, next) => {
  var request = ctx.request.body
  const gid = request.gid < 1 ? 1 : request.gid
  const tempfile = ctx.request.files[0]
  var dt = new Date();
  const addtime = Math.floor((dt.getTime() / 1000));
  const newname = dt.getFullYear() + dt.getTime() + path.extname(tempfile);
  try {
    await __photos.add({
            photogroup: gid,
            addtime: addtime,
            name: newname,
            file: tempfile
          })
    ctx.body = { code: 0, msg: '添加成功', data: `/images/blog/${newname}` }
  } catch (err) {
    ctx.body = { code: 1, msg: '添加失败' }
  }
})

router.get('/photos/delete', async (ctx, next) => {
  var photos = ctx.query.photos
  photos = photos.split(',')
  photos = photos.map((i) => (strToNum(i)))
  try {
    await __photos.delete(photos)
    ctx.body = { code: 0, msg: '操作成功' }
  } catch (err) {
    // 成功或失败都更新
    ctx.body = { code: 0, msg: '操作失败' }
  }
})

router.get('/photos/move', async (ctx, next) => {
  var photos = ctx.query.photos
  photos = photos.split(',')
  photos = photos.map((i) => (strToNum(i)))
  var gid = strToNum(ctx.query.gid)
  gid = gid < 1 ? 1 : gid;
  try {
    await __photos.move({
            ids: photos,
            photogroup: gid
          })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    // 成功与否都刷新
    ctx.body = { code: 0, msg: '更新失败' }
  }
})

router.get('/photos/rename', async (ctx, next) => {
  var id = strToNum(ctx.query.id)
  var title = ctx.query.title
  try {
    await __photos.rename({
            id: id, title: title
          })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/photogroup/get', async (ctx, next) => {
  try {
    var res = await __photogroups.get()
    ctx.body = { code: 0, msg: '获取成功', data: res }
  } catch (err) {
    // 成功与否都刷新
    ctx.body = { code: 0, msg: '获取失败', data: err }
  }
})

router.get('/photogroup/modify', async (ctx, next) => {
  const groupname = ctx.query.groupname
  const addtime = Math.floor((new Date().getTime()) / 1000)
  try {
    await __photogroups.add({
            name: groupname,
            addtime: addtime
          })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    // 成功与否都刷新
    ctx.body = { code: 0, msg: '更新失败' }
  }
})

router.get('/photogroup/remove', async (ctx, next) => {
  var gid = ctx.query.gid;
  if (gid < 2) {
    return ctx.body = { code: 0, msg: '删除成功' }
  }
  try {
    await __photogroups.delete(gid)
    ctx.body = { code: 0, msg: '操作成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '操作失败' }
  }
})

router.get('/photogroup/rename', async (ctx, next) => {
  var gid = ctx.query.gid;
  if (gid < 2) {
    return ctx.body = { code: 1, msg: '更新失败' }
  }
  var name = ctx.query.name;
  try {
    await __photogroups.rename({
            id: gid,
            name: name
          })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

module.exports = router;