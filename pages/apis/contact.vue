<template>
	<view>
		<button @click="getContact">获取联系人</button>
	</view>
</template>

<script>
export default {
	methods: {
		getContact() {
			console.log(plus.contacts.ADDRESSBOOK_PHONE);
			console.log(plus.contacts.ADDRESSBOOK_SIM);

			plus.contacts.getAddressBook(
				plus.contacts.ADDRESSBOOK_PHONE,
				function (addressbook) {
					// 可通过addressbook进行通讯录操作
					alert("Get address book success!", addressbook);
				},
				function (e) {
					alert("Get address book failed: " + e.message);
				},
			);
		},
	},
};
</script>

<style lang="scss"></style>
