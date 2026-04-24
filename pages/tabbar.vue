<script setup name="">
import TabHome from "./tab-home.vue";
import CcNav from "@/components/cc-nav/index.vue";
import ReVpNav from "@/components/re-vp/nav.vue";
import constatn from "@/common/utils/constants.js";
</script>

<template>
	<!-- <ReVpNav title="Home" :border="false" leftText="LT"></ReVpNav> -->
	<CcNav title="Home" :border="false" leftText="LT"></CcNav>
	<TabHome></TabHome>
</template>

<style scoped lang="scss"></style>
