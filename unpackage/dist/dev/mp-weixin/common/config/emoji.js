"use strict";
var emoji = {
  cn: [
    "[\u5F00\u5FC3]",
    "[\u9AD8\u5174]",
    "[\u54C8\u54C8]",
    "[\u707F\u70C2]",
    "[\u5927\u7B11]",
    "[\u6C57\u81ED]",
    "[\u5730\u677F\u4E0A\u7B11]",
    "[\u7B11\u54ED]",
    "[\u5FAE\u7B11]",
    "[\u98A0\u5012]",
    "[\u7728\u773C]",
    "[\u9762\u5E26\u7B11\u5BB9]",
    "[\u6655\u7B11]",
    "[\u7231\u5FC3\u7B11]",
    "[\u559C\u6B22]",
    "[\u5F00\u773C\u754C]",
    "[\u98DE\u543B]",
    "[\u4EB2\u4EB2]",
    "[\u9762\u5E26\u5FAE\u7B11]",
    "[\u95ED\u773C\u4EB2\u4EB2]",
    "[\u7B11\u8138\u4EB2\u4EB2]",
    "[\u9762\u5BF9\u98DF\u7269]",
    "[\u5410\u820C]",
    "[\u7728\u773C\u5410\u820C]",
    "[\u8D5E\u5C3C]",
    "[\u9B3C\u8138]",
    "[\u94B1\u5634]",
    "[\u62E5\u62B1]",
    "[\u5077\u7B11]",
    "[\u5618]",
    "[\u601D\u8003]",
    "[\u95ED\u5634]",
    "[\u7FD8\u7709\u6BDB]",
    "[\u4E2D\u6027]",
    "[\u65E0\u8868\u60C5]",
    "[\u65E0\u5634\u8138]",
    "[\u50BB\u7B11]",
    "[\u65E0\u8DA3]",
    "[\u767D\u773C]",
    "[\u5C34\u5C2C]",
    "[\u8BF4\u8C0E]",
    "[\u8212\u7F13]",
    "[\u6C89\u601D]",
    "[\u6C89\u7761]",
    "[\u6D41\u53E3\u6C34]",
    "[\u7761\u89C9]",
    "[\u611F\u5192]",
    "[\u53D1\u70ED]",
    "[\u53D7\u4F24]",
    "[\u6076\u5FC3]",
    "[\u5455\u5410]",
    "[\u6253\u55B7\u568F]",
    "[\u708E\u70ED]",
    "[\u5BD2\u51B7]",
    "[\u6BDB\u8338\u8338]",
    "[\u5934\u6655]",
    "[\u7206\u70B8\u5934]",
    "[\u725B\u4ED4\u5E3D]",
    "[\u805A\u4F1A]",
    "[\u9177]",
    "[\u4E66\u5446\u5B50]",
    "[\u89C2\u5BDF]",
    "[\u56F0\u60D1]",
    "[\u62C5\u5FC3]",
    "[\u76B1\u7709]",
    "[\u4E0D\u5F00\u5FC3]",
    "[\u5F20\u5634]",
    "[\u5BC2\u9759]",
    "[\u60CA\u8BB6]",
    "[\u5BB3\u7F9E]",
    "[\u6073\u6C42]",
    "[\u4E27\u6C14]",
    "[\u75DB\u82E6]",
    "[\u53EF\u6015]",
    "[\u7126\u8651]",
    "[\u60B2\u4F24]",
    "[\u54ED\u6CE3]",
    "[\u805A\u4F1A]",
    "[\u6050\u60E7]",
    "[\u6781\u5EA6\u56F0\u60D1]",
    "[\u6267\u7740]",
    "[\u5931\u671B]",
    "[\u5782\u5934\u4E27\u6C14]",
    "[\u75B2\u5026]",
    "[\u5341\u5206\u75B2\u5026]",
    "[\u6253\u54C8\u6B20]",
    "[\u51FA\u6C14]",
    "[\u6124\u6012]",
    "[\u751F\u6C14]",
    "[\u5492\u9A82]"
  ],
  en: [
    "emoji_01",
    "emoji_02",
    "emoji_03",
    "emoji_04",
    "emoji_05",
    "emoji_06",
    "emoji_07",
    "emoji_08",
    "emoji_09",
    "emoji_10",
    "emoji_11",
    "emoji_12",
    "emoji_13",
    "emoji_14",
    "emoji_15",
    "emoji_16",
    "emoji_17",
    "emoji_18",
    "emoji_19",
    "emoji_20",
    "emoji_21",
    "emoji_22",
    "emoji_23",
    "emoji_24",
    "emoji_25",
    "emoji_26",
    "emoji_27",
    "emoji_28",
    "emoji_29",
    "emoji_30",
    "emoji_31",
    "emoji_32",
    "emoji_33",
    "emoji_34",
    "emoji_35",
    "emoji_36",
    "emoji_37",
    "emoji_38",
    "emoji_39",
    "emoji_40",
    "emoji_41",
    "emoji_42",
    "emoji_43",
    "emoji_44",
    "emoji_45",
    "emoji_46",
    "emoji_47",
    "emoji_48",
    "emoji_49",
    "emoji_50",
    "emoji_51",
    "emoji_52",
    "emoji_53",
    "emoji_54",
    "emoji_55",
    "emoji_56",
    "emoji_57",
    "emoji_58",
    "emoji_59",
    "emoji_60",
    "emoji_61",
    "emoji_62",
    "emoji_63",
    "emoji_64",
    "emoji_65",
    "emoji_66",
    "emoji_67",
    "emoji_68",
    "emoji_69",
    "emoji_70",
    "emoji_71",
    "emoji_72",
    "emoji_73",
    "emoji_74",
    "emoji_75",
    "emoji_76",
    "emoji_77",
    "emoji_78",
    "emoji_79",
    "emoji_80",
    "emoji_81",
    "emoji_82",
    "emoji_83",
    "emoji_84",
    "emoji_85",
    "emoji_86",
    "emoji_87",
    "emoji_88",
    "emoji_89",
    "emoji_90"
  ]
};
exports.emoji = emoji;