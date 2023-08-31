<template>
    <view>
        <!-- 自定义tabbar完美解决方案：保留一个主页面，其余的页面做成组件；tabbar根据索引判断展示的组件；子页面直接跳转指定的内容，只需要改变索引即可（可以通过传参或者用状态管理解决） -->
        <!-- <template v-if="role === '1'">
            <stu-home v-if="tabbarIndex === 1"></stu-home>
        </template>
        <template v-else>
            <tea-home v-if="tabbarIndex === 1"></tea-home>
        </template> -->
    </view>
    <!-- <tab-bar :role="role"></tab-bar> -->
</template>

<script setup name=""></script>

<style scoped lang="scss"></style>
