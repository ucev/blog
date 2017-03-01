$(document).ready(function(){
  (function() {
    const searchInput = $('#website-search-input');
    const searchInputDiv = $('#website-search-input-div');
    const hideInputImg = $('#website-hide-input-img');
    const showInputImg = $('#website-search-img');

    const categoryImg = $('#article-category-img');
    const categoryUl = $('#article-categories-ul');

    const articlesList = $('#articles-list-ul');

    function hideSearchInput() {
      $(searchInput).val('');
      $(searchInputDiv).width(0);
      $(hideInputImg).hide("slow");
    }
    function showSearchInput() {
      $(searchInputDiv).width(300);
      $(hideInputImg).show("slow");
    }
    $(showInputImg).click((e) => {
      if ($(searchInput).width() < 10) {
        showSearchInput();
      }
    });
    $(hideInputImg).click((e) => {
      hideSearchInput();
    });
    $(searchInput).keydown((e) => {
      if (e.which == 13) {
        var searchParam = $(searchInput).val();
        location.href = '/articles/search?args=' + encodeURIComponent(searchParam);
      }
    });

    $(categoryImg).click(function(e) {
      var state = $(this).data('state');
      if (state == 'hide') {
        $(this).data('state', 'show');
        $(this).attr('src', '/images/icons/ic_list_grey_24dp_2x.png');
        $(categoryUl).addClass('article-categories-ul-show');
        $(categoryUl).removeClass('article-categories-ul-hide');
        $(articlesList).addClass('articles-list-ul-expanded');
        $(articlesList).removeClass('articles-list-ul-unexpanded');
        //$(categoryUl).width(200);
      } else {
        $(this).data('state', 'hide');
        $(this).attr('src', '/images/icons/ic_toc_grey_24dp_2x.png');
        $(categoryUl).addClass('article-categories-ul-hide');
        $(categoryUl).removeClass('article-categories-ul-show');
        $(articlesList).addClass('articles-list-ul-unexpanded');
        $(articlesList).removeClass('articles-list-ul-expanded');
        //$(categoryUl).width(0);
      }
    })
  })();
});