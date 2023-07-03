import router from "../";
import store from "@/store";
import nprogress from "nprogress";

import "nprogress/nprogress.css";
import { NavigationFailure, RouteLocationNormalized } from "vue-router";

const findItem = (arr: any, path: string):any => {
  let item = null;
  for (let a of arr) {
    const { children = [] } = a;
    if (children.length) {
      item = findItem(children, path);
    }
    if (a.type == "menu" && a.path == path) {
      item = a;
    }

    if(item){
      break;
    }
  }
  return item;
};

const hasPermission = (path: string, menus: any[]) => {
  return findItem(menus, path) ? true : false;
};

router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    nprogress.start();
    await store.dispatch("getInfo");
    const isLogin = store.state.user && store.state.token;
    return true;
    if (to.meta.requireAuth) {
      if (!isLogin) {
        return {
          path: "/login",
          query: {
            redirect: to.fullPath,
          },
        };
      } else {
        // await store.dispatch("getInfo");
        await store.dispatch("getPermission");
        await store.dispatch("loadMenu");
        const has = hasPermission(to.path, store.state.menus);
        console.log(has);
        if (!has) {
          return {
            name: "404",
          };
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }
);

router.afterEach(() => {
  nprogress.done();
});
