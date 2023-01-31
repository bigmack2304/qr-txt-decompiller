/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/my_libs/addon_dark_theme.ts":
/*!****************************************!*\
  !*** ./ts/my_libs/addon_dark_theme.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Addon_dark_theme": function() { return /* binding */ Addon_dark_theme; }
/* harmony export */ });


var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var Addon_dark_theme = function () {
  function Addon_dark_theme(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.classes_dark_style,
        classes_dark_style = _c === void 0 ? [""] : _c;

    this._elements_DarkTheme = [];
    this._theme_btn = null;
    this._elements_DarkTheme = classes_dark_style;
  }

  Addon_dark_theme.prototype.init = function () {
    this._theme_btn = document.querySelector(".js-addon_dark_theme_button");

    if (!this._theme_btn) {
      console.error("\u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0442\u0435\u043C\u044B\n            \u043F\u043E \u0441\u0435\u043B\u0435\u043A\u0442\u043E\u0440\u0443 \".js-addon_dark_theme_button\"");
      return;
    }

    Addon_dark_theme._dark_theme_state = this._load_dark_theme_state();

    this._save_dark_theme_state();

    if (Addon_dark_theme._dark_theme_state) {
      this._update_styles();
    }

    this._button_icon_update();

    this._theme_btn.disabled = false;

    this._theme_btn.addEventListener("click", this._theme_btn_onClick.bind(this));
  };

  Addon_dark_theme.prototype.get_dark_theme_state = function () {
    return Addon_dark_theme._dark_theme_state;
  };

  Addon_dark_theme.prototype._load_dark_theme_state = function () {
    var state = localStorage.getItem("qr_decompiller_dark_theme_state");

    if (state == null || state == "false") {
      return false;
    }

    return true;
  };

  Addon_dark_theme.prototype._save_dark_theme_state = function () {
    var state = Addon_dark_theme._dark_theme_state ? "true" : "false";
    localStorage.setItem("qr_decompiller_dark_theme_state", state);
  };

  Addon_dark_theme.prototype._theme_btn_onClick = function (e) {
    this._update_styles();

    Addon_dark_theme._dark_theme_state = !Addon_dark_theme._dark_theme_state;

    this._save_dark_theme_state();

    this._button_icon_update();
  };

  Addon_dark_theme.prototype._update_styles = function () {
    var valid_elements = [];

    for (var _i = 0, _a = this._elements_DarkTheme; _i < _a.length; _i++) {
      var elem = _a[_i];
      var select = Array.from(document.getElementsByClassName(elem));
      valid_elements = __spreadArray(__spreadArray([], valid_elements, true), select, true);
    }

    this._toggle_classes(valid_elements);
  };

  Addon_dark_theme.prototype._toggle_classes = function (elements) {
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
      var elem = elements_1[_i];

      for (var _a = 0, _b = this._elements_DarkTheme; _a < _b.length; _a++) {
        var valid_class = _b[_a];

        if (elem.classList.contains(String(valid_class))) {
          elem.classList.toggle("".concat(valid_class, "--dark"));
          break;
        }
      }
    }
  };

  Addon_dark_theme.prototype._button_icon_update = function () {
    if (!Addon_dark_theme._dark_theme_state) {
      this._theme_btn.value = "white";
    } else {
      this._theme_btn.value = "dark";
    }
  };

  Addon_dark_theme._dark_theme_state = false;
  return Addon_dark_theme;
}();



/***/ }),

/***/ "./ts/my_libs/addon_error_edit.ts":
/*!****************************************!*\
  !*** ./ts/my_libs/addon_error_edit.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomErrEditor": function() { return /* binding */ CustomErrEditor; }
/* harmony export */ });


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var CustomErrEditor = function () {
  function CustomErrEditor(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.type,
        type = _c === void 0 ? "test_err" : _c,
        _d = _b.duble,
        duble = _d === void 0 ? true : _d,
        _e = _b.file,
        file = _e === void 0 ? "" : _e,
        _f = _b.info,
        info = _f === void 0 ? "" : _f;

    var add_obj_to_stack = function add_obj_to_stack() {
      CustomErrEditor._err_stak.push({
        type: type,
        file: file,
        info: info
      });
    };

    if (duble === true) {
      add_obj_to_stack();
      window.dispatchEvent(new CustomEvent("new_CustomErrEditor_error", {
        detail: CustomErrEditor._err_stak.at(-1)
      }));
    } else if (duble === false) {
      var check_dublicat = function check_dublicat() {
        for (var _i = 0, _a = CustomErrEditor._err_stak; _i < _a.length; _i++) {
          var elem = _a[_i];

          if (elem.type == type) {
            return true;
          }
        }

        return false;
      };

      if (!check_dublicat()) {
        add_obj_to_stack();
        window.dispatchEvent(new CustomEvent("new_CustomErrEditor_error", {
          detail: CustomErrEditor._err_stak.at(-1)
        }));
      }
    }
  }

  CustomErrEditor._print_err = function (obj) {
    var _a;

    var Read_file = obj.file;

    if (_typeof(Read_file) == "object") {
      if (((_a = Read_file.stack) === null || _a === void 0 ? void 0 : _a.indexOf("Error")) == 0) {
        Read_file = Read_file.stack;
        Read_file = Read_file.split("\n");
        Read_file = Read_file.map(function (item, index, array) {
          if (index <= 4) {
            return index == 1 ? "".concat(item.trim()) : "\t\t".concat(item.trim());
          }

          return "";
        });
        Read_file = Read_file.slice(1).join("\n").trim();
      }
    }

    var gen_desc = "\t" + "Type:\t" + obj.type + "\n\n\t" + "File:\t" + Read_file + "\n\n\t" + "Info:\t" + obj.info;
    console.error("ERROR\n" + gen_desc + "\n");

    if (CustomErrEditor._alert_enable) {
      alert("ERROR: " + obj.info);
    }
  };

  CustomErrEditor.get_error_info = function (need_type, func) {
    if (need_type === void 0) {
      need_type = "test_err";
    }

    if (func === void 0) {
      func = CustomErrEditor._print_err;
    }

    var err_index_del = [];

    CustomErrEditor._err_stak.forEach(function (elem) {
      if (elem.type == need_type) {
        func(elem);
        err_index_del.push(CustomErrEditor._err_stak.indexOf(elem));
      }
    });

    if (err_index_del.length != 0) {
      while (err_index_del.length != 0) {
        CustomErrEditor._err_stak.splice(err_index_del.pop(), 1);
      }

      return true;
    }

    return false;
  };

  CustomErrEditor.get_AllError_info = function (func) {
    if (func === void 0) {
      func = CustomErrEditor._print_err;
    }

    if (CustomErrEditor._err_stak.length != 0) {
      CustomErrEditor._err_stak.forEach(function (elem) {
        func(elem);
      });

      CustomErrEditor._err_stak.splice(0, CustomErrEditor._err_stak.length);

      return true;
    }

    return false;
  };

  CustomErrEditor.set_alert_mode = function (mode) {
    if (mode === void 0) {
      mode = true;
    }

    CustomErrEditor._alert_enable = mode;
  };

  CustomErrEditor._err_stak = [];
  CustomErrEditor._alert_enable = false;
  return CustomErrEditor;
}();



/***/ }),

/***/ "./ts/my_libs/addon_sidebar.ts":
/*!*************************************!*\
  !*** ./ts/my_libs/addon_sidebar.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Addon_sidebar": function() { return /* binding */ Addon_sidebar; }
/* harmony export */ });
/* harmony import */ var _styles_less_libs_sidebar_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../styles/less/libs/sidebar.less */ "./styles/less/libs/sidebar.less");




var Addon_sidebar = function () {
  function Addon_sidebar() {
    this._MEDIA_MOBILE_SIZE = 440;
    this._object_sidebar_btn = null;
    this._sidebar = null;
  }

  Addon_sidebar.prototype.init = function () {
    this._object_sidebar_btn = document.querySelector(".js-sidebar_button[data-sidebar_button_id]");

    if (!this._object_sidebar_btn) {
      console.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u043F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u043C\u0443 \u0441\u0435\u043B\u0435\u043A\u0442\u043E\u0440\u0443:\n            \".js-sidebar_button[data-sidebar_button_id]\", \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430");
      return;
    }

    this._sidebar = document.querySelector(".js-sidebar[data-sidebar_id='".concat(this._object_sidebar_btn.dataset.sidebar_button_id, "']"));

    if (!this._sidebar) {
      console.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u043F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u043C\u0443 \u0441\u0435\u043B\u0435\u043A\u0442\u043E\u0440\u0443:\n            \".js-sidebar[data-sidebar_id=".concat(this._object_sidebar_btn.dataset.sidebar_button_id, "\",\n             \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0430\u044F \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430"));
      return;
    }

    document.body.addEventListener("click", this._sidebar_on_click.bind(this));
    window.addEventListener("resize", this._winResize.bind(this));
  };

  Addon_sidebar.prototype._winResize = function (e) {
    var window_width = e.target.innerWidth;

    if (window_width >= this._MEDIA_MOBILE_SIZE) {
      this._close_sidebar();

      this._body_scroll_remove(false);
    }
  };

  Addon_sidebar.prototype._sidebar_on_click = function (e) {
    var is_sidebar_open = this._sidebar.classList.contains("js-sidebar--active");

    var selector_button = ".js-sidebar_button[data-sidebar_button_id='".concat(this._object_sidebar_btn.dataset.sidebar_button_id, "']");
    var condition_1 = e.target.classList.contains("js-sidebar");
    var condition_2 = e.target.dataset.sidebar_id == this._object_sidebar_btn.dataset.sidebar_button_id;
    var condition_3 = e.target.closest(selector_button);

    if (condition_1 && condition_2 || condition_3) {
      if (!is_sidebar_open) {
        this._open_sidebar();
      } else {
        this._close_sidebar();
      }

      this._body_scroll_remove(!is_sidebar_open);
    }
  };

  Addon_sidebar.prototype._body_scroll_remove = function (val) {
    var body_element = document.querySelector("body");

    if (body_element) {
      if (val) {
        body_element.classList.add("scroll_remove");
      } else {
        body_element.classList.remove("scroll_remove");
      }
    }
  };

  Addon_sidebar.prototype._open_sidebar = function () {
    if (this._object_sidebar_btn && this._sidebar) {
      this._sidebar.classList.add("js-sidebar--active");

      this._object_sidebar_btn.classList.add("js-sidebar_button--active");

      this._sidebar.children[1].classList.add("js-sidebar__elements--active");
    }
  };

  Addon_sidebar.prototype._close_sidebar = function () {
    if (this._object_sidebar_btn && this._sidebar) {
      this._sidebar.classList.remove("js-sidebar--active");

      this._object_sidebar_btn.classList.remove("js-sidebar_button--active");

      this._sidebar.children[1].classList.remove("js-sidebar__elements--active");
    }
  };

  return Addon_sidebar;
}();



/***/ }),

/***/ "./ts/my_libs/dev_sticker.ts":
/*!***********************************!*\
  !*** ./ts/my_libs/dev_sticker.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_less_components_dev_mode_sticker_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/less/components/dev_mode_sticker.less */ "./styles/less/components/dev_mode_sticker.less");



document.addEventListener("DOMContentLoaded", onLoad);
var body = document.querySelector("body");

function onLoad(e) {
  var element = document.createElement("div");
  element.classList.add("development_mode_sticker");
  element.innerText = "DEV version";
  body.prepend(element);
}

/***/ }),

/***/ "./ts/my_libs/s_addon_spoiler.ts":
/*!***************************************!*\
  !*** ./ts/my_libs/s_addon_spoiler.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Addon_spoiler": function() { return /* binding */ Addon_spoiler; }
/* harmony export */ });
/* harmony import */ var _styles_less_libs_addon_spoiler_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/less/libs/addon_spoiler.less */ "./styles/less/libs/addon_spoiler.less");




var Addon_spoiler = function () {
  function Addon_spoiler(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.use_one,
        use_one = _c === void 0 ? false : _c,
        _d = _b.def_hide,
        def_hide = _d === void 0 ? true : _d,
        _e = _b.resize_upd,
        resize_upd = _e === void 0 ? true : _e;

    this.addon_spoiler_use_one = use_one;
    this.addon_spoiler_def_hide = def_hide;
    this.addon_spoiler_resize_upd = resize_upd;
    this._get_addon_spoilers = document.getElementsByClassName("js-addon_spoiler");
  }

  Addon_spoiler.prototype.init = function () {
    var body_element = document.querySelector("body");

    if (body_element) {
      body_element.addEventListener("click", this._evt_lstr_spoiler_click.bind(this));
      body_element.addEventListener("keydown", this._evt_lstr_spoiler_keydown.bind(this));
    }

    if (this.addon_spoiler_resize_upd) {
      document.addEventListener("DOMContentLoaded", this._evt_lstr_dom_load.bind(this), {
        once: true
      });
    }

    if (!this.addon_spoiler_def_hide && this._is_object_valid(this._get_addon_spoilers)) {
      for (var _i = 0, _a = this._get_addon_spoilers; _i < _a.length; _i++) {
        var elem = _a[_i];

        this._addon_spoiler_use(elem);
      }
    }
  };

  Addon_spoiler.prototype._decoratorOneUpdRuntime = function (func) {
    var _this = this;

    var timer_started = false;
    var timer_id = null;
    var second_args = [];

    function caller(context) {
      func.bind(context).apply(void 0, second_args);
      timer_started = false;
      timer_id = null;
      second_args = [];
    }

    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      second_args = args;

      if (!timer_started) {
        timer_started = true;
      } else {
        clearTimeout(timer_id);
      }

      timer_id = Number(setTimeout(caller.bind(null, _this), 300));
    };
  };

  Addon_spoiler.prototype._is_object_valid = function (obj) {
    return obj.length != 0 ? true : false;
  };

  Addon_spoiler.prototype._evt_lstr_dom_load = function (evt) {
    window.addEventListener("resize", this._evt_lstr_window_resize.bind(this));
    this._resize_upd = this._decoratorOneUpdRuntime(this._resize_upd);
  };

  Addon_spoiler.prototype._evt_lstr_spoiler_click = function (evt) {
    var object = evt.target.closest(".addon_spoiler_heder");

    if (object) {
      evt.stopPropagation();

      this._addon_spoiler_on_click(object);
    }
  };

  Addon_spoiler.prototype._evt_lstr_spoiler_keydown = function (evt) {
    var object = evt.target.closest(".addon_spoiler_heder");

    if (object) {
      evt.stopPropagation();
      if (evt.code == "Enter") this._addon_spoiler_on_click(object);
    }
  };

  Addon_spoiler.prototype._evt_lstr_window_resize = function (evt) {
    this._resize_upd();
  };

  Addon_spoiler.prototype._resize_upd = function () {
    var get_addon_spoiler_active = document.getElementsByClassName("js-addon_spoiler--active");

    if (get_addon_spoiler_active.length != 0) {
      for (var i = 0; i < get_addon_spoiler_active.length; i++) {
        var this_content = get_addon_spoiler_active[i].lastElementChild;
        var this_content_height = this_content.scrollHeight;
        this_content.style.maxHeight = this_content_height + "px";
      }
    }
  };

  Addon_spoiler.prototype._addon_spoiler_on_click = function (DOM_obj) {
    var get_addon_spoilers_active = document.getElementsByClassName("js-addon_spoiler--active");
    var spoiler_clicked = DOM_obj.parentElement;

    if (this.addon_spoiler_use_one) {
      for (var i = get_addon_spoilers_active.length - 1; i != -1; i--) {
        if (get_addon_spoilers_active[i] !== spoiler_clicked && !this._check_all_parent_spoiler(spoiler_clicked, get_addon_spoilers_active[i])) {
          this._addon_spoiler_use(get_addon_spoilers_active[i]);
        }
      }
    }

    this._addon_spoiler_use(spoiler_clicked);
  };

  Addon_spoiler.prototype._addon_spoiler_use = function (DOM_obj) {
    var is_active = DOM_obj.classList.contains("js-addon_spoiler--active");
    var object_body = DOM_obj.lastElementChild;
    var object_body_height = object_body.scrollHeight;
    DOM_obj.classList.toggle("js-addon_spoiler");
    DOM_obj.classList.toggle("js-addon_spoiler--active");

    if (!is_active) {
      object_body.style.maxHeight = object_body_height + "px";

      this._upd_parent_height(DOM_obj, object_body_height);
    } else {
      object_body.style.maxHeight = "0px";

      this._upd_parent_height(DOM_obj, 0);
    }
  };

  Addon_spoiler.prototype._check_parent_spoiler = function (obj) {
    var parent_slider = obj.closest(".js-addon_spoiler--active");

    if (!parent_slider) {
      return false;
    }

    return parent_slider;
  };

  Addon_spoiler.prototype._check_all_parent_spoiler = function (child, parent) {
    var current_child = child.parentElement;

    var obj_target = this._check_parent_spoiler(current_child);

    if (obj_target) {
      if (obj_target == parent) {
        return true;
      } else {
        return this._check_all_parent_spoiler(obj_target, parent);
      }
    } else {
      return false;
    }
  };

  Addon_spoiler.prototype._upd_parent_height = function (DOM_obj, old_size) {
    while (this._check_parent_spoiler(DOM_obj.parentElement)) {
      DOM_obj = this._check_parent_spoiler(DOM_obj.parentElement);
      DOM_obj.lastElementChild.style.maxHeight = DOM_obj.lastElementChild.scrollHeight + old_size + "px";
      old_size = DOM_obj.lastElementChild.scrollHeight + old_size;
    }
  };

  return Addon_spoiler;
}();



/***/ }),

/***/ "./ts/pages_scripts/index.ts":
/*!***********************************!*\
  !*** ./ts/pages_scripts/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dark_theme": function() { return /* binding */ Dark_theme; }
/* harmony export */ });
/* harmony import */ var _styles_css_normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/css/normalize.css */ "./styles/css/normalize.css");
/* harmony import */ var _styles_less_pages_main_index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/less/pages_main/index.less */ "./styles/less/pages_main/index.less");
/* harmony import */ var _my_libs_addon_dark_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../my_libs/addon_dark_theme */ "./ts/my_libs/addon_dark_theme.ts");
/* harmony import */ var _my_libs_addon_sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../my_libs/addon_sidebar */ "./ts/my_libs/addon_sidebar.ts");






var support_class_dark_theme = ["body", "header", "main", "footer", "def_icon__icon", "header__horisontal_line", "file_info", "text_in_file", "text_blue", "addon_spoiler_heder", "addon_spoiler_body", "js-sidebar__element", "js-sidebar__elements", "header__button_wrapper"];
var Dark_theme = new _my_libs_addon_dark_theme__WEBPACK_IMPORTED_MODULE_2__.Addon_dark_theme({
  classes_dark_style: support_class_dark_theme
});
Dark_theme.init();
var banners = document.getElementsByClassName("banner");

if (banners.length != 0) {
  for (var _i = 0, _a = banners; _i < _a.length; _i++) {
    var elem = _a[_i];
    elem.remove();
  }
}

var Sidebar = new _my_libs_addon_sidebar__WEBPACK_IMPORTED_MODULE_3__.Addon_sidebar();
Sidebar.init();
document.addEventListener("DOMContentLoaded", function (evt) {
  var html_header = document.querySelector("body > header");
  var html_main = document.querySelector("body > main");
  var html_footer = document.querySelector("body > footer");

  if (html_header && html_main && html_footer) {
    html_header.classList.remove("visually_hidden");
    html_main.classList.remove("visually_hidden");
    html_footer.classList.remove("visually_hidden");
  } else {
    throw new Error("header || main || footer, not fund in html");
  }
}, {
  once: true
});


/***/ }),

/***/ "./ts/qr/qr_buttons.ts":
/*!*****************************!*\
  !*** ./ts/qr/qr_buttons.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "btn_active_deactive": function() { return /* binding */ btn_active_deactive; },
/* harmony export */   "btn_decomp": function() { return /* binding */ btn_decomp; },
/* harmony export */   "btn_download": function() { return /* binding */ btn_download; },
/* harmony export */   "btn_filter": function() { return /* binding */ btn_filter; }
/* harmony export */ });
/* harmony import */ var _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qr_descriptor */ "./ts/qr/qr_descriptor.ts");
/* harmony import */ var _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../my_libs/addon_error_edit */ "./ts/my_libs/addon_error_edit.ts");
/* harmony import */ var _qr_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qr_utils */ "./ts/qr/qr_utils.ts");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jszip */ "../node_modules/jszip/dist/jszip.min.js");
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _qr_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./qr_icons */ "./ts/qr/qr_icons.ts");








var saveAs = __webpack_require__(/*! jszip/vendor/FileSaver.js */ "../node_modules/jszip/vendor/FileSaver.js");

var btn_filter = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_2__.find_element)("js-btn_filter_qr");
var btn_decomp = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_2__.find_element)("js-btn_decomp");
var btn_download = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_2__.find_element)("js-btn_download");
btn_filter.addEventListener("click", btn_filter_klick);
btn_decomp.addEventListener("click", btn_decomp_klick);
btn_download.addEventListener("click", btn_download_klick);

function isArrString(value) {
  var check_elements = function check_elements(value) {
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
      var elem = value_1[_i];

      if (typeof elem == "string") {
        continue;
      }

      return false;
    }

    return true;
  };

  if (Array.isArray(value)) {
    return true;
  }

  return false;
}

function btn_filter_klick() {
  if (_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt && isArrString(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt)) {
    for (var i = 0; i < _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt.length; i++) {
      _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt[i] = _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt[i].slice(0, (0,_qr_utils__WEBPACK_IMPORTED_MODULE_2__.is_tab)(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt[i]));

      if (_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt[i] == "") {
        _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt.splice(i);
      }
    }

    window.dispatchEvent(new CustomEvent("window_scroll_reset"));
    (0,_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_check)(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt);
    btn_active_deactive(btn_filter, true);
  }
}

function btn_decomp_klick() {
  var need_qr = Number(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.btn_decomp_n.value);
  var need_docs = Math.ceil(Number(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.qr_size_n.innerText) / Number(need_qr));
  _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_content_container.innerHTML = "";
  var file_txt_i = 0;

  var caller_callback = function caller_callback() {
    _qr_icons__WEBPACK_IMPORTED_MODULE_4__.addonIcon_load.icon_off();
  };

  window.dispatchEvent(new CustomEvent("window_scroll_reset"));
  var file_check_final_dec = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_2__.caller_delay_callback)(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_check_final, caller_callback);
  _qr_icons__WEBPACK_IMPORTED_MODULE_4__.addonIcon_load.icon_on();

  for (var i = 0; i < need_docs; i++) {
    var arry_temp = [];

    for (var k = 0; k < need_qr; k++) {
      if (isArrString(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt) && _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt[file_txt_i] != undefined) {
        arry_temp.push(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt[file_txt_i]);
        file_txt_i++;

        if (_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt[file_txt_i] == "") {
          _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_txt.splice(i);
        }
      } else {
        break;
      }
    }

    file_check_final_dec(arry_temp);
    _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.text_pages.push(arry_temp);
  }

  _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.file_uploader.value = "";
  btn_active_deactive(btn_filter, true);
  btn_active_deactive(btn_decomp, true);
  btn_active_deactive(btn_download, false);
  btn_active_deactive(_qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.btn_decomp_n, true);
}

function btn_download_klick() {
  var zip = new (jszip__WEBPACK_IMPORTED_MODULE_3___default())();

  for (var i = 0; i < _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.text_pages.length; i++) {
    var text = _qr_descriptor__WEBPACK_IMPORTED_MODULE_0__.text_pages[i].join("\n");

    if (text.endsWith("\n")) {
      text = text.slice(0, text.length - 1);
    }

    zip.file("QR_page_" + (i + 1) + "__" + ((text.match(new RegExp("\n", "g")) || []).length + 1) + ".txt", text);
  }

  zip.generateAsync({
    type: "blob"
  }).then(function (content) {
    saveAs(content, "QR_pages.zip");
  })["catch"](function (err) {
    new _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_1__.CustomErrEditor({
      type: "zip_download_stage",
      duble: false,
      file: err,
      info: "Ошибка при скачивании фаила."
    });
  });
  btn_active_deactive(btn_download, true);
}

function btn_active_deactive(btn, mode) {
  if (!btn) return;
  btn.disabled = mode;
}



/***/ }),

/***/ "./ts/qr/qr_descriptor.ts":
/*!********************************!*\
  !*** ./ts/qr/qr_descriptor.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "btn_decomp_n": function() { return /* binding */ btn_decomp_n; },
/* harmony export */   "file_check": function() { return /* binding */ file_check; },
/* harmony export */   "file_check_final": function() { return /* binding */ file_check_final; },
/* harmony export */   "file_content": function() { return /* binding */ file_content; },
/* harmony export */   "file_content_container": function() { return /* binding */ file_content_container; },
/* harmony export */   "file_txt": function() { return /* binding */ file_txt; },
/* harmony export */   "file_uploader": function() { return /* binding */ file_uploader; },
/* harmony export */   "qr_size_n": function() { return /* binding */ qr_size_n; },
/* harmony export */   "text_pages": function() { return /* binding */ text_pages; }
/* harmony export */ });
/* harmony import */ var _my_libs_s_addon_spoiler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../my_libs/s_addon_spoiler */ "./ts/my_libs/s_addon_spoiler.ts");
/* harmony import */ var _qr_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./qr_icons */ "./ts/qr/qr_icons.ts");
/* harmony import */ var _qr_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qr_buttons */ "./ts/qr/qr_buttons.ts");
/* harmony import */ var _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../my_libs/addon_error_edit */ "./ts/my_libs/addon_error_edit.ts");
/* harmony import */ var _qr_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./qr_utils */ "./ts/qr/qr_utils.ts");
/* harmony import */ var _pages_scripts_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../pages_scripts/index */ "./ts/pages_scripts/index.ts");
/* harmony import */ var _qr_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./qr_form */ "./ts/qr/qr_form.ts");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! papaparse */ "../node_modules/papaparse/papaparse.min.js");
/* harmony import */ var papaparse__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(papaparse__WEBPACK_IMPORTED_MODULE_7__);










var file_txt = "";
var pages = 0;
var text_pages = [];
var qr_info = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("file_info");
var qr_name_n = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("file_info__name", qr_info).children[0];
var qr_size_n = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("file_info__QRn", qr_info).children[0];
var doc_size_n = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("file_info__size", qr_info).children[0];
var file_content = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("text_in_file");
var file_content_container = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("text_in_file__container");
var btn_decomp_n = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("js-btn_decomp_n");
var file_uploader = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.find_element)("js-file_uploader");
var custom_spoilers = new _my_libs_s_addon_spoiler__WEBPACK_IMPORTED_MODULE_0__.Addon_spoiler({});
custom_spoilers.init();
file_uploader.addEventListener("change", file_input);
file_content.style.display = "none";
qr_info.style.display = "none";
_qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_load.icon_off_hand();
_qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_chunk.icon_off_hand();
(0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(file_uploader, false);
(0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_filter, true);
(0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_decomp, true);
(0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_download, true);
(0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(btn_decomp_n, false);
window.addEventListener("new_CustomErrEditor_error", CustomErrEditor_onError);

function CustomErrEditor_onError(_a) {
  var err = _a.detail;

  if (err.type == "read_file_txt" || err.type == "read_file_csv" || err.type == "read_file_csv_final_Step" || err.type == "zip_download_stage") {
    alert(err.info);
    _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor.get_error_info(err.type);
    file_uploader.value = "";
  }

  if (err.type == "open_file") {
    _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor.get_error_info(err.type);
  }
}

function file_input(e) {
  if (typeof e.target.files[0] == "undefined") {
    new _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor({
      type: "open_file",
      duble: false,
      file: new Error(),
      info: "фаил не открыт"
    });
    return;
  }

  var file = e.target.files[0];
  _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_load.icon_off_hand();
  _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_chunk.icon_off_hand();
  file_txt = "";
  pages = 0;
  text_pages = [];

  if (file.name.includes(".txt")) {
    file_reader_txt(file);
  } else if (file.name.includes(".csv")) {
    file_reader_csv(file);
  }

  doc_size_n.innerHTML = "".concat(Math.ceil(file.size / 1024), " Kb");
  qr_name_n.innerHTML = file.name;
  qr_name_n.title = file.name;
}

function file_reader_txt(file) {
  var reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function () {
    file_txt = reader.result;
    file_txt = file_txt.split("\n");
    file_check(file_txt);
    qr_info.style.display = "block";
    file_content.style.display = "block";
    (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_filter, false);
    (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_decomp, false);
    (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(btn_decomp_n, false);
    (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_download, true);
  };

  reader.onerror = function () {
    new _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor({
      type: "read_file_txt",
      file: new Error(),
      info: "ошибка при открытии фаила.txt"
    });
  };
}

function file_reader_csv(file) {
  var load_step = function load_step(row) {
    if (row.length == 3) {
      file_txt += row[0] + "\t" + row[1] + "\t" + row[2] + "\n";
    } else {
      new _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor({
        type: "read_file_csv_step",
        duble: false,
        file: new Error(),
        info: "ошибка при чтении фаила.csv\nСтруктура фаила не соответствует заданному шаблону."
      });
    }
  };

  var load_comlete = function load_comlete() {
    if (!_my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor.get_error_info("read_file_csv_step")) {
      file_txt = file_txt.split("\n");
      file_txt.pop();
      file_check(file_txt);
      qr_info.style.display = "block";
      file_content.style.display = "block";
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_filter, false);
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_decomp, false);
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(btn_decomp_n, false);
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_download, true);
    } else {
      doc_size_n.innerHTML = "";
      qr_size_n.innerHTML = "";
      file_content.style.display = "none";
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_download, true);
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_filter, true);
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_decomp, true);
      (0,_qr_buttons__WEBPACK_IMPORTED_MODULE_2__.btn_active_deactive)(btn_decomp_n, true);
      new _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor({
        type: "read_file_csv_final_Step",
        file: new Error(),
        info: "ошибка при чтении фаила.csv"
      });
    }
  };

  papaparse__WEBPACK_IMPORTED_MODULE_7__.parse(file, {
    worker: true,
    step: function step(results) {
      load_step(results.data);
    },
    complete: function complete(results, file) {
      load_comlete();
    },
    error: function error(err, file) {
      new _my_libs_addon_error_edit__WEBPACK_IMPORTED_MODULE_3__.CustomErrEditor({
        type: "read_file_csv",
        file: new Error(),
        info: "ошибка при открытии фаила.csv"
      });
    },
    delimitersToGuess: ["\t", "|", papaparse__WEBPACK_IMPORTED_MODULE_7__.RECORD_SEP, papaparse__WEBPACK_IMPORTED_MODULE_7__.UNIT_SEP]
  });
}

function file_check(input) {
  var callback = function callback() {
    _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_load.icon_off();
  };

  var callback_chunk = function callback_chunk() {
    _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_chunk.icon_off();
  };

  file_content_container.innerHTML = "<div class=\"text_in_file__container\">\n                                            <xmp class= \"text_in_file__text\"></xmp>\n                                        </div> ".trim();
  var text_cotainer = file_content_container.querySelector(".text_in_file__text");

  if (input.length < 8000) {
    _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_load.icon_on();
    (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.arry_renderer)(input, text_cotainer, callback);
  } else {
    _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_chunk.icon_on();
    (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.arry_renderer_chunk)(input, text_cotainer, callback_chunk);
  }

  qr_size_n.innerHTML = input.length.toString();
}

function file_check_final(input) {
  var callback = function callback() {
    _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_load.icon_off();
  };

  var spoiler_heder_dark = _pages_scripts_index__WEBPACK_IMPORTED_MODULE_5__.Dark_theme.get_dark_theme_state() ? "addon_spoiler_heder--dark" : "";
  var spoiler_body_dark = _pages_scripts_index__WEBPACK_IMPORTED_MODULE_5__.Dark_theme.get_dark_theme_state() ? "addon_spoiler_body--dark" : "";
  var list = document.createElement("div");
  list.className = "text_in_file__content_container";
  list.innerHTML = "<div class=\"js-addon_spoiler\"> \n                        <div class=\"addon_spoiler_heder ".concat(spoiler_heder_dark, "\" tabindex=\"0\">\n                            <p></p>\n                            <div class=\"addon_spoiler_indicator\"></div>\n                        </div> \n                        <div class=\"addon_spoiler_body ").concat(spoiler_body_dark, "\">\n                            <xmp class=\"final_page\"></xmp>\n                        </div>\n                      </div>").trim();
  file_content_container.append(list);
  var text_cotainer = list.querySelector(".final_page");
  var text_header = list.querySelector(".addon_spoiler_heder > p");
  _qr_icons__WEBPACK_IMPORTED_MODULE_1__.addonIcon_load.icon_on();
  (0,_qr_utils__WEBPACK_IMPORTED_MODULE_4__.arry_renderer)(input, text_cotainer, callback);
  text_header.innerHTML = "Document:".concat(pages + 1, " codes:").concat(input.length);
  pages++;
  qr_info.style.display = "none";
}



/***/ }),

/***/ "./ts/qr/qr_form.ts":
/*!**************************!*\
  !*** ./ts/qr/qr_form.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _qr_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qr_utils */ "./ts/qr/qr_utils.ts");



var form = (0,_qr_utils__WEBPACK_IMPORTED_MODULE_0__.find_element)("js-btn_decomp_n");
form.addEventListener("change", form_change);

function form_change(e) {
  var target = e.target;

  if (Number(target.value) > Number(target.max)) {
    target.value = target.max;
  }

  if (Number(target.value) < Number(target.min)) {
    target.value = target.min;
  }
}

/***/ }),

/***/ "./ts/qr/qr_icons.ts":
/*!***************************!*\
  !*** ./ts/qr/qr_icons.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addonIcon_chunk": function() { return /* binding */ addonIcon_chunk; },
/* harmony export */   "addonIcon_load": function() { return /* binding */ addonIcon_load; }
/* harmony export */ });
/* harmony import */ var _qr_icons_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qr_icons_class */ "./ts/qr/qr_icons_class.ts");



var addonIcon_load = create_icon("js-loading", "loading");
var addonIcon_chunk = create_icon("js-chunk_info", "chunk_info");

function create_icon(HTMLClassName, InstanceName) {
  var call_constructor = function call_constructor() {
    return new _qr_icons_class__WEBPACK_IMPORTED_MODULE_0__.AddonIcon(document.querySelector(".".concat(HTMLClassName)), InstanceName);
  };

  if (document.querySelector(".".concat(HTMLClassName))) {
    return call_constructor();
  } else {
    throw new Error("selector icon '.".concat(HTMLClassName, "' not fund in HTML"));
  }
}



/***/ }),

/***/ "./ts/qr/qr_icons_class.ts":
/*!*********************************!*\
  !*** ./ts/qr/qr_icons_class.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddonIcon": function() { return /* binding */ AddonIcon; }
/* harmony export */ });


var AddonIcon = function () {
  function AddonIcon(DOM_obj, name) {
    this._name = "";
    this._calls_count = 0;
    this._icon = DOM_obj;
    this._name = name;
  }

  AddonIcon.prototype._is_icon = function (icon) {
    if (icon instanceof HTMLElement) {
      return true;
    }

    return false;
  };

  AddonIcon.prototype.icon_off_hand = function () {
    if (this._is_icon(this._icon)) {
      this._icon.style.display = "none";
      this._calls_count = 0;
    }
  };

  AddonIcon.prototype.icon_off = function () {
    if (this._is_icon(this._icon)) {
      if (this._calls_count >= 1) {
        this._calls_count = this._calls_count - 1;

        if (this._calls_count <= 0) {
          this._icon.style.display = "none";
        }
      }
    } else {
      console.error("Not icon: ".concat(this._name));
    }
  };

  AddonIcon.prototype.icon_on = function () {
    if (this._is_icon(this._icon)) {
      this._icon.style.display = "block";
      this._calls_count = this._calls_count + 1;
    } else {
      console.error("Not icon: ".concat(this._name));
    }
  };

  AddonIcon.prototype.get_name = function () {
    return this._name;
  };

  return AddonIcon;
}();



/***/ }),

/***/ "./ts/qr/qr_utils.ts":
/*!***************************!*\
  !*** ./ts/qr/qr_utils.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arry_renderer": function() { return /* binding */ arry_renderer; },
/* harmony export */   "arry_renderer_chunk": function() { return /* binding */ arry_renderer_chunk; },
/* harmony export */   "caller_delay_callback": function() { return /* binding */ caller_delay_callback; },
/* harmony export */   "find_element": function() { return /* binding */ find_element; },
/* harmony export */   "is_tab": function() { return /* binding */ is_tab; }
/* harmony export */ });


function is_tab(str) {
  var idx = str.indexOf("\t");

  if (idx != -1) {
    return idx;
  } else {
    return str.length;
  }
}

function arry_renderer(arry, target, callback) {
  if (callback === void 0) {
    callback = function callback() {};
  }

  var counter = 0;
  var MAX_COUNTER = arry.length;
  var BLOCK_SIZE = 1000;

  var get_block = function get_block() {
    var temp = "";

    for (var i = 0; counter < MAX_COUNTER && i < BLOCK_SIZE;) {
      temp += "".concat(arry[counter], "\n");
      counter++;
      i++;
    }

    return temp;
  };

  var render = function render(str) {
    target.innerHTML += str;
  };

  var render_dec = caller_delay_callback(render, callback);

  while (counter < MAX_COUNTER) {
    var block = get_block();
    render_dec(block);
  }
}

function arry_renderer_chunk(arry, target, callback) {
  if (callback === void 0) {
    callback = function callback() {};
  }

  var counter = 0;
  var MAX_COUNTER = arry.length;
  var BLOCK_SIZE = 500;
  var HEIGHT_TO_RENDERER = 2500;
  var fake_block = document.createElement("div");

  var get_block = function get_block() {
    var temp = "";

    for (var i = 0; counter < MAX_COUNTER && i < BLOCK_SIZE;) {
      temp += "".concat(arry[counter], "\n");
      counter++;
      i++;
    }

    return temp;
  };

  var scrollEnded = function scrollEnded() {
    window.removeEventListener("window_scroll_reset", scrollEnded);
    observer.disconnect();
    fake_block.remove();
    callback();
  };

  var frame = function frame() {
    target.innerHTML += get_block();

    if (counter >= MAX_COUNTER) {
      scrollEnded();
    }
  };

  var observer = new IntersectionObserver(frame, {
    rootMargin: "0px 0px ".concat(HEIGHT_TO_RENDERER, "px 0px"),
    threshold: 0.05
  });
  window.addEventListener("window_scroll_reset", scrollEnded);
  document.body.append(fake_block);
  observer.observe(fake_block);
}

function caller_delay_callback(func, callback) {
  if (callback === void 0) {
    callback = function callback() {};
  }

  var call_stack = [];
  var T_DELAY = 0;
  var is_start = false;
  return function caller() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    call_stack.push({
      argum: args
    });

    var func_call = function func_call() {
      if (call_stack.length >= 1) {
        var fun = call_stack.shift();
        func.apply(void 0, fun.argum);
        setTimeout(func_call, T_DELAY);
      } else {
        is_start = false;
        callback();
      }
    };

    if (!is_start) {
      is_start = true;
      setTimeout(func_call, T_DELAY);
    }
  };
}

function find_element(HtmlClassName, root) {
  if (root === void 0) {
    root = document;
  }

  var selector = root.querySelector(".".concat(HtmlClassName));

  if (selector) {
    return selector;
  } else {
    throw new Error("selector '.".concat(HtmlClassName, "' not fund in HTML"));
  }
}



/***/ }),

/***/ "./styles/css/normalize.css":
/*!**********************************!*\
  !*** ./styles/css/normalize.css ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./styles/less/components/dev_mode_sticker.less":
/*!******************************************************!*\
  !*** ./styles/less/components/dev_mode_sticker.less ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./styles/less/libs/addon_spoiler.less":
/*!*********************************************!*\
  !*** ./styles/less/libs/addon_spoiler.less ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./styles/less/libs/sidebar.less":
/*!***************************************!*\
  !*** ./styles/less/libs/sidebar.less ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./styles/less/pages_main/index.less":
/*!*******************************************!*\
  !*** ./styles/less/pages_main/index.less ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_jszip_dist_jszip_min_js-node_modules_jszip_vendor_FileSaver_js-node_modu-826c7d"], function() { return __webpack_require__("./ts/pages_scripts/index.ts"); })
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_jszip_dist_jszip_min_js-node_modules_jszip_vendor_FileSaver_js-node_modu-826c7d"], function() { return __webpack_require__("./ts/qr/qr_descriptor.ts"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_jszip_dist_jszip_min_js-node_modules_jszip_vendor_FileSaver_js-node_modu-826c7d"], function() { return __webpack_require__("./ts/my_libs/dev_sticker.ts"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.92866b4bf55dd380d17b.js.map