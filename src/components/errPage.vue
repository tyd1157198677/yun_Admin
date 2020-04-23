<template>
    <div>
          <a-result status="500" title="500" subTitle="服务器故障"></a-result>
    </div>
</template>

<script>
import {Result} from 'ant-design-vue'
    export default {
        components: {
            AResult:Result,
        },
    }
</script>

<style lang="scss" scoped>

</style>