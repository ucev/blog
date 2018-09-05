const router = new require('koa-router')()
const path = require('path')
const busboy = require('koa-busboy')

const uploader = busboy()

const Articles = require('../class/article.db')
const __articles = new Articles()
const Categories = require('../class/category.db')
const __categories = new Categories()
const Labels = require('../class/label.db')
const __labels = new Labels()
const Photos = require('../class/photo.db')
const __photos = new Photos()
const PhotoGroups = require('../class/photogroup.db')
const __photogroups = new PhotoGroups()

const __log = require('../utils/log')

function strToNum (str) {
  var a = Number(str)
  return isNaN(a) ? 0 : a
}

function emptyString (strval) {
  let str = strval === null || strval === undefined ? '' : strval.trim()
  return str === '' || str === '-1' ? '' : str
}

async function getCategoryRefactItemDetail (ctx, id, type) {
  try {
    var art = await __articles.getsingle({
      id: id,
      queryfields: ['id', 'title', 'descp', 'suborder'],
    })
    art.type = type
    ctx.body = { code: 0, msg: '请求成功', data: art }
  } catch (err) {
    ctx.body = { code: 1, msg: '请求失败' }
  }
}

router.post('/articles/delete', uploader, async ctx => {
  try {
    var request = ctx.request.body
    var ids = request.id
    ids = ids.split(',')
    await __articles.delete(ids)
    ctx.body = { code: 0, msg: '删除成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '删除失败' }
  }
})

router.get('/articles/get', async ctx => {
  if (ctx.query.id != undefined) {
    try {
      const id = ctx.query.id
      const queryfields = ctx.query.modify
        ? ['content', 'label']
        : ['id', 'title', 'category', 'label', 'state', 'top', 'pageview']
      let res = await __articles.getsingle({
        id: id,
        queryfields: queryfields,
      })
      ctx.body = { code: 0, msg: '请求成功', data: res }
    } catch (err) {
      ctx.body = { code: 1, msg: '请求失败' }
    }
  } else {
    const start = strToNum(ctx.query.start)
    const state = emptyString(ctx.query.state)
    let category = emptyString(ctx.query.category)
    if (category) {
      if (parseInt(category).toString() !== category) {
        try {
          category = await __categories.getId(category)
        } catch (err) {
          category = 0
        }
      } else {
        category = strToNum(category)
      }
    }
    const label = emptyString(ctx.query.label)
    let where = {}
    if (state) {
      where.state = state
    }
    if (category) {
      where.category = category
    }
    if (label) {
      where.label = label
    }
    try {
      let res = await __articles.getByCond({
        where: where,
        start: start,
        client: false,
        queryfields: [
          'id',
          'title',
          'category',
          'label',
          'state',
          'top',
          'pageview',
        ],
      })
      ctx.body = { code: 0, msg: '获取成功', data: res }
    } catch (err) {
      ctx.body = { code: 1, msg: '获取失败' }
    }
  }
})

router.post('/articles/move', uploader, async ctx => {
  var request = ctx.request.body
  var ids = request.id
  __log.debug(ids)
  ids = ids.split(',')
  var gid = request.gid
  try {
    await __articles.move(ids, gid)
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.post('/articles/order', uploader, async ctx => {
  var request = ctx.request.body
  var id = request.id
  var ord = request.order
  try {
    await __articles.updateOrder({
      id: id,
      ord: ord,
    })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/articles/state', async ctx => {
  var ids = ctx.query.id
  ids = ids.split(',')
  const state = ctx.query.state
  try {
    var res = await __articles.updateState(ids, state)
    ctx.body = { code: 0, msg: '更新成功', data: res }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.post('/categories/add', uploader, async ctx => {
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
      addtime: addtime,
    })
    ctx.body = { code: 0, msg: '添加成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '添加失败' }
  }
})

router.post('/categories/delete', uploader, async ctx => {
  var request = ctx.request.body
  var id = request.id
  if (id < 1) {
    return (ctx.body = { code: 1, msg: '更新失败' })
  }
  try {
    await __categories.delete(id)
    ctx.body = { code: 0, msg: '删除成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '删除失败' }
  }
})

router.post('/categories/modify', uploader, async ctx => {
  var request = ctx.request.body
  var id = strToNum(request.id)
  var data = {}
  if (request.name) {
    data.name = request.name
  }
  // 错误检查
  if (request.parent) {
    data.parent = request.parent
  }
  if (request.descp) {
    data.descp = request.descp
  }
  if (request.order) {
    data.mainorder = request.order
  }
  try {
    await __categories.update({
      id: id,
      data: data,
    })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/categories/get', async ctx => {
  try {
    var res = await __categories.get()
    ctx.body = { code: 0, msg: '获取成功', data: res }
  } catch (err) {
    ctx.body = { code: 0, msg: '获取成功', data: [] }
  }
})

router.get('/categories/preface', async ctx => {
  var category = ctx.query.category
  var preface = ctx.query.preface
  var isSet = ctx.query.isSet === 'true'
  __log.debug(ctx.query)
  try {
    await __categories.setPreface({
      id: category,
      preface: preface,
      isSet: isSet,
    })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/categories/refact/get', async ctx => {
  var type = ctx.query.type
  var id = ctx.query.id
  if (type == 'dir') {
    try {
      var cat = await __categories.getById({
        id: id,
      })
      await getCategoryRefactItemDetail(ctx, cat.preface, type)
    } catch (err) {
      ctx.body = { code: 1, msg: '获取失败' }
    }
  } else {
    await getCategoryRefactItemDetail(ctx, id, type)
  }
})

router.get('/categories/tree', async ctx => {
  var id = ctx.query.id
  try {
    var tree = await __categories.getTree(id)
    ctx.body = { code: 0, msg: '获取成功', data: tree }
  } catch (err) {
    ctx.body = { code: 0, msg: '获取失败', data: [] }
  }
})

router.get('/labels/get', async ctx => {
  var queryData = {}
  var start = ctx.query.start ? ctx.query.start : 0
  queryData.start = start
  if (ctx.query.orderby) {
    var lb = ctx.query.orderby
    var asc = ctx.query.asc ? ctx.query.asc : 'asc'
    queryData['orderby'] = {
      lb: lb,
      asc: asc,
    }
  }
  try {
    var res = await __labels.get(queryData)
    ctx.body = { code: 0, msg: '获取成功', data: res }
  } catch (err) {
    console.log(err)
    ctx.body = { code: 1, msg: '获取失败' }
  }
})

router.get('/labels/getnames', async ctx => {
  try {
    var labels = await __labels.getNames()
    ctx.body = { code: 0, msg: '获取成功', data: labels }
  } catch (err) {
    ctx.body = { code: 1, msg: '获取失败', data: [] }
  }
})

router.get('/photos/get', async ctx => {
  var where = {}
  if (ctx.query.id != undefined) {
    where.id = strToNum(ctx.query.id)
  } else {
    if (ctx.query.gid != -1) {
      where.photogroup = strToNum(ctx.query.gid)
    }
  }
  try {
    var res = await __photos.get({
      where: where,
    })
    ctx.body = { code: 0, msg: '请求成功', data: res }
  } catch (err) {
    ctx.body = { code: 1, msg: '请求失败' }
  }
})

router.post('/photos/add', uploader, async ctx => {
  var request = ctx.request.body
  const gid = request.gid < 1 ? 1 : request.gid
  const tempfile = ctx.request.files[0].path
  var dt = new Date()
  const addtime = Math.floor(dt.getTime() / 1000)
  const newname = dt.getFullYear() + dt.getTime() + path.extname(tempfile)
  try {
    await __photos.add({
      photogroup: gid,
      addtime: addtime,
      name: newname,
      file: tempfile,
    })
    ctx.body = { code: 0, msg: '添加成功', data: `/images/blog/${newname}` }
  } catch (err) {
    console.log(err)
    ctx.body = { code: 1, msg: '添加失败' }
  }
})

router.get('/photos/delete', async ctx => {
  var photos = ctx.query.photos
  photos = photos.split(',')
  photos = photos.map(i => strToNum(i))
  try {
    await __photos.delete(photos)
    ctx.body = { code: 0, msg: '操作成功' }
  } catch (err) {
    // 成功或失败都更新
    ctx.body = { code: 0, msg: '操作失败' }
  }
})

router.get('/photos/move', async ctx => {
  var photos = ctx.query.photos
  photos = photos.split(',')
  photos = photos.map(i => strToNum(i))
  var gid = strToNum(ctx.query.gid)
  gid = gid < 1 ? 1 : gid
  try {
    await __photos.move({
      ids: photos,
      photogroup: gid,
    })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    console.log(err)
    // 成功与否都刷新
    ctx.body = { code: 0, msg: '更新失败' }
  }
})

router.get('/photos/rename', async ctx => {
  var id = strToNum(ctx.query.id)
  var title = ctx.query.title
  try {
    await __photos.rename({
      id: id,
      title: title,
    })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

router.get('/photogroup/get', async ctx => {
  try {
    var res = await __photogroups.get()
    ctx.body = { code: 0, msg: '获取成功', data: res }
  } catch (err) {
    // 成功与否都刷新
    ctx.body = { code: 0, msg: '获取失败', data: err }
  }
})

router.get('/photogroup/modify', async ctx => {
  const groupname = ctx.query.groupname
  const addtime = Math.floor(new Date().getTime() / 1000)
  try {
    await __photogroups.add({
      name: groupname,
      addtime: addtime,
    })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    console.log(err)
    // 成功与否都刷新
    ctx.body = { code: 0, msg: '更新失败' }
  }
})

router.get('/photogroup/remove', async ctx => {
  var gid = ctx.query.gid
  if (gid < 2) {
    return (ctx.body = { code: 0, msg: '删除成功' })
  }
  try {
    await __photogroups.delete(gid)
    ctx.body = { code: 0, msg: '操作成功' }
  } catch (err) {
    ctx.body = { code: 1, msg: '操作失败' }
  }
})

router.post('/photogroup/rename', uploader, async ctx => {
  var request = ctx.request.body
  var gid = Number(request.gid)
  if (gid < 1) {
    return (ctx.body = { code: 1, msg: '更新失败' })
  }
  var name = request.name
  try {
    await __photogroups.rename({
      id: gid,
      name: name,
    })
    ctx.body = { code: 0, msg: '更新成功' }
  } catch (err) {
    console.log(err)
    ctx.body = { code: 1, msg: '更新失败' }
  }
})

module.exports = router
