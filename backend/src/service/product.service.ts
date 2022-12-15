import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function createProduct(req: Request, res: Response){
  const { name, price, descripcion } = req.body
  console.log(name)
  const findProduct = await prisma.product.findUnique({where:{name}})
  if(findProduct) throw new Error("El producto ya se encuentra registrado.", {cause: "El producto ya se encuentra registrado."})

  const product = await prisma.product.create({
    data: {
      name, price, descripcion
    }
  })
  
  res.status(200)
  res.send({...product})
}

export async function updateProduct(req: Request, res: Response){
  const { id } = req.params
  const { name, price, descripcion } = req.body
  const parseId = parseInt(id)

  const findProduct = await prisma.product.findUnique({where:{id: parseId}})
  if(!findProduct) throw new Error("El producto no existe.",{cause:"El producto no existe."})

  const product = await prisma.product.update({where:{id: parseId},
  data: { name, descripcion, price}})

  res.status(200)
  res.send(product)
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