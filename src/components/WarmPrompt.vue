<template>
  <div class="tip">
    <img class="tips_img" src="@/assets/img/icon_general_hint_16@2x (1).png" alt />
    <span class="tips_font">温馨提示：编辑角色，拥有该角色包含权限的账号会同步更改，请谨慎编辑！</span>
  </div>
</template>

<script>
export default {
  name: "WarmPrompt"
};
</script>
<style scoped lang="scss">
.tip {
  width: 100%;
  height: 100%;
  display: flex;
  .tips_img {
    margin: auto 0;
    min-width: 21px;
    height: 55%;
    padding: 0 1%;
  }
  .tips_font {
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
