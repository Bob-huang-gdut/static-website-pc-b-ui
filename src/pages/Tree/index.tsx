import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { message, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';

const defaultData = [
  {
    "key": "330097707609804862",
    "title": "销售日报",
    "type": "page",
    "pageType": "form",
    "releaseState": "unreleased"
  },
  {
    "key": "330103357349875726",
    "title": "广告日报",
    "type": "page",
    "pageType": "form",
    "releaseState": "unreleased"
  },
  {
    "key": "330100623330562140",
    "title": "月度目标管理",
    "type": "page",
    "pageType": "form",
    "releaseState": "unreleased"
  },
  {
    "key": "335008064694439960",
    "title": "年度目标管理",
    "type": "page",
    "pageType": "form",
    "releaseState": "unreleased"
  },
  {
    "key": "338061357490429961",
    "title": "数据分析分组",
    "type": "group",
    "children": [
      {
        "key": "352762874629775429",
        "title": "销售日报汇总",
        "type": "page",
        "pageType": "custom",
        "releaseState": "unreleased"
      },
      {
        "key": "348893180504105031",
        "title": "销售月报汇总",
        "type": "page",
        "pageType": "custom",
        "releaseState": "unreleased"
      },
      {
        "key": "336126640478281781",
        "title": "趋势分析",
        "type": "page",
        "pageType": "custom",
        "releaseState": "unreleased"
      },
      {
        "key": "389567117277593604",
        "title": "月度目标汇总",
        "type": "page",
        "pageType": "custom",
        "releaseState": "unreleased"
      }
    ]
  },
  {
    "key": "0-0",
    "title": "分组",
    "type": "group",
    "children": [
      {
        "key": "0-0-1",
        "title": "0-0-1",
        "type": "page",
        "pageType": "custom",
        "releaseState": "unreleased"
      },
      {
        "key": "0-0-2",
        "title": "0-0-2",
        "type": "page",
        "pageType": "custom",
        "releaseState": "unreleased"
      },
      {
        "key": "0-0-3",
        "title": "0-0-3",
        "type": "page",
        "pageType": "custom",
        "releaseState": "unreleased"
      },
      {
        "key": "0-0-4",
        "title": "0-0-4",
        "type": "group",
        "children": [
          {
            "key": "0-0-4-1",
            "title": "0-0-4-1",
            "type": "page",
            "pageType": "custom",
            "releaseState": "unreleased"
          },
        ]
      }
    ]
  },
]

const Page: React.FC = () =>
{

  const [gData, setGData] = useState(defaultData);
  const [selectKeys] = useState(["336126640478281781"]);

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // selectKeys 需要受控时设置
    // setselectKeys(info.selectKeys)
  };

  const onDrop: TreeProps['onDrop'] = (info) =>
  {
    console.log('onDrop', info);
    const dropType = info.node.type;
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    if (dropType === 'page' && !info.dropToGap)
    {
      message.error('页面下不能再挂页面或分组')
      return
    }
    
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) =>
    {
      for (let i = 0; i < data.length; i++)
      {
        if (data[i].key === key)
        {
          return callback(data[i], i, data);
        }
        if (data[i].children)
        {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) =>
    {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap)
    {
      // Drop on the content
      loop(data, dropKey, (item) =>
      {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // TODO:On the bottom gap
    )
    {
      loop(data, dropKey, (item) =>
      {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else
    {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) =>
      {
        ar = arr;
        i = index;
      });
      // TODO:
      if (dropPosition === -1)
      {
        ar.splice(i!, 0, dragObj!);
      } else
      {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);

    console.log('data %c⧭', 'color: #00bf00', data);
  };

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={selectKeys}
      defaultSelectedKeys={selectKeys}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
    />
  );
};

export default Page;
