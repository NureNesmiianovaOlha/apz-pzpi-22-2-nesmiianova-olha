import React, { useState, useEffect } from 'react';
import { Card, Table, DatePicker, Select, Space, Button } from 'antd';
import { Line } from '@ant-design/charts';
import axios from 'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const SensorData = ({ deviceId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([moment().subtract(7, 'days'), moment()]);
  const [selectedType, setSelectedType] = useState('attendance');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/iot/${deviceId}/data`, {
        params: {
          startDate: dateRange[0].toISOString(),
          endDate: dateRange[1].toISOString(),
          type: selectedType
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deviceId, dateRange, selectedType]);

  const columns = [
    {
      title: 'Час',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => moment(timestamp).format('DD.MM.YYYY HH:mm:ss')
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Значення',
      dataIndex: 'value',
      key: 'value',
      render: (value, record) => {
        switch (record.type) {
          case 'attendance':
            return value ? 'Присутній' : 'Відсутній';
          case 'temperature':
            return `${value}°C`;
          case 'humidity':
            return `${value}%`;
          default:
            return value;
        }
      }
    },
    {
      title: 'Студент',
      dataIndex: ['student', 'name'],
      key: 'student'
    }
  ];

  const chartConfig = {
    data: data.map(item => ({
      timestamp: moment(item.timestamp).format('DD.MM.YYYY HH:mm'),
      value: typeof item.value === 'boolean' ? (item.value ? 1 : 0) : item.value
    })),
    xField: 'timestamp',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond'
    },
    tooltip: {
      formatter: (datum) => {
        return {
          name: selectedType,
          value: datum.value
        };
      }
    }
  };

  return (
    <Card title="Дані сенсорів">
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          value={dateRange}
          onChange={setDateRange}
          showTime
        />
        <Select value={selectedType} onChange={setSelectedType} style={{ width: 200 }}>
          <Option value="attendance">Відвідуваність</Option>
          <Option value="temperature">Температура</Option>
          <Option value="humidity">Вологість</Option>
        </Select>
        <Button type="primary" onClick={fetchData} loading={loading}>
          Оновити
        </Button>
      </Space>

      <Line {...chartConfig} style={{ marginBottom: 24 }} />

      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        loading={loading}
      />
    </Card>
  );
};

export default SensorData; 