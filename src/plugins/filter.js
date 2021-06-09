import Vue from 'vue';
import {
  formatMoneyIntegerQuot,
  formatMoneyQuot,
  formatTimerHMS,
  formatDateDiagonalLineYMD,
  formatTimeDiagonalLineYMD,
  formatYMDHM,
  formatCustomDateBiasLineStr,
  orderStatusAuction,
  orderStatus,
  orderType,
  formatPayMethod
} from '@/utils/format';

const index = {
  formatMoneyIntegerQuot,
  formatMoneyQuot,
  formatTimerHMS,
  formatDateDiagonalLineYMD,
  formatTimeDiagonalLineYMD,
  formatYMDHM,
  formatCustomDateBiasLineStr,
  orderStatusAuction,
  orderStatus,
  orderType,
  formatPayMethod
};

Object.keys(index).forEach((key) => {
  Vue.filter(key, index[key]);
});

export default index;
