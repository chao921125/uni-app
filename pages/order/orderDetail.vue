<template>
	<view class="body-padding">
        <view class="re-margin-top-30">
            <text class="title-sub-h1">专家</text>
            <text class="re-margin-left-20">XX</text>
        </view>
        <view class="re-margin-top-30">
            <text class="title-sub-h1">问题</text>
            <text class="re-margin-left-20">XX</text>
        </view>
	</view>
    <view class="re-margin-top-30 line-default"></view>
    <scroll-view class="body-padding">
        <view class="re-flex-row-start re-margin-top-30">
            <view class="title-sub-h1">专家</view>
            <view class="re-margin-left-20">123123123</view>
        </view>
        <view class="re-flex-row-start re-margin-top-30">
            <view class="title-sub-h1">专家</view>
            <view class="re-margin-left-20">123123123</view>
        </view>
        <view class="re-flex-row-end re-margin-top-30">
            <view class="re-margin-right-20">5345345345</view>
            <view class="title-sub-h1">我</view>
        </view>
        <view class="re-flex-row-start re-margin-top-30">
            <view class="title-sub-h1">专家</view>
            <view class="re-margin-left-20">123123123</view>
        </view>
        <view class="re-flex-row-start re-margin-top-30">
            <view class="title-sub-h1">专家</view>
            <view class="re-margin-left-20">123123123</view>
        </view>
        <view class="re-flex-row-end re-margin-top-30">
            <view class="re-margin-right-20">5345345345</view>
            <view class="title-sub-h1">我</view>
        </view>
    </scroll-view>
    <MessageInput></MessageInput>
</template>

<script>
    import MessageInput from "../components/order/MessageInput.vue";
	export default {
        components: {
            MessageInput
        },
		data() {
			return {
				commentData: {
					"readNumer": 193,
					"commentList": [{
							"id": 1, // 唯一主键
							"owner": false, // 是否是拥有者，为true则可以删除，管理员全部为true
							"hasLike": false, // 是否点赞
							"likeNum": 2, // 点赞数量
							"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0", // 评论者头像地址
							"nickName": "超长昵称超长...", // 评论者昵称，昵称过长请在后端截断
							"content": "啦啦啦啦", // 评论内容
							"parentId": null, // 所属评论的唯一主键
							"createTime": "2021-07-02 16:32:07" // 创建时间
						},
						{
							"id": 2,
							"owner": false,
							"hasLike": false,
							"likeNum": 2,
							"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797761970/0",
							"nickName": "寂寞无敌",
							"content": "我是评论的评论",
							"parentId": 1,
							"createTime": "2021-07-02 17:05:50"
						},
						{
							"id": 4,
							"owner": true,
							"hasLike": true,
							"likeNum": 1,
							"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797763270/0",
							"nickName": "name111",
							"content": "评论啦啦啦啦啦啦啦啦啦啦",
							"parentId": null,
							"createTime": "2021-07-13 09:37:50"
						},
						{
							"id": 5,
							"owner": false,
							"hasLike": false,
							"likeNum": 0,
							"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
							"nickName": "超长昵称超长...",
							"content": "超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论超长评论",
							"parentId": null,
							"createTime": "2021-07-13 16:04:35"
						},
						{
							"id": 13,
							"owner": false,
							"hasLike": false,
							"likeNum": 0,
							"avatarUrl": "https://inews.gtimg.com/newsapp_ls/0/13797755537/0",
							"nickName": "超长昵称超长...",
							"content": "@寂寞无敌 你怕不是个大聪明",
							"parentId": 1,
							"createTime": "2021-07-14 11:01:23"
						}
					]
				}
			};
		},
		methods: {
			getTree(data) {
			    let result = [];
			    let map = {};
			    data.forEach(item => {
			        map[item.id] = item;
			    });
			    data.forEach(item => {
			        let parent = map[item.parentId];
			        if (parent) {
			            (parent.children || (parent.children = [])).push(item);
			        } else {
			            result.push(item);
			        }
			    });
			    return result;
			},
			add() {},
			del() {},
			like() {},
			focusOn() {},
		}
	}
</script>

<style lang="scss">

</style>
