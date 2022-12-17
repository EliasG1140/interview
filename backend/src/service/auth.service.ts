import { PrismaClient } from "@prisma/client"
import { compare, hash } from "bcrypt"
import { Response } from "express"
import * as jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function signUp(body: any, res: Response){
  const { username, password, email, name} = body

  const findUsername = await prisma.user.findUnique({where: {username}})
  if(findUsername) throw new Error("El nombre de usuario ya se encuentra registrado", {cause: "El nombre de usuario ya se encuentra registrado"})
  const findEmail = await prisma.user.findUnique({where: {email}})
  if(findEmail) throw new Error("El email ya se encuentra registrado", {cause: "El email ya se encuentra registrado"})

  const hashPassword = await hash(password, 10)
  await prisma.user.create({
    data: {
      email, name, password: hashPassword, username, rol: 'USER'
    }
  })
  res.status(200)
  res.send({
    message: "Usuario creado exitosamente."
  })
}

export async function signIn(body: any, res: Response) {
  const { username, password } = body
  const user = await prisma.user.findUnique({where: {username}})
  if(!user) throw new Error("Usuario o contraseña incorrecta.", {cause: "Usuario o contraseña incorrecta."})

  const checkPassword = await compare(password, user.password)
  if(!checkPassword) throw new Error("Usuario o contraseña incorrecta.", {cause: "Usuario o contraseña incorrecta."})

  const payload = {
    username,
    rol: user.rol,
    email: user.email
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
  res.send({
    username,
    rol: user.rol,
    token
  })
}

export async function appInit() {
  const findAdmin = await prisma.user.findUnique({where:{username: "admin"}})
  if(findAdmin) {
    console.log("El usuario administrador ya se encuentra creado.\n", {...findAdmin, password: "admin"})
    return
  }
  
  const hashPassword = await hash("admin", 10)
  const user = await prisma.user.create({
    data:{
      username: "admin",
      name: "Elias Garcia",
      password: hashPassword,
      email: "admin@gmail.com",
      rol: 'ADMIN'
    }
  })
  console.log("Usuario administrador creado.\n", {
    ...user,
    password: "admin"
  })
  return
}