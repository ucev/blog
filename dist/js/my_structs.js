(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MyStructs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmDialog = function (_React$Component) {
  _inherits(ConfirmDialog, _React$Component);

  function ConfirmDialog(props) {
    _classCallCheck(this, ConfirmDialog);

    var _this = _possibleConstructorReturn(this, (ConfirmDialog.__proto__ || Object.getPrototypeOf(ConfirmDialog)).call(this, props));

    _this.handleConfirmClick = _this.handleConfirmClick.bind(_this);
    _this.handleCancelClick = _this.handleCancelClick.bind(_this);
    return _this;
  }

  _createClass(ConfirmDialog, [{
    key: "handleConfirmClick",
    value: function handleConfirmClick(e) {
      this.props.confirm();
    }
  }, {
    key: "handleCancelClick",
    value: function handleCancelClick(e) {
      this.props.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      var centerScreen = !(this.props.centerScreen === false);
      var classes = "dialog-div confirm-dialog";
      if (centerScreen) {
        classes += " dialog-div-center-screen";
      }
      console.log(classes);
      var styles = {};
      if (!this.props.visible) styles.display = 'none';
      return React.createElement(
        "div",
        { className: classes, style: styles },
        React.createElement(
          "div",
          { className: "dialog-header-div" },
          React.createElement(
            "div",
            { className: "dialog-title-div" },
            this.props.title
          )
        ),
        React.createElement(
          "div",
          { className: "dialog-bottom-operation-bar" },
          React.createElement(
            "button",
            { className: "dialog-operation-button dialog-confirm-button", onClick: this.handleConfirmClick },
            "\u786E\u5B9A"
          ),
          React.createElement(
            "button",
            { className: "dialog-operation-button dialog-cancel-button", onClick: this.handleCancelClick },
            "\u53D6\u6D88"
          )
        )
      );
    }
  }]);

  return ConfirmDialog;
}(React.Component);

module.exports = ConfirmDialog;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputDialog = function (_React$Component) {
  _inherits(InputDialog, _React$Component);

  function InputDialog(props) {
    _classCallCheck(this, InputDialog);

    var _this = _possibleConstructorReturn(this, (InputDialog.__proto__ || Object.getPrototypeOf(InputDialog)).call(this, props));

    _this.handleConfirmClick = _this.handleConfirmClick.bind(_this);
    _this.handleCancelClick = _this.handleCancelClick.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  _createClass(InputDialog, [{
    key: "handleConfirmClick",
    value: function handleConfirmClick() {
      var val = this.textInput.value;
      this.props.confirm(val);
      this.textInput.value = "";
    }
  }, {
    key: "handleCancelClick",
    value: function handleCancelClick() {
      this.props.cancel();
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (e.which == 13) {
        this.handleConfirmClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var centerScreen = !(this.props.centerScreen === false);
      var classes = "dialog-div input-dialog";
      if (centerScreen) {
        classes += " dialog-div-center-screen";
      }
      var styles = {};
      if (!this.props.visible) styles.display = 'none';
      return React.createElement(
        "div",
        { className: classes, style: styles },
        React.createElement(
          "div",
          { className: "dialog-header-div" },
          React.createElement(
            "div",
            { className: "dialog-title-div" },
            this.props.title
          )
        ),
        React.createElement(
          "div",
          { className: "dialog-main-body-div" },
          React.createElement("input", { className: "dialog-content-input", ref: function ref(input) {
              return _this2.textInput = input;
            }, onKeyDown: this.handleKeyDown })
        ),
        React.createElement(
          "div",
          { className: "dialog-buttom-operation-bar" },
          React.createElement(
            "button",
            { className: "dialog-operation-button dialog-confirm-button", onClick: this.handleConfirmClick },
            "\u786E\u5B9A"
          ),
          React.createElement(
            "button",
            { className: "dialog-operation-button dialog-cancel-button", onClick: this.handleCancelClick },
            "\u53D6\u6D88"
          )
        )
      );
    }
  }]);

  return InputDialog;
}(React.Component);

module.exports = InputDialog;

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OptionDialog = function (_React$Component) {
  _inherits(OptionDialog, _React$Component);

  function OptionDialog(props) {
    _classCallCheck(this, OptionDialog);

    var _this = _possibleConstructorReturn(this, (OptionDialog.__proto__ || Object.getPrototypeOf(OptionDialog)).call(this, props));

    _this.handleConfirmClick = _this.handleConfirmClick.bind(_this);
    _this.handleCancelClick = _this.handleCancelClick.bind(_this);
    _this.handleGroupChange = _this.handleGroupChange.bind(_this);
    _this.state = {
      newgroup: -1
    };
    return _this;
  }

  _createClass(OptionDialog, [{
    key: "handleConfirmClick",
    value: function handleConfirmClick(e) {
      this.props.confirm(this.state.newgroup);
    }
  }, {
    key: "handleCancelClick",
    value: function handleCancelClick(e) {
      this.props.cancel();
    }
  }, {
    key: "handleGroupChange",
    value: function handleGroupChange(e) {
      var radio = e.target;
      if (radio.checked) {
        this.setState({
          newgroup: radio.value
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var centerScreen = !(this.props.centerScreen === false);
      var classes = "dialog-div option-dialog";
      if (centerScreen) {
        classes += " dialog-div-center-screen";
      }
      var styles = {};
      if (!this.props.visible) styles.display = 'none';
      var groupItems = this.props.optionItems.map(function (group) {
        if (group.id == -1) return '';
        return React.createElement(
          "li",
          { className: "option-dialog-option-li" },
          React.createElement("input", { type: "radio", name: "photogroup", value: group.id, onChange: _this2.handleGroupChange }),
          React.createElement(
            "label",
            null,
            group.name
          )
        );
      });
      return React.createElement(
        "div",
        { className: classes, style: styles, "data-title": this.props.title },
        React.createElement(
          "div",
          { className: "dialog-main-body-div" },
          React.createElement(
            "ul",
            { className: "option-dialog-option-ul" },
            groupItems
          )
        ),
        React.createElement(
          "div",
          { className: "dialog-bottom-operation-bar" },
          React.createElement(
            "button",
            { className: "dialog-operation-button dialog-confirm-button", onClick: this.handleConfirmClick },
            "\u786E\u5B9A"
          ),
          React.createElement(
            "button",
            { className: "dialog-operation-button dialog-cancel-button", onClick: this.handleCancelClick },
            "\u53D6\u6D88"
          )
        )
      );
    }
  }]);

  return OptionDialog;
}(React.Component);

module.exports = OptionDialog;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableNavLinkLi = function (_React$Component) {
  _inherits(TableNavLinkLi, _React$Component);

  function TableNavLinkLi(props) {
    _classCallCheck(this, TableNavLinkLi);

    var _this = _possibleConstructorReturn(this, (TableNavLinkLi.__proto__ || Object.getPrototypeOf(TableNavLinkLi)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(TableNavLinkLi, [{
    key: 'handleClick',
    value: function handleClick() {
      this.props.click(this.props.page);
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = 'table-nav-ul-li';
      if (this.props.current == this.props.page) classes += ' table-nav-ul-li-current';
      return React.createElement(
        'li',
        { className: classes, onClick: this.handleClick },
        this.props.title
      );
    }
  }]);

  return TableNavLinkLi;
}(React.Component);

var TableNavLink = function (_React$Component2) {
  _inherits(TableNavLink, _React$Component2);

  function TableNavLink(props) {
    _classCallCheck(this, TableNavLink);

    var _this2 = _possibleConstructorReturn(this, (TableNavLink.__proto__ || Object.getPrototypeOf(TableNavLink)).call(this, props));

    _this2.getRenderData = _this2.getRenderData.bind(_this2);
    _this2.handleClick = _this2.handleClick.bind(_this2);
    return _this2;
  }

  _createClass(TableNavLink, [{
    key: 'handleClick',
    value: function handleClick(pg) {
      this.props.pagechange(pg);
    }
  }, {
    key: 'getRenderData',
    value: function getRenderData() {
      var page = this.props.page;
      var total = this.props.total;
      var start = page < 5 ? 0 : page - 5;
      var len;
      if (start + 10 <= total) {
        len = 10;
      } else if (total - 10 > 0) {
        start = total - 10;
        len = 10;
      } else {
        start = 0;
        len = total;
      }
      var lis = [];
      if (page != 0) lis.push(React.createElement(TableNavLinkLi, { page: page - 1, current: page, title: '\u4E0A\u4E00\u9875', click: this.handleClick }));
      for (var i = 1; i <= len; i++) {
        lis.push(React.createElement(TableNavLinkLi, { page: start + i - 1, current: page, title: start + i, click: this.handleClick }));
      }if (page + 1 < total) lis.push(React.createElement(TableNavLinkLi, { page: page + 1, current: page, title: '\u4E0B\u4E00\u9875', click: this.handleClick }));
      return lis;
    }
  }, {
    key: 'render',
    value: function render() {
      var lis = this.getRenderData();
      return React.createElement(
        'ul',
        { id: 'table-nav-ul' },
        lis
      );
    }
  }]);

  return TableNavLink;
}(React.Component);

module.exports = TableNavLink;

},{}],5:[function(require,module,exports){
'use strict';

var Articles = require('./react_articles.js');
var Categories = require('./react_categories.js');
var CategoriesRefact = require('./react_category_refact.js');
var Labels = require('./react_labels.js');
var Photos = require('./react_photos.js');

function adminArticlesInit() {
  ReactDOM.render(React.createElement(Articles, null), document.getElementById('table-div'));
}

function adminCategoriesInit() {
  ReactDOM.render(React.createElement(Categories, null), document.getElementById('table-div'));
}

function adminCategoryRefactInit() {
  ReactDOM.render(React.createElement(CategoriesRefact, null), document.getElementById('reform-area'));
}

function adminLabelsInit() {
  ReactDOM.render(React.createElement(Labels, null), document.getElementById('table-div'));
}

function adminPhotosInit() {
  ReactDOM.render(React.createElement(Photos, null), document.getElementById('photos-target-div'));
}

module.exports = {
  articles: adminArticlesInit,
  categories: adminCategoriesInit,
  categoriesRefact: adminCategoryRefactInit,
  labels: adminLabelsInit,
  photos: adminPhotosInit
};

},{"./react_articles.js":6,"./react_categories.js":7,"./react_category_refact.js":8,"./react_labels.js":9,"./react_photos.js":10}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmDialog = require("./components/confirm_dialog.js");
var OptionDialog = require("./components/option_dialog.js");
var TableNavLink = require("./components/table_foot_nav.js");

var FilterInput = function (_React$Component) {
  _inherits(FilterInput, _React$Component);

  function FilterInput(props) {
    _classCallCheck(this, FilterInput);

    var _this = _possibleConstructorReturn(this, (FilterInput.__proto__ || Object.getPrototypeOf(FilterInput)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(FilterInput, [{
    key: "handleChange",
    value: function handleChange(e) {
      if (e.which == 13) {
        var title = this.props.title;
        var value = e.target.value;
        this.props.change(title, value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "table-filter-item" },
        React.createElement(
          "label",
          { className: "table-filter-item-label" },
          this.props.label
        ),
        React.createElement("input", { className: "table-filter-item-input", onKeyDown: this.handleChange })
      );
    }
  }]);

  return FilterInput;
}(React.Component);

var FilterSelect = function (_React$Component2) {
  _inherits(FilterSelect, _React$Component2);

  function FilterSelect(props) {
    _classCallCheck(this, FilterSelect);

    var _this2 = _possibleConstructorReturn(this, (FilterSelect.__proto__ || Object.getPrototypeOf(FilterSelect)).call(this, props));

    _this2.handleChange = _this2.handleChange.bind(_this2);
    return _this2;
  }

  _createClass(FilterSelect, [{
    key: "handleChange",
    value: function handleChange(e) {
      var title = this.props.title;
      var value = e.target.value;
      this.props.change(title, value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var options = this.props.options.map(function (opt) {
        if (_this3.props.reset == true && opt.value == -1) {
          return React.createElement(
            "option",
            { value: opt.value, selected: "selected" },
            opt.title
          );
        } else {
          return React.createElement(
            "option",
            { value: opt.value },
            opt.title
          );
        }
      });
      return React.createElement(
        "div",
        { className: "table-filter-item" },
        React.createElement(
          "label",
          { className: "table-filter-item-label" },
          this.props.label
        ),
        React.createElement(
          "select",
          { className: "table-filter-item-select", onChange: this.handleChange },
          options
        )
      );
    }
  }]);

  return FilterSelect;
}(React.Component);

var ArticleTableLabel = function (_React$Component3) {
  _inherits(ArticleTableLabel, _React$Component3);

  function ArticleTableLabel(props) {
    _classCallCheck(this, ArticleTableLabel);

    var _this4 = _possibleConstructorReturn(this, (ArticleTableLabel.__proto__ || Object.getPrototypeOf(ArticleTableLabel)).call(this, props));

    _this4.handleCheckStateChange = _this4.handleCheckStateChange.bind(_this4);
    return _this4;
  }

  _createClass(ArticleTableLabel, [{
    key: "handleCheckStateChange",
    value: function handleCheckStateChange(e) {
      this.props.allChecked(e.target.checked);
      e.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var checked = this.props.allCheckState == true ? 'checked' : '';
      return React.createElement(
        "tr",
        { className: "content-row-label" },
        React.createElement(
          "th",
          { className: "content-row-check-label" },
          React.createElement("input", { type: "checkbox", checked: checked, onChange: this.handleCheckStateChange })
        ),
        React.createElement(
          "th",
          { className: "content-row-index-label" },
          "\u5E8F\u53F7"
        ),
        React.createElement(
          "th",
          { className: "content-row-title-label" },
          "\u6807\u9898"
        ),
        React.createElement(
          "th",
          { className: "content-row-category-label" },
          "\u7C7B\u522B"
        ),
        React.createElement(
          "th",
          { className: "content-row-label-label" },
          "\u6807\u7B7E"
        ),
        React.createElement(
          "th",
          { className: "content-row-status-label" },
          "\u72B6\u6001"
        ),
        React.createElement(
          "th",
          { className: "content-row-pageview-label" },
          "\u9605\u8BFB\u6B21\u6570"
        ),
        React.createElement(
          "th",
          { className: "content-row-operation-label" },
          "\u64CD\u4F5C"
        )
      );
    }
  }]);

  return ArticleTableLabel;
}(React.Component);

var ArticleRow = function (_React$Component4) {
  _inherits(ArticleRow, _React$Component4);

  function ArticleRow(props) {
    _classCallCheck(this, ArticleRow);

    var _this5 = _possibleConstructorReturn(this, (ArticleRow.__proto__ || Object.getPrototypeOf(ArticleRow)).call(this, props));

    _this5.article_state_label = {
      on: '已上线',
      off: '已下线'
    };
    _this5.handleStateClick = _this5.handleStateClick.bind(_this5);
    _this5.handleCheckStateChange = _this5.handleCheckStateChange.bind(_this5);
    _this5.article_operation = {
      on: React.createElement(
        "ul",
        { className: "article-operation-ul" },
        React.createElement(
          "li",
          { "data-type": "off", onClick: _this5.handleStateClick },
          "\u4E0B\u7EBF"
        ),
        React.createElement(
          "li",
          { "data-type": "check", onClick: _this5.handleStateClick },
          "\u6838\u67E5"
        )
      ),
      off: React.createElement(
        "ul",
        { className: "article-operation-ul" },
        React.createElement(
          "li",
          { "data-type": "on", onClick: _this5.handleStateClick },
          "\u4E0A\u7EBF"
        ),
        React.createElement(
          "li",
          { "data-type": "move", onClick: _this5.handleStateClick },
          "\u79FB\u52A8"
        ),
        React.createElement(
          "li",
          { "data-type": "check", onClick: _this5.handleStateClick },
          "\u6838\u67E5"
        ),
        React.createElement(
          "li",
          { "data-type": "del", onClick: _this5.handleStateClick },
          "\u5220\u9664"
        )
      )
    };
    return _this5;
  }

  _createClass(ArticleRow, [{
    key: "handleStateClick",
    value: function handleStateClick(e) {
      var id = this.props.article.id;
      var type = e.target.getAttribute('data-type');
      this.props.handleStateClick(id, type);
    }
  }, {
    key: "handleCheckStateChange",
    value: function handleCheckStateChange(e) {
      var id = this.props.article.id;
      var checked = e.target.checked;
      this.props.checkStateChange(id, checked);
    }
  }, {
    key: "render",
    value: function render() {
      var article = this.props.article;
      var url = '/articles/view/' + article.id;
      var topStatus = article.top == 0 ? {} : { color: '#EF5350' };
      var articleState = this.article_state_label[article.state];
      var operation = this.article_operation[article.state];
      var checked = this.props.checked === true ? 'checked' : '';
      return React.createElement(
        "tr",
        { className: "content-row-data" },
        React.createElement(
          "td",
          { className: "content-row-checkbox-data" },
          React.createElement("input", { type: "checkbox", checked: checked, onChange: this.handleCheckStateChange })
        ),
        React.createElement(
          "td",
          { className: "content-row-index-data", onClick: this.handleIndexClick },
          this.props.index + 1
        ),
        React.createElement(
          "td",
          { className: "content-row-title-data", style: topStatus },
          React.createElement(
            "a",
            { href: url },
            article.title
          )
        ),
        React.createElement(
          "td",
          { className: "content-row-category-data" },
          article.category
        ),
        React.createElement(
          "td",
          { className: "content-row-label-data" },
          article.label
        ),
        React.createElement(
          "td",
          { className: "content-row-status-data" },
          articleState
        ),
        React.createElement(
          "td",
          { className: "content-row-pageview-data" },
          article.pageview
        ),
        React.createElement(
          "td",
          { className: "content-row-operation-data" },
          operation
        )
      );
    }
  }]);

  return ArticleRow;
}(React.Component);

var ArticleTable = function (_React$Component5) {
  _inherits(ArticleTable, _React$Component5);

  function ArticleTable(props) {
    _classCallCheck(this, ArticleTable);

    var _this6 = _possibleConstructorReturn(this, (ArticleTable.__proto__ || Object.getPrototypeOf(ArticleTable)).call(this, props));

    _this6.allChecked = _this6.allChecked.bind(_this6);
    _this6.handleStateClick = _this6.handleStateClick.bind(_this6);
    _this6.checkStateChange = _this6.checkStateChange.bind(_this6);
    return _this6;
  }

  _createClass(ArticleTable, [{
    key: "allChecked",
    value: function allChecked(checked) {
      this.props.allChecked(checked);
    }
  }, {
    key: "handleStateClick",
    value: function handleStateClick(id, type) {
      if (type == 'on' || type == 'off') {
        this.props.articleStateChange(id, type);
      } else if (type == 'del') {
        this.props.delete(id);
      } else if (type == 'check') {
        location.href = "/admin/articles/modify?id=" + id;
      } else if (type == 'move') {
        this.props.handleMoveCategory(id);
      }
    }
  }, {
    key: "checkStateChange",
    value: function checkStateChange(id, checked) {
      this.props.checkStateChange(id, checked);
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var that = this;
      var articles = this.props.articles;
      var checkState = this.props.checkState;
      var allCheckState = true;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var article = _step.value;

          if (checkState[article.id] !== true) {
            allCheckState = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var articleRows = articles.map(function (article, index, arr) {
        var checked = checkState[article.id];
        return React.createElement(ArticleRow, { key: index, index: index, checked: checked, article: article, handleStateClick: _this7.handleStateClick, checkStateChange: _this7.checkStateChange });
      });
      return React.createElement(
        "table",
        { className: "content-table" },
        React.createElement(
          "thead",
          null,
          React.createElement(ArticleTableLabel, { allCheckState: allCheckState, allChecked: this.allChecked })
        ),
        React.createElement(
          "tbody",
          null,
          articleRows
        ),
        React.createElement("tfoot", null)
      );
    }
  }]);

  return ArticleTable;
}(React.Component);

var ArticleLayout = function (_React$Component6) {
  _inherits(ArticleLayout, _React$Component6);

  function ArticleLayout(props) {
    _classCallCheck(this, ArticleLayout);

    var _this8 = _possibleConstructorReturn(this, (ArticleLayout.__proto__ || Object.getPrototypeOf(ArticleLayout)).call(this, props));

    _this8.state = {
      articles: [],
      current: 0,
      total: 0,
      checkState: {},
      // delete dialog
      delVisible: false,
      delArticleId: -1,
      // move dialog
      moveVisible: false,
      categories: [],
      moveArticleId: -1,
      // group operation
      isgroup: false
    };
    _this8.stateOptions = [{ value: '-1', title: '全部' }, { value: 'on', title: '已上线' }, { value: 'off', title: '已下线' }];
    _this8.opeOptions = [{ value: '-1', title: '--选择操作--' }, { value: 'on', title: '上线' }, { value: 'off', title: '下线' }, { value: 'move', title: '移动' }, { value: 'del', title: '删除' }];
    _this8.addArticle = _this8.addArticle.bind(_this8);
    _this8.articleStateChange = _this8.articleStateChange.bind(_this8);
    _this8.articleGroupChange = _this8.articleGroupChange.bind(_this8);
    _this8.allChecked = _this8.allChecked.bind(_this8);
    _this8.checkStateChange = _this8.checkStateChange.bind(_this8);
    _this8.handlePageChange = _this8.handlePageChange.bind(_this8);
    _this8.handleFilterChange = _this8.handleFilterChange.bind(_this8);
    _this8.handleDeleteArticle = _this8.handleDeleteArticle.bind(_this8);
    _this8.deleteArticleConfirm = _this8.deleteArticleConfirm.bind(_this8);
    _this8.deleteArticleCancel = _this8.deleteArticleCancel.bind(_this8);
    _this8.fetchArticles = _this8.fetchArticles.bind(_this8);
    _this8.fetchSingleArticle = _this8.fetchSingleArticle.bind(_this8);
    _this8.fetchCategories = _this8.fetchCategories.bind(_this8);
    _this8.groupOpeChange = _this8.groupOpeChange.bind(_this8);
    // categories
    _this8.moveCategoryConfirm = _this8.moveCategoryConfirm.bind(_this8);
    _this8.moveCategoryCancel = _this8.moveCategoryCancel.bind(_this8);
    _this8.handleMoveCategory = _this8.handleMoveCategory.bind(_this8);

    _this8.filter = { start: 0 };
    _this8.fetchArticles();
    _this8.fetchCategories();
    return _this8;
  }

  _createClass(ArticleLayout, [{
    key: "addArticle",
    value: function addArticle() {
      location.href = '/admin/articles/add';
    }
  }, {
    key: "articleStateChange",
    value: function articleStateChange(id, type) {
      var isgroup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var that = this;
      $.ajax({
        url: '/admin/datas/articles/state',
        data: { id: id, state: type },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (isgroup) {
            that.fetchArticles();
          } else {
            that.fetchSingleArticle(id);
          }
        },
        error: function (_error) {
          function error() {
            return _error.apply(this, arguments);
          }

          error.toString = function () {
            return _error.toString();
          };

          return error;
        }(function () {
          console.log(error);
        })
      });
    }
  }, {
    key: "articleGroupChange",
    value: function articleGroupChange(id, gid) {
      var isgroup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var that = this;
      $.ajax({
        url: '/admin/datas/articles/move',
        data: { id: id, gid: gid },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            if (that.state.isgroup) {
              that.fetchArticles();
              that.setState({
                moveVisible: false,
                moveArticleId: -1,
                isgroup: false
              });
            } else {
              that.setState({
                moveVisible: false,
                moveArticleId: -1
              });
              that.fetchSingleArticle(id);
            }
          }
        }
      });
    }
  }, {
    key: "checkStateChange",
    value: function checkStateChange(id, checked) {
      var checkState = this.state.checkState;
      checkState[id] = checked;
      this.setState({
        checkState: checkState
      });
    }
  }, {
    key: "allChecked",
    value: function allChecked(checked) {
      var articles = this.state.articles;
      var checkState = {};
      for (var i = 0; i < articles.length; i++) {
        checkState[articles[i].id] = checked;
      }
      this.setState({
        checkState: checkState
      });
    }
  }, {
    key: "fetchSingleArticle",
    value: function fetchSingleArticle(id) {
      var that = this;
      $.ajax({
        url: '/admin/datas/articles/get',
        type: 'get',
        data: { id: id },
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            var articles = that.state.articles;
            for (var i in articles) {
              if (articles[i].id == id) {
                articles[i] = dt.data;
                that.setState({
                  articles: articles
                });
                break;
              }
            }
          }
        }
      });
    }
  }, {
    key: "fetchArticles",
    value: function fetchArticles() {
      var that = this;
      $.ajax({
        url: '/admin/datas/articles/get',
        type: 'get',
        data: that.filter,
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.setState({
              articles: dt.data.data,
              current: dt.data.current,
              total: dt.data.total,
              checkState: {}
            });
          }
        }
      });
    }
  }, {
    key: "fetchCategories",
    value: function fetchCategories() {
      var that = this;
      $.ajax({
        url: '/admin/datas/categories/get',
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.setState({
              categories: dt.data
            });
          }
        }
      });
    }
  }, {
    key: "handlePageChange",
    value: function handlePageChange(i) {
      this.filter.start = i;
      this.fetchArticles();
    }
  }, {
    key: "handleFilterChange",
    value: function handleFilterChange(label, value) {
      if (this.filter[label] == value) return;
      this.filter[label] = value;
      this.filter.start = 0;
      this.fetchArticles();
    }
  }, {
    key: "handleDeleteArticle",
    value: function handleDeleteArticle(id) {
      this.setState({
        delVisible: true,
        delArticleId: id,
        isgroup: false
      });
    }
  }, {
    key: "deleteArticleConfirm",
    value: function deleteArticleConfirm() {
      var that = this;
      $.ajax({
        url: '/admin/datas/articles/delete',
        data: { id: that.state.delArticleId },
        type: 'post',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.setState({
              delVisible: false,
              delArticleId: -1
            });
            that.fetchArticles();
          }
        }
      });
    }
  }, {
    key: "deleteArticleCancel",
    value: function deleteArticleCancel() {
      this.setState({
        delVisible: false
      });
    }
  }, {
    key: "groupOpeChange",
    value: function groupOpeChange(title, value) {
      var checkState = this.state.checkState;
      var ids = [];
      for (var key in checkState) {
        if (checkState[key]) ids.push(key);
      }
      ids = ids.join(',');
      switch (value) {
        case 'on':
        case 'off':
          this.articleStateChange(ids, value, true);
          break;
        case 'move':
          this.setState({
            moveArticleId: ids,
            isgroup: true,
            moveVisible: true
          });
          break;
        case 'del':
          this.setState({
            delArticleId: ids,
            isgroup: true,
            delVisible: true
          });
          break;
        default:
          break;
      }
    }
    //category

  }, {
    key: "moveCategoryConfirm",
    value: function moveCategoryConfirm(gid) {
      this.articleGroupChange(this.state.moveArticleId, gid, false);
    }
  }, {
    key: "moveCategoryCancel",
    value: function moveCategoryCancel() {
      this.setState({
        moveVisible: false
      });
    }
  }, {
    key: "handleMoveCategory",
    value: function handleMoveCategory(id) {
      this.setState({
        moveArticleId: id,
        isgroup: false,
        moveVisible: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      /**
       * 这样感觉封装性稍差一点
       * 以后更有体会了再来看看😊
       * 先做一个标记
       */
      var groupopeReset = true;
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "table-filter-bar table-filter-bar-top" },
          React.createElement(
            "button",
            { className: "operation-button", onClick: this.addArticle },
            "\u6DFB\u52A0\u6587\u7AE0"
          ),
          React.createElement(FilterInput, { title: "label", label: "\u6807\u7B7E", change: this.handleFilterChange }),
          React.createElement(FilterInput, { title: "category", label: "\u7C7B\u522B", change: this.handleFilterChange }),
          React.createElement(FilterSelect, { title: "state", label: "\u72B6\u6001", options: this.stateOptions, change: this.handleFilterChange })
        ),
        React.createElement(ArticleTable, { articles: this.state.articles, checkState: this.state.checkState, fetchSingleArticle: this.fetchSingleArticle, checkStateChange: this.checkStateChange, articleStateChange: this.articleStateChange, handleMoveCategory: this.handleMoveCategory, allChecked: this.allChecked, "delete": this.handleDeleteArticle }),
        React.createElement(
          "div",
          { className: "table-filter-bar table-filter-bar-bottom" },
          React.createElement(FilterSelect, { title: "groupope", options: this.opeOptions, change: this.groupOpeChange, reset: groupopeReset, defaultVal: "-1" })
        ),
        React.createElement(TableNavLink, { page: this.state.current, total: this.state.total, pagechange: this.handlePageChange }),
        React.createElement(ConfirmDialog, { title: "\u786E\u8BA4\u5220\u9664?", confirm: this.deleteArticleConfirm, cancel: this.deleteArticleCancel, visible: this.state.delVisible }),
        React.createElement(OptionDialog, { title: "\u79FB\u52A8\u6587\u7AE0\u5206\u7EC4", optionItems: this.state.categories, confirm: this.moveCategoryConfirm, cancel: this.moveCategoryCancel, visible: this.state.moveVisible })
      );
    }
  }]);

  return ArticleLayout;
}(React.Component);

module.exports = ArticleLayout;

},{"./components/confirm_dialog.js":1,"./components/option_dialog.js":3,"./components/table_foot_nav.js":4}],7:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmDialog = require("./components/confirm_dialog.js");
var TableNavLink = require("./components/table_foot_nav.js");

var OperationBar = function (_React$Component) {
  _inherits(OperationBar, _React$Component);

  function OperationBar(props) {
    _classCallCheck(this, OperationBar);

    var _this = _possibleConstructorReturn(this, (OperationBar.__proto__ || Object.getPrototypeOf(OperationBar)).call(this, props));

    _this.addNewCategory = _this.addNewCategory.bind(_this);
    return _this;
  }

  _createClass(OperationBar, [{
    key: "addNewCategory",
    value: function addNewCategory() {
      this.props.addNewCategory(true, 'add');
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "table-operation-bar table-operation-bar-top" },
        React.createElement(
          "button",
          { className: "operation-button operation-button-confirm", onClick: this.addNewCategory },
          "\u65B0\u5EFA\u7C7B\u522B"
        )
      );
    }
  }]);

  return OperationBar;
}(React.Component);

var AddCategoryDiv = function (_React$Component2) {
  _inherits(AddCategoryDiv, _React$Component2);

  function AddCategoryDiv(props) {
    _classCallCheck(this, AddCategoryDiv);

    var _this2 = _possibleConstructorReturn(this, (AddCategoryDiv.__proto__ || Object.getPrototypeOf(AddCategoryDiv)).call(this, props));

    _this2.valueChange = _this2.valueChange.bind(_this2);
    _this2.addCategoryCancel = _this2.addCategoryCancel.bind(_this2);
    _this2.addCategoryConfirm = _this2.addCategoryConfirm.bind(_this2);
    return _this2;
  }

  _createClass(AddCategoryDiv, [{
    key: "valueChange",
    value: function valueChange(e) {
      var title = e.target.getAttribute('data-title');
      var value = e.target.value;
      var data = this.props.data;
      data[title] = value;
      this.props.valueChange(data);
    }
  }, {
    key: "addCategoryCancel",
    value: function addCategoryCancel(e) {
      this.props.cancel();
      e.preventDefault();
    }
  }, {
    key: "addCategoryConfirm",
    value: function addCategoryConfirm(e) {
      var name = this.nameInput.value;
      var parent = this.parentSelect.value;
      var descp = this.descpArea.value;
      var data = {
        name: name,
        parent: parent,
        descp: descp
      };
      this.props.confirm(data);
      e.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var data = this.props.data == {} ? {} : this.props.data;
      var name = data.name ? data.name : '';
      var parent = data.parent ? data.parent : '';
      var descp = data.descp ? data.descp : '';
      var categoryItems = this.props.categories.map(function (category) {
        if (category.id == parent) {
          return React.createElement(
            "option",
            { value: category.id, selected: true },
            category.name
          );
        } else {
          return React.createElement(
            "option",
            { value: category.id },
            category.name
          );
        }
      });
      var styles;
      if (this.props.visible) {
        styles = {
          height: '300px',
          'border-width': '1px',
          opacity: 1
        };
      } else {
        styles = {
          height: '0',
          'border-width': '0',
          opacity: 0
        };
      }
      return React.createElement(
        "div",
        { id: "add-category-div", style: styles },
        React.createElement(
          "form",
          { id: "add-category-form" },
          React.createElement(
            "legend",
            { id: "add-category-div-title" },
            this.props.title
          ),
          React.createElement(
            "li",
            { className: "add-category-div-item", id: "add-category-div-name" },
            React.createElement(
              "label",
              { className: "add-category-div-item-label" },
              "\u6807\u9898"
            ),
            React.createElement("input", { ref: function ref(input) {
                _this3.nameInput = input;
              }, className: "add-category-div-item-input", id: "add-category-div-item-input-name", type: "text", "data-title": "name", value: name, onChange: this.valueChange })
          ),
          React.createElement(
            "li",
            { className: "add-category-div-item", id: "add-category-div-parent" },
            React.createElement(
              "label",
              { className: "add-category-div-item-label" },
              "\u7236\u8282\u70B9"
            ),
            React.createElement(
              "select",
              { ref: function ref(select) {
                  _this3.parentSelect = select;
                }, className: "add-category-div-item-input", id: "add-category-div-item-input-parent", "data-title": "parent", onChange: this.valueChange },
              categoryItems
            )
          ),
          React.createElement(
            "li",
            { className: "add-category-div-item", id: "add-category-div-descp" },
            React.createElement(
              "label",
              { className: "add-category-div-item-label" },
              "\u63CF\u8FF0"
            ),
            React.createElement("textarea", { ref: function ref(textarea) {
                _this3.descpArea = textarea;
              }, className: "add-category-div-item-textarea", id: "add-category-div-item-input-descp", value: descp, "data-title": "descp", onChange: this.valueChange })
          ),
          React.createElement(
            "li",
            { className: "add-category-div-item add-category-div-opebar" },
            React.createElement(
              "button",
              { className: "operation-button operation-button-cancel", onClick: this.addCategoryCancel },
              "\u53D6\u6D88"
            ),
            React.createElement(
              "button",
              { className: "operation-button operation-button-confirm", onClick: this.addCategoryConfirm },
              "\u6DFB\u52A0"
            )
          )
        )
      );
    }
  }]);

  return AddCategoryDiv;
}(React.Component);

var CategoryLabel = function (_React$Component3) {
  _inherits(CategoryLabel, _React$Component3);

  function CategoryLabel(props) {
    _classCallCheck(this, CategoryLabel);

    return _possibleConstructorReturn(this, (CategoryLabel.__proto__ || Object.getPrototypeOf(CategoryLabel)).call(this, props));
  }

  _createClass(CategoryLabel, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        { className: "content-row-label category-row-label" },
        React.createElement(
          "th",
          { className: "category-row-index-label" },
          "\u5E8F\u53F7"
        ),
        React.createElement(
          "th",
          { className: "category-row-name-label" },
          "\u540D\u79F0"
        ),
        React.createElement(
          "th",
          { className: "category-row-parent-label" },
          "\u7236\u8282\u70B9"
        ),
        React.createElement(
          "th",
          { className: "category-row-descp-label" },
          "\u63CF\u8FF0"
        ),
        React.createElement(
          "th",
          { className: "category-row-order-label" },
          "\u987A\u5E8F"
        ),
        React.createElement(
          "th",
          { className: "category-row-articlecnt-label" },
          "\u6587\u7AE0\u6570"
        ),
        React.createElement(
          "th",
          { className: "content-row-operation-label category-row-operation-label" },
          "\u64CD\u4F5C"
        )
      );
    }
  }]);

  return CategoryLabel;
}(React.Component);

var CategoryRow = function (_React$Component4) {
  _inherits(CategoryRow, _React$Component4);

  function CategoryRow(props) {
    _classCallCheck(this, CategoryRow);

    var _this5 = _possibleConstructorReturn(this, (CategoryRow.__proto__ || Object.getPrototypeOf(CategoryRow)).call(this, props));

    _this5.categoryOperationClick = _this5.categoryOperationClick.bind(_this5);
    _this5.categoryOrderChange = _this5.categoryOrderChange.bind(_this5);
    _this5.categoryOrderKeyDown = _this5.categoryOrderKeyDown.bind(_this5);
    return _this5;
  }

  _createClass(CategoryRow, [{
    key: "categoryOperationClick",
    value: function categoryOperationClick(e) {
      var type = e.target.getAttribute('data-type');
      var id = e.target.parentNode.getAttribute('data-id');
      if (type == 'modify') {
        this.props.modify(true, 'modify', this.props.category);
      } else if (type == 'delete') {
        this.props.delete(id);
      }
    }
  }, {
    key: "categoryOrderChange",
    value: function categoryOrderChange(e) {
      var id = this.props.category.id;
      var order = e.target.value;
      this.props.handleCategoryOrderChange(id, order);
    }
  }, {
    key: "categoryOrderKeyDown",
    value: function categoryOrderKeyDown(e) {
      if (e.which == 13) {
        var id = this.props.category.id;
        var order = e.target.value;
        this.props.updateCategoryOrder(id, order);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var category = this.props.category;
      var operationUl = React.createElement(
        "ul",
        { className: "article-operation-ul", "data-id": this.props.category.id },
        React.createElement(
          "li",
          { "data-type": "modify", onClick: this.categoryOperationClick },
          "\u4FEE\u6539"
        ),
        React.createElement(
          "li",
          { "data-type": "delete", onClick: this.categoryOperationClick },
          "\u5220\u9664"
        ),
        React.createElement(
          "li",
          { "data-type": "refact" },
          React.createElement(
            "a",
            { href: '/admin/categories/refact/' + category.id },
            "\u91CD\u6784"
          )
        )
      );
      return React.createElement(
        "tr",
        { className: "content-row-data category-row-data" },
        React.createElement(
          "td",
          { className: "category-row-index-data" },
          category.id
        ),
        React.createElement(
          "td",
          { className: "category-row-name-data" },
          React.createElement(
            "a",
            { href: '/articles/category/' + category.id },
            category.name
          )
        ),
        React.createElement(
          "td",
          { className: "category-row-parent-data" },
          category.parent
        ),
        React.createElement(
          "td",
          { className: "category-row-descp-data" },
          category.descp
        ),
        React.createElement(
          "td",
          { className: "category-row-order-data" },
          React.createElement("input", { type: "number", value: category.mainorder, onChange: this.categoryOrderChange, onKeyDown: this.categoryOrderKeyDown })
        ),
        React.createElement(
          "td",
          { className: "category-row-articlecnt-data" },
          category.articlecnt
        ),
        React.createElement(
          "td",
          { className: "content-row-operation-data" },
          operationUl
        )
      );
    }
  }]);

  return CategoryRow;
}(React.Component);

var CategoryTable = function (_React$Component5) {
  _inherits(CategoryTable, _React$Component5);

  function CategoryTable(props) {
    _classCallCheck(this, CategoryTable);

    return _possibleConstructorReturn(this, (CategoryTable.__proto__ || Object.getPrototypeOf(CategoryTable)).call(this, props));
  }

  _createClass(CategoryTable, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var categories = this.props.categories.map(function (category) {
        return React.createElement(CategoryRow, { category: category, modify: _this7.props.modify, "delete": _this7.props.delete, handleCategoryOrderChange: _this7.props.handleCategoryOrderChange, updateCategoryOrder: _this7.props.updateCategoryOrder });
      });
      return React.createElement(
        "table",
        { className: "content-table category-content-table" },
        React.createElement(
          "thead",
          null,
          React.createElement(CategoryLabel, null)
        ),
        React.createElement(
          "tbody",
          null,
          categories
        ),
        React.createElement("tfoot", null)
      );
    }
  }]);

  return CategoryTable;
}(React.Component);

var CategoryLayout = function (_React$Component6) {
  _inherits(CategoryLayout, _React$Component6);

  function CategoryLayout(props) {
    _classCallCheck(this, CategoryLayout);

    var _this8 = _possibleConstructorReturn(this, (CategoryLayout.__proto__ || Object.getPrototypeOf(CategoryLayout)).call(this, props));

    _this8.state = {
      categories: [],
      addVisible: false,
      addType: 'add',
      addData: {},

      delVisible: false
    };
    _this8.addTitle = {
      add: '添加类别',
      modify: '修改类别'
    };
    _this8.addCategoryDivStateChange = _this8.addCategoryDivStateChange.bind(_this8);
    _this8.addCategoryDivValueChange = _this8.addCategoryDivValueChange.bind(_this8);
    _this8.addCategoryDivConfirm = _this8.addCategoryDivConfirm.bind(_this8);
    _this8.addCategoryDivCancel = _this8.addCategoryDivCancel.bind(_this8);
    _this8.handleDeleteClick = _this8.handleDeleteClick.bind(_this8);
    _this8.deleteCategoryConfirm = _this8.deleteCategoryConfirm.bind(_this8);
    _this8.deleteCategoryCancel = _this8.deleteCategoryCancel.bind(_this8);
    // category order
    _this8.handleCategoryOrderChange = _this8.handleCategoryOrderChange.bind(_this8);
    _this8.updateCategoryOrder = _this8.updateCategoryOrder.bind(_this8);

    _this8.fetchCategoryDatas = _this8.fetchCategoryDatas.bind(_this8);
    _this8.fetchCategoryDatas();
    return _this8;
  }

  _createClass(CategoryLayout, [{
    key: "addCategoryDivStateChange",
    value: function addCategoryDivStateChange(visible) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.state.addType;
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      this.setState({
        addVisible: visible,
        addType: type,
        addData: data
      });
    }
  }, {
    key: "addCategoryDivConfirm",
    value: function addCategoryDivConfirm(data) {
      var url = '';
      if (this.state.addType == 'add') {
        url = '/admin/datas/categories/add';
      } else if (this.props.addType = 'modify') {
        url = '/admin/datas/categories/modify';
        data.id = this.state.addData.id;
      }
      var that = this;
      $.ajax({
        url: url,
        data: data,
        type: 'post',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.addCategoryDivStateChange(false);
            that.fetchCategoryDatas();
          }
        }
      });
    }
  }, {
    key: "addCategoryDivCancel",
    value: function addCategoryDivCancel() {
      this.addCategoryDivStateChange(false);
    }
  }, {
    key: "addCategoryDivValueChange",
    value: function addCategoryDivValueChange(data) {
      this.setState({
        addData: data
      });
    }
  }, {
    key: "deleteCategoryConfirm",
    value: function deleteCategoryConfirm() {
      var that = this;
      $.ajax({
        url: '/admin/datas/categories/delete',
        data: { id: that.state.delCategoryId },
        type: 'post',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.setState({
              delVisible: false,
              delCategoryId: -1
            });
            that.fetchCategoryDatas();
          }
        }
      });
    }
  }, {
    key: "deleteCategoryCancel",
    value: function deleteCategoryCancel() {
      this.setState({
        delVisible: false
      });
    }
  }, {
    key: "handleDeleteClick",
    value: function handleDeleteClick(id) {
      this.setState({
        delVisible: true,
        delCategoryId: id
      });
    }
  }, {
    key: "handleCategoryOrderChange",
    value: function handleCategoryOrderChange(id, order) {
      var categories = this.state.categories;
      for (var i in categories) {
        if (categories[i].id == id) {
          categories[i].mainorder = order;
          this.setState({
            categories: categories
          });
          break;
        }
      }
    }
  }, {
    key: "updateCategoryOrder",
    value: function updateCategoryOrder(id, order) {
      var that = this;
      $.ajax({
        url: '/admin/datas/categories/modify',
        data: { id: id, order: order },
        type: 'post',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.fetchCategoryDatas();
          }
        }
      });
    }
  }, {
    key: "fetchCategoryDatas",
    value: function fetchCategoryDatas() {
      var that = this;
      $.ajax({
        url: '/admin/datas/categories/get',
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            localStorage.setItem('categories', JSON.stringify(dt.data));
            that.setState({
              categories: dt.data
            });
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var categories = this.state.categories;
      var addType = this.state.addType;
      return React.createElement(
        "div",
        null,
        React.createElement(OperationBar, { addNewCategory: this.addCategoryDivStateChange }),
        React.createElement(CategoryTable, { categories: categories, fetchCategoryDatas: this.fetchCategoryDatas, modify: this.addCategoryDivStateChange, "delete": this.handleDeleteClick, handleCategoryOrderChange: this.handleCategoryOrderChange, updateCategoryOrder: this.updateCategoryOrder }),
        React.createElement(AddCategoryDiv, { type: addType, title: this.addTitle[addType], data: this.state.addData, categories: categories, visible: this.state.addVisible, confirm: this.addCategoryDivConfirm, cancel: this.addCategoryDivCancel, valueChange: this.addCategoryDivValueChange }),
        React.createElement(ConfirmDialog, { title: "\u786E\u8BA4\u5220\u9664\u6B64\u7C7B\u522B?", visible: this.state.delVisible, confirm: this.deleteCategoryConfirm, cancel: this.deleteCategoryCancel })
      );
    }
  }]);

  return CategoryLayout;
}(React.Component);

module.exports = CategoryLayout;

},{"./components/confirm_dialog.js":1,"./components/table_foot_nav.js":4}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DetailArea = function (_React$Component) {
  _inherits(DetailArea, _React$Component);

  function DetailArea(props) {
    _classCallCheck(this, DetailArea);

    var _this = _possibleConstructorReturn(this, (DetailArea.__proto__ || Object.getPrototypeOf(DetailArea)).call(this, props));

    _this.articleOrderChange = _this.articleOrderChange.bind(_this);
    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    _this.prefaceButtonClicked = _this.prefaceButtonClicked.bind(_this);
    return _this;
  }

  _createClass(DetailArea, [{
    key: 'articleOrderChange',
    value: function articleOrderChange(e) {
      this.props.orderChange(e.target.value);
    }
  }, {
    key: 'prefaceButtonClicked',
    value: function prefaceButtonClicked(e) {
      var type = e.target.getAttribute('data-type');
      var isSet = type == 'set';
      this.props.prefaceChange(this.props.data.id, isSet);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      if (e.which == 13) {
        this.props.orderChange(e.target.value, true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var data = this.props.data;
      if (data.id) {
        var opeArea;
        if (data.type == 'dir') {
          opeArea = React.createElement(
            'div',
            { id: 'refact-detail-ope-area' },
            React.createElement(
              'button',
              { id: 'refact-detail-ope-button', className: 'operation-button operation-button-confirm', 'data-type': 'cancel', onClick: this.prefaceButtonClicked },
              '\u53D6\u6D88\u5E8F\u8A00'
            )
          );
        } else {
          opeArea = React.createElement(
            'div',
            { id: 'refact-detail-ope-area' },
            React.createElement(
              'button',
              { id: 'refact-detail-ope-button', className: 'operation-button operation-button-confirm', 'data-type': 'set', onClick: this.prefaceButtonClicked },
              '\u8BBE\u4E3A\u5E8F\u8A00'
            ),
            React.createElement(
              'label',
              { id: 'refact-detail-ope-order-label' },
              '\u5C55\u793A\u987A\u5E8F'
            ),
            React.createElement('input', { id: 'refact-detail-ope-order-input', type: 'number', value: data.suborder, onChange: this.articleOrderChange, onKeyDown: this.handleKeyDown })
          );
        }
        return React.createElement(
          'div',
          { id: 'refact-detail-area' },
          React.createElement(
            'div',
            { id: 'refact-article-brief-area' },
            React.createElement(
              'h1',
              { id: 'refact-article-brief-area-title' },
              data.title
            ),
            React.createElement(
              'div',
              { id: 'refact-article-brief-area-descp' },
              data.descp
            )
          ),
          opeArea
        );
      } else {
        return React.createElement('div', { id: 'refact-detail-area' });
      }
    }
  }]);

  return DetailArea;
}(React.Component);

var ArticleItemLi = function (_React$Component2) {
  _inherits(ArticleItemLi, _React$Component2);

  function ArticleItemLi(props) {
    _classCallCheck(this, ArticleItemLi);

    var _this2 = _possibleConstructorReturn(this, (ArticleItemLi.__proto__ || Object.getPrototypeOf(ArticleItemLi)).call(this, props));

    _this2.onItemClicked = _this2.onItemClicked.bind(_this2);
    return _this2;
  }

  _createClass(ArticleItemLi, [{
    key: 'onItemClicked',
    value: function onItemClicked(e) {
      var article = this.props.article;
      this.props.click('art', article.id, this.props.cid);
    }
  }, {
    key: 'render',
    value: function render() {
      var depth = this.props.depth;
      var styles = {
        'padding-left': depth * 20 + 20 + 'px'
      };
      var article = this.props.article;
      var articleClass = 'category-tree-article-li';
      if (article.id == this.props.articleId) {
        articleClass += ' category-tree-article-li-current';
      }
      return React.createElement(
        'li',
        { className: articleClass, style: styles, onClick: this.onItemClicked },
        article.title
      );
    }
  }]);

  return ArticleItemLi;
}(React.Component);

var CategoryItemLi = function (_React$Component3) {
  _inherits(CategoryItemLi, _React$Component3);

  function CategoryItemLi(props) {
    _classCallCheck(this, CategoryItemLi);

    var _this3 = _possibleConstructorReturn(this, (CategoryItemLi.__proto__ || Object.getPrototypeOf(CategoryItemLi)).call(this, props));

    _this3.expandChange = _this3.expandChange.bind(_this3);
    _this3.handleCategoryClick = _this3.handleCategoryClick.bind(_this3);
    return _this3;
  }

  _createClass(CategoryItemLi, [{
    key: 'handleCategoryClick',
    value: function handleCategoryClick(e) {
      var target = e.target;
      this.props.click('dir', this.props.category.id, this.props.category.id);
    }
  }, {
    key: 'expandChange',
    value: function expandChange(e) {
      this.props.expandChange(this.props.category.id);
      e.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var depth = this.props.depth;
      var styles = {
        'padding-left': depth * 20 + 20 + 'px'
      };
      var category = this.props.category;
      var content = category.childs.map(function (child) {
        if (child.type == 'art') {
          return React.createElement(ArticleItemLi, { article: child, cid: category.id, articleId: _this4.props.articleId, depth: depth + 1, click: _this4.props.click });
        } else {
          return React.createElement(CategoryItemLi, { category: child, categoryId: _this4.props.categoryId, articleId: _this4.props.articleId, cstate: _this4.props.cstate, depth: depth + 1, click: _this4.props.click, expandChange: _this4.props.expandChange });
        }
      });
      var titleClass = 'category-tree-category-title';
      if (category.id == this.props.categoryId) {
        titleClass += ' category-tree-category-title-current';
      }
      var articlesUlStyle = {};
      var titleImage = '/images/icons/ic_expand_more_white_24dp_2x.png';
      if (this.props.cstate[category.id] === false) {
        articlesUlStyle.display = 'none';
        titleImage = '/images/icons/ic_expand_less_white_24dp_2x.png';
      }
      return React.createElement(
        'li',
        { className: 'category-tree-category-li' },
        React.createElement(
          'div',
          { className: 'category-tree-category-title-div' },
          React.createElement(
            'span',
            { className: titleClass, onClick: this.handleCategoryClick, style: styles },
            category.title
          ),
          React.createElement('img', { className: 'category-tree-category-title-img', src: titleImage, onClick: this.expandChange })
        ),
        React.createElement(
          'ul',
          { className: 'category-tree-category-ul', style: articlesUlStyle },
          content
        )
      );
    }
  }]);

  return CategoryItemLi;
}(React.Component);

var CategoryTree = function (_React$Component4) {
  _inherits(CategoryTree, _React$Component4);

  function CategoryTree(props) {
    _classCallCheck(this, CategoryTree);

    return _possibleConstructorReturn(this, (CategoryTree.__proto__ || Object.getPrototypeOf(CategoryTree)).call(this, props));
  }

  _createClass(CategoryTree, [{
    key: 'render',
    value: function render() {
      var tree = this.props.tree;
      if (tree.length) {
        return React.createElement(
          'div',
          { id: 'refact-tree-area' },
          React.createElement(
            'ul',
            { className: 'category-tree-category-ul' },
            React.createElement(CategoryItemLi, { category: this.props.tree[0], categoryId: this.props.categoryId, articleId: this.props.articleId, cstate: this.props.cstate, depth: 0, click: this.props.click, expandChange: this.props.expandChange })
          )
        );
      } else {
        return React.createElement(
          'div',
          null,
          'EMPTY'
        );
      }
    }
  }]);

  return CategoryTree;
}(React.Component);

var CategoryRefactArea = function (_React$Component5) {
  _inherits(CategoryRefactArea, _React$Component5);

  function CategoryRefactArea(props) {
    _classCallCheck(this, CategoryRefactArea);

    var _this6 = _possibleConstructorReturn(this, (CategoryRefactArea.__proto__ || Object.getPrototypeOf(CategoryRefactArea)).call(this, props));

    var cid = Number(location.pathname.match(/\/admin\/categories\/refact\/(\d+)/)[1]);
    _this6.state = {
      cid: cid,
      tree: [],
      detail: {},
      category: -1,
      article: -1,
      cstate: {} //categoryExpandState
    };
    _this6.articleOrderChange = _this6.articleOrderChange.bind(_this6);
    _this6.categoryPrefaceChange = _this6.categoryPrefaceChange.bind(_this6);
    _this6.categoryExpandChange = _this6.categoryExpandChange.bind(_this6);
    _this6.__getReactDetail = _this6.__getReactDetail.bind(_this6);
    _this6.getReactDetail = _this6.getReactDetail.bind(_this6);
    _this6.getCategoryTree = _this6.getCategoryTree.bind(_this6);
    _this6.getCategoryTree();
    return _this6;
  }

  _createClass(CategoryRefactArea, [{
    key: 'articleOrderChange',
    value: function articleOrderChange(newOrder) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var that = this;
      var id = this.state.detail.id;
      if (update) {
        $.ajax({
          url: '/admin/datas/articles/order',
          data: { id: id, order: newOrder },
          type: 'get',
          dataType: 'json',
          success: function success(dt) {
            if (dt.code == 0) {
              that.getCategoryTree();
            }
          }
        });
      } else {
        var detail = this.state.detail;
        detail.suborder = newOrder;
        this.setState({
          detail: detail
        });
      }
    }
  }, {
    key: 'categoryPrefaceChange',
    value: function categoryPrefaceChange(id) {
      var isSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var that = this;
      var detail = this.state.detail;
      var data = {
        category: this.state.category,
        preface: id,
        isSet: isSet
      };
      $.ajax({
        url: '/admin/datas/categories/preface',
        data: data,
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.getCategoryTree();
          }
        }
      });
    }
  }, {
    key: 'categoryExpandChange',
    value: function categoryExpandChange(id) {
      var cstate = this.state.cstate;
      cstate[id] = cstate[id] === false;
      this.setState({
        cstate: cstate
      });
    }
  }, {
    key: 'getCategoryTree',
    value: function getCategoryTree() {
      var that = this;
      var cid = this.state.cid;
      $.ajax({
        url: '/admin/datas/categories/tree',
        data: { id: cid },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            var data = dt.data;
            var root = data[0];
            var tid = that.state.category == -1 ? root.id : that.state.category;
            that.setState({
              tree: data
            });
            that.__getReactDetail('dir', tid, function (dt1) {
              var detail = dt1.code == 0 ? dt1.data : {};
              that.setState({
                detail: detail,
                category: tid
              });
            });
          }
        }
      });
    }
  }, {
    key: 'getReactDetail',
    value: function getReactDetail(type, id, cid) {
      var that = this;
      cid = type == 'dir' ? id : cid;
      this.__getReactDetail(type, id, function (dt) {
        var detail = dt.code == 0 ? dt.data : {};
        var aid = type === 'art' && detail.id ? detail.id : -1;
        that.setState({
          detail: detail,
          category: cid,
          article: aid
        });
      });
    }
  }, {
    key: '__getReactDetail',
    value: function __getReactDetail(type, id, cb) {
      $.ajax({
        url: '/admin/datas/categories/refact/get',
        data: { type: type, id: id },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          cb(dt);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'refact-area' },
        React.createElement(CategoryTree, { tree: this.state.tree, category: this.state.category, categoryId: this.state.category, articleId: this.state.article, cstate: this.state.cstate, click: this.getReactDetail, expandChange: this.categoryExpandChange }),
        React.createElement(DetailArea, { data: this.state.detail, orderChange: this.articleOrderChange, prefaceChange: this.categoryPrefaceChange })
      );
    }
  }]);

  return CategoryRefactArea;
}(React.Component);

module.exports = CategoryRefactArea;

},{}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableNavLink = require("./components/table_foot_nav.js");
// 这个扩展是从网上复制过来的
Date.prototype.format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }return fmt;
};

var LabelTableLabel = function (_React$Component) {
  _inherits(LabelTableLabel, _React$Component);

  function LabelTableLabel(props) {
    _classCallCheck(this, LabelTableLabel);

    var _this = _possibleConstructorReturn(this, (LabelTableLabel.__proto__ || Object.getPrototypeOf(LabelTableLabel)).call(this, props));

    _this.orderState = {
      asc: {
        label: 'asc',
        imgsrc: '/images/icons/ic_arrow_drop_down_white_24dp_2x.png'
      },
      desc: {
        label: 'desc',
        imgsrc: '/images/icons/ic_arrow_drop_up_white_24dp_2x.png'
      }
    };
    _this.handleOrderImgClick = _this.handleOrderImgClick.bind(_this);
    return _this;
  }

  _createClass(LabelTableLabel, [{
    key: "handleOrderImgClick",
    value: function handleOrderImgClick(e) {
      var orderby = e.target.getAttribute('data-label');
      var orderDirect = this.props.orderDirect == this.orderState.asc.label ? this.orderState.desc.label : this.orderState.asc.label;
      this.props.orderChange(orderby, orderDirect);
    }
  }, {
    key: "render",
    value: function render() {
      var targetsrc, othersrc;
      if (this.props.orderDirect == this.orderState.asc.label) {
        targetsrc = this.orderState.asc.imgsrc;
      } else {
        targetsrc = this.orderState.desc.imgsrc;
      }
      othersrc = this.orderState.asc.imgsrc;
      return React.createElement(
        "tr",
        { className: "content-row-label" },
        React.createElement(
          "th",
          { className: "content-row-index-label label-row-index-label" },
          "\u5E8F\u53F7",
          React.createElement("img", { className: "label-row-hotmark-order-img", src: this.props.orderby == 'id' ? targetsrc : othersrc, "data-label": "id", onClick: this.handleOrderImgClick })
        ),
        React.createElement(
          "th",
          { className: "content-row-title-label label-row-title-label" },
          "\u6807\u9898"
        ),
        React.createElement(
          "th",
          { className: "content-row-article-count-label label-row-articlecnt-label" },
          "\u6587\u7AE0\u6570",
          React.createElement("img", { className: "label-row-hotmark-order-img", src: this.props.orderby == 'id' ? targetsrc : othersrc, "data-label": "articles", onClick: this.handleOrderImgClick })
        ),
        React.createElement(
          "th",
          { className: "content-row-hotmark-label label-row-hotmark-label" },
          "\u70ED\u5EA6",
          React.createElement("img", { className: "label-row-hotmark-order-img", src: this.props.orderby == 'hotmark' ? targetsrc : othersrc, "data-label": "hotmark", onClick: this.handleOrderImgClick })
        ),
        React.createElement(
          "th",
          { className: "content-row-addtime-label label-row-addtime-label" },
          "\u6DFB\u52A0\u65E5\u671F"
        )
      );
    }
  }]);

  return LabelTableLabel;
}(React.Component);

var LabelRow = function (_React$Component2) {
  _inherits(LabelRow, _React$Component2);

  function LabelRow(props) {
    _classCallCheck(this, LabelRow);

    return _possibleConstructorReturn(this, (LabelRow.__proto__ || Object.getPrototypeOf(LabelRow)).call(this, props));
  }

  _createClass(LabelRow, [{
    key: "render",
    value: function render() {
      var label = this.props.label;
      var addtime = new Date(label.addtime * 1000).format('yyyy-MM-dd');
      return React.createElement(
        "tr",
        { className: "content-row-data" },
        React.createElement(
          "td",
          { className: "content-row-index-data" },
          label.id
        ),
        React.createElement(
          "td",
          { className: "content-row-title-data label-row-title-data" },
          React.createElement(
            "a",
            { href: '/articles/search?args=' + label.name },
            label.name
          )
        ),
        React.createElement(
          "td",
          { className: "content-row-article-count-data" },
          label.articles
        ),
        React.createElement(
          "td",
          { className: "content-row-hotmark-data" },
          label.hotmark
        ),
        React.createElement(
          "td",
          { className: "content-row-addtime-data" },
          addtime
        )
      );
    }
  }]);

  return LabelRow;
}(React.Component);

var LabelTable = function (_React$Component3) {
  _inherits(LabelTable, _React$Component3);

  function LabelTable(props) {
    _classCallCheck(this, LabelTable);

    return _possibleConstructorReturn(this, (LabelTable.__proto__ || Object.getPrototypeOf(LabelTable)).call(this, props));
  }

  _createClass(LabelTable, [{
    key: "render",
    value: function render() {
      var labels = this.props.labels.map(function (label) {
        return React.createElement(LabelRow, { label: label });
      });
      return React.createElement(
        "table",
        { className: "content-table" },
        React.createElement(
          "thead",
          null,
          React.createElement(LabelTableLabel, { orderby: this.props.orderby, orderDirect: this.props.orderDirect, orderChange: this.props.orderChange })
        ),
        React.createElement(
          "tbody",
          null,
          labels
        ),
        React.createElement("tfoot", null)
      );
    }
  }]);

  return LabelTable;
}(React.Component);

var LabelLayout = function (_React$Component4) {
  _inherits(LabelLayout, _React$Component4);

  function LabelLayout(props) {
    _classCallCheck(this, LabelLayout);

    var _this4 = _possibleConstructorReturn(this, (LabelLayout.__proto__ || Object.getPrototypeOf(LabelLayout)).call(this, props));

    _this4.state = {
      current: 0,
      total: 0,
      orderby: 'id',
      orderDirect: 'asc',
      labels: []
    };
    _this4.filter = { start: 0 };
    _this4.handleOrderChange = _this4.handleOrderChange.bind(_this4);
    _this4.handlePageChange = _this4.handlePageChange.bind(_this4);
    _this4.fetchLabelData = _this4.fetchLabelData.bind(_this4);
    _this4.fetchLabelData(_this4.state.orderby, _this4.state.orderDirect);
    return _this4;
  }

  _createClass(LabelLayout, [{
    key: "handlePageChange",
    value: function handlePageChange(i) {
      this.filter.start = i;
      this.fetchLabelData();
    }
  }, {
    key: "handleOrderChange",
    value: function handleOrderChange(orderby, orderDirect) {
      this.filter.start = 0;
      this.fetchLabelData(orderby, orderDirect);
    }
  }, {
    key: "fetchLabelData",
    value: function fetchLabelData(orderby, orderDirect) {
      var that = this;
      var data = {
        start: this.filter.start,
        orderby: orderby,
        asc: orderDirect
      };
      $.ajax({
        url: '/admin/datas/labels/get',
        data: data,
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            var returnData = dt.data;
            that.setState({
              current: returnData.current,
              total: returnData.total,
              orderby: orderby,
              orderDirect: orderDirect,
              labels: returnData.data
            });
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "label-table-div" },
        React.createElement(LabelTable, { labels: this.state.labels, orderby: this.state.orderby, orderDirect: this.state.orderDirect, orderChange: this.handleOrderChange }),
        React.createElement(TableNavLink, { page: this.state.current, total: this.state.total, pagechange: this.handlePageChange })
      );
    }
  }]);

  return LabelLayout;
}(React.Component);

module.exports = LabelLayout;

},{"./components/table_foot_nav.js":4}],10:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfirmDialog = require("./components/confirm_dialog.js");
var InputDialog = require("./components/input_dialog.js");
var OptionDialog = require("./components/option_dialog.js");
var TableNavLink = require("./components/table_foot_nav.js");

var PhotoFlowOperationBar = function (_React$Component) {
  _inherits(PhotoFlowOperationBar, _React$Component);

  function PhotoFlowOperationBar(props) {
    _classCallCheck(this, PhotoFlowOperationBar);

    var _this = _possibleConstructorReturn(this, (PhotoFlowOperationBar.__proto__ || Object.getPrototypeOf(PhotoFlowOperationBar)).call(this, props));

    _this.state = {
      moveVisible: false,
      delVisible: false
    };
    _this.handleUploadButtonClick = _this.handleUploadButtonClick.bind(_this);
    _this.handleUploadInputChange = _this.handleUploadInputChange.bind(_this);

    // Dialog Visibility
    _this.hideMoveDialog = _this.hideMoveDialog.bind(_this);
    _this.hideDelDialog = _this.hideDelDialog.bind(_this);
    // MoveDialog
    _this.handleMoveConfirm = _this.handleMoveConfirm.bind(_this);
    _this.handleMoveCancel = _this.handleMoveCancel.bind(_this);
    // DeleteDialog
    _this.handleDelConfirm = _this.handleDelConfirm.bind(_this);
    _this.handleDelCancel = _this.handleDelCancel.bind(_this);
    // button action
    _this.moveButtonClick = _this.moveButtonClick.bind(_this);
    _this.delButtonClick = _this.delButtonClick.bind(_this);
    // all-check
    _this.handleAllCheckChanged = _this.handleAllCheckChanged.bind(_this);
    return _this;
  }

  _createClass(PhotoFlowOperationBar, [{
    key: "handleUploadButtonClick",
    value: function handleUploadButtonClick(e) {
      var input = this.uploadInput;
      input.click();
    }
  }, {
    key: "handleUploadInputChange",
    value: function handleUploadInputChange(e) {
      this.props.handleUploadInputChange(e);
    }
  }, {
    key: "hideMoveDialog",
    value: function hideMoveDialog() {
      this.setState({
        moveVisible: false
      });
    }
  }, {
    key: "hideDelDialog",
    value: function hideDelDialog() {
      this.setState({
        delVisible: false
      });
    }
  }, {
    key: "handleMoveConfirm",
    value: function handleMoveConfirm(new_gid) {
      this.props.handleMoveChecked(new_gid);
      this.hideMoveDialog();
    }
  }, {
    key: "handleMoveCancel",
    value: function handleMoveCancel() {
      this.hideMoveDialog();
    }
  }, {
    key: "handleDelConfirm",
    value: function handleDelConfirm() {
      this.props.handleDeleteChecked();
      this.hideDelDialog();
    }
  }, {
    key: "handleDelCancel",
    value: function handleDelCancel() {
      this.hideDelDialog();
    }
  }, {
    key: "moveButtonClick",
    value: function moveButtonClick() {
      this.setState({
        moveVisible: true
      });
    }
  }, {
    key: "delButtonClick",
    value: function delButtonClick() {
      this.setState({
        delVisible: true
      });
    }
  }, {
    key: "handleAllCheckChanged",
    value: function handleAllCheckChanged(e) {
      var allChecked = e.target.checked;
      this.props.handleAllCheckChanged(allChecked);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var uploadInputStyles = {
        display: 'none'
      };
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "photo-operation-bar", id: "photo-operation-bar-first" },
          React.createElement(
            "button",
            { id: "upload-image-button", className: "operation-button", onClick: this.handleUploadButtonClick },
            "\u4E0A\u4F20\u56FE\u7247"
          ),
          React.createElement("input", { ref: function ref(input) {
              _this2.uploadInput = input;
            }, id: "upload-image-input", type: "file", accept: "image/*", style: uploadInputStyles, onChange: this.handleUploadInputChange })
        ),
        React.createElement(
          "div",
          { className: "photo-operation-bar", id: "photo-operation-bar-second" },
          React.createElement("input", { type: "checkbox", onChange: this.handleAllCheckChanged }),
          React.createElement(
            "label",
            null,
            "\u5168\u9009"
          ),
          React.createElement(
            "div",
            { id: "photo-flow-opebar-move-div" },
            React.createElement(
              "button",
              { id: "photo-flow-opebar-move-button", className: "operation-button operation-button-confirm", onClick: this.moveButtonClick },
              "\u79FB\u52A8\u5206\u7EC4"
            ),
            React.createElement(OptionDialog, { title: "\u79FB\u52A8\u5206\u7EC4", optionItems: this.props.groups, centerScreen: false, confirm: this.handleMoveConfirm, cancel: this.handleMoveCancel, visible: this.state.moveVisible })
          ),
          React.createElement(
            "div",
            { id: "photo-flow-opebar-del-div" },
            React.createElement(
              "button",
              { id: "photo-flow-opebar-del-button", className: "operation-button operation-button-cancel", onClick: this.delButtonClick },
              "\u5220\u9664"
            ),
            React.createElement(ConfirmDialog, { title: "\u786E\u8BA4\u5220\u9664?", centerScreen: false, confirm: this.handleDelConfirm, cancel: this.handleDelCancel, visible: this.state.delVisible })
          )
        )
      );
    }
  }]);

  return PhotoFlowOperationBar;
}(React.Component);

var PhotoItem = function (_React$Component2) {
  _inherits(PhotoItem, _React$Component2);

  function PhotoItem(props) {
    _classCallCheck(this, PhotoItem);

    var _this3 = _possibleConstructorReturn(this, (PhotoItem.__proto__ || Object.getPrototypeOf(PhotoItem)).call(this, props));

    _this3.state = {
      // config for InputDialog (edit)
      inputVisible: false,
      // config for MoveDialog 
      moveVisible: false,
      // config for DelDialog
      delVisible: false
    };
    _this3.handlePhotoCheck = _this3.handlePhotoCheck.bind(_this3);
    //Dialog Visibility
    _this3.showInputDialog = _this3.showInputDialog.bind(_this3);
    _this3.hideInputDialog = _this3.hideInputDialog.bind(_this3);
    _this3.showMoveDialog = _this3.showMoveDialog.bind(_this3);
    _this3.hideMoveDialog = _this3.hideMoveDialog.bind(_this3);
    _this3.showDelDialog = _this3.showDelDialog.bind(_this3);
    _this3.hideDelDialog = _this3.hideDelDialog.bind(_this3);
    // InputDialog
    _this3.handleInputConfirm = _this3.handleInputConfirm.bind(_this3);
    _this3.handleInputCancel = _this3.handleInputCancel.bind(_this3);
    // MoveDialog
    _this3.handleMoveConfirm = _this3.handleMoveConfirm.bind(_this3);
    _this3.handleMoveCancel = _this3.handleMoveCancel.bind(_this3);
    // DeleteDialog
    _this3.handleDelConfirm = _this3.handleDelConfirm.bind(_this3);
    _this3.handleDelCancel = _this3.handleDelCancel.bind(_this3);
    _this3.photoOnLoad = _this3.photoOnLoad.bind(_this3);
    return _this3;
  }

  _createClass(PhotoItem, [{
    key: "handlePhotoCheck",
    value: function handlePhotoCheck(e) {
      this.props.handleCheckChange(e.target.value, e.target.checked);
    }
  }, {
    key: "showInputDialog",
    value: function showInputDialog(e) {
      this.setState({
        inputVisible: true
      });
    }
  }, {
    key: "hideInputDialog",
    value: function hideInputDialog(e) {
      this.setState({
        inputVisible: false
      });
    }
  }, {
    key: "showMoveDialog",
    value: function showMoveDialog(e) {
      this.setState({
        moveVisible: true
      });
    }
  }, {
    key: "showDelDialog",
    value: function showDelDialog(e) {
      this.setState({
        delVisible: true
      });
    }
  }, {
    key: "hideDelDialog",
    value: function hideDelDialog(e) {
      this.setState({
        delVisible: false
      });
    }
  }, {
    key: "hideMoveDialog",
    value: function hideMoveDialog(e) {
      this.setState({
        moveVisible: false
      });
    }
  }, {
    key: "handleInputConfirm",
    value: function handleInputConfirm(name) {
      this.props.rename(this.props.photo.id, name);
      this.hideInputDialog();
    }
  }, {
    key: "handleInputCancel",
    value: function handleInputCancel() {
      this.hideInputDialog();
    }
  }, {
    key: "handleMoveConfirm",
    value: function handleMoveConfirm(new_gid) {
      this.props.movegroup(this.props.photo.id, new_gid);
      this.hideMoveDialog();
    }
  }, {
    key: "handleMoveCancel",
    value: function handleMoveCancel() {
      this.hideMoveDialog();
    }
  }, {
    key: "handleDelConfirm",
    value: function handleDelConfirm() {
      this.props.delphoto(this.props.photo.id);
      this.hideDelDialog();
    }
  }, {
    key: "handleDelCancel",
    value: function handleDelCancel() {
      this.hideDelDialog();
    }
  }, {
    key: "photoOnLoad",
    value: function photoOnLoad(e) {
      var img = e.target;
      var a = new Image();
      a.src = img.src;
      var sw = a.width;
      var sh = a.height;
      var min = sw < sh ? sw : sh;
      var scale = min / 200;
      var nw = sw / scale;
      var nh = sh / scale;
      img.style.width = nw + 'px';
      img.style.height = nh + 'px';
    }
  }, {
    key: "render",
    value: function render() {
      var photoSrc = '/images/blog/' + this.props.photo.name;
      var checked = this.props.checked ? "checked" : "";
      return React.createElement(
        "li",
        { className: "photo-flow-item-li" },
        React.createElement(
          "div",
          { className: "photo-flow-item-li-img-div" },
          React.createElement("img", { className: "photo-flow-item-li-img", src: photoSrc, onLoad: this.photoOnLoad })
        ),
        React.createElement(
          "div",
          { className: "photo-flow-item-name-div" },
          React.createElement("input", { className: "photo-flow-item-name-checkbox", type: "checkbox", value: this.props.photo.id, checked: checked, onChange: this.handlePhotoCheck }),
          React.createElement(
            "span",
            { className: "photo-flow-item-name-span" },
            this.props.photo.title
          )
        ),
        React.createElement(
          "div",
          { className: "photo-flow-item-li-ope-bar" },
          React.createElement("li", { className: "photo-flow-item-ope-img photo-flow-item-mode-edit", onClick: this.showInputDialog }),
          React.createElement("li", { className: "photo-flow-item-ope-img photo-flow-item-mode-swap", onClick: this.showMoveDialog }),
          React.createElement("li", { className: "photo-flow-item-ope-img photo-flow-item-mode-del", onClick: this.showDelDialog })
        ),
        React.createElement(InputDialog, { title: "\u7F16\u8F91\u540D\u79F0", centerScreen: false, confirm: this.handleInputConfirm, cancel: this.handleInputCancel, visible: this.state.inputVisible }),
        React.createElement(OptionDialog, { title: "\u79FB\u52A8\u5206\u7EC4", optionItems: this.props.groups, confirm: this.handleMoveConfirm, cancel: this.handleMoveCancel, visible: this.state.moveVisible, centerScreen: false }),
        React.createElement(ConfirmDialog, { title: "\u786E\u8BA4\u5220\u9664?", centerScreen: false, confirm: this.handleDelConfirm, cancel: this.handleDelCancel, visible: this.state.delVisible })
      );
    }
  }]);

  return PhotoItem;
}(React.Component);

var PhotoFlow = function (_React$Component3) {
  _inherits(PhotoFlow, _React$Component3);

  function PhotoFlow(props) {
    _classCallCheck(this, PhotoFlow);

    var _this4 = _possibleConstructorReturn(this, (PhotoFlow.__proto__ || Object.getPrototypeOf(PhotoFlow)).call(this, props));

    _this4.state = {
      photos: [],
      // 这个状态需要同步 😊 
      checkState: {},
      start: 0 };
    _this4.handleUploadInputChange = _this4.handleUploadInputChange.bind(_this4);
    _this4.handleCheckChange = _this4.handleCheckChange.bind(_this4);

    // all-check checkbox
    _this4.handleAllCheckChanged = _this4.handleAllCheckChanged.bind(_this4);
    _this4.handleDeleteChecked = _this4.handleDeleteChecked.bind(_this4);
    _this4.handleMoveChecked = _this4.handleMoveChecked.bind(_this4);

    _this4.moveGroup = _this4.moveGroup.bind(_this4);
    _this4.moveSingleGroup = _this4.moveSingleGroup.bind(_this4);
    _this4.renamePhoto = _this4.renamePhoto.bind(_this4);
    _this4.deletePhotos = _this4.deletePhotos.bind(_this4);
    _this4.deleteSinglePhoto = _this4.deleteSinglePhoto.bind(_this4);
    _this4.getSinglePhoto = _this4.getSinglePhoto.bind(_this4);
    _this4.getGroupPhotos = _this4.getGroupPhotos.bind(_this4);
    _this4.getGroupPhotos();
    return _this4;
  }

  _createClass(PhotoFlow, [{
    key: "handleAllCheckChanged",
    value: function handleAllCheckChanged(checked) {
      var checkState = this.state.checkState;
      this.state.photos.forEach(function (photo) {
        checkState[photo.id] = checked;
      });
      this.setState({
        checkState: checkState
      });
    }
  }, {
    key: "deletePhotos",
    value: function deletePhotos(ids) {
      var that = this;
      $.ajax({
        url: '/admin/datas/photos/delete',
        data: { photos: ids },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          that.props.handleRefetch();
        }
      });
    }
  }, {
    key: "deleteSinglePhoto",
    value: function deleteSinglePhoto(id) {
      this.deletePhotos([id].join(','));
    }
  }, {
    key: "handleDeleteChecked",
    value: function handleDeleteChecked() {
      var ids = [];
      for (var id in this.state.checkState) {
        if (this.state.checkState[id]) {
          ids.push(id);
        }
      }
      this.deletePhotos(ids);
    }
  }, {
    key: "moveGroup",
    value: function moveGroup(ids, new_gid) {
      var that = this;
      $.ajax({
        url: '/admin/datas/photos/move',
        data: { photos: ids, gid: new_gid },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.props.handleRefetch();
          }
        }
      });
    }
  }, {
    key: "moveSingleGroup",
    value: function moveSingleGroup(id, new_gid) {
      this.moveGroup([id].join(','), new_gid);
    }
  }, {
    key: "handleMoveChecked",
    value: function handleMoveChecked(new_gid) {
      var ids = [];
      for (var id in this.state.checkState) {
        if (this.state.checkState[id]) {
          ids.push(id);
        }
      }
      this.moveGroup(ids.join(','), new_gid);
    }

    // 上传图片

  }, {
    key: "handleUploadInputChange",
    value: function handleUploadInputChange(e) {
      var that = this;
      var input = e.target;
      var file = input.files[0];
      var fd = new FormData();
      fd.append('file', file);
      fd.append('gid', this.props.gid);
      $.ajax({
        url: '/admin/datas/photos/add',
        data: fd,
        type: 'post',
        dataType: 'json',
        success: function success(dt) {
          that.props.handleRefetch();
        },
        error: function error(err) {
          console.log('error');
        }
      });
    }
  }, {
    key: "renamePhoto",
    value: function renamePhoto(id, name) {
      var that = this;
      $.ajax({
        url: '/admin/datas/photos/rename',
        data: { id: id, title: name },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.getSinglePhoto(id);
          }
        }
      });
    }
  }, {
    key: "getSinglePhoto",
    value: function getSinglePhoto(id) {
      var that = this;
      $.ajax({
        url: '/admin/datas/photos/get',
        data: { id: id },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            var photos = that.state.photos;
            for (var index in photos) {
              if (photos[index].id == id) {
                photos[index] = dt.data[0];
                that.setState({
                  photos: photos
                });
                break;
              }
            }
          }
        }
      });
    }
    /**
     * 这里在 photo flow 中添加、移动、删除时不能更新
     */

  }, {
    key: "getGroupPhotos",
    value: function getGroupPhotos() {
      var that = this;
      // this or that 😊 在函数参数中，待查
      $.ajax({
        url: '/admin/datas/photos/get',
        data: { gid: this.props.gid },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.setState({
              photos: dt.data,
              checkState: {}
            });
          }
        }
      });
    }
  }, {
    key: "handleCheckChange",
    value: function handleCheckChange(id, checked) {
      var checkState = this.state.checkState;
      checkState[id] = checked;
      this.setState({
        checkState: checkState
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var items = this.state.photos.map(function (photo) {
        var checked = _this5.state.checkState[photo.id] ? true : false;
        return React.createElement(PhotoItem, { photo: photo, groups: _this5.props.groups, rename: _this5.renamePhoto, movegroup: _this5.moveSingleGroup, delphoto: _this5.deleteSinglePhoto, handleCheckChange: _this5.handleCheckChange, checked: checked });
      });
      return React.createElement(
        "div",
        { id: "photo-flow-div" },
        React.createElement(PhotoFlowOperationBar, { groups: this.props.groups, handleUploadInputChange: this.handleUploadInputChange, handleAllCheckChanged: this.handleAllCheckChanged, handleDeleteChecked: this.handleDeleteChecked, handleMoveChecked: this.handleMoveChecked }),
        React.createElement(
          "ul",
          { id: "photo-flow-items-ul" },
          items
        )
      );
    }
  }]);

  return PhotoFlow;
}(React.Component);

var PhotoGroupItem = function (_React$Component4) {
  _inherits(PhotoGroupItem, _React$Component4);

  function PhotoGroupItem(props) {
    _classCallCheck(this, PhotoGroupItem);

    var _this6 = _possibleConstructorReturn(this, (PhotoGroupItem.__proto__ || Object.getPrototypeOf(PhotoGroupItem)).call(this, props));

    _this6.state = {
      inputVisible: false,
      delVisible: false
    };
    // Dialog Visibility
    _this6.showInputDialog = _this6.showInputDialog.bind(_this6);
    _this6.hideInputDialog = _this6.hideInputDialog.bind(_this6);
    _this6.showDelDialog = _this6.showDelDialog.bind(_this6);
    _this6.hideDelDialog = _this6.hideDelDialog.bind(_this6);
    // Dialog action
    _this6.handleInputConfirm = _this6.handleInputConfirm.bind(_this6);
    _this6.handleInputCancel = _this6.handleInputCancel.bind(_this6);
    _this6.handleDelConfirm = _this6.handleDelConfirm.bind(_this6);
    _this6.handleDelCancel = _this6.handleDelCancel.bind(_this6);
    _this6.handleGroupItemClick = _this6.handleGroupItemClick.bind(_this6);
    // Self-Owned action
    _this6.handleDeleteGroup = _this6.handleDeleteGroup.bind(_this6);
    _this6.handleRenameGroup = _this6.handleRenameGroup.bind(_this6);
    return _this6;
  }

  _createClass(PhotoGroupItem, [{
    key: "showInputDialog",
    value: function showInputDialog() {
      this.setState({
        inputVisible: true
      });
    }
  }, {
    key: "hideInputDialog",
    value: function hideInputDialog() {
      this.setState({
        inputVisible: false
      });
    }
  }, {
    key: "showDelDialog",
    value: function showDelDialog() {
      this.setState({
        delVisible: true
      });
    }
  }, {
    key: "hideDelDialog",
    value: function hideDelDialog() {
      this.setState({
        delVisible: false
      });
    }
  }, {
    key: "handleInputConfirm",
    value: function handleInputConfirm(name) {
      var gid = this.props.group.id;
      this.props.handleRenameGroup(gid, name);
      this.hideInputDialog();
    }
  }, {
    key: "handleInputCancel",
    value: function handleInputCancel() {
      this.hideInputDialog();
    }
  }, {
    key: "handleDelConfirm",
    value: function handleDelConfirm() {
      var gid = this.props.group.id;
      this.props.handleDeleteGroup(gid);
      this.hideDelDialog();
    }
  }, {
    key: "handleDelCancel",
    value: function handleDelCancel() {
      this.hideDelDialog();
    }
  }, {
    key: "handleGroupItemClick",
    value: function handleGroupItemClick(e) {
      var gid = this.props.group.id;
      this.props.handleGroupItemClick(gid);
      e.stopPropagation();
    }
  }, {
    key: "handleDeleteGroup",
    value: function handleDeleteGroup(e) {
      this.showDelDialog();
    }
  }, {
    key: "handleRenameGroup",
    value: function handleRenameGroup(e) {
      this.showInputDialog();
      e.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var opeImgStyles = {};
      if (!this.props.opeImgVisible) {
        opeImgStyles.display = 'none';
      }
      var group = this.props.group;
      var gid = group.id;
      var classes = 'photo-group-item-li';
      if (gid == this.props.gid) classes += ' photo-group-item-li-current';
      var imgSrc = '/images/icons/ic_close_black_24dp_2x.png';
      if (gid < 2) {
        return React.createElement(
          "li",
          { className: classes },
          React.createElement(
            "span",
            { className: "photo-group-item-li-title-span", "data-gid": group.id, onClick: this.handleGroupItemClick },
            group.name,
            "(",
            group.count,
            ")"
          )
        );
      }
      return React.createElement(
        "li",
        { className: classes },
        React.createElement(
          "span",
          { className: "photo-group-item-li-title-span", onClick: this.handleGroupItemClick },
          group.name,
          "(",
          group.count,
          ")"
        ),
        React.createElement("img", { className: "photo-group-item-li-ope-img", src: "/images/icons/ic_mode_edit_black_24dp_2x.png", style: opeImgStyles, onClick: this.handleRenameGroup }),
        React.createElement("img", { className: "photo-group-item-li-ope-img", src: "/images/icons/ic_close_black_24dp_2x.png", style: opeImgStyles, onClick: this.handleDeleteGroup }),
        React.createElement(InputDialog, { title: "\u7F16\u8F91\u540D\u79F0", centerScreen: false, confirm: this.handleInputConfirm, cancel: this.handleInputCancel, visible: this.state.inputVisible }),
        React.createElement(ConfirmDialog, { title: "\u786E\u8BA4\u5220\u9664?", centerScreen: false, confirm: this.handleDelConfirm, cancel: this.handleDelCancel, visible: this.state.delVisible })
      );
    }
  }]);

  return PhotoGroupItem;
}(React.Component);

var PhotoGroupBar = function (_React$Component5) {
  _inherits(PhotoGroupBar, _React$Component5);

  function PhotoGroupBar(props) {
    _classCallCheck(this, PhotoGroupBar);

    var _this7 = _possibleConstructorReturn(this, (PhotoGroupBar.__proto__ || Object.getPrototypeOf(PhotoGroupBar)).call(this, props));

    _this7.state = {
      addVisible: false,
      opeImgVisible: false
    };
    _this7.handleConfirm = _this7.handleConfirm.bind(_this7);
    _this7.handleCancel = _this7.handleCancel.bind(_this7);
    _this7.handleGroupItemClick = _this7.handleGroupItemClick.bind(_this7);
    _this7.showAddDialog = _this7.showAddDialog.bind(_this7);
    _this7.fetchGroupData = _this7.fetchGroupData.bind(_this7);
    _this7.toggleOpeImgState = _this7.toggleOpeImgState.bind(_this7);
    _this7.handleDeleteGroup = _this7.handleDeleteGroup.bind(_this7);
    _this7.handleRenameGroup = _this7.handleRenameGroup.bind(_this7);

    _this7.fetchGroupData();
    return _this7;
  }

  _createClass(PhotoGroupBar, [{
    key: "showAddDialog",
    value: function showAddDialog() {
      this.setState({
        addVisible: true
      });
    }
  }, {
    key: "fetchGroupData",
    value: function fetchGroupData() {
      this.props.fetchGroups();
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm(groupname) {
      this.setState({
        addVisible: false
      });
      var that = this;
      $.ajax({
        url: '/admin/datas/photogroup/modify',
        data: { groupname: groupname },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          that.fetchGroupData();
        },
        error: function error() {
          console.log('error');
        }
      });
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.setState({
        addVisible: false
      });
    }
  }, {
    key: "handleGroupItemClick",
    value: function handleGroupItemClick(gid) {
      this.props.groupChange(gid);
    }
  }, {
    key: "handleDeleteGroup",
    value: function handleDeleteGroup(gid) {
      console.log('gid: ' + gid);
      var that = this;
      $.ajax({
        url: '/admin/datas/photogroup/remove',
        data: { gid: gid },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          console.log(JSON.stringify(dt));
          if (dt.code == 0) {
            if (gid == that.props.gid) {
              that.props.groupChange(-1);
            } else {
              that.fetchGroupData();
            }
          }
        }
      });
    }
  }, {
    key: "handleRenameGroup",
    value: function handleRenameGroup(gid, name) {
      var that = this;
      $.ajax({
        url: '/admin/datas/photogroup/rename',
        data: { gid: gid, name: name },
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.fetchGroupData();
          }
        }
      });
    }
  }, {
    key: "toggleOpeImgState",
    value: function toggleOpeImgState() {
      this.setState(function (previous, props) {
        return {
          opeImgVisible: !previous.opeImgVisible
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var opebarImg = this.state.opeImgVisible ? '/images/icons/ic_cancel_black_24dp_2x.png' : '/images/icons/ic_arrow_drop_down_circle_black_24dp_2x.png';
      var groupItems = this.props.groups.map(function (group) {
        return React.createElement(PhotoGroupItem, { group: group, gid: _this8.props.gid, opeImgVisible: _this8.state.opeImgVisible, handleGroupItemClick: _this8.handleGroupItemClick, handleDeleteGroup: _this8.handleDeleteGroup, handleRenameGroup: _this8.handleRenameGroup });
      });
      var key = new Date().getTime();
      return React.createElement(
        "div",
        { id: "photo-group-div" },
        React.createElement(
          "div",
          { className: "photo-group-operation-bar" },
          React.createElement(
            "div",
            { id: "add-new-photo-group-div", onClick: this.showAddDialog },
            "\u65B0\u5EFA\u5206\u7EC4"
          ),
          React.createElement(InputDialog, { title: "\u65B0\u5EFA\u5206\u7EC4", centerScreen: false, confirm: this.handleConfirm, cancel: this.handleCancel, visible: this.state.addVisible })
        ),
        React.createElement(
          "div",
          { className: "photo-group-operation-bar" },
          React.createElement(
            "div",
            { id: "photo-group-opebar-title-div" },
            "\u56FE\u7247\u7EC4"
          ),
          React.createElement("img", { id: "photo-group-opebar-img", src: opebarImg, onClick: this.toggleOpeImgState })
        ),
        React.createElement(
          "ul",
          { id: "photo-group-items-ul" },
          groupItems
        )
      );
    }
  }]);

  return PhotoGroupBar;
}(React.Component);

var PhotoArea = function (_React$Component6) {
  _inherits(PhotoArea, _React$Component6);

  function PhotoArea(props) {
    _classCallCheck(this, PhotoArea);

    var _this9 = _possibleConstructorReturn(this, (PhotoArea.__proto__ || Object.getPrototypeOf(PhotoArea)).call(this, props));

    _this9.state = {
      gid: -1,
      key: new Date().getTime(),
      // groups
      groups: []
    };
    _this9.fetchPhotoGroups = _this9.fetchPhotoGroups.bind(_this9);
    _this9.handlePhotoGroupChange = _this9.handlePhotoGroupChange.bind(_this9);
    _this9.handleRefetch = _this9.handleRefetch.bind(_this9);
    return _this9;
  }

  _createClass(PhotoArea, [{
    key: "handlePhotoGroupChange",
    value: function handlePhotoGroupChange(gid) {
      this.setState({
        gid: gid,
        key: new Date().getTime()
      });
    }
  }, {
    key: "handleRefetch",
    value: function handleRefetch() {
      this.setState({
        key: new Date().getTime()
      });
    }
  }, {
    key: "fetchPhotoGroups",
    value: function fetchPhotoGroups() {
      var that = this;
      $.ajax({
        url: '/admin/datas/photogroup/get',
        type: 'get',
        dataType: 'json',
        success: function success(dt) {
          if (dt.code == 0) {
            that.setState({
              groups: dt.data
            });
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "photo-div" },
        React.createElement(PhotoFlow, { key: this.state.key, gid: this.state.gid, groups: this.state.groups, handleRefetch: this.handleRefetch }),
        React.createElement(PhotoGroupBar, { key: this.state.key + 100, gid: this.state.gid, groups: this.state.groups, groupChange: this.handlePhotoGroupChange, handleRefetch: this.handleRefetch, fetchGroups: this.fetchPhotoGroups })
      );
    }
  }]);

  return PhotoArea;
}(React.Component);

module.exports = PhotoArea;

},{"./components/confirm_dialog.js":1,"./components/input_dialog.js":2,"./components/option_dialog.js":3,"./components/table_foot_nav.js":4}]},{},[5])(5)
});