import { Request, Response } from "express";
import * as productService from './../service/product.service'

export async function createProduct(req: Request, res: Response){
  try {
    await productService.createProduct(req, res) 
  } catch (error) {
    res.status(404)
    res.send({message: error.cause})
  }
}

export async function updateProduct(req: Request, res: Response){
  try {
    await productService.updateProduct(req, res) 
  } catch (error) {
    res.status(404)
    res.send({message: error.cause})
  }
}

export async function getProduct(req: Request, res: Response){
  try {
    await productService.getProduct(req, res) 
  } catch (error) {
    res.status(404)
    res.send({message: error.cause})
  }
}

export async function getOneProduct(req: Request, res: Response){
  try {
    await productService.getOneProduct(req, res) 
  } catch (error) {
    res.status(404)
    res.send({message: error.cause})
  }
}

export async function deleteProduct(req: Request, res: Response){
  try {
    await productService.deleteProduct(req, res) 
  } catch (error) {
    res.status(404)
    res.send({message: error.cause})
  }
}