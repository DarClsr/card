<template>
  <!-- 用户管理 -->
  <div class="top t-flex t-justify-end t-mt-3">
    <el-button :icon="Plus" type="primary" @click="add">新建</el-button>
  </div>
  <div class="table t-mt-3">
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="key" label="key"> </el-table-column>
      <el-table-column prop="createdAt" label="创建时间">
        <template #default="{ row }">
          {{ formatTime(row.createdAt) }}
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作">
        <template #default="{ row }">
          <el-button :icon="Edit" type="primary" @click="edit(row)"
            >编辑</el-button
          >
          <el-button :icon="RemoveFilled" type="danger" @click="remove(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      v-model="showDia"
      :title="isNew ? '新建角色' : '编辑角色'"
      size="50%"
    >
      <el-form :model="model" ref="userForm">
        <el-form-item prop="name" label="名称">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item prop="key" label="key">
          <el-radio-group v-model="model.key" size="large">
            <el-radio-button :label="item.value" v-for="item in options.roles">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="menus" label="菜单">
          <el-cascader
            v-model="model.menus"
            :props="menuProps"
            :options="menus"
          />
        </el-form-item>
        <el-form-item prop="permission" label="模块权限">
          <el-cascader
            v-model="model.permission"
            :props="permissionProps"
            :options="permissions"
          />
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

<script lang="ts" setup>
import { Edit, Plus, RemoveFilled } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, computed } from "vue";
import { useCrud } from "@/composeables/useCrud";
import { FormInstance } from "element-plus";
import { formatTime,expandArr } from "@/utils/";
import { loadMenus } from "@/api/menu";
import { getPermissionOptions } from "@/api/permission";


const { data, fetch, create, add, edit, showDia, isNew, model, save, remove } =
  useCrud("role", {
    key: "",
    role: "",
    permission:[],
    menus:[]
  });

const permissionProps = reactive({
  multiple: true,
  emitPath:false,
});

const menuProps = reactive({
  multiple: true,
});

const userForm = ref<FormInstance>();

const options = reactive({
  roles: [
    {
      label: "管理员",
      value: "admin",
    },
    {
      label: "老师",
      value: "teacher",
    },
    {
      label: "学生",
      value: "student",
    },
  ],
});

const submit = () => {
  const deepMenus=expandArr(model.value.menus);
  model.value.menus=deepMenus;
  save(userForm.value as FormInstance);
};

const menus = ref([]);

const permissions=ref([])

onMounted(() => {
  fetch();

  loadMenus().then((data) => {
    menus.value = data as [];
  });

  getPermissionOptions().then((data) => {
    permissions.value = data as [];
  });
});
</script>
