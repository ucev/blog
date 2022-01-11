$(document).ready(() => {
  (() => {
    function f () {
      var w = $('#left-nav-div').width()
      if (w < 80) {
        $('#left-nav-div').width(100)
        $('.main').css('margin-left', 120)
      } else {
        $('#left-nav-div').width(30)
        $('.main').css('margin-left', 50)
      }
    }
    $('#expand-side-bar-img').click(f)
    $('#add-article-img').click(() => {
      location.href = '/admin/articles/add'
    })
    $('#avatar-img').click(() => {
      $('#admin-operation-ul').show()
    })
    $('.admin-operation-li').click(function () {
      $('#admin-operation-ul').hide()
      var type = $(this).attr('data-type')
      switch (type) {
        case 'logout':
          location.href = '/login/logout'
          break
        default:
          break
      }
    })
  })()
})
