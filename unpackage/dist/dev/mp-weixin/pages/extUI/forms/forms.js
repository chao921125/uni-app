"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      baseFormData: {
        name: "",
        age: "",
        introduction: "",
        sex: 2,
        hobby: [5],
        datetimesingle: 1627529992399
      },
      alignmentFormData: {
        name: "",
        age: ""
      },
      sexs: [{
        text: "\u7537",
        value: 0
      }, {
        text: "\u5973",
        value: 1
      }, {
        text: "\u4FDD\u5BC6",
        value: 2
      }],
      hobbys: [{
        text: "\u8DD1\u6B65",
        value: 0
      }, {
        text: "\u6E38\u6CF3",
        value: 1
      }, {
        text: "\u7ED8\u753B",
        value: 2
      }, {
        text: "\u8DB3\u7403",
        value: 3
      }, {
        text: "\u7BEE\u7403",
        value: 4
      }, {
        text: "\u5176\u4ED6",
        value: 5
      }],
      current: 0,
      items: ["\u5DE6\u5BF9\u9F50", "\u9876\u90E8\u5BF9\u9F50"],
      valiFormData: {
        name: "",
        age: "",
        introduction: ""
      },
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: "\u5E74\u9F84\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            format: "number",
            errorMessage: "\u5E74\u9F84\u53EA\u80FD\u8F93\u5165\u6570\u5B57"
          }]
        }
      },
      customFormData: {
        name: "",
        age: "",
        hobby: []
      },
      customRules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: "\u5E74\u9F84\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        },
        hobby: {
          rules: [
            {
              format: "array"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (value.length < 2) {
                  callback("\u8BF7\u81F3\u5C11\u52FE\u9009\u4E24\u4E2A\u5174\u8DA3\u7231\u597D");
                }
                return true;
              }
            }
          ]
        }
      },
      dynamicFormData: {
        email: "",
        domains: {}
      },
      dynamicLists: [],
      dynamicRules: {
        email: {
          rules: [{
            required: true,
            errorMessage: "\u57DF\u540D\u4E0D\u80FD\u4E3A\u7A7A"
          }, {
            format: "email",
            errorMessage: "\u57DF\u540D\u683C\u5F0F\u9519\u8BEF"
          }]
        }
      }
    };
  },
  computed: {
    alignment() {
      if (this.current === 0)
        return "left";
      if (this.current === 1)
        return "top";
      return "left";
    }
  },
  onLoad() {
  },
  onReady() {
    this.$refs.customForm.setRules(this.customRules);
  },
  methods: {
    onClickItem(e) {
      console.log(e);
      this.current = e.currentIndex;
    },
    add() {
      this.dynamicLists.push({
        label: "\u57DF\u540D",
        rules: [{
          "required": true,
          errorMessage: "\u57DF\u540D\u9879\u5FC5\u586B"
        }],
        id: Date.now()
      });
    },
    del(id) {
      let index = this.dynamicLists.findIndex((v) => v.id === id);
      this.dynamicLists.splice(index, 1);
    },
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `\u6821\u9A8C\u901A\u8FC7`
        });
      }).catch((err) => {
        console.log("err", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  (_easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2 + _easycom_uni_section2 + _easycom_uni_segmented_control2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_forms + _easycom_uni_section + _easycom_uni_segmented_control)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o(($event) => $data.baseFormData.name = $event),
    c: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.baseFormData.name
    }),
    d: common_vendor.p({
      label: "\u59D3\u540D",
      required: true
    }),
    e: common_vendor.o(($event) => $data.baseFormData.age = $event),
    f: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5E74\u9F84",
      modelValue: $data.baseFormData.age
    }),
    g: common_vendor.p({
      label: "\u5E74\u9F84",
      required: true
    }),
    h: common_vendor.o(($event) => $data.baseFormData.sex = $event),
    i: common_vendor.p({
      localdata: $data.sexs,
      modelValue: $data.baseFormData.sex
    }),
    j: common_vendor.p({
      label: "\u6027\u522B",
      required: true
    }),
    k: common_vendor.o(($event) => $data.baseFormData.hobby = $event),
    l: common_vendor.p({
      multiple: true,
      localdata: $data.hobbys,
      modelValue: $data.baseFormData.hobby
    }),
    m: common_vendor.p({
      label: "\u5174\u8DA3\u7231\u597D",
      required: true
    }),
    n: common_vendor.o(($event) => $data.baseFormData.introduction = $event),
    o: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u81EA\u6211\u4ECB\u7ECD",
      modelValue: $data.baseFormData.introduction
    }),
    p: common_vendor.p({
      label: "\u81EA\u6211\u4ECB\u7ECD"
    }),
    q: common_vendor.o(($event) => $data.baseFormData.datetimesingle = $event),
    r: common_vendor.p({
      type: "datetime",
      ["return-type"]: "timestamp",
      modelValue: $data.baseFormData.datetimesingle
    }),
    s: common_vendor.p({
      label: "\u65E5\u671F\u65F6\u95F4"
    }),
    t: common_vendor.sr("baseForm", "c38b8f80-2,c38b8f80-1"),
    v: common_vendor.p({
      modelValue: $data.baseFormData
    }),
    w: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line"
    }),
    x: common_vendor.o($options.onClickItem),
    y: common_vendor.p({
      current: $data.current,
      values: $data.items,
      styleType: "button"
    }),
    z: common_vendor.o(($event) => $data.baseFormData.name = $event),
    A: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.baseFormData.name
    }),
    B: common_vendor.p({
      label: "\u59D3\u540D",
      required: true
    }),
    C: common_vendor.o(($event) => $data.baseFormData.age = $event),
    D: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5E74\u9F84",
      modelValue: $data.baseFormData.age
    }),
    E: common_vendor.p({
      label: "\u5E74\u9F84",
      required: true
    }),
    F: common_vendor.sr("baseForm", "c38b8f80-17,c38b8f80-15"),
    G: common_vendor.p({
      modelValue: $data.alignmentFormData,
      ["label-position"]: $options.alignment
    }),
    H: common_vendor.p({
      title: "\u5BF9\u9F50\u65B9\u5F0F",
      type: "line"
    }),
    I: common_vendor.o(($event) => $data.valiFormData.name = $event),
    J: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.valiFormData.name
    }),
    K: common_vendor.p({
      label: "\u59D3\u540D",
      required: true,
      name: "name"
    }),
    L: common_vendor.o(($event) => $data.valiFormData.age = $event),
    M: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5E74\u9F84",
      modelValue: $data.valiFormData.age
    }),
    N: common_vendor.p({
      label: "\u5E74\u9F84",
      required: true,
      name: "age"
    }),
    O: common_vendor.o(($event) => $data.valiFormData.introduction = $event),
    P: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u81EA\u6211\u4ECB\u7ECD",
      modelValue: $data.valiFormData.introduction
    }),
    Q: common_vendor.p({
      label: "\u81EA\u6211\u4ECB\u7ECD",
      name: "introduction"
    }),
    R: common_vendor.sr("valiForm", "c38b8f80-23,c38b8f80-22"),
    S: common_vendor.p({
      rules: $data.rules,
      modelValue: $data.valiFormData
    }),
    T: common_vendor.o(($event) => $options.submit("valiForm")),
    U: common_vendor.p({
      title: "\u8868\u5355\u6821\u9A8C",
      type: "line"
    }),
    V: common_vendor.o(($event) => $data.customFormData.name = $event),
    W: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.customFormData.name
    }),
    X: common_vendor.p({
      label: "\u59D3\u540D",
      required: true,
      name: "name"
    }),
    Y: common_vendor.o(($event) => $data.customFormData.age = $event),
    Z: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5E74\u9F84",
      modelValue: $data.customFormData.age
    }),
    aa: common_vendor.p({
      label: "\u5E74\u9F84",
      required: true,
      name: "age"
    }),
    ab: common_vendor.o(($event) => $data.customFormData.hobby = $event),
    ac: common_vendor.p({
      multiple: true,
      localdata: $data.hobbys,
      modelValue: $data.customFormData.hobby
    }),
    ad: common_vendor.p({
      label: "\u5174\u8DA3\u7231\u597D",
      required: true,
      name: "hobby"
    }),
    ae: common_vendor.sr("customForm", "c38b8f80-31,c38b8f80-30"),
    af: common_vendor.p({
      rules: $data.customRules,
      modelValue: $data.customFormData
    }),
    ag: common_vendor.o(($event) => $options.submit("customForm")),
    ah: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u6821\u9A8C\u89C4\u5219",
      type: "line"
    }),
    ai: common_vendor.o(($event) => $data.dynamicFormData.email = $event),
    aj: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D",
      modelValue: $data.dynamicFormData.email
    }),
    ak: common_vendor.p({
      label: "\u90AE\u7BB1",
      required: true,
      name: "email"
    }),
    al: common_vendor.f($data.dynamicLists, (item, index, i0) => {
      return {
        a: "c38b8f80-43-" + i0 + "," + ("c38b8f80-42-" + i0),
        b: common_vendor.o(($event) => $data.dynamicFormData.domains[item.id] = $event),
        c: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u57DF\u540D",
          modelValue: $data.dynamicFormData.domains[item.id]
        }),
        d: common_vendor.o(($event) => $options.del(item.id)),
        e: item.id,
        f: "c38b8f80-42-" + i0 + ",c38b8f80-39",
        g: common_vendor.p({
          label: item.label + " " + index,
          required: true,
          rules: item.rules,
          name: "domains[" + item.id + "]"
        })
      };
    }),
    am: common_vendor.sr("dynamicForm", "c38b8f80-39,c38b8f80-38"),
    an: common_vendor.p({
      rules: $data.dynamicRules,
      modelValue: $data.dynamicFormData
    }),
    ao: common_vendor.o((...args) => $options.add && $options.add(...args)),
    ap: common_vendor.o(($event) => $options.submit("dynamicForm")),
    aq: common_vendor.p({
      title: "\u52A8\u6001\u8868\u5355",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/huangchao/works/Web/uni-app/pages/extUI/forms/forms.vue"]]);
wx.createPage(MiniProgramPage);
