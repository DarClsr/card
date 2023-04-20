<template>
  <div id="m-5" class="t-mt-3">
    <div class="top t-flex t-justify-end">
      <el-button :icon="Plus" type="primary" @click="addPermission"
        >新建</el-button
      >
    </div>
    <div class="table t-mt-3">
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="type" label="操作">
          <template #default="{ row }">
            <el-tag
              type="danger"
              disable-transitions
              v-for="action in row.actions"
              :key="action"
              class="mx-2"
              >{{ actionName(action) }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间">
          <template #default="{ row }">
            {{ formatTime(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template #default="{ row }">
            <el-button :icon="Edit" type="primary" @click="editItem(row)"
              >编辑</el-button
            >
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
      <el-form :model="model" ref="permissionForm" label-width="80px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item prop="type" label="模块key">
          <el-input v-model="model.source" />
        </el-form-item>
        <el-form-item prop="icon" label="操作列表">
          <el-select v-model="model.actions" placeholder="请选择操作" multiple>
            <el-option
              v-for="item in options.actions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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

const { data, fetch, create, add, edit, showDia, isNew, model, save } = useCrud(
  "permission",
  {
    name: "",
    source: "",
    actions: [],
  }
);

const permissionForm = ref<FormInstance>();

const options = reactive({
  actions: [
    {
      label: "增加",
      value: "create",
    },
    {
      label: "删除",
      value: "delete",
    },
    {
      label: "编辑",
      value: "update",
    },
    {
      label: "查看",
      value: "read",
    },
  ],
  parents: [],
});

const submit = () => {
  save(permissionForm.value as FormInstance);
};

const editItem = (row: any) => {
  edit(row).then(() => {
    getParentOptions();
  });
};

const addPermission = () => {
  model.value = {
    name: "",
    type: "",
  };
  add();
  getParentOptions();
};

const actionName = computed(() => {
  return (row: any) => {
    return options.actions.find((v) => v.value == row)?.label ?? "";
  };
});

const getParentOptions = async () => {
  const { data } = await http.get("menu/parents", {
    params: {
      _id: model.value._id ?? "",
    },
  });
  options.parents = data;
};

const isGroup = computed(() => {
  return model.value.type === "group";
});

onMounted(() => {
  fetch();
  getParentOptions();
});
</script>

<style></style>
