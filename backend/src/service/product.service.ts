import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import { upload } from "../middleware/multer.middleware";


const prisma = new PrismaClient()

export async function createProduct(req: Request, res: Response){
  return upload(req, res, async (err)=> {  
    if(err) return console.log(err)
    const { name, price, descripcion } = req.body
    const findProduct = await prisma.product.findUnique({where:{name}})
    if(findProduct) {
      res.status(404)
      res.send({
        message: "El producto ya se encuentra registrado."
      })
      return
    }
    const product = await prisma.product.create({
      data: { name, price: parseInt(price), descripcion, namefile: req.file.filename}
    })
    res.status(200)
    res.send({...product})
  })   
}

export async function updateProduct(req: Request, res: Response){
  return upload(req, res, async (err)=> {  
    if(err) return console.log(err)
    const { id } = req.params
    const { name, price, descripcion } = req.body
    const parseId = parseInt(id)
    const findProduct = await prisma.product.findUnique({where:{id: parseId}})
    if(!findProduct) {
      res.status(404)
      res.send({message:"El producto no existe."})
      return
    }
    const sameName = await prisma.product.findUnique({where:{name}})
    if(sameName) {
      if(sameName.id !== findProduct.id){
        res.status(404)
        res.send({messsage: "El nombre del producto ya existe."})
        return
      }
    }

    const product = await prisma.product.update({where:{id: parseId},
      data: { name, price: parseInt(price), descripcion, namefile: req.file ? req.file.filename : findProduct.namefile}
    })
    res.status(200)
    res.send({...product})
  })   
}

export async function getProduct(req: Request, res: Response){
  const products = await prisma.product.findMany()
  res.send({products})
}

export async function getOneProduct(req: Request, res: Response){
  const { id } = req.params
  const parseId = parseInt(id)
  const findProduct = await prisma.product.findUnique({where:{id: parseId}})
  if(!findProduct) throw new Error("El producto no existe.",{cause:"El producto no existe."})
  res.status(200)
  res.send(findProduct)
}

export async function deleteProduct(req: Request, res: Response){
  const { id } = req.params
  const parseId = parseInt(id)
  const findProduct = await prisma.product.findUnique({where:{id: parseId}})
  if(!findProduct) throw new Error("El producto no existe.",{cause:"El producto no existe."})

  const delet = await prisma.product.delete({where:{id: parseId}})
  res.status(200)
  res.send(delet)
}