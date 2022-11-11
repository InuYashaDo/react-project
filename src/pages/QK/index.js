import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { pushHistory } from 'Src/utils';
import styles from './index.less';

const { Content, Sider } = Layout;

export default function BasicLayout() {
  // 项目更改
  const handleChangePro = ({ key }) => {
    pushHistory(`/${key}`);
  };

  return (
    <div className={styles.root}>
      <Layout style={{ height: '100%' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['vue']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={handleChangePro}
            items={[
              {
                label: '子项目',
                key: 'sub1',
                children: [
                  {
                    label: 'vue',
                    key: 'vue',
                  },
                  {
                    label: 'react',
                    key: 'react',
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div id="child-container" />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
