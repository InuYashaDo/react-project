import React, { useState } from "react";
import { Tabs, Modal, Input, Icon } from "antd";
import "../../../node_modules/antd/lib/tabs/style/index.css";
import "../../../node_modules/antd/lib/tabs/style/css";
import "../../../node_modules/antd/lib/modal/style/index.css";
import "../../../node_modules/antd/lib/input/style/index.css";

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

const ReNameModal = (props) => {
  const { onOk, defaultValue, visible, onCancel } = props;
  const [name, setName] = useState(defaultValue);

  const modalProps = {
    visible,
    onCancel,
    onOk: () => onOk(name),
    closable: false,
  };
  return (
    <Modal {...modalProps}>
      <Input
        placeholder="请输入名称"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Modal>
  );
};

function SecondDemo() {
  const [tab, setTab] = useState(tempData[0]);
  const [tabData, setTabData] = useState(tempData);
  const [showModal, setShowModal] = useState(false);

  // modal确定的回调
  const handleReName = (newName) => {
    const tempData = [...tabData];
    tempData.forEach((item) => {
      if (item.key === tab.key) {
        item.title = newName;
      }
    });
    setTabData(tempData);
    setShowModal(false);
  };

  // 移除某个tab
  const handleRemove = (key) => {
    if (key === tab.key) {
      const i = tabData.findIndex((item) => item.key === key);
      setTab(tabData[i - 1]);
    }
    setTabData(tabData.filter((item) => item.key !== key));
  };

  // 新增某个tab
  const handleAdd = () => {
    const newTab = {
      key: `${num + 1}`,
      title: `Tab ${num + 1}`,
      content: `the content of tab ${num + 1}`,
    };
    setTabData((preData) => [...preData, newTab]);
    num++;
    setTab(newTab);
  };

  // 自带编辑方法回调
  const handleEdit = (key, type) => {
    if (type === "remove") {
      handleRemove(key);
    }
  };

  // tab更改时的回调
  const handleChange = (key) => {
    if ((key === "add")) {
      handleAdd();
    } else {
      const clickTab = tabData.find((item) => item.key === key);
      setTab(clickTab);
    }
  };

  // 自定义渲染每个tab
  const renderTab = (tabTitle, key) => {
    return (
      <span>
        {key === tab.key && (
          <Icon type="form" onClick={() => setShowModal(true)} />
        )}
        {tabTitle}
      </span>
    );
  };

  // 渲染addTab
  const renderAddTab = () => {
    return <Icon type="plus" />;
  };

  // modal传参
  const modalProps = {
    visible: showModal,
    onCancel: () => setShowModal(false),
    onOk: handleReName,
    defaultValue: tab.title,
  };

  return (
    <>
      <Tabs
        activeKey={tab.key}
        type="editable-card"
        onEdit={handleEdit}
        onChange={handleChange}
        hideAdd
      >
        {tabData.map((item, index) => {
          return (
            <TabPane
              tab={renderTab(item.title, item.key)}
              key={item.key}
              closable={index !== 0}
            >
              {item.content}
            </TabPane>
          );
        })}
        <TabPane tab={renderAddTab()} key="add" closable={false} />
      </Tabs>
      {showModal && <ReNameModal {...modalProps} />}
    </>
  );
}

export default SecondDemo;
