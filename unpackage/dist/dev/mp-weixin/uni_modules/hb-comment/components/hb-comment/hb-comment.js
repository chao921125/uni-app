"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "hb-comment",
  props: {
    cmData: {
      type: Object,
      default: () => {
        return null;
      }
    },
    deleteTip: {
      type: String,
      default: () => {
        return "\u64CD\u4F5C\u4E0D\u53EF\u9006\uFF0C\u5982\u679C\u8BC4\u8BBA\u4E0B\u6709\u5B50\u8BC4\u8BBA\uFF0C\u4E5F\u5C06\u88AB\u4E00\u5E76\u5220\u9664\uFF0C\u786E\u8BA4\uFF1F";
      }
    }
  },
  watch: {
    cmData: {
      handler: function(newVal, oldVal) {
        this.init(newVal);
      },
      immediate: true
    }
  },
  data() {
    return {
      "emptyAvatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABF5JREFUWEfFl11oHFUUx//nbmKwxdJ9qFL7YPEhRJC2gljjF60WG0WsoNkWfSnZ7Jy7FVPF0AoKpmBFqyIG3Jk7G1iIQXHbBz+KbbGtRfBbMe2LseKjiVDoiqIhwZ0jV3fb3cnM7kQCuU+7M+ec/+9+nHPPEJZ50DLrY1EApVJp9fz8/BYRuZ2INgDYWJvAWRE5R0RnZmZmPh4ZGZlPOrFEAMVi8e4gCPYSUZ+IXGGFgiCYIaJpKyQi1yql1orIFgAXARxRSvm5XO67diBtAYwxRQCDAE4RUUkpdWxwcNCKLBiu665TSj0kIpqIbgTgMzO3gmgJYIz5CMB9AIaZ+bXGQMVi8RoRuZeI/lZKHc1ms3/U34+Pj6+cnZ3dC+AggGPMfH8cRCyAMUZqThlmPlwPUCgU0qlUyq7Kww1BrbjHzPsahYwx/QDK9hkzR2pFPjTGnAWwIexkjOkRkRIR3Rozo5Miskdr/VMIxE7mHDPXD+2l1wsA6nseBMHmfD7/dSjQOwB2tTlYC/bddd1blFJfARhj5lyjfxNA7bSfitpz3/d3iYgFaDuUUjeHM8AY8zSAV5VS9+RyudP1IE0Axpj3Aaxk5m1hFc/zPiWiO9uq/2dwiJn3h22NMScB/MnMOxYAjI6Orurq6rpgU0hrXYpw/hFAd0KAD5n5wbCt7/t7ROT1ubm5NUNDQ7/b95dWwHXd7Uqp452dnVcPDAxciACwDlclAbAFynGcdRGr2EtEnwdB0JfP5080ARhjDhLRbY7jbI0SMcZUAKxOAgDgN2ZOx8SxGfEiMz/bBOD7/lgQBCu01o/GOH4PYFNCgElmvinK1vf9X2xxchzHVtfLW2CMOQpgipmHYwBeBtBUaOJgRKSgtX48Js63AH5l5geaADzPe1cpddFxnHyM42YAXyZYAXt+epn557iVFJHzWuudYYDnlFJ9juPcESfi+35JRHa3gdjPzIfibIwxNtPe0Fq/EAZ4hIhcZl4T5+y67nql1CcA1kfZENFnrSZQ6ycqItKvtT4SBthIRJMdHR092WzW5nzk8H1/WEReiQHY4TjOB3G+nuf9qyEim7TW9r65fAjL5fKVlUrlPICXmPnNFquwWym1oFBZ+yAItubz+TMtAJ4gon3pdLo7k8nMNgHYP7ZeE5EWkbuYeaYx0NjY2HXValUDeApAV4zIJIADzPxe+H2hULg+lUp9U6sBl3qLprugXC6nKpXKF0R02nGcZ2wQ3/e3ichOEckQ0aoEWQDbsgF4a3p6eqLeH3qeN0FE3el0ujeTyVTrcaKuY1uIjIg8CaCfiLYnEW1hY4WPi8gEgMeY+e1G27iGxHYxtptZynGYmTPhgK1asqWEiBRfcAjDdMaYpYCIFW8LUMuM54nIsb3/YvbDXskiYtuzA6382n4X1CDWAnCSgNSFa98ETakcWbwWMytjzAoAPUEQ3JBKpXrs75r/VLVanVJK/VC7Uf9KGjfRCiQN9n/slh3gHz9i4jC+FVL5AAAAAElFTkSuQmCC",
      "commentData": null,
      "placeholder": "\u8BF7\u8F93\u5165\u8BC4\u8BBA",
      "commentReq": {
        "pId": null,
        "content": null
      },
      "pUser": null,
      "showTag": false,
      "focus": false,
      "submit": false,
      "KeyboardHeight": 0
    };
  },
  mounted: function() {
    common_vendor.index.onKeyboardHeightChange((res) => {
      this.KeyboardHeight = res.height;
    });
  },
  methods: {
    init(cmData) {
      this.commentData = cmData;
    },
    stopPrevent() {
    },
    reply(pUser, reUser, pId) {
      this.pUser = pUser;
      this.commentReq.pId = pId;
      if (reUser) {
        this.commentReq.content = "@" + reUser + " ";
      } else {
        this.commentReq.content = "";
      }
      this.showTag = true;
      this.commentInput();
    },
    confirmDelete(commentId) {
      var that = this;
      common_vendor.index.showModal({
        title: "\u8B66\u544A",
        content: that.deleteTip,
        confirmText: "\u786E\u8BA4\u5220\u9664",
        success: function(res) {
          if (res.confirm) {
            that.$emit("del", commentId);
          }
        }
      });
    },
    add() {
      if (this.commentReq.content == null || this.commentReq.content.length < 2) {
        common_vendor.index.showToast({
          title: "\u8BC4\u8BBA\u5185\u5BB9\u8FC7\u77ED",
          duration: 2e3
        });
        return;
      }
      this.$emit("add", this.commentReq);
    },
    like(commentId) {
      this.$emit("like", commentId);
    },
    addComplete() {
      this.commentReq.content = null;
      this.tagClose();
      this.closeInput();
    },
    likeComplete(commentId) {
      for (var i in this.commentData.comment) {
        if (this.commentData.comment[i].id == commentId) {
          this.commentData.comment[i].hasLike ? this.commentData.comment[i].likeNum-- : this.commentData.comment[i].likeNum++;
          this.commentData.comment[i].hasLike = !this.commentData.comment[i].hasLike;
          return;
        }
        for (var j in this.commentData.comment[i].children) {
          if (this.commentData.comment[i].children[j].id == commentId) {
            this.commentData.comment[i].children[j].hasLike ? this.commentData.comment[i].children[j].likeNum-- : this.commentData.comment[i].children[j].likeNum++;
            this.commentData.comment[i].children[j].hasLike = !this.commentData.comment[i].children[j].hasLike;
            return;
          }
        }
      }
    },
    deleteComplete(commentId) {
      for (var i in this.commentData.comment) {
        for (var j in this.commentData.comment[i].children) {
          if (this.commentData.comment[i].children[j].id == commentId) {
            this.commentData.comment[i].children.splice(Number(j), 1);
            return;
          }
        }
        if (this.commentData.comment[i].id == commentId) {
          this.commentData.comment.splice(Number(i), 1);
          return;
        }
      }
    },
    showMore(commentId) {
      for (var i in this.commentData.comment) {
        if (this.commentData.comment[i].id == commentId) {
          this.commentData.comment[i].hasShowMore = !this.commentData.comment[i].hasShowMore;
          this.$forceUpdate();
          return;
        }
        for (var j in this.commentData.comment[i].children) {
          if (this.commentData.comment[i].children[j].id == commentId) {
            this.commentData.comment[i].children[j].hasShowMore = !this.commentData.comment[i].children[j].hasShowMore;
            this.$forceUpdate();
            return;
          }
        }
      }
    },
    blur() {
      this.focus = false;
    },
    focusOn() {
      this.$emit("focusOn");
    },
    tagClose() {
      this.showTag = false;
      this.pUser = null;
      this.commentReq.pId = null;
    },
    commentInput() {
      this.submit = true;
      setTimeout(() => {
        this.focus = true;
      }, 50);
    },
    closeInput() {
      this.focus = false;
      this.submit = false;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.commentData.readNumer),
    b: $data.commentData.comment.length != 0
  }, $data.commentData.comment.length != 0 ? {
    c: common_vendor.t($data.commentData.commentSize),
    d: common_vendor.o((...args) => $options.commentInput && $options.commentInput(...args)),
    e: common_vendor.f($data.commentData.comment, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatarUrl || $data.emptyAvatar,
        b: index == 0
      }, index == 0 ? {} : {}, {
        c: index == 1
      }, index == 1 ? {} : {}, {
        d: index == 2
      }, index == 2 ? {} : {}, {
        e: index > 2
      }, index > 2 ? {
        f: common_vendor.t(index + 1)
      } : {}, {
        g: common_vendor.t(item.nickName),
        h: common_vendor.t(item.likeNum == 0 ? "\u62A2\u9996\u8D5E" : item.likeNum),
        i: common_vendor.n(item.hasLike ? "isLike" : "notLike"),
        j: !item.hasLike
      }, !item.hasLike ? {} : {}, {
        k: common_vendor.o(($event) => $options.like(item.id)),
        l: common_vendor.t(item.content.length > 60 ? item.content.slice(0, 59) : item.content),
        m: item.content.length > 60
      }, item.content.length > 60 ? {
        n: common_vendor.t(item.hasShowMore ? item.content.slice(59) : "..."),
        o: common_vendor.t(item.hasShowMore ? "\u6536\u8D77" : "\u5C55\u5F00"),
        p: common_vendor.o(($event) => $options.showMore(item.id))
      } : {}, {
        q: common_vendor.t(item.createTime),
        r: common_vendor.o(($event) => $options.reply(item.nickName, item.nickName, item.id)),
        s: item.owner
      }, item.owner ? {
        t: common_vendor.o(($event) => $options.confirmDelete(item.id))
      } : {}, {
        v: common_vendor.f(item.children, (each, k1, i1) => {
          return common_vendor.e({
            a: each.avatarUrl || $data.emptyAvatar,
            b: common_vendor.t(each.nickName),
            c: common_vendor.t(each.likeNum == 0 ? "\u62A2\u9996\u8D5E" : each.likeNum),
            d: common_vendor.n(each.hasLike ? "isLike" : "notLike"),
            e: !each.hasLike
          }, !each.hasLike ? {} : {}, {
            f: common_vendor.o(($event) => $options.like(each.id)),
            g: common_vendor.t(each.content.length > 60 ? each.content.slice(0, 59) : each.content),
            h: each.content.length > 60
          }, each.content.length > 60 ? {
            i: common_vendor.t(each.hasShowMore ? each.content.slice(59) : "..."),
            j: common_vendor.t(each.hasShowMore ? "\u6536\u8D77" : "\u5C55\u5F00"),
            k: common_vendor.o(($event) => $options.showMore(each.id))
          } : {}, {
            l: common_vendor.t(each.createTime),
            m: common_vendor.o(($event) => $options.reply(item.nickName, each.nickName, item.id)),
            n: each.owner
          }, each.owner ? {
            o: common_vendor.o(($event) => $options.confirmDelete(each.id))
          } : {});
        })
      });
    })
  } : {
    f: common_vendor.o((...args) => $options.commentInput && $options.commentInput(...args))
  }, {
    g: $data.submit
  }, $data.submit ? {
    h: common_vendor.o((...args) => $options.closeInput && $options.closeInput(...args)),
    i: common_vendor.t($data.pUser),
    j: common_vendor.o((...args) => $options.tagClose && $options.tagClose(...args)),
    k: $data.showTag,
    l: common_vendor.o((...args) => $options.add && $options.add(...args)),
    m: $data.placeholder,
    n: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    o: common_vendor.o((...args) => $options.focusOn && $options.focusOn(...args)),
    p: $data.focus,
    q: $data.commentReq.content,
    r: common_vendor.o(($event) => $data.commentReq.content = $event.detail.value),
    s: common_vendor.o((...args) => $options.stopPrevent && $options.stopPrevent(...args)),
    t: common_vendor.s("bottom:" + $data.KeyboardHeight + "px"),
    v: common_vendor.o((...args) => $options.closeInput && $options.closeInput(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-36062064"], ["__file", "/Users/huangchao/works/Study/uni-app/uni_modules/hb-comment/components/hb-comment/hb-comment.vue"]]);
wx.createComponent(Component);
