function isMobile() {
  return !($("body").width() > 800);
}
$(document).ready(function(){
  (function() {
    const searchInput = $('#website-search-input');
    const searchInputDiv = $('#website-search-input-div');
    const hideInputImg = $('#website-hide-input-img');
    const showInputImg = $('#website-search-img');

    const categoryImg = $('#article-category-img');
    const categoryUl = $('#article-categories-ul');
    const categoryTitle = $('#article-category-title-span');

    const articlesList = $('#articles-list-ul');

    function hideSearchInput() {
      $(searchInput).val('');
      $(searchInputDiv).width(0);
      $(hideInputImg).fadeOut("slow");
    }
    function showSearchInput() {
      $(searchInputDiv).width(300);
      $(hideInputImg).fadeIn("slow");
    }
    $(showInputImg).click(function(e) {
      if (isMobile()) {
        location.href = '/mobiles/search';
      } else {
        if ($(searchInput).width() < 10) {
          showSearchInput();
        }
      }
    });
    $(hideInputImg).click(function(e) {
      hideSearchInput();
    });
    $(searchInput).keydown(function(e) {
      if (e.which == 13) {
        var searchParam = $(searchInput).val();
        location.href = '/articles/search?args=' + encodeURIComponent(searchParam);
      }
    });
    $('#mobile-search-input-img').click(function(e) {
      var searchParam = $("#mobile-search-input").val();
      location.href = '/articles/search?args=' + encodeURIComponent(searchParam);
    })

    $(categoryImg).click(function(e) {
      var state = $(this).data('state');
      if (state == 'hide') {
        $(this).data('state', 'show');
        $(this).attr('src', '/images/icons/ic_list_grey_24dp_2x.png');
        $(categoryUl).addClass('article-categories-ul-show');
        $(categoryUl).removeClass('article-categories-ul-hide');
        $(categoryTitle).show();
      } else {
        $(this).data('state', 'hide');
        $(this).attr('src', '/images/icons/ic_toc_grey_24dp_2x.png');
        $(categoryUl).addClass('article-categories-ul-hide');
        $(categoryUl).removeClass('article-categories-ul-show');
        $(categoryTitle).hide();
      }
    })
  })();
});