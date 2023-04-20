<template>
  <div id="m-5" class="t-mt-3">
    <div class="top t-flex t-justify-end">
      <el-button :icon="Plus" type="primary" @click="addMenu">新建</el-button>
    </div>
    <div class="table t-mt-3">
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="type" label="类型">
          <template #default="{ row }">
            <el-tag
            type="danger"
              disable-transitions
              v-if="row.type=='group'"
              >{{ MenuName(row) }}</el-tag
            >
            <el-tag
              type="success"
              disable-transitions
              v-if="row.type=='menu'"
              >{{ MenuName(row) }}</el-tag
            >
            <el-tag
              type="info"
              disable-transitions
              v-if="row.type=='page'"
              >{{ MenuName(row) }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="path" label="路由地址">
          <template #default="{ row }">
            {{ row.path }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
          <template #default="{ row }">
            {{ formatTime(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template #default="{ row }">
            <el-button :icon="Edit" type="primary" @click="editItem(row)">编辑</el-button>
            <el-button :icon="RemoveFilled" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer
      v-model="showDia"
      :title="isNew ? '新建菜单' : '编辑菜单'"
      size="50%"
    >
      <el-form :model="model" ref="menuForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item prop="type" label="类型">
          <el-radio-group v-model="model.type" size="large">
            <el-radio-button :label="item.value" v-for="item in options.types">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="parent" label="父级">
          <el-cascader placeholder="关联上级" v-model="model.parent" :options="options.parents"  />
        </el-form-item>
        <el-form-item prop="path" label="路由" v-if="!isGroup">
          <el-input v-model="model.path" />
        </el-form-item>

        <el-form-item prop="icon" label="图标" v-if="isGroup">
          <el-input v-model="model.icon" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">{{
            isNew ? "新建" : "保存"
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { Edit, Plus, RemoveFilled } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, computed } from "vue";
import { useCrud } from "@/composeables/useCrud";
import { FormInstance } from "element-plus";
import { formatTime } from "@/utils/";
import http from "@/utils/http";

const { data, fetch, create, add, edit,showDia, isNew, model, save } = useCrud(
  "menu",
  {
    name: "",
    type: "group",
  }
);

const menuForm = ref<FormInstance>();

const options = reactive({
  types: [
    {
      label: "分组",
      value: "group",
    },
    {
      label: "菜单",
      value: "menu",
    },
    {
      label: "其他页面",
      value: "page",
    },
  ],
  parents: [],
});

const submit = () => {
  save(menuForm.value as FormInstance);
};

const editItem=(row:any)=>{
  edit(row).then(()=>{
    getParentOptions();
  })
}

const addMenu=()=>{
  model.value={
    name: "",
    type: "group",
  }
  add()
  getParentOptions()
}

const MenuName = computed(() => {
  return (row: any) => {
    return options.types.find((v) => v.value == row.type)?.label ?? "";
  };
});

const getParentOptions = async () => {
  const { data } = await http.get("menu/parents",{
     params:{
      _id:model.value._id ?? ""
     }
  });
  options.parents = data;
};

const isGroup=computed(()=>{
  return model.value.type==="group";
})

onMounted(() => {
  fetch();
  getParentOptions()
});
</script>

<style></style>
