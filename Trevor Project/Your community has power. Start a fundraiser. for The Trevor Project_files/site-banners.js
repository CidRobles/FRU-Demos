(this["webpackJsonptrevor"] = this["webpackJsonptrevor"] || []).push([[9],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createClass; });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "jQuery"
var external_jQuery_ = __webpack_require__(0);
var external_jQuery_default = /*#__PURE__*/__webpack_require__.n(external_jQuery_);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(4);

// CONCATENATED MODULE: ./src/theme/js/site-banners/banner-manager.js




var banner_manager_SiteBanner = /*#__PURE__*/function () {
  function SiteBanner(bannerObj) {
    var _this = this;
    Object(classCallCheck["a" /* default */])(this, SiteBanner);
    this.handleCloseClick = function (e) {
      e.preventDefault();
      var originalEvent = e.originalEvent;
      window.sessionStorage.setItem(_this.sessionName, Date.now());

      // Using originalEvent to determine if event is an actual mouse click or not
      _this.remove({
        trueClick: originalEvent.offsetX > 0 && originalEvent.offsetY > 0
      });
      _this.updateSiteBannerCSSvariable();
    };
    this.$eventEmitter = external_jQuery_default()('<div></div>'); // A dummy element to use just as an eventemitter
    this.$container = external_jQuery_default()('#siteBannerContainer');
    this.$banner = null;
    this.bannerObj = bannerObj;
    this.sessionName = "sessionBannerObj-".concat(this.bannerObj.id);
    this.containerHeight = 0;
    this.id = bannerObj.id;
  }

  // Checks to see if this banner is
  // not yet closed and is not in excluded page
  Object(createClass["a" /* default */])(SiteBanner, [{
    key: "isRenderable",
    value: function isRenderable() {
      return !this.isClosed() && this.isAllowedInPage();
    }
  }, {
    key: "isAllowedInPage",
    value: function isAllowedInPage() {
      var postIDMeta = document.querySelector('meta[name="post-id"]');
      var currentPost = postIDMeta === null || postIDMeta === void 0 ? void 0 : postIDMeta.getAttribute('content');
      return Number(this.bannerObj.exclude_in || '') !== Number(currentPost || 0);
    }
  }, {
    key: "render",
    value: function render() {
      this.build();
      this.insert();
    }
  }, {
    key: "insert",
    value: function insert() {
      if (this.$banner.data('type') === 'custom') {
        this.$banner.prependTo(this.$container);
      } else {
        this.$banner.appendTo(this.$container);
      }
      this.updateSiteBannerCSSvariable();
    }
  }, {
    key: "build",
    value: function build() {
      var bannerObj = this.bannerObj;
      this.$banner = external_jQuery_default()('<div/>', {
        class: "site-banner__".concat(bannerObj.type),
        id: "site-banner-".concat(bannerObj.id),
        'data-type': bannerObj.type,
        'data-id': bannerObj.id,
        tabindex: 0
      });
      var $container = external_jQuery_default()("<div class='site-banner__container'>" + "<i class='site-banner__warning'></i>" + '</div>').appendTo(this.$banner);

      // Text
      var $text = external_jQuery_default()("<p class='site-banner__text'></p>").appendTo($container);

      // Title
      if (bannerObj.title) {
        external_jQuery_default()('<span/>', {
          class: 'site-banner__title',
          html: "".concat(bannerObj.title, " ")
        }).appendTo($text);
      }

      // Description
      if (bannerObj.desc) {
        external_jQuery_default()('<span/>', {
          class: 'site-banner__description',
          html: bannerObj.desc
        }).appendTo($text);
      }

      // Link (for pride_promo type)
      if (bannerObj.type === 'pride_promo') {
        external_jQuery_default()('<a/>', {
          class: 'site-banner__pride-promo-link',
          text: bannerObj.link_text,
          href: bannerObj.link_url
        }).appendTo($text);
      }
      external_jQuery_default()("<button aria-label='click to close banner' class='site-banner__close-btn'>" + "<i class='trevor-ti-x text-indigo'></i>" + '</button>').on('click', this.handleCloseClick).appendTo($container);
    }
  }, {
    key: "isClosed",
    value: function isClosed() {
      return Object.keys(window.sessionStorage).includes(this.sessionName);
    }
  }, {
    key: "remove",
    value: function remove(eventTriggerData) {
      this.$banner.remove();
      this.$eventEmitter.trigger('remove', eventTriggerData);
    }
  }, {
    key: "updateSiteBannerCSSvariable",
    value: function updateSiteBannerCSSvariable() {
      var root = document.documentElement;
      this.containerHeight = this.$container.height();
      root.style.setProperty('--site-banner-height', "".concat(this.containerHeight, "px"));
    }
  }, {
    key: "on",
    value: function on(event, callback) {
      var _this2 = this;
      this.$eventEmitter.on(event, function (originalEvent, data) {
        callback.apply(_this2, [_this2, Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, originalEvent), {}, {
          data: data
        })]);
      });
    }
  }]);
  return SiteBanner;
}();

// CONCATENATED MODULE: ./src/theme/js/site-banners/index.js
/* global trevorWP */


window.trevorWP = window.trevorWP || {};
window.trevorWP.siteBanners = function () {
  var bannersById = {};
  var onRemove = function onRemove(_ref, event) {
    var _event$data;
    var id = _ref.id;
    // Remove closed banner
    delete bannersById[id];

    // Focus on next available banner
    var availableBanner = Object.values(bannersById)[0];
    if (availableBanner) {
      availableBanner.$banner.focus();
    } else if (((_event$data = event.data) === null || _event$data === void 0 ? void 0 : _event$data.trueClick) === false) {
      // Focus on skip to main link instead if no more banners
      // only when tabbing/voiceover was used
      document.body.focus();
    }
  };
  external_jQuery_default.a.get('/wp-json/trevor/v1/site-banners?nonce=' + Date.now()).then(function (resp) {
    if (resp.success) {
      // Show only up to 2 banners at a time,
      // with the Pride LP having least priority
      resp.banners.map(function (bannerObj) {
        return new banner_manager_SiteBanner(bannerObj);
      }).filter(function (banner) {
        return banner.isRenderable();
      }).slice(0, 2).forEach(function (banner) {
        banner.render();
        banner.on('remove', onRemove);
        bannersById[banner.id] = banner;
      });
    }
  });
};

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectSpread2; });
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);


function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        Object(_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/***/ })

},[[420,0]]]);
//# sourceMappingURL=site-banners.js.map