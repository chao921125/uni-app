const imgBaseUrl =
  'https://nft-1259661131.cos.ap-hongkong.myqcloud.com/images/';
export default {
  params: {
    emailCodeTypeLogin: '1',
    emailCodeTypeRegister: '2',
    emailCodeTypeForgotPwd: '3'
  },
  formValidate: {
    userName: '',
    userNameMin: 1,
    userNameMax: 50,
    surName: '',
    surNameMin: 1,
    givenName: '',
    givenNameMin: 1,
    givenNameMax: 50,
    email: '/^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/',
    emailMin: 6,
    emailMax: 6,
    password: '',
    passwordMin: 8,
    passwordMax: 20,
    emailCode: '',
    emailCodeMin: 6,
    emailCodeMax: 6,
    price: '',
    priceMin: 1,
    priceMax: 10
  },
  images: {
    unLogin: imgBaseUrl + 'default-avatar.png', // not-login-icon.png
    loginUser: imgBaseUrl + 'default-avatar.png',
    share: imgBaseUrl + 'share-icon.png',
    unCollection: imgBaseUrl + 'collect-no.png',
    collection: imgBaseUrl + 'collect-yes.png',
    dialogShare: imgBaseUrl + 'dialog-share.png',
    dialogCopyLink: imgBaseUrl + 'dialog-copy-link.png',
    dialogClose: imgBaseUrl + 'dialog-close.png',
    close: imgBaseUrl + 'tab-close.png',
    swiperLeft: imgBaseUrl + 'swiper-left.png',
    swiperRight: imgBaseUrl + 'swiper-right.png',
    swiperLeftGrey: imgBaseUrl + 'room-detail-left.png',
    swiperRightGrey: imgBaseUrl + 'room-detail-right.png',
    headerBack: imgBaseUrl + 'direction-high-left.png',
    payCrypto: imgBaseUrl + 'pay-crypto.png',
    deliverNo: imgBaseUrl + 'pay-crypto.png',
    deliverYes: imgBaseUrl + 'pay-crypto.png',
    priceIcon1: imgBaseUrl + 'room-history-icon.png',
    loginGoogle: imgBaseUrl + 'google-icon.png',
    roundSuccessDotted: imgBaseUrl + 'round-success-dotted.png',
    roundSuccessSolid: imgBaseUrl + 'round-success-solid.png',
    roundErrorSolid: imgBaseUrl + 'round-error-solid.png',
    marketHistory: imgBaseUrl + 'market-history.png',
    boxComingSoon: imgBaseUrl + 'box-coming-soon.png', // 盲盒
    boxSoldOut: imgBaseUrl + 'box-sold-out.png', // 盲盒
    boxBgSpecial: imgBaseUrl + 'box-bg-special.png', // 盲盒 未开背景
    boxUnOpen: imgBaseUrl + 'box-un-open.gif', // 盲盒 未开商品
    boxUnOpenSquare: imgBaseUrl + 'box-un-open-square.gif', // 盲盒 未开商品
    boxOpenTitle: imgBaseUrl + 'box-open-title.png', // 盲盒 标题
    boxAnima1: imgBaseUrl + 'BoxOpen_mobile_a.mp4', // 盲盒 开启动画1
    boxAnima2: imgBaseUrl + 'BoxOpen_mobile_b.mp4', // 盲盒 开启动画2
    boxAnima3: imgBaseUrl + 'BoxOpen_mobile_c.mp4', // 盲盒 开启动画3
    loginSecure: imgBaseUrl + 'login-secure.png',
    appLogo: imgBaseUrl + 'app-logo.png',
    appBack: imgBaseUrl + 'app-goBack.png',
    selected: imgBaseUrl + 'selected.png',
    noselect: imgBaseUrl + 'noselect.png',
    missionCollect: imgBaseUrl + 'mission-collect.png',
    transferOk: imgBaseUrl + 'transferOk.png',
    transferFail: imgBaseUrl + 'transferFail.png',
    userImg: imgBaseUrl + 'userImg.png',
    backWhite: imgBaseUrl + 'back-white.png',
    personIcon: imgBaseUrl + 'room-person-icon-new.png',
    iconPerson: imgBaseUrl + 'icon-person.png',
    iconSaleFull: imgBaseUrl + 'full-icon.png',
    iconSaleHalf: imgBaseUrl + 'half-icon.png',
    boxHidePrice: imgBaseUrl + 'hide-price.png',
    boxNoComSoon: imgBaseUrl + 'demoBoxNo.png',
    videoHomeBox: imgBaseUrl + 'homepage_box_video',
    iconTelegram: imgBaseUrl + 'icon-telegram.png',
    iconTwitter: imgBaseUrl + 'icon-twitter.png',
    iconShareFacebook: imgBaseUrl + 'icon-share-facebook.png',
    iconShareWhatsapp: imgBaseUrl + 'icon-share-whatsapp.png'
  },
  requestUrl: {
    // google登录 email password
    isRegister: '/user/is-email-registed',
    // google登录 email password
    loginGoogle: '/user/login',
    // 登出 post
    logout: '/user/logout',
    // 密码登录 email password
    login: '/user/password-login',
    // 重置密码 email verification newPassword
    forgotPwd: '/user/forget-password',
    // 邮箱验证码发送 type 类型 1-登陆 2-注册 3-忘记密码 address
    sendEmailCode: '/user/send-mail',
    // 注册 nickName email password surname givenName
    register: '/user/registe',
    // 验证邮箱
    emailVerify: '/user/email-verify',
    // 重置密码
    resetPwd: '/user/password-restore',
    // 令牌二次验证
    verifySecure: '/user/verify-secret',
    // 获取个人账户余额
    getAccountAmount: '/user/account',
    // 支付接口 post 入参 id 出参
    payUrl: '/pay/',
    // 支付接口 个人账户支付 post 入参 id 出参
    payAccount: '/pay/account',
    // 拍卖详情 get 入参 id 出参
    orderAuction: '/order/auction',
    // 获取盲盒
    getHomeInfo: '/home/banner',
    // 拍卖信息列表 get 入参 id 出参
    getAuction: '/auction/list',
    // 拍卖信息列表 get 入参 id 出参
    getAuctionInfo: '/auction/find',
    // 拍卖信息列表 get 入参 id 出参
    getAuctionList: '/auction/bid-log',
    // 拍卖竞价 post 入参 id price 出参
    getAuctionOfferList: '/auction/all-log',
    // 订单信息 get 入参 id 出参
    orderInfo: '/order/info',
    // 盲盒列表 get
    getBoxList: '/blindBox/list',
    // 盲盒详情 get
    getBoxDetail: '/blindBox/find',
    // 我的盲盒列表 get
    getBoxMy: '/blindBox/user',
    // 我的盲盒详情 get
    getBoxMyDetail: '/blindBox/info-user',
    // 开启盲盒 post
    boxOpen: '/blindBox/open',
    // 寄售盲盒 post
    boxSale: '/blindBox/consignment',
    // 取消寄售盲盒 post
    boxSaleCancel: '/blindBox/consignment-cancel',
    // 盲盒下单 post
    orderBox: '/order/blindBox',
    // 盲盒数据统计 get
    getBoxDataPreview: '/blindBox/count',
    // 盲盒交易记录 get
    getBoxHistory: '/blindBox/consignment-log',
    // 获取手办及拍卖列表 get
    getSaleList: '/product/sale-list',
    // 获取商品详情信息 get
    getSaleInfo: '/product/sale-info',
    // 商品手办下单 post
    orderDirectSale: '/order/direct-sale',
    // 任务列表 get
    getTaskList: '/task/list',
    // 任务详情 get
    getTaskDetail: '/task/info',
    // 任务奖励领取 post
    collectTask: '/task/award',
    // nft列表
    appNtfList: '/nft/list',
    // nft查看新物品
    appNewPackage: '/nft/new-package',
    // nft物权转换
    appTransfer: '/nft/transfer',
    // nft订单商品详情
    appCreateOrder: '/nft/create-order',
    // nft订单详情
    ntfOrderDetail: '/nft/order-detail',
    // nft登陆
    appLogin: '/nft/password-login',
    // 个人中心 订单列表
    getOrderList: '/order/list',
    // 个人中心 订单详情
    getOrderDetail: '/order/detail',
    // 个人中心 订单售卖列表
    getOrderSoldList: '/order/consignment-list',
    // 个人中心 订单售卖详情
    getOrderSoldDetail: '/order/consignment-detail',
    // 个人中心 订单售卖详情
    getProductDetail: '/product/detail',
    // 文件上传
    uploadFile: '/user/upload-img',
    // 个人中心认证
    uploadProfile: '/user/upload-profile'
  },
  status: {
    auction: {
      // 当前竞拍商品状态 1 未开始 2 进行中 3 已结束
      unStart: 1,
      starting: 2,
      end: 3
    },
    auctionIn: {
      // 当前个人竞拍状态 1 竞拍中 2 成功 3 失败
      bidding: 1,
      success: 2,
      fail: 3,
      waiting: 5,
      payError: 6
    },
    payStatus: {
      // 支付状态 1 未支付 2 支付成功
      unPay: 1,
      pay: 2
    },
    task: {
      // 任务 1 进行中 2 已结束
      action: 1,
      end: 2
    },
    taskUser: {
      // 用户任务状态 1 未领取 2 已领取 3 超时未领取 4 未完成
      unCollect: 1,
      collect: 2,
      timeOut: 3,
      fail: 4
    }
  },
  enumStatus: {
    boxFromStatus: {
      // 类型:[blindBox 1 盲盒订单,consignment 2 寄售,auction 3 拍卖]
      1: {
        label: 'Drops',
        name: 'DROPS',
        value: 1
      },
      2: {
        label: 'LEGENDS SHOP',
        name: 'LEGENDS SHOP',
        value: 2
      },
      3: {
        label: 'USER BID',
        name: 'USER BID',
        value: 3
      }
    },
    boxStatus: {
      // 2 预售 3 售卖中
      0: {
        label: '',
        name: '',
        value: 0
      },
      1: {
        label: '',
        name: '',
        value: 1
      },
      2: {
        label: 'Coming Soon',
        name: 'COMING SOON',
        value: 2
      },
      3: {
        label: 'In Stock',
        name: 'IN STOCK',
        value: 3
      }
    },
    boxStatusOpen: {
      // 1 未开启 2 已开启
      0: {
        label: '',
        name: '',
        value: 0
      },
      1: {
        label: 'OPEN IT',
        name: 'OPEN IT',
        value: 1
      },
      2: {
        label: '',
        name: '',
        value: 2
      }
    },
    boxStatusSale: {
      // 1 未寄售 2 寄售中 3 寄售完成
      0: {
        label: '',
        name: '',
        value: 0
      },
      1: {
        label: 'LIST IT',
        name: 'LIST IT',
        value: 1
      },
      2: {
        label: 'REMOVE THIS LISTING',
        name: 'LISTED',
        value: 2
      },
      3: {
        label: '',
        name: '',
        value: 3
      }
    },
    saleStatus: {
      0: {
        label: 'Out Stock',
        name: 'OUT STOCK',
        value: 2
      },
      1: {
        label: 'In Stock',
        name: 'IN STOCK',
        value: 3
      },
      2: {
        label: 'Coming Soon',
        name: 'COMING SOON',
        value: 4
      }
    }
  }
};
