import { PlusCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Layout, message, Modal, Typography, Upload } from 'antd'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AppCard from '../components/Card'
import Profile from '../components/Profile'
import { AppContext } from '../context/AppContext'

const { Title }= Typography

const SContentCard = styled.div`
  width: 100%;
  padding: 0 50px;
  height: 100%;

  display: grid;
  gap: 20px;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
`

const SLayoutContent = styled(Layout.Content)`
  height: calc(100vh - 64px);
  overflow-x: hidden;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
`

const SContentBar = styled.div`
  width: 100%;
  position: relative;
  text-align: center;
`

function Home() {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  // Modal
  const [modalProduct, setModalProduct] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [listImage,setListImage] = useState([])
  const [productSelected, setProductSelected] = useState({})
  const [urlImageEdit, setUrlImageEdit] = useState("")

  // Forms
  const [formNewProduct] = Form.useForm(null)
  const [formEditProduct] = Form.useForm(null)

  useEffect(()=>{
    if(!user.username) navigate("/login")
    getProducts()

  },[])

  // Request
  const getProducts = () => {
    axios({method: 'GET', url: '/product', headers: { 'Authorization':`Bearer ${user.token}` }})
    .then(({data}) => {
      setProducts(data.products)
    })
    .catch(error => console.log(error))
  }

  const validateModal = async (form) => {
    if(form == 'create'){
      formNewProduct.validateFields()
      .then(_ => {
        formNewProduct.submit()
      })
      .catch(_ => {
        return
      })
    }
    if(form == 'update'){
      formEditProduct.validateFields()
      .then(_ => {
        formEditProduct.submit()
      })
      .catch(_ => {
        return
      })
    }
  }

  const postNewProduct = (value) => {
    const payload = new FormData()
    payload.append("imgProduct", listImage[0])
    payload.append("name", value.name)
    payload.append("price", value.price)
    payload.append("descripcion", value.descripcion)
    axios({method: 'POST', url: '/product',data: payload, headers: { 'Authorization':`Bearer ${user.token}` }})
    .then(({data}) => {
      setModalProduct(false)
      setListImage([])
      formNewProduct.resetFields()
      getProducts()
    })
    .catch(error => {
      message.error(error.response.data.message, 3)
    })
  }

  const updateProduct = (value) => {
    const payload = new FormData()
    payload.append("imgProduct", listImage[0])
    payload.append("name", value.name)
    payload.append("price", value.price)
    payload.append("descripcion", value.descripcion)
    axios({method: 'PATCH', url: `/product/${productSelected.id}`,data: payload, headers: { 'Authorization':`Bearer ${user.token}` }})
    .then(({data}) => {
      setModalEdit(false)
      setListImage([])
      formEditProduct.resetFields()
      getProducts()
      message.success("Producto actualizado", 3)
    })
    .catch(error => {
      message.error(error.response.data.messsage, 3)
    }) 
  }

  const selectProduct = (id) => {
    axios({method: 'GET', url: `/product/${id}}`, headers: { 'Authorization':`Bearer ${user.token}` }})
    .then(({data}) => {
      setProductSelected(data)
      setUrlImageEdit(`http://localhost:3000/uploads/${data.namefile}`)
      formEditProduct.setFieldsValue({
        descripcion: data.descripcion,
        name: data.name,
        price: data.price
      })
      setModalEdit(true)
    })
    .catch(error => {
      console.log(error)
    })
  }

  // Props
  const configUpload = {
    multiple: false,
    maxCount: 1,
    name: 'image,',
    listType: 'picture',
    onRemove: () => {
      setListImage([])
    },
    beforeUpload: (file) => {
      setListImage([file])
     },
  }
  
  return (
    <Layout>
      <Layout.Header style={{backgroundColor: '#2c78d4', display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '10px'}}>
        <Profile/>
      </Layout.Header>
      <SLayoutContent>
        <SContentBar>
          <Title>Productos</Title>
          {user.rol === 'ADMIN' && (<Button onClick={()=>setModalProduct(true)} style={{position: 'absolute', right: '10px', top: '7px'}} icon={<PlusCircleOutlined />} type="primary">Agregar producto</Button>)}
        </SContentBar>
        
        <SContentCard>
          {products.map(element => {
            return <AppCard key={element.id} product={element} refresh={getProducts} openEdit={selectProduct}/>
          })}
        </SContentCard>

      </SLayoutContent>
      <Modal title="Nuevo producto" open={modalProduct} onOk={()=>validateModal("create")} onCancel={()=>{setModalProduct(false);setListImage([]);formNewProduct.resetFields()}}>
        <Form layout='vertical' form={formNewProduct} onFinish={postNewProduct}>
          <Form.Item name="image" rules={[{required:true, message: "Campo requerido."}]} label="Foto del producto">
            <Upload {...configUpload} fileList={listImage}>
              <Button icon={<UploadOutlined />}>Subir imagen</Button>
            </Upload>
          </Form.Item>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
          <Form.Item label="Nombre" name="name" rules={[{required:true, message: "Campo requerido."}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Precio" name="price" rules={[{required:true, message: "Campo requerido."}]}>
            <InputNumber
              style={{width: '100%'}}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/>
          </Form.Item>
          </div>
          <Form.Item label="Descripcion" name="descripcion" rules={[{required:true, message: "Campo requerido."}]}>
            <Input.TextArea maxLength={200} showCount style={{height: 120,resize: 'none'}}/>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Editar producto" open={modalEdit} onOk={()=>validateModal("update")} onCancel={()=>{setModalEdit(false);setListImage([]);formEditProduct.resetFields()}}>
        <Form layout='vertical' form={formEditProduct} onFinish={updateProduct}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
            <Form.Item label="Foto del producto">
              <img src={urlImageEdit} style={{width: '100px'}}/>
            </Form.Item>
            <Form.Item name="image" label="Cambiar">
              <Upload {...configUpload} fileList={listImage}>
                <Button icon={<UploadOutlined />}>Subir imagen</Button>
              </Upload>
            </Form.Item>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
          <Form.Item label="Nombre" name="name" rules={[{required:true, message: "Campo requerido."}]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Precio" name="price" rules={[{required:true, message: "Campo requerido."}]}>
            <InputNumber
              style={{width: '100%'}}
              min={0}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}/>
          </Form.Item>
          </div>
          <Form.Item label="Descripcion" name="descripcion" rules={[{required:true, message: "Campo requerido."}]}>
            <Input.TextArea maxLength={200} showCount style={{height: 120,resize: 'none'}}/>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Home