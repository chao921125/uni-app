<template>
    <div>基本编码风格和 VUE2 变化不大</div>
    <div>{{columns}}</div>
</template>

<script>
  import { onLoad, onShow, } from "@dcloudio/uni-app";
  
  export default {
      data() {
          return {
              columns: 1,
          }
      },
      setup() {
        const props = defineProps({ id: { type: String }, });
        // onLoad 接受 A 页面传递的参数
        onLoad((option) => {
          console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
        });
  
        onShow(() => {
          console.log("B 页面 onShow");
        });
      },
    }
</script>

<style scoped lang="scss">

</style>