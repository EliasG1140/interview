import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, message, Popconfirm, Typography } from 'antd'
import axios from 'axios'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext'
import Image from './Image'

const { Title, Paragraph  } = Typography

const SCard = styled.div`
  position: relative;
  background-color: #fff;
  width: 240px;
  height: 300px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  transition: box-shadow 0.2s,border-color 0.2s;
  border-radius: 10px;
  &:hover {
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
  }
`

const SContentButton = styled.div`
  position: absolute;
  display: flex;
  gap: 5px;
  top: 5px;
  right: 5px;
`

const SContentInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
`

const STextTruncate = styled(Paragraph)`
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

function AppCard({product, refresh, openEdit}) {
  const { user } = useContext(AppContext)

  const handleDelete = () => {
    axios({method: 'DELETE', url:`/product/${product.id}`, headers: { 'Authorization':`Bearer ${user.token}` }})
    .then(value => {
      refresh()
    })
    .catch(error => {
      message.error(" ", 3)
    })
  }

  return (
    <SCard>
      <Image url={product.namefile}/>
      { user.rol === 'ADMIN' && (
        <SContentButton>
          <Button onClick={()=> openEdit(product.id)} type='primary'><EditOutlined/></Button>
          <Popconfirm title="Está seguro de eliminar este producto ?" onConfirm={()=>handleDelete()}>
            <Button danger type='primary'><DeleteOutlined /></Button>
          </Popconfirm>
        </SContentButton>
      )}
      <SContentInfo>
        <Title style={{margin: 0}} level={4}>{product.name}</Title>
        <Title style={{margin: 0}} level={5}>$ {product.price}</Title>
        <STextTruncate>{product.descripcion}</STextTruncate>
      </SContentInfo>
    </SCard>
  )
}

export default AppCard