<template>
      <a-pagination class="pagination" :current="currentPage" :total="pageCount" @change="selectPage"/>  
</template>

<script>
    export default {
      props:{
        pageCount:Number,       //页面总数
        currentPage:Number     //默认打开页数
      },
      methods: {
        selectPage(page) {
          let pageNum = page
           // 通知父组件绑定的自定义事件close执行(事件名: closeTip)
          this.$emit('selectPage',pageNum)
        }
      },     
    }
</script>
<style>
  .ant-pagination>li{
    border: none;
  }
   .ant-pagination-next .ant-pagination-item-link{
     font-size: 14px;
    border: 0px;
  }
  .ant-pagination-prev .ant-pagination-item-link{
    font-size: 14px;
    border:0px
  }
</style>
<style lang="scss" scoped>
.pagination {
    text-align: right;
    margin-top: 24px;
  }
</style>