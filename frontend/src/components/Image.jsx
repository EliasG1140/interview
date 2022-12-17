import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../context/AppContext'

const SImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SContentImage = styled.div`
  position: relative;
  border-radius: 10px 10px 0 0;
  height: 150px;
  overflow: hidden;
  border-bottom: 1px solid #c4c4c4;
`

function Image({url}) {

  return (
    <SContentImage>
      <SImage alt='example' src={`http://localhost:3000/uploads/${url}`}/>
    </SContentImage>
  )
}

export default Image