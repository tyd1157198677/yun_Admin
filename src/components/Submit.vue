<template>
    <div class="submit">
      <div class="submit_btn">
        <a-button class="btn" type="primary" size="large" @click="submitForm('ruleForm')">提交</a-button>
        <a-button class="btn" style="margin-left:20%" size="large" @click="resetForm('ruleForm')">取消</a-button>
      </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .submit {
  width: 100%;
  height: 9%;
  border-top: 1px solid #EFEFEFFF;
  display: flex;
  
  .submit_btn {
    width: 15%;
    height: 100%;
    padding-top: 1.2%;
    margin: 0% auto;
    display: flex;
    .btn {
      flex-grow: 1;
    }
  }
}
</style>