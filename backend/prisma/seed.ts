import { PrismaClient } from "@prisma/client";
import { JSON_products } from "./json/products";
const prisma = new PrismaClient()

async function main() {
  const product = await prisma.product.createMany({data:JSON_products, skipDuplicates: true})
  console.log(`Productos importados: `, `${product.count}/${Object.keys(JSON_products).length}`)
}

main()
 .catch((e)=>{
  console.log(e);
  process.exit(1)
 })
 .finally(async () => {
  await prisma.$disconnect()
 })