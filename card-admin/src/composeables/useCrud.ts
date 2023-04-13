
import http from "@/utils/http";
import { computed } from "@vue/reactivity";
import { ElLoading, ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { nextTick, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export interface CrudQuery {
  limit?: number;
  page?: number;
  where: {
    [key: string]: any;
  };
  [key: string]: any;
}

export function useCrud(
  url: string,
  initModel: any = {},
  where: any = {},
  options: any = { addTextMsg: "新增成功", editTextMsg: "修改成功" },
  sort: any = { sort: 1, _id: -1 }
) {
  let data = ref([]);
  let query = reactive<CrudQuery>({
    limit: 10,
    page: 1,
    sort,
    where: ref(where),
  });
  let isNew = ref(true);
  let showDia = ref(false);
  let model = ref({ ...initModel });
  const loading = ref(false);
  const router = useRouter();
  //分页
  let pagination = ref({ total: 0, current: 1, pageSize: 10 });
  const changeCurrentPage = async (page:number) => {
    pagination.value.current = page;
    query.page = page;
   
    fetch();
  };
  //搜索
  const search = async () => {
    //字符串去空格
    for (let key in query.where) {
      if (typeof query.where[key] == "string") {
        query.where[key] = query.where[key].replace(/\s*/g, "");
      }
      if (query.where[key] == "") {
        delete query.where[key];
      }
    }
    pagination.value.current = 1;
    query.page = 1;
    if (has_router(route.path)) {
      router.push({ query: { query: JSON.stringify(query) } });
    }
    fetch();
  };
  const changePageSize = async (size) => {
    pagination.value.pageSize = size;
    query.limit = size;
    if (has_router(route.path)) {
      router.push({ query: { query: JSON.stringify(query) } });
    }
    fetch();
  };

  //新增
  const save = (
    refs: FormInstance,
    callback: Function | null = null,
    msg = null
  ) => {
    // console.log(!(model.value.username && model.value.password))
    refs.validate(async (valid) => {
      if (valid) {
        callback && callback();
        if (isNew.value == true) {
          await http.post(`${url}`, model.value);
          ElMessage.success(msg || options.addTextMsg);
        } else {
          await http.put(`${url}/${model.value._id}`, model.value);
          ElMessage.success(msg || options.editTextMsg);
        }
        close();
        fetch();
      } else {
        ElMessage.warning("请先完成必填项");
      }
    });
  };

  // 不用表单新增
  const create = async (data) => {
    await http.post(`${url}`, data);
    ElMessage.success(options.addTextMsg);
  };

  const update = async (data) => {
    await http.put(`${url}/${data._id}`, data);
    ElMessage.success(options.editTextMsg);
  };

  const beforeClose = async (done) => {
    try {
      await ElMessageBox.confirm("是否确认关闭", "提示", {
        type: "warning",
      });
    } catch (e) {
      return false;
    }
    done();
  };

  //详情
  const findOne = async (id) => {
    const res = await http.get(`${url}/${id}`);
    model.value = res.data;
  };
  const close = () => {
    showDia.value = false;
    if (initModel.permissions && initModel.permissions.length > 0) {
      initModel.permissions = [];
    }
    model.value = Object.assign({}, initModel);
  };
  const add = () => {
    showDia.value = true;
    isNew.value = true;
    model.value={
      ...initModel
    }
  };

  //修改
  const edit = async (row) => {
    // const editModel = JSON.stringify(row);
    // model.value = JSON.parse(editModel);
    isNew.value = false;
    showDia.value = true;
    await findOne(row._id);
  };

  //删除
  const remove = async (row) => {
    try {
      await ElMessageBox.confirm(
        "此操作将永久删除该数据及相关数据, 是否继续?",
        "提示",
        {
          type: "warning",
        }
      );
    } catch (e) {
      return false;
    }
    ElLoading.service({ text: "删除中..." });
    await http.delete(`${url}/${row._id}`);
    ElLoading.service({}).close();
    ElMessage.success("删除成功");
    fetch();
    return true;
  };

  //获取数据
  const fetch = async (callback: Function | null = null) => {
    const res = await http.get(url, {
      params: {
        query: query,
      },
    });
    pagination.value.total = res.data.total;
    data.value = res.data.data;
    if (callback) {
      callback(res.data.data);
    }
    loading.value = false;
  };

  // 管理员管理多渠道租户，浏览器url会带有tenant参数
  const route = useRoute();
  const tenant = computed(() => route.query && route.query.tenant);
  // console.log(tenant.value)
  watch(
    tenant,
    (v, o) => {
      // 查询当前租户
      if (!query.where) {
        query.where = {};
      }
      if (v) {
        query.where.tenant = v;
        // 创建时自动设置租户
        model.value.tenant = v;
      }
      if (v && v != o) {
        fetch();
      }
    },
    {
      immediate: true,
    }
  );
  // watch(tenant, (v) => {
  //   fetch();
  // });

  const routerQuery = computed(() => route.query.query);
  onMounted(() => {
    // 初始化查询条件
    if (routerQuery.value) {
      //@ts-ignore
      query.where = JSON.parse(routerQuery.value).where;
      //@ts-ignore
      query.page = JSON.parse(routerQuery.value).page;
      //@ts-ignore
      query.limit = JSON.parse(routerQuery.value).limit;
      //@ts-ignore
      pagination.value.current = query.page;
      //@ts-ignore
      pagination.value.pageSize = query.limit;
      fetch();
    }
  });

  return {
    loading,
    data,
    query,
    fetch,
    search,
    save,
    pagination,
    changeCurrentPage,
    changePageSize,
    model,
    showDia,
    isNew,
    beforeClose,
    close,
    add,
    edit,
    remove,
    findOne,
    create,
    update,
  };
}
