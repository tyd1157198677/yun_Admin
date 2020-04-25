import Vue from 'vue'
/**权限指令**/
const has = Vue.directive('has', {
 bind: function (el, binding, vnode) {
  // 获取按钮权限
  let btnPermissions = vnode.context.$route.meta.btnPermissions.split(",");
  if (!Vue.prototype.$_has(btnPermissions)) {
   el.parentNode.removeChild(el);
  }
 }
});
// 权限检查方法
Vue.prototype.$_has = function (value) {
 let isExist = false;
 let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
 if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
  return false;
 }
 if (value.indexOf(btnPermissionsStr) > -1) {
  isExist = true;
 }
 return isExist;
};
export  {has}