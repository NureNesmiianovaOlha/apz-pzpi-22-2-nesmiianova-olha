import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Badge, Space, Modal, message } from 'antd';
import { ReloadOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import DeviceConfig from './DeviceConfig';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [configVisible, setConfigVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/iot');
      setDevices(response.data);
    } catch (error) {
      message.error('Помилка при завантаженні пристроїв');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/iot/${id}`);
      message.success('Пристрій видалено');
      fetchDevices();
    } catch (error) {
      message.error('Помилка при видаленні пристрою');
    }
  };

  const handleConfig = (device) => {
    setSelectedDevice(device);
    setConfigVisible(true);
  };

  const columns = [
    {
      title: 'Назва',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ID пристрою',
      dataIndex: 'deviceId',
      key: 'deviceId',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Локація',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'active' ? 'success' : 'error'} 
          text={status === 'active' ? 'Активний' : 'Неактивний'} 
        />
      ),
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<SettingOutlined />}
            onClick={() => handleConfig(record)}
          >
            Налаштування
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Видалити
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="IoT Пристрої"
      extra={
        <Button
          icon={<ReloadOutlined />}
          onClick={fetchDevices}
          loading={loading}
        >
          Оновити
        </Button>
      }
    >
      <Table
        dataSource={devices}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title="Налаштування пристрою"
        visible={configVisible}
        onCancel={() => setConfigVisible(false)}
        footer={null}
        width={800}
      >
        {selectedDevice && (
          <DeviceConfig
            device={selectedDevice}
            onClose={() => setConfigVisible(false)}
            onUpdate={fetchDevices}
          />
        )}
      </Modal>
    </Card>
  );
};

export default DeviceList; 