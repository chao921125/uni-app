export default {
	regs: {
		regNumberString: /^[a-zA-Z\d]+$/ig,
		name: /^[\u4e00-\u9fa5\w]+$/ig,
		password: /^[a-zA-Z\w]+$/ig,
		phone: /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/ig,
		email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ig,
		domain: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?$/ig,
	},
	error: "",
	check: (data, rule) => {
		for(var i = 0; i < rule.length; i++){
			if (!rule[i].checkType){return true;}
			if (!rule[i].name) {return true;}
			if (!rule[i].errorMsg) {return true;}
			if (!data[rule[i].name]) {this.error = rule[i].errorMsg; return false;}
			switch (rule[i].checkType){
				case "string":
					var reg = new RegExp("^.{" + rule[i].checkRule + "}$");
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
				break;
				case "int":
					var reg = new RegExp("^(-[1-9]|[1-9])[0-9]{" + rule[i].checkRule + "}$");
					if(!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				break;
				case "between":
					if (!this.isNumber(data[rule[i].name])){
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(",");
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case "betweenD":
					var reg = /^-?[1-9][0-9]?$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
					var minMax = rule[i].checkRule.split(",");
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case "betweenF": 
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
					if (!reg.test(data[rule[i].name])){this.error = rule[i].errorMsg; return false;}
					var minMax = rule[i].checkRule.split(",");
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
				break;
				case "same":
					if (data[rule[i].name] != rule[i].checkRule) { this.error = rule[i].errorMsg; return false;}
				break;
				case "notsame":
					if (data[rule[i].name] == rule[i].checkRule) { this.error = rule[i].errorMsg; return false; }
				break;
				case "email":
					var reg = /^\w+([-+."]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case "phoneno":
					var reg = /^1[0-9]{10,10}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case "zipcode":
					var reg = /^[0-9]{6}$/;
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case "reg":
					var reg = new RegExp(rule[i].checkRule);
					if (!reg.test(data[rule[i].name])) { this.error = rule[i].errorMsg; return false; }
				break;
				case "in":
					if(rule[i].checkRule.indexOf(data[rule[i].name]) == -1){
						this.error = rule[i].errorMsg; return false;
					}
				break;
				case "notnull":
					if(data[rule[i].name] == null || data[rule[i].name].length < 1){this.error = rule[i].errorMsg; return false;}
				break;
			}
		}
		return true;
	},
	isNumber : function (checkVal){
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	},
	checkIdcard: function(personnumber) {
	
	    personnumber = personnumber.toUpperCase();
	    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(personnumber))) {
	        return false;
	    }
	    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	    //下面分别分析出生日期和校验位
	    var len, re;
	    len = personnumber.length;
	    if (len == 15) {
	        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
	        var arrSplit = personnumber.match(re);
	
	        //检查生日日期是否正确
	        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
	        var bGoodDay;
	        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
	        if (!bGoodDay) {
	            return false;
	        }
	        else {
	            //将15位身份证转成18位
	            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var nTemp = 0, i;
	            personnumber = personnumber.substr(0, 6) + '19' + personnumber.substr(6, personnumber.length - 6);
	            for (i = 0; i < 17; i++) {
	                nTemp += personnumber.substr(i, 1) * arrInt[i];
	            }
	            personnumber += arrCh[nTemp % 11];
	            return true;
	        }
	    }
	    if (len == 18) {
	        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
	        var arrSplit = personnumber.match(re);
	
	        //检查生日日期是否正确
	        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
	        var bGoodDay;
	        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
	        if (!bGoodDay) {
	            return false;
	        } else {
	            //检验18位身份证的校验码是否正确。
	            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	            var valnum;
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var nTemp = 0, i;
	            for (i = 0; i < 17; i++) {
	                nTemp += personnumber.substr(i, 1) * arrInt[i];
	            }
	            valnum = arrCh[nTemp % 11];
	            if (valnum != personnumber.substr(17, 1)) {
	                return false;
	            }
	            return true;
	        }
	    }
	    return false;
	},
	checkBankno: function(bankno) {
	    var lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位（与luhm进行比较）
	    var first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
	    var newArr = [];
	
	    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
	        newArr.push(first15Num.substr(i, 1));
	    }
	
	    var arrJiShu = []; //奇数位*2的积 <9
	    var arrJiShu2 = []; //奇数位*2的积 >9
	    var arrOuShu = []; //偶数位数组
	    for (var j = 0; j < newArr.length; j++) {
	        if ((j + 1) % 2 == 1) {//奇数位
	            if (parseInt(newArr[j]) * 2 < 9)
	                arrJiShu.push(parseInt(newArr[j]) * 2); else
	                arrJiShu2.push(parseInt(newArr[j]) * 2);
	        }
	        else //偶数位
	            arrOuShu.push(newArr[j]);
	    }
	
	    var jishu_child1 = [];//奇数位*2 >9 的分割之后的数组个位数
	    var jishu_child2 = [];//奇数位*2 >9 的分割之后的数组十位数
	    for (var h = 0; h < arrJiShu2.length; h++) {
	        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
	        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	    }
	
	    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	    var sumOuShu = 0; //偶数位数组之和
	    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	    var sumTotal = 0;
	    for (var m = 0; m < arrJiShu.length; m++) {
	        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	    }
	    for (var n = 0; n < arrOuShu.length; n++) {
	        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	    }
	    for (var p = 0; p < jishu_child1.length; p++) {
	        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
	        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	    }
	    //计算总和
	    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
	    //计算Luhm值
	    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	    var luhm = 10 - k;
	    if (lastNum == luhm) {
	        return true;
	    } else {
	        return false;
	    }
	}
}