import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  ApiOutlined
} from '@ant-design/icons';

import DeviceList from './components/IoTDevices/DeviceList';
import SensorData from './components/IoTDevices/SensorData';
// Імпортуйте інші компоненти

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <div className="logo" />
          <h1 style={{ color: 'white' }}>Система відстеження успішності студентів</h1>
        </Header>
        <Layout>
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{ height: '100%', borderRight: 0 }}
              theme="dark"
            >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                <Link to="/">Головна</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/students">Студенти</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<TeamOutlined />}>
                <Link to="/teachers">Викладачі</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<BookOutlined />}>
                <Link to="/subjects">Предмети</Link>
              </Menu.Item>
              <Menu.SubMenu key="iot" icon={<ApiOutlined />} title="IoT">
                <Menu.Item key="5">
                  <Link to="/iot/devices">Пристрої</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/iot/data">Дані сенсорів</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Routes>
                <Route path="/iot/devices" element={<DeviceList />} />
                <Route path="/iot/data" element={<SensorData />} />
                {/* Додайте інші маршрути */}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App; 