import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { LockOutlined } from '@ant-design/icons/lib/icons';
import { Button, Form, Input, Layout, message, Typography } from 'antd';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const { Paragraph, Title } = Typography;

function Register() {
  const navigate = useNavigate()

  const submitRegister = (value) => {
    axios({ method: 'POST', url: 'auth/register', data: value })
    .then(({data}) => {
      navigate("/login")
    })
    .catch((error) => {
      message.error(error.response.data.message, 3);
    });
  };

  return (
    <Layout style={{ width: '100vw', height: '100vh' }}>
      <Layout.Sider
        width={600}
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#4096FF',
        }}
      >
        <div
          style={{
            width: '400px',
            height: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Title style={{ color: '#fff' }}>Bienvenido</Title>
          <Paragraph style={{ fontSize: '16px', color: '#fff' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa corporis eos ipsum, totam dolor illum sit modi in. In laboriosam ipsa aliquid asperiores, hic tenetur incidunt qui. Modi, praesentium culpa.
          </Paragraph>
        </div>
      </Layout.Sider>
      <Layout.Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '300px', textAlign: 'center' }}>
          <Title>Registrarse</Title>
          <Form onFinish={submitRegister}>
            <Form.Item name="name" rules={[{ required: true, message: 'Porfavor ingresa tu nombre' }]}>
              <Input placeholder="Nombre" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Porfavor ingresa un nombre de usuario.',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre de usuario" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'porfavor ingresa una contraseña' }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
            </Form.Item>

            <Form.Item name="email" rules={[{ required: true, message: 'Porfavor ingresa un correo electrónico' }]}>
              <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Correo electrónico" />
            </Form.Item>

            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                {' '}
                Registrarse{' '}
              </Button>{' '}
              o<Link to={'/login'}> Iniciar sesión</Link>
            </Form.Item>
          </Form>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default Register;
