<template>
  <!-- 互达-picker 控件封装 -->
  <view>
    <view @tap="showSinglePicker">
      <slot></slot>
    </view>
    <hd-picker-pop
      :themeColor="themeColor"
      ref="hdPickerPop"
      :mode="mode"
      :deepLength="deepLength"
      :pickerValueDefault="valueDefault"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
      :range="rangeArr"
    ></hd-picker-pop>
  </view>
</template>

<script>
import hdPickerPop from '@/components/hd-picker/hd-picker-pop.vue';

export default {
  components: {
    hdPickerPop
  },
  data() {
    return {
      pickerName: '請選擇',
      rangeArr: [],
      valueDefault: []
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
    /* 指定要显示的字段 */
    rangeKey: {
      type: String
    },
    /* 默认下标 */
    value: {},
    /* 几级联动 */
    deepLength: {
      type: Number,
      default: 1
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
  created() {
    this.setRange();
  },
  mounted() {
    // 默认不显示选择
    if (this.$refs.hdPickerPop.showPicker) {
      this.$refs.hdPickerPop.pickerCancel();
    }
  },
  methods: {
    setRange() {
      // 字符串数组参数兼容
      if (this.rangeKey) {
        this.rangeArr = this.range.map((m, key) => {
          return { name: m[this.rangeKey], value: key };
        });
      } else if (this.range && this.range.length > 0 && !this.range[0].name) {
        this.rangeArr = this.range.map((m, key) => {
          return { name: m, value: key };
        });
      } else {
        this.rangeArr = this.range;
      }
      // 单默认值设置兼容
      if (this.value instanceof String || this.value instanceof Number) {
        this.valueDefault = [parseInt(this.value)];
      } else if (this.value instanceof Array) {
        this.valueDefault = this.value;
      }
    },
    onCancel(e) {
      this.$emit('cancel', e);
    },
    onConfirm(e) {
      if (this.mode === 'selector') {
        // 兼容uni-app的picker
        e.target.value = e.target.index[0];
        e.detail.value = e.target.index[0];
      }
      this.$emit('change', e);
    },
    onChange(e) {
      // this.$emit('change', e);
    },
    // 单列
    showSinglePicker() {
      this.$refs.hdPickerPop.show();
    }
  },
  watch: {
    range(val) {
      this.setRange();
    }
  }
};
</script>

<style lang="scss">
.view-body {
  margin: 0 10rpx;
  padding: 20rpx 0;
}
.cancel-pay {
  width: 100%;
  justify-content: center;
}
</style>
