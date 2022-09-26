import React, { useState } from "react";
import { Tabs } from "antd";
import "../../../node_modules/antd/lib/tabs/style/index.css";

const { TabPane } = Tabs;

const tempData = [
  {
    key: "1",
    content: "the content of tab 1",
    title: "tab 1",
  },
  {
    key: "2",
    content: "the content of tab 2",
    title: "tab 2",
  },
  {
    key: "3",
    content: "the content of tab 3",
    title: "tab 3",
  },
];

let num = tempData.length;

function FirstDemo() {
  const [tabKey, setTabKey] = useState("1");
  const [tabData, setTabData] = useState(tempData);

  // 移除某个tab
  const handleRemove = (key) => {
    if (key === tabKey) {
      const i = tabData.findIndex((item) => item.key === key);
      setTabKey(tabData[i - 1].key);
    }
    setTabData(tabData.filter((item) => item.key !== key));
  };

  // 新增某个tab
  const handleAdd = () => {
    setTabData((preData) => [
      ...preData,
      {
        key: `${num + 1}`,
        title: `Tab ${num + 1}`,
        content: `the content of tab ${num + 1}`,
      },
    ]);
    num++;
    setTabKey(`${num}`);
  };

  // 自带编辑方法回调
  const handleEdit = (key, type) => {
    if (type === "remove") {
      handleRemove(key);
    } else {
      handleAdd();
    }
  };

  // tab更改时的回调
  const handleChange = (key) => {
    setTabKey(key);
  };

  return (
    <Tabs
      activeKey={tabKey}
      type="editable-card"
      onEdit={handleEdit}
      onChange={handleChange}
    >
      {tabData.map((item) => {
        return (
          <TabPane tab={item.title} key={item.key}>
            {item.content}
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export default FirstDemo;
