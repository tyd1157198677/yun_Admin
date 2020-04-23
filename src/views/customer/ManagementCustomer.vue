<template>
  <div class="Customer">
    <div class="footer">
        <router-view/>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        current:'0'
      }
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
@mixin list{
  display: inline-block;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      
}
.selectStyle{
  font-weight:bolder;
  border-bottom: 4px solid #2B75EDFF;

}
.Customer {
  width: 100%;
  padding: 1.2% 1.2% 0% 1.2%;
  background-color: #fff;
  height: 100%;
  .header_nav {
    width: 100%;
    height: 6%;
    display: flex;
    .user_list {
      @include list;
      margin-right: 3%;
    }
    .black_list {
      @include list;
    }
  }
  .footer{
      width:100%;
  }
}
</style>