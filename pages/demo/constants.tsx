import { PrimaryTableCol, TableRowData } from "tdesign-vue-next";
import { BTN_LIST_TYPE, OperatorConfigItem } from "@brewer/anthill-core";
import BaseOperator from "../../utils/BaseOperator";
export const isCollapse = true
export const breadcrumb = true
export const baseSearchConfig: any[] = [
  {
    name: "deptId",
    value: "",
    label: "发起人部门",
    type: "TREE_SELECT",
    attrs: {
      data: [],
      clearable: true,
      placeholder: "请选择",
    },
  },
  {
    name: "timeRange",
    value: [],
    type: "DATE_RANGE_PICKER",
    label: "发起时间",
    default: [],
    attrs: {
      enableTimePicker: true,
      placeholder: "请输入",
    },
  },
  {
    name: "userName",
    value: "",
    type: "INPUT",
    label: "发起人",
    attrs: {
      placeholder: "请输入",
    },
  },
  {
    name: "member",
    value: "",
    type: "INPUT",
    label: "参与人",
    attrs: {
      placeholder: "请输入",
    },
  },
  {
    name: "type",
    value: "",
    type: "SELECT",
    label: "会商类型",
    attrs: {
      options: [
        { key: "", label: "全部", value: "" },
        { key: "1", label: "1V1通话", value: "1" },
        { key: "0", label: "群组通话", value: "2" },
      ],
      clearable: true,
    },
  },
];


export const baseHeadConfig: BTN_LIST_TYPE = {
  title: '成员列表',
  btn: [{ attrs: { theme: 'primary' }, event: { type: 'METHOD', method: 'handle' }, text: '新增' }],
};

export const baseTableColumns: any = (
  onCheck,
  onEdit,
  onDelete
): PrimaryTableCol<TableRowData>[] => {
  return [
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
    },{
      title: "操作",
      width: 100,
      colKey: "op",
      fixed: "right",
      cell: (h, { row }) => {
        const configs: OperatorConfigItem[] = [
          { name: "详情", attrs: { onClick: () => onCheck(row) } },
        ];
        if (onEdit) {
          configs.push({ name: "编辑", attrs: { onClick: () => onEdit(row) } });
        }
        if (onDelete) {
          configs.push({
            name: "删除",
            attrs: { theme: "danger" },
            pop: {
              show: true,
              content: "是否删除",
              onConfirm: () => onDelete(row),
            },
          });
        }
        return BaseOperator(configs);
      },
    },
  ];
};
