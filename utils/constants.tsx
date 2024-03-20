import { BaseFormItemType, BTN_LIST_TYPE, OperatorConfigItem } from '@anthead/core'
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next'

import BaseOperator from '@/utils/BaseOperator'

export const baseSearchConfig: BaseFormItemType[] = [
  {
    name: 'vehicleNo',
    value: '',
    default: '',
    type: 'INPUT',
    label: '基础输入框',
    attrs: {
      placeholder: '请输入'
    }
  },
  {
    name: 'type',
    value: '',
    default: '',
    type: 'SELECT',
    label: '基础单选',
    attrs: {
      clearable: true,
      placeholder: '请选择',
      options: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ]
    }
  },
  {
    name: 'secondType',
    value: '',
    default: '',
    type: 'SELECT',
    label: '单选带清除',
    attrs: {
      options: [
        { label: '全部', value: '' },
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ],
      clearable: true,
      placeholder: '请选择'
    }
  },
  {
    name: 'siteId',
    value: '',
    type: 'SELECT',
    label: '基础多选',
    attrs: {
      multiple: true,
      options: [
        { label: '全选', checkAll: true },
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 }
      ],
      clearable: true,
      placeholder: '请选择'
    }
  }
]

export const TableColumns = (onCheck: any, onEdit: any, onDelete: any): PrimaryTableCol<TableRowData>[] => {
  return [
    {
      colKey: 'row-select',
      type: 'multiple',
      width: 50
    },
    {
      title: '序号',
      width: 80,
      colKey: 'serial-number'
    },
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
      title: '项目车号',
      width: 120,
      colKey: 'tag',
      ellipsis: true,
      cell: (h, { row }) => {
        return <t-tag>{row.tag}</t-tag>
      }
    },
    {
      title: '创建日期',
      width: 180,
      colKey: 'time',
      ellipsis: true
    },
    {
      title: '操作',
      width: 100,
      colKey: 'op',
      fixed: 'right',
      cell: (h, { row }) => {
        const configs: OperatorConfigItem[] = [{ name: '详情', attrs: { onClick: () => onCheck(row) } }]
        if (onEdit) {
          configs.push({ name: '编辑', attrs: { onClick: () => onEdit(row) } })
        }
        if (onDelete) {
          configs.push({
            name: '删除',
            attrs: { theme: 'danger' },
            pop: {
              show: true,
              content: '是否删除',
              onConfirm: () => onDelete(row)
            }
          })
        }
        return BaseOperator(configs)
      }
    }
  ]
}

export const TableHeadConfig: BTN_LIST_TYPE = {
  title: '保险列表',
  btn: [
    { attrs: { theme: 'primary' }, event: { type: 'METHOD', method: 'handleAdd' }, text: '新建保单' },
    { attrs: { theme: 'default' }, event: { type: 'METHOD', method: 'onExportAll' }, text: '导出数据' }
  ]
}
