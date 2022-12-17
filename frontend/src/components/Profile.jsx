import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Typography } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { LocalStorageService } from '../services/LocalStorage.service';

const { Title } = Typography;

function Profile() {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser({})
    LocalStorageService.removeItem('user')
    navigate("/")
  }

  const items = [
    {
      key: '1',
      danger: true,
      label: (
        <a href='#' onClick={handleLogout}>Cerrar sesión</a>
      ),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomRight">
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
          <Title level={4} style={{color: '#fff', margin: '0 0 5px 0'}}>{user.username}</Title>
          <Avatar icon={<UserOutlined />} size='large'/>
        </div>
      </Dropdown>
    </>
  );
}

export default Profile;
