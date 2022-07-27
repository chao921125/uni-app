import DemoBg from "@/static/images/demo/demo-bg.jpg";
import DemoLogo from "@/static/images/demo/demo-logo.jpg";
import NoData from "@/static/images/toast/img_nodata.png";
import UserAvatar from "@/static/images/my/user-avatar.png";
import PaySuccess from "@/static/images/mall/pay/icon_pay_weixin.png";

export default {
	DemoBg: DemoBg,
	DemoLogo: DemoLogo,
    NoData: NoData,
    UserAvatar: UserAvatar,
    PaySuccess: PaySuccess,
	getImg: (url) => {
		// const path = `../assets/images/home/${url}`;
		// const modules = import.meta.globEager("../assets/images/home/*");
		// return modules[path].default;
	}
}
