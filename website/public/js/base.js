$(document).ready(function(){
  (function() {
    const searchInput = $('#website-search-input');
    const hideInputImg = $('#website-hide-input-img');
    const showInputImg = $('#website-search-img');
    function hideSearchInput() {
      $(searchInput).width(0);
      $(hideInputImg).hide("slow");
    }
    function showSearchInput() {
      $(searchInput).width(300);
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
    $(searchInput).keydown(function(e) {
      if (e.which == 13) {
        alert($(this).val());
      }
    });
  })();
});