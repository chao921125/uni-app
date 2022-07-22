/**
 * 用户相关
 */
import config from "@/common/api/index.js";
import http from "@/common/plugins/http.js";

/**
 * 获取验证码
 * @param {Object} params
 * tel: string
 * codeType: string 1 注册；2 找回密码；3 修改手机号；
 */
export function getPhoneCode(params) {
    return http.request(config.basePath + "/system/artsuser/front/sendMessage", "POST", params, false, false);
}

/**
 * 注册
 * @param {Object} params
 * uname: string
 * upassword: string
 * inviteCode: string
 * tel: string
 * code: string
 */
export function register(params) {
    return http.request(config.basePath + "/system/artsuser/front/regesitor", "POST", params, false, false);
}

/**
 * 登录
 * @param {Object} params
 * uname: string
 * upassword: string
 * deptId: string 画室编号
 */
export function login(params) {
    return http.request(config.basePath + "/front/login", "POST", params, false, false);
}

/**
 * 找回密码/修改密码
 * @param {Object} params
 * tel: string
 * validationCode: string
 * upassword: string
 */
export function updatePwd(params) {
    return http.request(config.basePath + "/system/artsuser/front/updatePassword", "POST", params, false, false);
}

/**
 * 退出
 * @param {Object} params
 */
export function logout(params) {
    return http.request(config.basePath + "/front/logout", "POST", params, false, false);
}

/**
 * 查询用户信息
 * @param {Object} params
 */
export function selectUserInfo(params) {
    return http.request(config.basePath + "/system/artsuser/front/getUserDetail", "POST", params, false, false);
}

/**
 * 编辑用户信息
 * @param {Object} params
 * userNo: string
 * userName: string
 * userTel: string
 * remark: string
 */
export function userEdit(params) {
    return http.request(config.basePath + "/profic/user/updateUser", "POST", params, false, false);
}

/**
 * 新增银行卡
 * @param {Object} params
 * uid: string
 * bankName: string *
 * bankCode: string *
 * bankCardName: string * 银行卡持卡人姓名
 * bankCardTel: string
 * imgUrl: string
 */
export function createBank(params) {
    return http.request(config.basePath + "/system/bankcard/front/insertBankCard", "POST", params, false, false);
}

/**
 * 修改银行卡
 * @param {Object} params
 * id: number *
 * uid: string
 * bankName: string *
 * bankCode: string *
 * bankCardName: string *
 * bankCardTel: string
 * imgUrl: string
 */
export function updateBank(params) {
    return http.request(config.basePath + "/system/bankcard/front/updateBankCard", "POST", params, false, false);
}

/**
 * 删除银行卡
 * @param {Object} params
 * id: number *
 */
export function deleteBank(params) {
    return http.request(config.basePath + "/system/bankcard/front/deleteBankCard", "POST", params, false, false);
}

/**
 * 新增地址
 * @param {Object} params
 * uid: string
 * receiveName: string * 收件人
 * receiveTel: string * 收件人联系方式
 * receiveProviceCode: string * 省
 * receiveProviceName: string *
 * receiveCityCode: string * 市
 * receiveCityName: string *
 * recieveAreaCode: string * 区
 * recieveAreaName: string *
 * receiveDetail: string * 详细地址
 */
export function createAddress(params) {
    return http.request(config.basePath + "/system/address/front/insertUserAddress", "POST", params, false, false);
}

/**
 * 修改地址
 * @param {Object} params
 * id: number *
 * uid: string
 * receiveName: string * 收件人
 * receiveTel: string * 收件人联系方式
 * receiveProviceCode: string * 省
 * receiveProviceName: string *
 * receiveCityCode: string * 市
 * receiveCityName: string *
 * recieveAreaCode: string * 区
 * recieveAreaName: string *
 * receiveDetail: string * 详细地址
 */
export function updateAddress(params) {
    return http.request(config.basePath + "/system/address/front/updateUserAddress", "POST", params, false, false);
}

/**
 * 删除地址
 * @param {Object} params
 * id: number *
 */
export function deleteAddress(params) {
    return http.request(config.basePath + "/system/address/front/deleteUserAddress", "POST", params, false, false);
}

/**
 * 获取画室信息
 * @param {Object} params
 */
export function selectArtsInfo(params = {}) {
    return http.request(config.basePath + "/system/artsuser/front/getAppointConfigInfo", "POST", params, false, false);
}

/**
 * 获取提现记录
 * @param {Object} params
 * currentPage: number *
 * pageSize: number *
 */
export function selectRecharge(params = {}) {
    return http.request(config.basePath + "/system/artsuser/front/cashelog", "POST", params, false, false);
}

/**
 * 获取粉丝
 * @param {Object} params
 * currentPage: number *
 * pageSize: number *
 */
export function selectFans(params = {}) {
    return http.request(config.basePath + "/system/artsuser/front/queryMyFans", "POST", params, false, false);
}

/**
 * 申请提现
 * @param {Object} params
 * amount: number *
 */
export function createRecharge(params = {}) {
    return http.request(config.basePath + "/system/artsuser/front/cash", "POST", params, false, false);
}

/**
 * 查询佣金信息
 * @param {Object} params
 * amount: number *
 */
export function selectDistribute(params = {}) {
    return http.request(config.basePath + "/system/artsuser/front/getUserAmount", "POST", params, false, false);
}
