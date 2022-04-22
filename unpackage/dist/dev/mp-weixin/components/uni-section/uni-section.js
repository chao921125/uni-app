"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "UniSection",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333"
    },
    subTitle: {
      type: String,
      default: ""
    },
    padding: {
      type: Boolean,
      default: false
    },
    overflow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    title(newVal) {
      if (common_vendor.index.report && newVal !== "") {
        common_vendor.index.report("title", newVal);
      }
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.type
  }, $props.type ? {
    b: common_vendor.n($props.type)
  } : {}, {
    c: common_vendor.t($props.title),
    d: !$props.subTitle ? 1 : "",
    e: $props.color,
    f: $props.subTitle
  }, $props.subTitle ? {
    g: common_vendor.t($props.subTitle)
  } : {}, {
    h: $props.overflow ? 1 : "",
    i: $props.padding ? "10px" : ""
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/works/Web/uni-app/components/uni-section/uni-section.vue"]]);
wx.createComponent(Component);
