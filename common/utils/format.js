/**
 * UniApp 数据格式化工具模块
 * 功能：字符串处理/金额格式化/隐私脱敏/类型转换/自定义规则
 * 特点：链式调用 / 零依赖 / 高性能 / TypeScript 支持
 */

// ==================== 常量配置 ====================
const REGEX = {
  // 匹配各种空白字符（空格/制表符/换行等）
  ALL_SPACE: /\s+/g,
  // 匹配首尾空白
  TRIM: /^\s+|\s+$/g,
  // 匹配中文
  CHINESE: /[\u4e00-\u9fa5]/g,
  // 匹配英文
  ENGLISH: /[a-zA-Z]/g,
  // 匹配数字
  NUMBER: /\d/g,
  // 匹配特殊字符
  SPECIAL: /[^\w\u4e00-\u9fa5]/g,
  // 匹配手机号
  PHONE: /^1[3-9]\d{9}$/,
  // 匹配身份证
  ID_CARD: /^\d{17}[\dXx]$/,
  // 匹配邮箱
  EMAIL: /^[\w.-]+@[\w.-]+\.\w+$/,
  // 匹配 URL
  URL: /^https?:\/\/.+/,
  // 匹配银行卡（16-19 位数字）
  BANK_CARD: /^\d{16,19}$/
}

// 货币符号映射
const CURRENCY_MAP = {
  CNY: '¥',
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  HKD: 'HK$',
  TWD: 'NT$',
  KRW: '₩'
}

// ==================== 工具函数 ====================

/**
 * 安全获取嵌套对象值
 */
function get(obj, path, defaultValue = null) {
  if (!obj || !path) return defaultValue
  const keys = path.split('.').filter(Boolean)
  let result = obj
  for (const key of keys) {
    if (result == null) return defaultValue
    result = result[key]
  }
  return result ?? defaultValue
}

/**
 * 数字补零
 */
function pad(num, size = 2) {
  num = String(num)
  return num.length >= size ? num : '0'.repeat(size - num.length) + num
}

/**
 * 千分位格式化（支持小数）
 */
function toThousands(num, options = {}) {
  const {
    decimal = 2,           // 小数位数
    decimalPoint = '.',    // 小数点符号
    thousandSep = ',',     // 千分位符号
    prefix = '',           // 前缀
    suffix = '',           // 后缀
    round = true           // 是否四舍五入
  } = options
  
  if (num == null || num === '') return `${prefix}${suffix}`
  
  // 转数字
  const value = typeof num === 'number' ? num : parseFloat(String(num).replace(/,/g, ''))
  if (isNaN(value)) return `${prefix}${num}${suffix}`
  
  // 处理小数
  let [int, dec] = String(round ? value.toFixed(decimal) : value).split('.')
  
  // 千分位
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep)
  
  // 拼接
  let result = int
  if (decimal > 0 && dec) {
    result += decimalPoint + dec.padEnd(decimal, '0')
  }
  
  return `${prefix}${result}${suffix}`
}

/**
 * 隐私脱敏（支持自定义规则）
 */
function mask(str, options = {}) {
  if (!str) return str
  
  const {
    type = 'phone',        // 预设类型：phone/id/card/email/name/bank
    start = 3,             // 保留前几位
    end = 4,               // 保留后几位
    symbol = '*',          // 替换符号
    length = 4,            // 替换符号长度（固定时）
    custom = null          // 自定义正则/函数
  } = options
  
  const s = String(str).trim()
  
  // 自定义规则优先
  if (typeof custom === 'function') {
    return custom(s)
  }
  if (custom instanceof RegExp) {
    return s.replace(custom, symbol)
  }
  
  // 预设类型处理
  switch (type) {
    case 'phone':
      // 138****8888
      return s.replace(/(\d{3})\d{4}(\d{4})/, `$1${symbol.repeat(4)}$2`)
    
    case 'id':
      // 110101********1234
      if (s.length === 18) {
        return s.substring(0, 6) + symbol.repeat(8) + s.substring(14)
      }
      return s.substring(0, 6) + symbol.repeat(s.length - 12) + s.substring(s.length - 4)
    
    case 'card':
      // 6222 **** **** **** 1234
      return s.replace(/(\d{4})\d+(\d{4})/, `$1 ${symbol.repeat(4)} ${symbol.repeat(4)} ${symbol.repeat(4)} $2`)
    
    case 'email':
      // te**@gmail.com
      const [user, domain] = s.split('@')
      if (!domain) return s
      const maskedUser = user.length <= 2 
        ? user[0] + symbol 
        : user[0] + symbol.repeat(user.length - 2) + user.slice(-1)
      return `${maskedUser}@${domain}`
    
    case 'name':
      // 张* / 欧阳**
      if (s.length <= 1) return s
      if (s.length === 2) return s[0] + symbol
      // 复姓判断
      const surname = ['欧阳', '太史', '端木', '上官', '司马', '东方', '独孤', '南宫']
      const isCompound = surname.some(name => s.startsWith(name))
      if (isCompound && s.length >= 3) {
        return s.substring(0, 2) + symbol.repeat(s.length - 2)
      }
      return s[0] + symbol.repeat(s.length - 2) + s.slice(-1)
    
    case 'bank':
      // 6222 **** **** 1234
      const cleaned = s.replace(/\s+/g, '')
      const last4 = cleaned.slice(-4)
      const middle = symbol.repeat(4) + ' ' + symbol.repeat(4) + ' ' + symbol.repeat(4)
      return `${cleaned.slice(0, 4)} ${middle} ${last4}`
    
    default:
      // 通用：保留首尾，中间替换
      if (s.length <= start + end) return s
      const keep = s.substring(0, start) + s.slice(-end)
      const maskLen = length > 0 ? length : s.length - start - end
      return s.substring(0, start) + symbol.repeat(maskLen) + s.slice(-end)
  }
}

/**
 * 单位转换（字节/长度/时间等）
 */
function unitConvert(value, options = {}) {
  const {
    type = 'byte',   // byte/length/time
    decimal = 2,     // 小数位数
    units = null     // 自定义单位数组
  } = options
  
  if (value == null) return value
  
  const num = parseFloat(value)
  if (isNaN(num)) return value
  
  switch (type) {
    case 'byte': {
      // 字节转 KB/MB/GB
      const baseUnits = units || ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
      let idx = 0
      let val = num
      while (val >= 1024 && idx < baseUnits.length - 1) {
        val /= 1024
        idx++
      }
      return `${val.toFixed(decimal)} ${baseUnits[idx]}`
    }
    
    case 'length': {
      // 米转 km/m/cm
      const baseUnits = units || ['cm', 'm', 'km']
      let val = num
      if (val >= 1000) {
        return `${(val / 1000).toFixed(decimal)} km`
      }
      if (val < 1) {
        return `${(val * 100).toFixed(decimal)} cm`
      }
      return `${val.toFixed(decimal)} m`
    }
    
    case 'time': {
      // 秒转 h/m/s
      const seconds = Math.abs(num)
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      const s = seconds % 60
      
      if (h > 0) return `${h}h ${m}m`
      if (m > 0) return `${m}m ${pad(s)}s`
      return `${s}s`
    }
    
    default:
      return String(num)
  }
}

// ==================== 核心模块 ====================

export const Format = {
  // ==================== 字符串处理 ====================
  
  /**
   * 去除空格
   * @param {string} str - 输入字符串
   * @param {string} type - 类型：'trim'(首尾)/'all'(全部)/'left'(左)/'right'(右)
   * @returns {string}
   */
  trim(str, type = 'trim') {
    if (!str) return str
    const s = String(str)
    switch (type) {
      case 'all': return s.replace(REGEX.ALL_SPACE, '')
      case 'left': return s.replace(/^\s+/, '')
      case 'right': return s.replace(/\s+$/, '')
      default: return s.replace(REGEX.TRIM, '')
    }
  },
  
  /**
   * 去除所有空白字符（含换行/制表符）
   */
  removeSpace(str) {
    return this.trim(str, 'all')
  },
  
  /**
   * 首字母大写
   */
  capitalize(str) {
    if (!str) return str
    const s = String(str)
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  },
  
  /**
   * 驼峰转短横线：userName → user-name
   */
  camelToKebab(str) {
    return String(str).replace(/[A-Z]/g, m => '-' + m.toLowerCase()).replace(/^-/, '')
  },
  
  /**
   * 短横线转驼峰：user-name → userName
   */
  kebabToCamel(str) {
    return String(str).replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  },
  
  /**
   * 截取字符串（支持省略号 + 按字节）
   */
  truncate(str, options = {}) {
    if (!str) return str
    const {
      length = 20,        // 最大长度
      omission = '...',   // 省略符号
      byByte = false,     // 是否按字节计算（中文 2 字节）
      position = 'end'    // 截取位置：start/end/middle
    } = options
    
    const s = String(str)
    let result = s
    
    if (byByte) {
      // 按字节截取
      let byteLen = 0
      for (let i = 0; i < s.length; i++) {
        byteLen += s.charCodeAt(i) > 127 ? 2 : 1
        if (byteLen > length) {
          result = s.slice(0, i) + omission
          break
        }
      }
    } else {
      // 按字符截取
      if (s.length > length) {
        switch (position) {
          case 'start':
            result = omission + s.slice(-length + omission.length)
            break
          case 'middle':
            const half = Math.floor((length - omission.length) / 2)
            result = s.slice(0, half) + omission + s.slice(-half)
            break
          default: // end
            result = s.slice(0, length - omission.length) + omission
        }
      }
    }
    
    return result
  },
  
  // ==================== 金额格式化 ====================
  
  /**
   * 金额格式化（千分位 + 货币符号 + 小数控制）
   * @param {number|string} amount - 金额
   * @param {Object} options - 配置项
   * @returns {string}
   */
  money(amount, options = {}) {
    const {
      decimal = 2,           // 小数位数，-1 表示不显示小数
      currency = 'CNY',      // 货币类型：CNY/USD/EUR...
      symbol = null,         // 自定义货币符号（优先级高于 currency）
      prefix = null,         // 自定义前缀（覆盖 symbol）
      suffix = '',           // 后缀
      thousandSep = ',',     // 千分位符号
      decimalPoint = '.',    // 小数点符号
      round = true,          // 是否四舍五入
      showZero = true        // 是否显示.00
    } = options
    
    if (amount == null || amount === '') {
      return prefix || symbol || CURRENCY_MAP[currency] || ''
    }
    
    // 转数字
    const value = typeof amount === 'number' ? amount : parseFloat(String(amount).replace(/,/g, ''))
    if (isNaN(value)) return String(amount)
    
    // 处理小数
    let int, dec
    if (decimal < 0) {
      // 不显示小数，四舍五入到整数
      int = Math.round(value).toString()
      dec = null
    } else {
      const formatted = round ? value.toFixed(decimal) : String(value)
      const parts = formatted.split('.')
      int = parts[0]
      dec = decimal > 0 ? parts[1] : null
    }
    
    // 千分位
    int = int.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep)
    
    // 拼接小数
    let numStr = int
    if (dec !== null && (showZero || parseFloat(dec) > 0)) {
      numStr += decimalPoint + dec.padEnd(decimal, '0')
    }
    
    // 货币符号
    const curr = prefix ?? symbol ?? CURRENCY_MAP[currency] ?? ''
    
    return `${curr}${numStr}${suffix}`
  },
  
  /**
   * 简洁金额：1000 → 1,000 | 10000 → 1 万 | 1000000 → 100 万
   */
  moneyShort(amount, options = {}) {
    const {
      decimal = 1,
      currency = 'CNY',
      units = ['万', '亿', '万亿']  // 自定义单位
    } = options
    
    if (amount == null) return ''
    const num = parseFloat(amount)
    if (isNaN(num)) return String(amount)
    
    const abs = Math.abs(num)
    const sign = num < 0 ? '-' : ''
    const symbol = CURRENCY_MAP[currency] || ''
    
    if (abs < 10000) {
      return `${sign}${symbol}${this.money(num, { decimal, currency, prefix: '' })}`
    }
    
    let value = abs
    let unit = ''
    
    for (let i = 0; i < units.length; i++) {
      const divisor = Math.pow(10000, i + 1)
      if (abs < divisor * 10000) {
        value = abs / Math.pow(10000, i + 1)
        unit = units[i]
        break
      }
    }
    
    // 如果 value >= 10000，继续进位
    if (value >= 10000 && units.length > 0) {
      value = abs / Math.pow(10000, units.length)
      unit = units[units.length - 1]
    }
    
    const formatted = value.toFixed(decimal).replace(/\.?0+$/, '')
    return `${sign}${symbol}${formatted}${unit}`
  },
  
  /**
   * 百分比格式化
   */
  percent(value, options = {}) {
    const {
      decimal = 0,
      multiply = true,   // 0.15 → 15%
      suffix = '%',
      showZero = true
    } = options
    
    if (value == null) return ''
    let num = parseFloat(value)
    if (isNaN(num)) return String(value)
    
    if (multiply && num <= 1 && num >= -1) {
      num *= 100
    }
    
    const fixed = num.toFixed(decimal)
    const result = showZero ? fixed : fixed.replace(/\.?0+$/, '')
    
    return `${result}${suffix}`
  },
  
  // ==================== 隐私脱敏 ====================
  
  /**
   * 手机号脱敏：13812345678 → 138****5678
   */
  phone(str, symbol = '*') {
    return mask(str, { type: 'phone', symbol })
  },
  
  /**
   * 身份证脱敏：110101199001011234 → 110101********1234
   */
  idCard(str, symbol = '*') {
    return mask(str, { type: 'id', symbol })
  },
  
  /**
   * 银行卡脱敏：6222021234567890123 → 6222 **** **** **** 0123
   */
  bankCard(str, symbol = '*') {
    return mask(str, { type: 'bank', symbol })
  },
  
  /**
   * 邮箱脱敏：test@example.com → te**@example.com
   */
  email(str, symbol = '*') {
    return mask(str, { type: 'email', symbol })
  },
  
  /**
   * 姓名脱敏：张三 → 张* / 欧阳修 → 欧阳*
   */
  name(str, symbol = '*') {
    return mask(str, { type: 'name', symbol })
  },
  
  /**
   * 通用脱敏（自定义保留位数）
   */
  mask(str, options = {}) {
    return mask(str, options)
  },
  
  // ==================== 数据类型转换 ====================
  
  /**
   * 转字符串（安全处理 null/undefined）
   */
  toString(val, defaultValue = '') {
    if (val == null) return defaultValue
    if (typeof val === 'object') {
      try {
        return JSON.stringify(val)
      } catch {
        return String(val)
      }
    }
    return String(val)
  },
  
  /**
   * 转数字（失败返回默认值）
   */
  toNumber(val, defaultValue = 0) {
    if (val == null || val === '') return defaultValue
    const num = Number(val)
    return isNaN(num) ? defaultValue : num
  },
  
  /**
   * 转布尔值
   */
  toBoolean(val) {
    if (val == null) return false
    if (typeof val === 'boolean') return val
    if (typeof val === 'number') return val !== 0
    if (typeof val === 'string') {
      const s = val.toLowerCase().trim()
      return ['true', '1', 'yes', 'on'].includes(s)
    }
    return !!val
  },
  
  /**
   * 转数组（非数组包裹成数组）
   */
  toArray(val) {
    if (Array.isArray(val)) return val
    if (val == null) return []
    if (typeof val === 'string' && val.includes(',')) {
      return val.split(',').map(v => v.trim())
    }
    return [val]
  },
  
  /**
   * 转对象（JSON 解析）
   */
  toObject(val, defaultValue = {}) {
    if (val && typeof val === 'object' && !Array.isArray(val)) return val
    if (typeof val === 'string') {
      try {
        return JSON.parse(val)
      } catch {
        return defaultValue
      }
    }
    return defaultValue
  },
  
  // ==================== 验证工具 ====================
  
  /**
   * 是否为空（null/undefined/空字符串/空数组/空对象）
   */
  isEmpty(val) {
    if (val == null) return true
    if (typeof val === 'string') return val.trim() === ''
    if (Array.isArray(val)) return val.length === 0
    if (typeof val === 'object') return Object.keys(val).length === 0
    return false
  },
  
  /**
   * 是否为手机号
   */
  isPhone(str) {
    return REGEX.PHONE.test(String(str).trim())
  },
  
  /**
   * 是否为身份证（简易校验）
   */
  isIdCard(str) {
    const s = String(str).trim().toUpperCase()
    if (!REGEX.ID_CARD.test(s)) return false
    
    // 简易校验位验证
    if (s.length === 18) {
      const weights = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2]
      const codes = '10X98765432'
      let sum = 0
      for (let i = 0; i < 17; i++) {
        sum += parseInt(s[i]) * weights[i]
      }
      return codes[sum % 11] === s[17]
    }
    return true
  },
  
  /**
   * 是否为邮箱
   */
  isEmail(str) {
    return REGEX.EMAIL.test(String(str).trim())
  },
  
  /**
   * 是否为 URL
   */
  isUrl(str) {
    return REGEX.URL.test(String(str).trim())
  },
  
  /**
   * 是否为纯数字
   */
  isNumber(str) {
    return /^\d+$/.test(String(str).trim())
  },
  
  /**
   * 是否为中文
   */
  isChinese(str) {
    return REGEX.CHINESE.test(String(str))
  },
  
  // ==================== 其他工具 ====================
  
  /**
   * 随机字符串
   */
  randomStr(length = 16, chars = 'A-Za-z0-9') {
    let result = ''
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  },
  
  /**
   * 生成 UUID（简易版）
   */
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },
  
  /**
   * 深度克隆（支持循环引用）
   */
  clone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj
    if (obj instanceof Date) return new Date(obj.getTime())
    if (obj instanceof RegExp) return new RegExp(obj)
    
    if (hash.has(obj)) return hash.get(obj)
    
    const result = Array.isArray(obj) ? [] : {}
    hash.set(obj, result)
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = this.clone(obj[key], hash)
      }
    }
    return result
  },
  
  /**
   * 链式调用入口
   */
  chain(val) {
    return new Chain(val)
  }
}

// ==================== 链式调用类 ====================
class Chain {
  constructor(value) {
    this._value = value
  }
  
  // 字符串处理
  trim(type = 'trim') {
    this._value = Format.trim(this._value, type)
    return this
  }
  removeSpace() {
    this._value = Format.removeSpace(this._value)
    return this
  }
  capitalize() {
    this._value = Format.capitalize(this._value)
    return this
  }
  camelToKebab() {
    this._value = Format.camelToKebab(this._value)
    return this
  }
  kebabToCamel() {
    this._value = Format.kebabToCamel(this._value)
    return this
  }
  truncate(options) {
    this._value = Format.truncate(this._value, options)
    return this
  }
  
  // 金额
  money(options) {
    this._value = Format.money(this._value, options)
    return this
  }
  moneyShort(options) {
    this._value = Format.moneyShort(this._value, options)
    return this
  }
  percent(options) {
    this._value = Format.percent(this._value, options)
    return this
  }
  
  // 脱敏
  phone(symbol) {
    this._value = Format.phone(this._value, symbol)
    return this
  }
  idCard(symbol) {
    this._value = Format.idCard(this._value, symbol)
    return this
  }
  bankCard(symbol) {
    this._value = Format.bankCard(this._value, symbol)
    return this
  }
  email(symbol) {
    this._value = Format.email(this._value, symbol)
    return this
  }
  name(symbol) {
    this._value = Format.name(this._value, symbol)
    return this
  }
  mask(options) {
    this._value = Format.mask(this._value, options)
    return this
  }
  
  // 类型转换
  toString(defaultValue) {
    this._value = Format.toString(this._value, defaultValue)
    return this
  }
  toNumber(defaultValue) {
    this._value = Format.toNumber(this._value, defaultValue)
    return this
  }
  toBoolean() {
    this._value = Format.toBoolean(this._value)
    return this
  }
  toArray() {
    this._value = Format.toArray(this._value)
    return this
  }
  
  // 获取最终值
  value() {
    return this._value
  }
  
  // 条件处理
  if(condition, fn) {
    if (typeof condition === 'function' ? condition(this._value) : condition) {
      this._value = fn(this._value)
    }
    return this
  }
  
  // 默认值
  default(defaultValue) {
    if (Format.isEmpty(this._value)) {
      this._value = defaultValue
    }
    return this
  }
}

// ==================== 默认导出 ====================
export default Format