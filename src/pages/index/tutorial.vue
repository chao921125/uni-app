<script setup>
	import utils from "@/plugins/utils";

	const listData = [
		{
			key: "Windows",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483802&idx=1&sn=e3aba12433d7007a5ff938739a4715ad&chksm=fc64a7d2cb132ec4b672529703568d06b9d9290972967471a16df42c14400c52684a3c018cab#rd",
			title: "Windows官方下载，保姆教程",
		},
		{
			key: "Windows",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483776&idx=1&sn=192cb0b3f0d2d050b6aa1386edbb4ef5&chksm=fc64a7c8cb132ede8f33524319e2cd151cd41d72ceed1f7cb8e568a1c57b5c56d703e6c7d7b0#rd",
			title: "Windows数字激活HWID2（HWID 已被微软封杀）",
		},
		{
			key: "Windows",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483776&idx=1&sn=192cb0b3f0d2d050b6aa1386edbb4ef5&chksm=fc64a7c8cb132ede8f33524319e2cd151cd41d72ceed1f7cb8e568a1c57b5c56d703e6c7d7b0#rd",
			title: "Office 免 KMS 激活",
		},
		{
			key: "office",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483748&idx=1&sn=d18c5033017c421165473c7786e1213c&chksm=fc64a72ccb132e3a5732828263b2dac7fce2e875411f31ec5708f3e02ead12f9a116effaf742#rd",
			title: "白嫖 Office 正版，官网激活码",
		},
		{
			key: "JetBranins",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483722&idx=1&sn=068c8f0d92ea5ec0539d183d2f732041&chksm=fc64a702cb132e1489243e5e25eb50781e467f2f3e6967c7dce4a30e09f7755d89f3bda9c56f#rd",
			title: "JetBranins 2023 全家桶激活",
		},
		{
			key: "Navicat",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483715&idx=1&sn=3d6fa4979572ba3ab2854a10909ea0b7&chksm=fc64a70bcb132e1d6d52c74a15330940f1f3d08be1a4299843fa5ba9996bd154f3e968559c80#rd",
			title: "Navicat Premium 2023 Windows 激活",
		},
		{
			key: "WeiXinFriend",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483684&idx=1&sn=3a4715ac1b673a1d2adb81a6bbd49988&chksm=fc64a76ccb132e7a1c02352852c622dedf818d9a34d6e973e7d1b7fad1f95adf586445a736b4#rd",
			title: "微信单向好友自动筛选",
		},
		{
			key: "Music",
			url: "https://mp.weixin.qq.com/s?__biz=MzU2MjY3MjQyMw==&mid=2247483839&idx=1&sn=47978cdf0d9d67c3820db2c8f8e73ba5&chksm=fc64a7f7cb132ee1d1b8f0841e32f25076ee2b810036455e7be44e83b55b36e31a75104bff12#rd",
			title: "LX音乐（洛雪）音乐源失效解决方案",
		},
	];
	const toWeb = (url) => {
		utils.gotoPage("/pages/common/web?url=" + encodeURIComponent(url), false);
	};
</script>

<template>
	<view class="container">
		<view
			v-for="(item, index) in listData"
			:key="item.key + index"
			class="re-mb-20">
			<uni-link
				color="#00ffff"
				:href="item.url"
				copyTips=""
				@tap="toWeb(item.url)"
				>{{ index + 1 }}、 {{ item.title }}</uni-link
			>
		</view>
	</view>
</template>

<style lang="scss"></style>
