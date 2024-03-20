<script setup lang="tsx">
import {onMounted, ref} from 'vue';
import {CURRENT_DAY, CURRENT_MONTH_FIRST_DAY, LAST_12_MONTHS, LAST_3_MONTHS, LAST_6_MONTHS} from "../utils/date";

const listTempValue = ref(['面包屑栏'])
const listTempOptions = [
    {
        value: '面包屑栏',
        label: '面包屑栏',
        render: () => {
            return <t-breadcrumb max-item-width="150" class="mb-16">
        <t-breadcrumbItem to="/">一级菜单</t-breadcrumbItem>
        <t-breadcrumbItem>当前菜单</t-breadcrumbItem>
      </t-breadcrumb>
        }
    },
    {
        value: '搜索栏',
        label: '搜索栏',
        children: [
            {
                label: '输入框',
                value: 'INPUT',
                type: 'SearchConfig',
                render: () => {
                    return {
                      name: 'userInput',
                      value: '',
                      default: '',
                      type: 'INPUT',
                      label: '基础输入框',
                      attrs: {
                        placeholder: '请输入'
                      }
                    }
                }
            },
            {
              label: 'Select选择',
              value: 'SELECT',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'userSelect',
                  value: '',
                  default: '',
                  type: 'SELECT',
                  label: '选择框',
                  attrs: {
                    placeholder: '请选择',
                    options: [
                      { key: '0', label: '成功', value: 0 },
                      { key: '1', label: '失败', value: 1 },
                    ],
                    clearable: true,
                  },
                }
              }
            },
            {
              value: 'DATE_PICKER',
              label: '时间选择',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'datePicker',
                  value: '',
                  default: '',
                  type: 'DATE_PICKER',
                  label: '时间筛选',
                }
              }
            },
            {
              value: 'DATE_PICKER1',
              label: '时间选择 - 年',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'datePicker',
                  value: '',
                  default: '',
                  type: 'DATE_PICKER',
                  label: '时间筛选',
                  attrs: {
                    mode: 'year'
                  }
                }
              }
            },
            {
              value: 'DATE_PICKER2',
              label: '时间选择 - 月',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'datePicker',
                  value: '',
                  default: '',
                  type: 'DATE_PICKER',
                  label: '时间筛选',
                  attrs: {
                    mode: 'month'
                  }
                }
              }
            },
            {
              value: 'DATE_PICKER3',
              label: '时间选择 - 季度',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'datePicker',
                  value: '',
                  default: '',
                  type: 'DATE_PICKER',
                  label: '时间筛选',
                  attrs: {
                    mode: 'quarter'
                  }
                }
              }
            },
            {
              value: 'DATE_PICKER4',
              label: '时间选择 - 周',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'datePicker',
                  value: '',
                  default: '',
                  type: 'DATE_PICKER',
                  label: '时间筛选',
                  attrs: {
                    mode: 'week'
                  }
                }
              }
            },
            {
              value: 'DATE_PICKER5',
              label: '时间选择 - 日',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'datePicker',
                  value: '',
                  default: '',
                  type: 'DATE_PICKER',
                  label: '时间筛选',
                  attrs: {
                    mode: 'date'
                  }
                }
              }
            },
            {
              label: '时间段选择',
              value: 'DATE_RANGE_PICKER',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'createTime',
                  value: [],
                  default: [],
                  type: 'DATE_RANGE_PICKER',
                  label: '操作日期',
                  attrs: {
                    placeholder: '请选择'
                  },
                }
              }
            },
            {
              label: '时间段选择 - 带时分秒/允许输入',
              value: 'DATE_RANGE_PICKER1',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'createTime',
                  value: [],
                  default: [],
                  type: 'DATE_RANGE_PICKER',
                  label: '操作日期',
                  attrs: {
                    placeholder: '请选择',
                    clearable: true,
                    enableTimePicker: true,
                    allowInput: true,
                  },
                }
              }
            },
            {
              label: '时间段选择 - 带快捷选项',
              value: 'DATE_RANGE_PICKER2',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'createTime',
                  value: [],
                  default: [],
                  type: 'DATE_RANGE_PICKER',
                  label: '操作日期',
                  attrs: {
                    disableDate: {
                      after: CURRENT_DAY,
                    },
                    presets: {
                      本月: [CURRENT_MONTH_FIRST_DAY, CURRENT_DAY],
                      '3个月': LAST_3_MONTHS,
                      '6个月': LAST_6_MONTHS,
                      '12个月': LAST_12_MONTHS,
                    },
                    enableTimePicker: true,
                  },
                }
              }
            },
            {
              label: '级联选项',
              value: 'CASCADER',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'type',
                  value: null,
                  default: null,
                  type: 'CASCADER',
                  label: '级联选择',
                  attrs: {
                    filterable: true,
                    trigger: 'hover',
                    options: [
                      {
                        label: '1',
                        value: '1',
                        children: [
                          {
                            label: '1.1',
                            value: '1.1'
                          },
                          {
                            label: '1.2',
                            value: '1.2'
                          },
                        ]
                      },
                      {
                        label: '2',
                        value: '2'
                      }
                    ],
                  },
                }
              }
            },
            {
              label: '单选',
              value: 'RADIO',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'radio',
                  value: '',
                  default: '',
                  type: 'RADIO',
                  label: '单选',
                  attrs: {
                    options: [
                      { key: '1', label: '1', value: 1 },
                      { key: '2', label: '2', value: 2 }
                    ],
                  },
                }
              }
            },
            {
              label: 'Checkbox多选',
              value: 'CHECKBOX',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'userCheckbox',
                  value: [],
                  default: [],
                  type: 'CHECKBOX',
                  label: '多选',
                  attrs: {
                    options: [
                      { key: '1', label: '1', value: 1 },
                      { key: '2', label: '2', value: 2 }
                    ],
                  },
                }
              }
            },
            {
              label: 'Tree树形选择',
              value: 'TREE_SELECT',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'treeSelect',
                  value: null,
                  type: 'TREE_SELECT',
                  label: '树形选择',
                  attrs: {
                    data: [
                      {
                        label: '1',
                        value: '1',
                        children: [
                          {
                            label: '1.1',
                            value: '1.1'
                          },
                          {
                            label: '1.2',
                            value: '1.2'
                          },
                        ]
                      },
                      {
                        label: '2',
                        value: '2'
                      }
                    ],
                    clearable: true,
                    placeholder: '请选择',
                  },
                }
              }
            },
            {
              value: 'TYPE_SELECT',
              label: '带前选的选择框',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'userType',
                  value: null,
                  default: null,
                  typeValue: null,
                  type: 'TYPE_SELECT',
                  typeWidth: '80px',
                  attrs: {
                    options: [
                      {
                        key: '1',
                        label: '评定等级1',
                        value: 'evaluate1',
                        children: [
                          { label: '1类', value: 1 },
                          { label: '2类', value: 2 },
                          { label: '3类', value: 3 },
                          { label: '4类', value: 4 },
                        ]
                      },
                      {
                        key: '2',
                        label: '评定等级2',
                        value: 'evaluate2',
                        children: [
                          { label: '1类', value: 1 },
                          { label: '2类', value: 2 },
                          { label: '3类', value: 3 },
                          { label: '4类', value: 4 },
                        ]
                      },
                    ],
                  },
                }
              }
            },
            {
              value: 'TYPE_INPUT',
              label: '带前选的输入框',
              type: 'SearchConfig',
              render: () => {
                return {
                  name: 'keyName',
                  value: null,
                  label: '搜索',
                  type: 'TYPE_INPUT',
                  typeValue: 1,
                  typeWidth: '80px',
                  attrs: {
                    options: [
                      { label: '申请人', value: 1 },
                      { label: '车牌号', value: 2 },
                      { label: '线路编号', value: 3 },
                      { label: '线路名称', value: 4 },
                    ],
                  },
                }
              }
            },
        ]
    },
    {
        label: '表格栏',
        children: [
            {
                label: '表头 - 名称',
                value: '表头名称'
            },
            {
                label: '表头 - 新增',
                value: '表头新增'
            },
            {
                label: '表头 - 导入',
                value: '表头导入'
            },
            {
                label: '表头 - 导出',
                value: '表头导出'
            },
            {
                label: '表格 - 筛选',
                value: '表格选项'
            },
            {
                label: '表格 - 索引',
                value: '表格索引'
            },
            {
                label: '表格 - 图片预览',
                value: '表格图片预览'
            },
            {
                label: '表格 - 状态判断',
                value: '表格状态判断'
            },
            {
                label: '操作 - 按钮',
                value: '操作'
            }
        ]
    }
]
const treeRef = ref()
const baseListRef= ref()
const changeHandle = () => {
    const list: any = []
    treeRef.value.store.checkedMap.forEach((v, key) => {
        treeRef.value.store.nodeMap.forEach((v1, k1) => {
            if (key === k1) {
                list.push({
                    ...v1.data
                })
            }

        })
    })

    baseListRef.value.renderCode(list)
}
onMounted(() => {
  changeHandle()
})
</script>
<template>
<div class="m-page">
    <div class="flex">
        <t-tree
            ref="treeRef"
            class="w-300"
            v-model="listTempValue"
            :data="listTempOptions"
            checkable
            expand-all
            hover
            multiple
            placeholder="请选择"
            @change="changeHandle"
        />
        <div class="flex-1">
            <BaseList ref="baseListRef"></BaseList>
        </div>
    </div>
</div>
</template>
<style scoped lang="less">
.w-300 {
    width: 300px;
}
</style>
