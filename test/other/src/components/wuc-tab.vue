<template>
  <scroll-view
    class="wuc-tab"
    :class="tabClass"
    :style="tabStyle"
    scroll-with-animation
    scroll-x
    :scroll-left="scrollLeft"
  >
    <div v-if="!textFlex">
      <div
        class="wuc-tab-item"
        :class="[index === tabCur ? selectClass + ' cur':'']"
        v-for="(item,index) in tabList"
        :key="index"
        :id="index"
        @tap="tabSelect(index,$event)"
      >
        <text :class="item.icon"></text>
        <span>{{item.name}}</span>
        <div class="v-lin"></div>
      </div>
    </div>

    <div class="flex text-center" v-if="textFlex">
      <div
        class="wuc-tab-item flex-sub"
        :class="index === tabCur ? selectClass:''"
        v-for="(item,index) in tabList"
        :key="index"
        :id="index"
        @tap="tabSelect(index,$event)"
      >
        <text :class="item.icon"></text>
        <span>{{item.name}}</span>
        <div v-if="index === tabCur" class="v-lin"></div>
      </div>
    </div>
  </scroll-view>
</template>
<script>
export default {
  name: 'wuc-tab',
  data() {
    return {};
  },
  props: {
    tabList: {
      type: Array,
      default() {
        return [];
      }
    },
    tabCur: {
      type: Number,
      default() {
        return 0;
      }
    },
    tabClass: {
      type: String,
      default() {
        return '';
      }
    },
    tabStyle: {
      type: String,
      default() {
        return '';
      }
    },
    textFlex: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selectClass: {
      type: String,
      default() {
        return 'text-select';
      }
    }
  },
  methods: {
    tabSelect(index, e) {
      if (this.currentTab === index) return false;
      this.$emit('update:tabCur', index);
      this.$emit('change', index);
    }
  },
  computed: {
    scrollLeft() {
      return (this.tabCur - 1) * 60;
    }
  }
};
</script>
<style>
div,
scroll-view,
swiper {
  box-sizing: border-box;
}

.wuc-tab {
  white-space: nowrap;
}

.wuc-tab-item {
  height: 90upx;
  display: inline-block;
  line-height: 90upx;
  margin: 0 10upx;
  padding: 0 20upx;
  color: #888888;
}

.wuc-tab.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1024;
  box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

.flex {
  display: flex;
}

.text-center {
  text-align: center;
}

.flex-sub {
  flex: 1;
}

.text-select {
  font-size: 32upx;
  color: #353535;
}

.text-white {
  color: #ffffff;
}

.v-lin {
  position: relative;
  top: -10upx;
  margin: 0 auto;
  width: 80upx;
  height: 2upx;
  border: 4upx solid #b01e25;
  border-radius: 4rpx;
}
</style>
