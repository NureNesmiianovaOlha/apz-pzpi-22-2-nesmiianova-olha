import React, { useState } from 'react';
import { Form, Input, Button, message, Switch, InputNumber } from 'antd';
import axios from 'axios';

const DeviceConfig = ({ device, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await axios.put(`/api/iot/${device._id}/config`, values);
      message.success('Налаштування оновлено');
      onUpdate();
      onClose();
    } catch (error) {
      message.error('Помилка при оновленні налаштувань');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      initialValues={device.config || {}}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Інтервал оновлення (мс)"
        name="updateInterval"
        rules={[{ required: true, message: 'Введіть інтервал оновлення' }]}
      >
        <InputNumber min={1000} max={60000} step={1000} />
      </Form.Item>

      <Form.Item
        label="LED індикатор"
        name="ledEnabled"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label="Поріг температури (°C)"
        name="temperatureThreshold"
      >
        <InputNumber min={15} max={30} step={0.5} />
      </Form.Item>

      <Form.Item
        label="Поріг вологості (%)"
        name="humidityThreshold"
      >
        <InputNumber min={30} max={80} step={1} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Зберегти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DeviceConfig; 