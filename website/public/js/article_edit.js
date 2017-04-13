var simplemde = null;
var markdown = null;
var cm = null;
var __drawImage = null;
var __drawLink = null;

var labels = [];
var labelCount = 0;
const labelTpl = $("#label-tpl").html();
const photoGroupTpl = $("#photo-group-tpl").html();
const photoItemTpl = $("#photo-item-tpl").html();

function deleteLabel(i) {
  let id = '#label-div-' + i;
  let label = $(id).children('span').text();
  labels.splice(labels.indexOf(label), 1);
  $(id).remove();
}

function addLabel(lbs) {
  if (typeof lbs == 'string') lbs = [lbs];
  for (let i in lbs) {
    let l = lbs[i];
    if (l === undefined || l === null || l === '') continue;
    if (labels.indexOf(l) == -1) {
      var params = {
        label: l,
        ord: labelCount++,
        nclass: labels_exists.indexOf(l) == -1 ? 'new' : 'existed'
      };
      $(template(labelTpl, params)).appendTo($('#labels-area'));
      labels.push(l);
    }
  }
}
(() => {
  $('#label-input-area').keydown((e) => {
    if (e.which == 13) {
      let l = $('#label-input-area').val();
      addLabel(l);
      $('#label-input-area').val('');
    }
  });
})();

function drawLink(cb) {
  __drawLink = cb;
  $("#insert-url-div").show();
  $("#insert-url-div-input").val("");
  $("#insert-url-div-input").focus();
}

function drawImage(cb) {
  __drawImage = cb;
  $("#choose-photo-div").show();
}

function photoImgOnLoad(e) {
  var img = e;
  var imgsrc = img.src;
  var image = new Image();
  image.src = imgsrc;
  var ow = image.width;
  var oh = image.height;
  var small = ow < oh ? ow : oh;
  var scale = small / 150;
  var nw = ow / scale;
  var nh = oh / scale;
  img.setAttribute('width', nw + 'px');
  img.setAttribute('height', nh + 'px');
}

function submitArticle(e) {
  $('#submit').unbind('click');
  var content = simplemde.value();
  var descp = getContentDescription(content);
  var url = this_type == 'add' ? '/admin/articles/add' : '/admin/articles/modify';
  var data = {
    md: content,
    descp: descp,
    label: labels.join(',')
  };
  if (this_type == "edit") {
    data['id'] = this_article_id;
  };
  $.ajax({
    url: url,
    data: data,
    type: "post",
    dataType: "json",
    success: (res) => {
      if (res.code == 0) {
        location.href = '/admin/articles';
      } else {
        alert(res.msg);
        $('#submit').click(submitArticle);
      }
    },
    error: () => {
      console.log('error');
      $('#submit').click(submitArticle);
    }
  });
}


// 取 content 中第一个段落(<p></p>)中的内容
function getContentDescription(content) {
  content = markdown.render(content);
  var p = content.match(/(<p[\s\S]*?>)([\s\S]*?)(<\/p>)/);
  return p ? p[2] : '';
}
// 这个是粘贴过来的,
function injectLineNumbers(tokens, idx, options, env, slf) {
  if (tokens[idx].map && tokens[idx].level === 0) {
    line = tokens[idx].map[0];
    tokens[idx].attrJoin('class', 'line');
    tokens[idx].attrSet('data-line', String(line));
  }
  return slf.renderToken(tokens, idx, options, env, slf);
}
//这个是我根据原函数的思想自己修改的
function buildScrollMap() {
  var lineHeightMap = [],
    scrollMap = [],
    nonEmptyList = [],
    i, mirror = simplemde.codemirror;
  var $target = $("#display-area");
  var offset = $target.scrollTop() - $target.offset().top;
  var lineCount = mirror.doc.lineCount();

  /**
   * 因为 SimpleMDE 在某些情况下会隐藏工具栏，排除工具栏可见与否对布局的干扰
   */
  var firstLine, firstLineHeight;
  if (mirror.heightAtLine(0) == 135) {
    firstLine = 1;
    firstLineHeight = mirror.heightAtLine(1);
  } else {
    firstLine = 0;
    firstLineHeight = mirror.heightAtLine(0);
  }
  /**
   * lineHeightMap[i] 第i行的顶部到编辑区顶点的距离, 如果把每一行看作一个独立的div的话，那lineHeight[i] 就相当于offsetTop
   * 由于编辑区顶部插入图标的缘故，第0行空了出来
   */
  for (var i = firstLine; i <= lineCount; i++) {
    lineHeightMap.push(Math.floor(mirror.heightAtLine(i) - firstLineHeight));
  }
  /**
   * scrollMap[i] 第i个解析行到display区顶部的距离, 即$ele.offset().top() - $target.offset().top() + $target.scrollTop()
   */
  for (i = 0; i <= lineCount; i++) {
    scrollMap.push(-1);
  }
  /**
   * nonEmptyList[i] 设置滚动的标记， 以第一行为起点
   */
  nonEmptyList.push(0);
  scrollMap[0] = 0;
  $(".line").each((index, ele) => {
    var $ele = $(ele);
    /**
     * 因为markdownit是从line0开始了，行号加一进行修补
     */
    var _line = Number($ele.data('line'));
    if (_line != 0) nonEmptyList.push(_line);
    scrollMap[_line] = Math.floor($ele.offset().top + offset);
  });
  scrollMap[lineCount] = $target[0].scrollHeight;
  if (nonEmptyList[nonEmptyList.length - 1] != lineCount) {
    nonEmptyList.push(lineCount);
  }

  var pos = 0;
  for (i = 1; i <= lineCount; i++) {
    if (scrollMap[i] != -1) {
      pos++;
      continue;
    }
    var a = nonEmptyList[pos];
    var b = nonEmptyList[pos + 1];
    scrollMap[i] = Math.floor((scrollMap[b] * (i - a) + scrollMap[a] * (b - i)) / (b - a));
  }
  // scrollmap[0]
  scrollMap[0] = 0;

  return {
    lineHeightMap: lineHeightMap,
    scrollMap: scrollMap
  };
}

function myDebounce(func, idle) {
  var last;
  return function () {
    var ctx = this,
      args = arguments;
    if (last) clearTimeout(last);
    last = setTimeout(function () {
      func.apply(ctx, args);
    }, idle);
  }
}

function fetchGroupData() {
  $.ajax({
    url: '/admin/datas/photogroup/get',
    type: 'get',
    dataType: 'json',
    success: function (dt) {
      if (dt.code == 0) {
        var groups = dt.data;
        groups.forEach((group) => {
          var params = {
            gid: group.id,
            name: group.name,
            cnt: group.count,
            current: ''
          };
          if (group.id == -1) params.current = 'choose-photo-div-photo-group-li-current';
          $(template(photoGroupTpl, params)).appendTo($("#choose-photo-div-photo-group-ul"));
        })
      }
      getGroupPhotos();
    }
  });
}

function getGroupPhotos(gid = -1) {
  $.ajax({
    url: '/admin/datas/photos/get',
    data: {
      gid: gid
    },
    type: 'get',
    dataType: 'json',
    success: function (dt) {
      if (dt.code == 0) {
        var photos = dt.data;
        var prefix = '/images/blog/';
        $("#choose-photo-div-photo-list-ul").empty();
        photos.forEach((photo) => {
          var params = {
            id: photo.id,
            imgsrc: prefix + photo.name
          };
          $(template(photoItemTpl, params)).appendTo($("#choose-photo-div-photo-list-ul"));
        });
      }
    }
  });
}
/**
 * 原本想合并😊 
 */
function onGroupItemClick(target) {
  var gid = $(target).attr('data-gid');
  $("#choose-photo-div").attr('data-curr-gid', gid);
  $(".choose-photo-div-photo-group-li").removeClass('choose-photo-div-photo-group-li-current');
  $(target).addClass('choose-photo-div-photo-group-li-current');
  getGroupPhotos(gid);
}

function onPhotoItemClick(target) {
  $("#choose-photo-div").hide();
  var imgsrc = $($(target).find('img')[0]).attr('src');
  __drawImage(imgsrc);
}

function onInsertUrlConfirmClick() {
  var url = $("#insert-url-div-input").val();
  $("#insert-url-div").hide();
  __drawLink(url);
}

function onInsertUrlCancelClick() {
  $("#insert-url-div-input").val("");
  $("#insert-url-div").hide();
}

function openUploadImgDialog() {
  $('#upload-img-input').click();
}

function uploadImgInputChange(e) {
  var file = $("#upload-img-input")[0].files[0];
  var gid = $("#choose-photo-div").attr('data-curr-gid');
  var fd = new FormData();
  fd.append('file', file);
  // default
  fd.append('gid', gid);
  $.ajax({
    url: '/admin/datas/photos/add',
    data: fd,
    type: 'post',
    dataType: 'json',
    processData: false,
    contentType: false,
    success: function (dt) {
      getGroupPhotos(gid);
    }
  })
}


markdown = markdownit();
const markdown_editor_config = {
  element: document.getElementById("md-editor"),
  indentWithTabs: false,
  status: false,
  spellChecker: false,
  drawImage: drawImage,
  drawLink: drawLink,
  //previewRender: markdown.render
};

markdown.use(markdownItClassy);
markdown.renderer.rules.paragraph_open = markdown.renderer.rules.heading_open =
  markdown.renderer.rules.ordered_list_open = markdown.renderer.rules.bullet_list_open =
  markdown.renderer.rules.table_open = injectLineNumbers;
simplemde = new SimpleMDE(markdown_editor_config);
cm = simplemde.codemirror;
cm.scrollTo(0, 0);

$('#display-area').html(markdown.render(simplemde.value()));
$("#submit").click(submitArticle);
addLabel(current_labels.split(','));
fetchGroupData();
/*
// 绑定事件监听器
var syncSrcScroll = myDebounce(function () {
  var $target = $('#display-area');
  var scrollHeight = $target[0].scrollHeight;
  var scrollTop = $target.scrollTop();
  var height = $target.height() + parseInt($target.css("padding-top")) + parseInt($target.css("padding-bottom"));
  var offsetPercent = scrollTop / (scrollHeight - height);
  var viewportOffset = height * offsetPercent;
  var offset = scrollTop + viewportOffset;
  var smap = buildScrollMap();
  var lineHeightMap = smap.lineHeightMap;
  var scrollMap = smap.scrollMap;
  var pos, i, lineCount = lineHeightMap.length;
  for (i = 0; i <= lineCount; i++) {
    if (scrollMap[i] > offset) {
      pos = i - 1;
      break;
    }
  }
  if (offset >= scrollMap[scrollMap.length - 1]) {
    pos = scrollMap.length - 1;
  }
  if (pos > 0) {
    var scrollInfo = simplemde.codemirror.getScrollInfo();
    simplemde.codemirror.scrollTo(0, lineHeightMap[pos] - (1 - offsetPercent) * scrollInfo.clientHeight);
  } else {
    simplemde.codemirror.scrollTo(0, 0);
  }
}, 600);
var syncResScroll = myDebounce(function (instance) {
  var pos = -1;
  var smap = buildScrollMap();
  var lineHeightMap = smap.lineHeightMap,
    scrollMap = smap.scrollMap;

  var scrollInfo = simplemde.codemirror.getScrollInfo();
  var baseOffset = scrollInfo.top;
  var offsetPercent = scrollInfo.top / (scrollInfo.height - scrollInfo.clientHeight);
  var $target = $("#display-area");
  var resOffset = $target.height() * (1 - offsetPercent);
  // 修复滚动中不能滚动到底的bug
  var viewportOffset = scrollInfo.clientHeight * offsetPercent;
  var offset = baseOffset + viewportOffset;
  var smap = buildScrollMap();
  var lineHeightMap = smap.lineHeightMap,
    scrollMap = smap.scrollMap;
  var lineCount = lineHeightMap.length,
    i;
  for (i = 0; i <= lineCount; i++) {
    if (lineHeightMap[i] >= offset) {
      pos = i > 0 ? i - 1 : 0;
      break;
    }
  }
  if (pos == -1) {
    pos = scrollMap.length - 1;
  }
  $target.scrollTop(scrollMap[pos] - resOffset);
}, 100);

$("#display-area").on("touchstart mouseover", function () {
  simplemde.codemirror.off('scroll', syncResScroll);
  $('#display-area').on('scroll', syncSrcScroll);
});
$("#edit-area").on('mouseover', function () {
  $('#display-area').off('scroll');
  simplemde.codemirror.on('scroll', syncResScroll);
});
$("#edit-area").on('mouseout', function () {
  simplemde.codemirror.off('scroll', syncResScroll);
});
simplemde.codemirror.on('change', function (instance, changeObj) {
  var line = changeObj.to.line;
  var size = instance.doc.size;
  var toPos;
  // 当然这里有更好的改法，这里用了最方便实现的方法
  if (line > size - 2) {
    toPos = size - 1;
  } else {
    toPos = line;
  }
  $("#display-area").html(markdown.render(simplemde.value()));
  syncResScroll(false);
});*/

simplemde.codemirror.on("drop", function (instance, e) {
  var dt = e.dataTransfer;
  if (!dt) return;
  var f = dt.files[0];
  if (!/image/.test(f.type)) {
    return;
  }
  var fd = new FormData();
  fd.append("file", f);
  $.ajax({
    url: '/admin/datas/photos/add',
    data: fd,
    type: 'post',
    dataType: 'json',
    processData: false,
    contentType: false,
    success: function (dt) {
      var imgsrc = dt.data;
      S(simplemde, imgsrc);
    }
  });
  e.preventDefault();
  e.stopPropagation();
});
$(document).on("drop", function (e) {
  e.preventDefault();
});
$(document).on("dragover", function (e) {
  e.preventDefault();
});