import { onMounted, ref } from "vue";
import { getExampleList } from "../api/list";
import { MessagePlugin, PageInfo } from "tdesign-vue-next";
import { DownloadBlobFile } from "@anthead/utils";
import {OperatorConfigItem} from "@anthead/core";
import BaseOperator from "../utils/BaseOperator";

export default function render(props: any, { slots, emit, attrs }) {
  console.log(props, attrs);

  const selectedRowKeys = ref([]);
  const tableLoading = ref(false);
  const tableData = ref();
  const pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10
  });

  const onCheck = (row) => console.log(row);
  const onEdit = (row) => console.log(row);
  const onDelete = (row) => console.log(row);
  const tableColumnsTemp = (onCheck, onEdit, onDelete) => {
    if (props.needTableOperator) {
      return [
        ...props.TableColumns,
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
    return props.TableColumns
  }
  const tableColumns = tableColumnsTemp(onCheck, onEdit, onDelete)

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
    props.searchConfig.forEach((el) => {
      el.value = el.default;
    });
    pagination.value.current = 1;
    getList();
  };
  const onPageChange = (pageInfo: PageInfo) => {
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
      DownloadBlobFile(`djawiowd`, filename);
    }
  };

  return (
    <div class="g-warp">
      {props.renderBread ? props.renderBread() : ''}
      <t-space direction="vertical" style="width: 100%">
        <t-card bordered={false}>
          <t-space direction="vertical" style="width: 100%">
            <BaseSearchBar config={props.searchConfig} onReset={onReset} onSubmit={onSubmit}></BaseSearchBar>
          </t-space>
        </t-card>
        <t-card bordered={false}>
          <t-space direction="vertical" style="width: 100%">
            <BaseTableHead config={props.TableHeadConfig} onClick={onClickTableHead} />
            <BaseTable
              v-model:selectedRowKeys={selectedRowKeys.value}
              row-key="id"
              columns={tableColumns}
              data={tableData.value}
              data-loading={tableLoading.value}
              pagination={pagination.value}
              onPageChange={onPageChange}
              onSelectChange={handleSelectChange}
            />
          </t-space>
        </t-card>
      </t-space>
    </div>
  );
}
