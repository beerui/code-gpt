<template>
    <RenderBaseList
      v-if="isNeedRender"
      :renderBread="renderBread"
      :searchConfig="searchConfigs"
      :TableHeadConfig="TableHeadConfig"
      :TableColumns="TableColumns"
      :needTableOperator="needTableOperator"
    />
</template>
<script setup lang="tsx">
import { nextTick, ref } from 'vue'
import {BTN_LIST_TYPE, OperatorConfigItem} from "@brewer/anthill-core";
import BaseOperator from "../utils/BaseOperator";
import {useCodeMirrorStore} from "../stores/codeMirror";
const codeMirrorPinia = useCodeMirrorStore()

const isNeedRender = ref(false)
let renderBread = ref()
const searchConfigs = ref([])
const TableHeadConfig: BTN_LIST_TYPE & { btn?: any } = {
  title: '',
  btn: [],
};
let TableColumns:any = []
let needTableOperator = false
const tsTemplate = (searchConfig, TableHeadConfig,TableColumns, renderBread ) => {
  return `import { PrimaryTableCol, TableRowData } from "tdesign-vue-next";
import { BTN_LIST_TYPE, OperatorConfigItem } from "@brewer/anthill-core";
import BaseOperator from "../../utils/BaseOperator";
export const isCollapse = ${searchConfig.length > 6 ? 'true' : 'false'}
export const breadcrumb = ${!!renderBread}
export const baseSearchConfig: any[] = ${JSON.stringify(searchConfig, null, 2)}

export const baseHeadConfig: BTN_LIST_TYPE = ${JSON.stringify(TableHeadConfig, null, 2)}

export const baseTableColumns: any = (
  onCheck,
  onEdit,
  onDelete
): PrimaryTableCol<TableRowData>[] => {
  return ${JSON.stringify(TableColumns, null, 2)}
};
    `
}
const renderCode = (list) => {
  isNeedRender.value = false
  renderBread.value = ''
  searchConfigs.value = []
  TableHeadConfig.title = ''
  TableHeadConfig.btn = []
  needTableOperator = false
  TableColumns = [
    {
      title: '标题',
      colKey: 'title',
      width: 120
    },
    {
      title: '描述',
      colKey: 'desc',
      width: 120
    },
    {
      title: '创建日期',
      width: 180,
      colKey: 'time',
      ellipsis: true
    },
  ]
  if(list.length===0) {
    codeMirrorPinia.changeJsxCode(tsTemplate(searchConfigs.value, TableHeadConfig, TableColumns,renderBread.value))
  }
    list.forEach(el => {
        if (el?.type === 'SearchConfig') {
          searchConfigs.value.push(el.render())
        } else if (el.label === '面包屑栏') {
          renderBread.value = el.render
        } else if (el.label === '表头 - 名称') {
          TableHeadConfig.title = '示例名称'
        } else if (el.label === '表头 - 导入') {
          TableHeadConfig.btn.push(
            { attrs: { theme: 'default' }, event: { type: 'METHOD', method: 'onImport' }, text: '导入数据' }
          )
        } else if (el.label === '表头 - 导出') {
          TableHeadConfig.btn.push(
            { attrs: { theme: 'default' }, event: { type: 'METHOD', method: 'onExport' }, text: '导出数据' }
          )
        } else if (el.label === '表头 - 新增') {
          TableHeadConfig.btn.push(
            { attrs: { theme: 'primary' }, event: { type: 'METHOD', method: 'handleAdd' }, text: '新建', authKey: 'add' },
          )
        } else if (el.label === '表格 - 筛选') {
          TableColumns.unshift({
            colKey: 'row-select',
            type: 'multiple',
            width: 50
          })
        } else if (el.label === '表格 - 索引') {
          if (TableColumns.filter((el) => el.colKey === 'row-select').length > 0) {
            TableColumns.splice(1, 0, {
              title: '序号',
              width: 80,
              colKey: 'serial-number'
            })
          }
        } else if (el.label === '表格 - 图片预览') {
          TableColumns.push({
            title: '图片预览',
            colKey: 'images',
            className: 'g-table-img',
            width: 120,
            cell: (h, { row }) => {
              if (Array.isArray(row.images) && row.images?.length > 0) {
                const imgTrigger = (h: any, { open }: { open: () => void }) => (
                  <t-image
                    src={row.images?.[0]}
                    fit="cover"
                    style={{ width: '40px', height: '40px' }}
                    onClick={open}
                  />
                );
                return <t-image-viewer images={row.images} trigger={imgTrigger}></t-image-viewer>;
              }
              return <span>-</span>;
            },
          })
        } else if (el.label === '表格 - 状态判断') {
          TableColumns.push({
            title: '操作状态',
            colKey: 'description',
            width: 150,
            cell: (h, { row, rowIndex }) => {
              return <t-space>{row.status === 0 ? '成功' : '失败'}</t-space>;
            },
          })
        } else if (el.label === '操作 - 按钮') {
          needTableOperator = true
        }
        console.log(renderBread.value);

        codeMirrorPinia.changeJsxCode(tsTemplate(searchConfigs.value, TableHeadConfig, TableColumns,renderBread.value))
    })
    nextTick(() => {
        isNeedRender.value = true
    })
}
defineExpose({ renderCode })
</script>
<style lang="less" scoped></style>
