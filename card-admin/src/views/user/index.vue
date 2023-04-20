<template>
  <!-- 用户管理 -->
  <div class="top t-flex t-justify-end t-mt-3">
    <el-button :icon="Plus" type="primary" @click="add"
    v-permission="'user:permission:create'"
    >新建</el-button>
  </div>
  <div class="table t-mt-3">
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="username" label="名称" width="180" />
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag type="danger" disable-transitions>{{ Role(row) }}</el-tag>
        </template>
      </el-table-column>
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
      :title="isNew ? '新建用户' : '编辑用户'"
      size="50%"
    >
      <el-form :model="model" ref="userForm">
        <el-form-item prop="username" label="名称">
          <el-input v-model="model.username" />
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-radio-group v-model="model.role" size="large">
            <el-radio-button :label="item.value" v-for="item in options.roles">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="model.email" />
        </el-form-item>
        <el-form-item prop="email" label="超级管理员">
          <el-checkbox v-model="model.isSuper" />
        </el-form-item>
        <el-form-item>
          <div class="t-flex t-justify-end t-w-full">
            <el-button type="primary" @click="submit">{{
              isNew ? "新建" : "保存"
            }}</el-button>
          </div>
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
import { formatTime } from "@/utils/";
import { getRoleOptions } from "@/api/role";

const { data, fetch, create, add, edit, showDia, isNew, model, save, remove } =
  useCrud("user", {
    email: "",
    username: "",
    role: "",
    password: "123456",
  });

const userForm = ref<FormInstance>();

const options = reactive({
  roles: [],
});

const submit = () => {
  save(userForm.value as FormInstance);
};

const Role = computed(() => {
  return (row: any) => {
    const label =
      options.roles.find((v: any) => v.value === row.role)?.label ?? "";
    return label;
  };
});

onMounted(() => {
  fetch();
  getRoleOptions().then((data) => {
    options.roles = data;
  });
});
</script>
