// import Vue from 'vue'
// /**权限指令**/
// const has = Vue.directive('has', {
//  bind: function (el, binding, vnode) {
//   // 获取按钮权限
//   let btnPermissions = vnode.context.$route.meta.btnPermissions.split(",");
//   if (!Vue.prototype.$_has(btnPermissions)) {
//    el.parentNode.removeChild(el);
//   }
//  }
// });
// // 权限检查方法
// Vue.prototype.$_has = function (value) {
//  let isExist = false;
//  let btnPermissionsStr = sessionStorage.getItem("btnPermissions");
//  if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
//   return false;
//  }
//  if (value.indexOf(btnPermissionsStr) > -1) {
//   isExist = true;
//  }
//  return isExist;
// };
// export  {has}
import Vue from 'vue'
/**权限指令**/
const has = Vue.directive('has', {
    // inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
    inserted: function(el, binding, vnode) {
        // el: 指令所绑定的元素，可以用来直接操作DOM。
        // binding:  一个对象，包含指令的很多信息。
        // vnode: Vue编译生成的虚拟节点。
        // 获取按钮权限
        let btnPermissions = vnode.context.$route.meta.btnPermissions;
        // 路由定义的meta
        let userId = vnode.context.$root.userinfo.UserTypeId;
        console.log(vnode.context.$root.userinfo.UserTypeId)
            // 用户id
            //   console.log(userId)
            // 获取按钮权限
        if (!Vue.prototype.$_has(btnPermissions, userId) && el.parentElement) {
            //移除不匹配的按钮
            el.parentElement.removeChild(el);

        }
    }
});
// 权限检查方法
Vue.prototype.$_has = function(idArr, id) {
    let isExist = false;
    if (id == undefined || id == null) {
        return false;
    }
    console.log(idArr)
    if (idArr.indexOf(id) > -1) {
        isExist = true;
    }
    return isExist;
};
export { has }