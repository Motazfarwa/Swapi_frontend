import React, { useContext, useState } from 'react';
import { Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { RoleContext } from './RoleContext';
import Navbar from './Navbar/Navbar';

const AddMBookForm = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const role = useContext(RoleContext);

  const onFinish = async (values) => {
    const { machineImage, file, nom, description } = values;

    if (!machineImage || machineImage.length === 0) {
      message.error('Please upload a machine image');
      return;
    }

    if (!file || file.length === 0) {
      message.error('Please upload a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('bookimagefile', machineImage[0].originFileObj);
    formData.append('file', file[0].originFileObj);

    try {
      await axios.post('http://localhost:4000/ajouter/addbook', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Books added successfully');
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to add machine');
    } finally {
      setLoading(false);
    }
  };

  // ... (keep the same sidebar and layout code)

  return (
    <div>
      <Navbar/>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

<div style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
  <h2 style={{ textAlign: 'center' }}>Add New Book</h2>

  <Form form={form} onFinish={onFinish} layout="vertical">
    {/* Machine Image Upload */}
    <Form.Item
      label="Machine Image"
      name="machineImage"
      rules={[{ required: true, message: 'Machine image is required' }]}
      valuePropName="fileList"
      getValueFromEvent={(e) => e?.fileList || []}
    >
      <Upload
        listType="picture-card"
        beforeUpload={() => false}
        maxCount={1}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Form.Item>

    {/* Machine Name */}
    <Form.Item
      label="Machine Name"
      name="nom"
      rules={[{ required: true, message: 'Please enter machine name' }]}
    >
      <Input />
    </Form.Item>

    {/* Description */}
    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please enter description' }]}
    >
      <Input.TextArea rows={4} />
    </Form.Item>

    {/* File Upload */}
    <Form.Item
      label="Upload File"
      name="file"
      rules={[{ required: true, message: 'Please upload a file' }]}
      valuePropName="fileList"
      getValueFromEvent={(e) => e?.fileList || []}
    >
      <Upload beforeUpload={() => false} maxCount={1}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>

    {/* Submit Button */}
    <Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Add Machine
      </Button>
    </Form.Item>
  </Form>
</div>
</div>
    </div>
   
  );
};

export default AddMBookForm;