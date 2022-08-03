<template>
    <div>{{columns}}</div>
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
    }
</script>

<style scoped lang="scss">

</style>