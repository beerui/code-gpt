import { defineStore } from 'pinia'
export const useCodeMirrorStore = defineStore('CodeMirror', {
  state: () => ({
    vueCode: `<template>
    <div class="g-warp">
      <t-space direction="vertical" style="width: 100%" v-if="breadcrumb">
        <t-breadcrumb :max-item-width="'150'" style="margin-bottom: 16px;">
          <t-breadcrumbItem>党建宣传</t-breadcrumbItem>
          <t-breadcrumbItem>2430养护橙成员管理</t-breadcrumbItem>
        </t-breadcrumb>
      </t-space>
      <t-space direction="vertical" style="width: 100%">
        <t-card :bordered="false">
          <t-space :style="style" direction="vertical" style="overflow: hidden; align-items: normal">
            <BaseSearchBar :config="baseSearchConfig" @reset="onReset" @submit="onSubmit"></BaseSearchBar>
          </t-space>
          <t-row justify="end" align="center" v-if="isCollapse">
            <div class="action" @click="toggle">
              {{ collapse ? '展开' : '收起' }}
            </div>
          </t-row>
        </t-card>
        <t-card :bordered="false">
          <t-space direction="vertical" style="width: 100%">
            <BaseTableHead :config="headConfig" @click="onClickTableHead" />
            <BaseTable v-model:selectedRowKeys="selectedRowKeys" row-key="id" :columns="tableColumns" :data="tableData"
              :data-loading="tableLoading" :pagination="pagination" :onPageChange="onPageChange"
              :onSelectChange="handleSelectChange" />
          </t-space>
        </t-card>
      </t-space>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { getExampleList } from "../../api/list";
  import { baseSearchConfig, baseHeadConfig, baseTableColumns, breadcrumb, isCollapse } from './constants'
  import { MessagePlugin } from "tdesign-vue-next";
  const selectedRowKeys = ref([]);
  const tableLoading = ref(false);
  const tableData = ref();
  const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10
  });
  const style = ref({ height: '44px' });
  if(!isCollapse) {
    style.value.height = 'auto';
  }
  const collapse = ref(true);
  const timerToggle = ref();
  const toggle = () => {
    timerToggle.value = null;
    if (collapse.value) {
      timerToggle.value = setTimeout(() => {
        style.value.height = 'auto';
      }, 200);
    } else {
      timerToggle.value = setTimeout(() => {
        style.value.height = '44px';
      }, 0);
    }
    collapse.value = !collapse.value;
  };
  
  const headConfig = ref(baseHeadConfig);
  const onCheck = (row) => console.log(row);
  const onEdit = (row) => console.log(row);
  const onDelete = (row) => console.log(row);
  const tableColumns = baseTableColumns(onCheck, onEdit, onDelete)
  
  const handleSelectChange = (value) => {
    selectedRowKeys.value = value;
  };
  
  const getList = async () => {
    tableLoading.value = true;
    const params = {
      pageNum: pagination.value.current,
      pageSize: pagination.value.pageSize
    };
    try {
      const { content, total } = await getExampleList(params);
      tableData.value = content ?? [];
      pagination.value.total = total;
    } catch (error) {
      console.error(error);
    } finally {
      tableLoading.value = false;
    }
  };
  
  getList();
  
  // 查询
  const onSubmit = () => {
    pagination.value.current = 1;
    getList();
  };
  
  // 重置
  const onReset = () => {
    baseSearchConfig.forEach((el) => {
      el.value = el.default;
    });
    pagination.value.current = 1;
    getList();
  };
  const onPageChange = (pageInfo: any) => {
    pagination.value.current = pageInfo.current;
    pagination.value.pageSize = pageInfo.pageSize;
    getList();
  };
  
  const onClickTableHead = (params) => {
    const { type, method } = params.event ?? params;
    if (type === 'METHOD') {
      btnMethods[method]();
    }
  };
  
  const btnMethods = {
    handleAdd: async () => {
      await MessagePlugin.success('调起新增 !');
    },
    onImport: async () => {
      await MessagePlugin.success('导入成功!');
    },
    onExport: async () => {
      await MessagePlugin.success('导出成功,请下载保存!');
      const filename = '列表.xlsx';
    }
  };
  </script>
  <style scoped>
  .g-warp {
    background-color: aliceblue;
  }
  
  .collapse {
    :deep(.my-card-conetnt) {
      text-align: center;
      margin-bottom: 0 !important;
    }
  }
  .action {
    cursor: pointer;
    color: #0052d9;
    user-select: none;
  }
  .action-icon {
    transition: all 0.1s ease-out;
  }
  .collapse-content {
    overflow: hidden;
    transition: height 0.2s ease-out;
    will-change: height;
    margin-bottom: 20px;
  }
  </style>
    `,
    jsxCode:''
  }),
  actions: {
    changeVueCode(code) {
      this.vueCode = code
    },
    changeJsxCode(code) {
      this.jsxCode = code
    }
  },
})
