var simplemde = null;
var markdown = null;
var cm = null;
var labels = [];
var labelCount = 0;
const labelTpl = $("#label-tpl").html();
const photoGroupTpl = $("#photo-group-tpl").html();
const photoItemTpl = $("#photo-item-tpl").html();
const labelHintItemTpl = $("#label-hint-item-tpl").html();

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
      e.preventDefault();
    }
  });
  $('#label-input-area').keyup((e) => {
    labelChange(e.target.value);
  })
})();

function drawLink() {
  $("#insert-url-div").show();
  $("#insert-url-div-input").val("");
  $("#insert-url-div-input").focus();
}

function drawImage() {
  $("#choose-photo-div").show();
}

function labelChange(curlabel) {
  var $target = $("#label-hints"),
    reg = new RegExp(curlabel);
  $target.empty();
  if (curlabel.trim().length == 0) return;
  var arr = labels_exists.filter(f => reg.test(f));
  arr.forEach((l) => {
    $(template(labelHintItemTpl, {label: l})).appendTo($target);
  })
}

function labelHintItemClick(e) {
  var label = e.innerText;
  addLabel(label);
  $("#label-input-area").val("");
  labelChange("");
}

function photoImgOnLoad(e) {
  var img = e;
  var imgsrc = img.src;
  var image = new Image();
  image.onload = function() {
    var ow = image.width;
    var oh = image.height;
    var small = ow < oh ? ow : oh;
    var scale = small / 150;
    var nw = ow / scale;
    var nh = oh / scale;
    img.setAttribute('width', nw + 'px');
    img.setAttribute('height', nh + 'px');
  }
  image.src = imgsrc;
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
    error: (err) => {
      console.log(err);
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
  simplemde.__drawImage(imgsrc);
}

function onInsertUrlConfirmClick() {
  var url = $("#insert-url-div-input").val();
  $("#insert-url-div").hide();
  simplemde.__drawLink(url);
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
  var gid = $("#choose-photo-div").attr('data-curr-gid') || 0;
  var fd = new FormData();
  fd.append('file', file);
  fd.append('gid', gid);
  $.ajax({ 
    url: '/admin/datas/photos/add',
    data: fd,
    type: 'post',
    processData: false,
    contentType: false,
    dataType: 'json',
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
  drawLink: drawLink
};

//markdown.use(markdownItClassy);
simplemde = new SimpleMDE(markdown_editor_config);
cm = simplemde.codemirror;
cm.scrollTo(0, 0);

$("#submit").click(submitArticle);
addLabel(current_labels.split(','));
fetchGroupData();

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
      simplemde.__drawImage(imgsrc);
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