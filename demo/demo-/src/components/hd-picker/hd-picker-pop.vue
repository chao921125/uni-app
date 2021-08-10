<template>
  <!-- 互达-picker弹窗 -->
  <view class="mpvue-picker">
    <view :class="{ pickerMask: showPicker }" @click="maskClick" catchtouchmove="true"></view>
    <view class="mpvue-picker-content" :class="{ 'mpvue-picker-view-show': showPicker }">
      <view class="mpvue-picker__hd" catchtouchmove="true">
        <view class="mpvue-picker__action" @click="pickerCancel">{{$t('cancel')}}</view>
        <view
          class="mpvue-picker__action"
          :style="{ color: themeColor }"
          @click="pickerConfirm"
        >{{$t('Confirm')}}</view>
      </view>
      <!-- 单列 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
        v-if="mode === 'selector' && pickerValueSingleArray.length > 0"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueSingleArray"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 时间选择器 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
        v-if="mode === 'timeSelector'"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueHour"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueMinute"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 多列选择 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
        v-if="mode === 'multiSelector'"
      >
        <block v-for="(n, index) in pickerValueMulArray.length" :key="index">
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index1) in pickerValueMulArray[n]"
              :key="index1"
            >{{ item.name }}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 二级联动 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChangeMul"
        v-if="mode === 'multiLinkageSelector' && deepLength === 2"
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueMulTwoOne"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueMulTwoTwo"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
        </block>
      </picker-view>
      <!-- 三级联动 -->
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChangeMul"
        v-if="
          mode === 'date' ||
            (mode === 'multiLinkageSelector' && deepLength === 3)
        "
      >
        <block>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueMulThreeOne"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueMulThreeTwo"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view
              class="picker-item"
              v-for="(item, index) in pickerValueMulThreeThree"
              :key="index"
            >{{ item.name }}</view>
          </picker-view-column>
        </block>
      </picker-view>
    </view>
  </view>
</template>

<script>
// 计算指定【年-月的天数
function getDaysForMonth(year, month) {
  const isBigYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  // 大月
  const isBigMonth = [1, 3, 5, 7, 8, 10, 12].includes(month);
  let dayMax = isBigMonth ? 31 : 30;
  if (month === 2) {
    dayMax = isBigYear ? 29 : 28;
  }
  return dayMax;
}
export default {
  data() {
    return {
      pickerChangeValue: [],
      pickerValue: [],
      pickerValueArrayChange: true,
      modeChange: false,
      pickerValueSingleArray: [],
      pickerValueHour: [],
      pickerValueMinute: [],
      pickerValueMulArray: [],
      pickerValueMulTwoOne: [],
      pickerValueMulTwoTwo: [],
      pickerValueMulThreeOne: [],
      pickerValueMulThreeTwo: [],
      pickerValueMulThreeThree: [],
      /* 是否显示控件 */
      showPicker: false
    };
  },
  props: {
    /* mode */
    mode: {
      type: String,
      default: 'selector'
    },
    /* picker 数值 */
    range: {
      type: Array,
      default() {
        return [];
      }
    },
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default() {
        return [];
      }
    },
    /* 几级联动 */
    deepLength: {
      type: Number,
      default: 2
    },
    /* 主题色 */
    themeColor: String,
    /* 开始时间 */
    start: {
      type: String,
      default() {
        return '1949-01-01';
      }
    },
    /* 结束时间 */
    end: {
      type: String,
      default() {
        return '2100-01-01';
      }
    }
  },
  watch: {
    range(oldVal, newVal) {
      this.pickerValueArrayChange = true;
    },
    mode(oldVal, newVal) {
      this.modeChange = true;
    },
    range(val) {
      this.initPicker(val);
    }
  },
  methods: {
    initPicker(valueArray) {
      let range = valueArray;
      this.pickerValue = this.pickerValueDefault;
      // 初始化多级联动
      if (this.mode === 'selector') {
        this.pickerValueSingleArray = valueArray;
      } else if (this.mode === 'date') {
        let pickerValueMulThreeOne = [];
        let pickerValueMulThreeTwo = [];
        let pickerValueMulThreeThree = [];
        this.pickerValue = [0, 0, 0];
        // 当前日期
        const dateDefault = new Date();
        const yearDefault = dateDefault.getFullYear();
        const monthDefault = dateDefault.getMonth() + 1;
        const dayDefault = dateDefault.getDate();
        // 开始-结束
        const dateBegin = new Date(this.start);
        const dateEnd = new Date(this.end);
        let yearBegin = dateBegin.getFullYear();
        const yearEnd = dateEnd.getFullYear();
        // 年计算
        for (let i = 1; yearBegin <= yearEnd; i++) {
          yearBegin++;
          pickerValueMulThreeOne.push({
            value: yearBegin,
            valueStr: `${yearBegin}`,
            name: `${yearBegin}${this.$t('year')}`
          });
          if (yearBegin === yearDefault) {
            this.pickerValue[0] = i - 1;
          }
        }
        // 月计算
        for (let i = 1; i < 13; i++) {
          const prefix = i > 9 ? '' : '0';
          pickerValueMulThreeTwo.push({
            value: i,
            valueStr: `${prefix}${i}`,
            name: `${prefix}${i}${this.$t('month')}`
          });
          if (i === monthDefault) {
            this.pickerValue[1] = i - 1;
          }
        }
        // 日计算
        const dayMax = getDaysForMonth(yearDefault, monthDefault);
        for (let i = 1; i <= dayMax; i++) {
          const prefix = i > 9 ? '' : '0';
          pickerValueMulThreeThree.push({
            value: i,
            valueStr: `${prefix}${i}`,
            name: `${prefix}${i}${this.$t('day')}`
          });
          if (i === dayDefault) {
            this.pickerValue[2] = i - 1;
          }
        }
        this.pickerValueMulThreeOne = pickerValueMulThreeOne;
        this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
        this.pickerValueMulThreeThree = pickerValueMulThreeThree;
      } else if (this.mode === 'timeSelector') {
        this.modeChange = false;
        let hourArray = [];
        let minuteArray = [];
        for (let i = 0; i < 24; i++) {
          hourArray.push({
            value: i,
            name: i > 9 ? `${i} 时` : `0${i} 时`
          });
        }
        for (let i = 0; i < 60; i++) {
          minuteArray.push({
            value: i,
            name: i > 9 ? `${i} 分` : `0${i} 分`
          });
        }
        this.pickerValueHour = hourArray;
        this.pickerValueMinute = minuteArray;
      } else if (this.mode === 'multiSelector') {
        this.pickerValueMulArray = valueArray;
      } else if (
        this.mode === 'multiLinkageSelector' &&
        this.deepLength === 2
      ) {
        // 两级联动
        let pickerValueMulTwoOne = [];
        let pickerValueMulTwoTwo = [];
        // 第一列
        for (let i = 0, length = range.length; i < length; i++) {
          pickerValueMulTwoOne.push(range[i]);
        }
        // 渲染第二列
        // 如果有设定的默认值
        if (this.pickerValueDefault.length === 2) {
          let num = this.pickerValueDefault[0];
          for (
            let i = 0, length = range[num].children.length;
            i < length;
            i++
          ) {
            pickerValueMulTwoTwo.push(range[num].children[i]);
          }
        } else {
          for (let i = 0, length = range[0].children.length; i < length; i++) {
            pickerValueMulTwoTwo.push(range[0].children[i]);
          }
        }
        this.pickerValueMulTwoOne = pickerValueMulTwoOne;
        this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
      } else if (
        this.mode === 'multiLinkageSelector' &&
        this.deepLength === 3
      ) {
        let pickerValueMulThreeOne = [];
        let pickerValueMulThreeTwo = [];
        let pickerValueMulThreeThree = [];
        // 第一列
        for (let i = 0, length = range.length; i < length; i++) {
          pickerValueMulThreeOne.push(range[i]);
        }
        // 渲染第二列
        this.pickerValueDefault =
          this.pickerValueDefault.length === 3
            ? this.pickerValueDefault
            : [0, 0, 0];
        if (this.pickerValueDefault.length === 3) {
          let num = this.pickerValueDefault[0];
          for (
            let i = 0, length = range[num].children.length;
            i < length;
            i++
          ) {
            pickerValueMulThreeTwo.push(range[num].children[i]);
          }
          // 第三列
          let numSecond = this.pickerValueDefault[1];
          for (
            let i = 0, length = range[num].children[numSecond].children.length;
            i < length;
            i++
          ) {
            pickerValueMulThreeThree.push(
              range[num].children[numSecond].children[i]
            );
          }
        }
        this.pickerValueMulThreeOne = pickerValueMulThreeOne;
        this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
        this.pickerValueMulThreeThree = pickerValueMulThreeThree;
      }
    },
    show() {
      setTimeout(() => {
        if (this.pickerValueArrayChange || this.modeChange) {
          this.initPicker(this.range);
          this.showPicker = true;
          this.pickerValueArrayChange = false;
          this.modeChange = false;
        } else {
          this.showPicker = true;
        }
      }, 0);
    },
    current() {
      return this._getPickerLabelAndValue(this.pickerValue, this.mode);
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
      this._initPickerVale();
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        name: this._getPickerLabelAndValue(this.pickerValue, this.mode).name
      };
      pickObj = {
        target: pickObj,
        detail: {
          value: pickObj.value
        },
        ...pickObj
      };
      this.$emit('cancel', pickObj);
    },
    pickerConfirm(e) {
      this.showPicker = false;
      this._initPickerVale();
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        name: this._getPickerLabelAndValue(this.pickerValue, this.mode).name
      };
      pickObj = {
        target: pickObj,
        detail: {
          value: pickObj.value
        },
        ...pickObj
      };
      this.$emit('confirm', pickObj);
    },
    showPickerView() {
      this.showPicker = true;
    },
    pickerChange(e) {
      this.pickerValue = e.mp.detail.value;
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode)
          .value[0],
        name: this._getPickerLabelAndValue(this.pickerValue, this.mode).name
      };
      pickObj = {
        target: pickObj,
        detail: {
          value: pickObj.value
        },
        ...pickObj
      };
      this.$emit('change', pickObj);
    },
    pickerChangeMul(e) {
      if (this.mode === 'date') {
        // 获取变更的多列选择下标数组
        let changeValue = e.mp.detail.value;
        // 预定义新的二列三列数组对象
        let pickerValueMulThreeThree = [];
        // 重新渲染第二列
        // 如果是第一列滚动
        if (changeValue[0] !== this.pickerValue[0]) {
          // 重新渲染第3列
          if (this.pickerValueMulThreeThree.length < 31) {
            for (let i = 1; i <= 31; i++) {
              const prefix = i > 9 ? '' : '0';
              pickerValueMulThreeThree.push({
                value: i,
                valueStr: `${prefix}${i}`,
                name: `${prefix}${i}${this.$t('day')}`
              });
            }
            this.pickerValueMulThreeThree = pickerValueMulThreeThree;
          }
          // 默认01月
          changeValue[1] = 0;
          // 默认01日
          changeValue[2] = 0;
        } else if (changeValue[1] !== this.pickerValue[1]) {
          const y = this.pickerValueMulThreeOne[changeValue[0]].value;
          const m = this.pickerValueMulThreeTwo[changeValue[1]].value;
          // 重新渲染第3列
          const dayMax = getDaysForMonth(y, m);
          if (this.pickerValueMulThreeThree.length !== dayMax) {
            for (let i = 1; i <= 31; i++) {
              const prefix = i > 9 ? '' : '0';
              pickerValueMulThreeThree.push({
                value: i,
                valueStr: `${prefix}${i}`,
                name: `${prefix}${i}${this.$t('day')}`
              });
            }
            this.pickerValueMulThreeThree = pickerValueMulThreeThree;
          }
          // 默认01日
          changeValue[2] = 0;
        }
        this.pickerValue = changeValue;
      } else if (this.deepLength === 2) {
        let range = this.range;
        let changeValue = e.mp.detail.value;
        // 处理第一列滚动
        if (changeValue[0] !== this.pickerValue[0]) {
          let pickerValueMulTwoTwo = [];
          // 第一列滚动第二列数据更新
          for (
            let i = 0, length = range[changeValue[0]].children.length;
            i < length;
            i++
          ) {
            pickerValueMulTwoTwo.push(range[changeValue[0]].children[i]);
          }
          this.pickerValueMulTwoTwo = pickerValueMulTwoTwo;
          // 第二列初始化为 0
          changeValue[1] = 0;
        }
        this.pickerValue = changeValue;
      } else if (this.deepLength === 3) {
        let range = this.range;
        let changeValue = e.mp.detail.value;
        let pickerValueMulThreeTwo = [];
        let pickerValueMulThreeThree = [];
        // 重新渲染第二列
        // 如果是第一列滚动
        if (changeValue[0] !== this.pickerValue[0]) {
          this.pickerValueMulThreeTwo = [];
          for (
            let i = 0, length = range[changeValue[0]].children.length;
            i < length;
            i++
          ) {
            pickerValueMulThreeTwo.push(range[changeValue[0]].children[i]);
          }
          // 重新渲染第三列
          for (
            let i = 0,
            length = range[changeValue[0]].children[0].children.length;
            i < length;
            i++
          ) {
            pickerValueMulThreeThree.push(
              range[changeValue[0]].children[0].children[i]
            );
          }
          changeValue[1] = 0;
          changeValue[2] = 0;
          this.pickerValueMulThreeTwo = pickerValueMulThreeTwo;
          this.pickerValueMulThreeThree = pickerValueMulThreeThree;
        } else if (changeValue[1] !== this.pickerValue[1]) {
          // 第二列滚动
          // 重新渲染第三列
          this.pickerValueMulThreeThree = [];
          pickerValueMulThreeTwo = this.pickerValueMulThreeTwo;
          for (
            let i = 0,
            length =
              range[changeValue[0]].children[changeValue[1]].children.length;
            i < length;
            i++
          ) {
            pickerValueMulThreeThree.push(
              range[changeValue[0]].children[changeValue[1]].children[i]
            );
          }
          changeValue[2] = 0;
          this.pickerValueMulThreeThree = pickerValueMulThreeThree;
        }
        this.pickerValue = changeValue;
      }
      let pickObj = {
        index: this.pickerValue,
        value: this._getPickerLabelAndValue(this.pickerValue, this.mode).value,
        name: this._getPickerLabelAndValue(this.pickerValue, this.mode).name
      };
      pickObj = {
        target: pickObj,
        detail: {
          value: pickObj.value
        },
        ...pickObj
      };
      this.$emit('change', pickObj);
    },
    // 获取 pxikerLabel
    _getPickerLabelAndValue(value, mode) {
      let pickerLable;
      let pickerGetValue = [];
      // selector
      if (mode === 'selector') {
        pickerLable = this.pickerValueSingleArray[value].name;
        pickerGetValue = this.pickerValueSingleArray[value].value;
      } else if (mode === 'timeSelector') {
        pickerLable = `${this.pickerValueHour[value[0]].name}-${
          this.pickerValueMinute[value[1]].name
          }`;
        pickerGetValue.push(this.pickerValueHour[value[0]].value);
        pickerGetValue.push(this.pickerValueHour[value[1]].value);
      } else if (mode === 'multiSelector') {
        for (let i = 0; i < value.length; i++) {
          if (i > 0) {
            pickerLable +=
              this.pickerValueMulArray[i][value[i]].name +
              (i === value.length - 1 ? '' : '-');
          } else {
            pickerLable = this.pickerValueMulArray[i][value[i]].name + '-';
          }
          pickerGetValue.push(this.pickerValueMulArray[i][value[i]].value);
        }
      } else if (mode === 'multiLinkageSelector') {
        /* eslint-disable indent */
        pickerLable =
          this.deepLength === 2
            ? `${this.pickerValueMulTwoOne[value[0]].name}-${
            this.pickerValueMulTwoTwo[value[1]].name
            }`
            : `${this.pickerValueMulThreeOne[value[0]].name}-${
            this.pickerValueMulThreeTwo[value[1]].name
            }-${this.pickerValueMulThreeThree[value[2]].name}`;
        if (this.deepLength === 2) {
          pickerGetValue.push(this.pickerValueMulTwoOne[value[0]].value);
          pickerGetValue.push(this.pickerValueMulTwoTwo[value[1]].value);
        } else {
          pickerGetValue.push(this.pickerValueMulThreeOne[value[0]].value);
          pickerGetValue.push(this.pickerValueMulThreeTwo[value[1]].value);
          pickerGetValue.push(this.pickerValueMulThreeThree[value[2]].value);
        }
        /* eslint-enable indent */
      } else if (mode === 'date') {
        const yNode = this.pickerValueMulThreeOne[value[0]];
        const mNode = this.pickerValueMulThreeTwo[value[1]];
        const dNode = this.pickerValueMulThreeThree[value[2]];
        pickerLable = `${yNode.name}${mNode.name}${dNode.name}`;
        pickerGetValue = `${yNode.valueStr}-${mNode.valueStr}-${dNode.valueStr}`;
      }
      return {
        name: pickerLable,
        value: pickerGetValue
      };
    },
    // 初始化 pickerValue 默认值
    _initPickerVale() {
      if (this.pickerValue.length === 0) {
        if (this.mode === 'selector') {
          this.pickerValue = [0];
        } else if (this.mode === 'multiSelector') {
          this.pickerValue = new Int8Array(this.range.length);
        } else if (
          this.mode === 'multiLinkageSelector' &&
          this.deepLength === 2
        ) {
          this.pickerValue = [0, 0];
        } else if (
          this.mode === 'multiLinkageSelector' &&
          this.deepLength === 3
        ) {
          this.pickerValue = [0, 0, 0];
        }
      }
    }
  }
};
</script>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}

.mpvue-picker-view-show {
  transform: translateY(0);
}

.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}

.mpvue-picker__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}

.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #68c5c8;
}

.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}

.mpvue-picker__action:last-child {
  text-align: right;
}

.picker-item {
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}

.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
