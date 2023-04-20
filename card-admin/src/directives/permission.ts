import store from "@/store";




const getPermissionBtns = (permission:any) => {
  return store.state.permissions.includes(permission)
};

export default {
  mounted(el:any, bindling:any) {
    //bindling.value为指令的绑定值
    let perVal = bindling.value;
    if (bindling.value) {
      const [source,action]=perVal.split(":") as any[];

      console.log({
        source,
        action
      })
      // console.log({
      //   action,
      //   roles,
      //   module
      // })
      //假设某用户对某模块只有添加和删除的权限
      //这个权限信息(即pers)应该是不同用户登录时从后台拿到的对应的信息
      let hasPer = getPermissionBtns(perVal);
      //hasPer为true为有权限
      //hasPer为false为无权限
      //没有权限就先隐藏此元素吧
      if (!hasPer) {
        el.style.display = "none";
      }
    }
  },
};
