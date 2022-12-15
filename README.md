#  🚀  Cómo ejecutar la aplicación
### Clonar la aplicación
```sh
git clone https://github.com/EliasG1140/interview.git
```
En el repositorio encontraemos dos carpetas, destinadas para el Backend y el Frontend.
Para ello debemos empezar configurando el backend, **entramos a la carpeta** y colocamos los siguiente codigo.

## - Configuración del Backend
### Instalar los paquetes
```sh
npm install
```

*Nota: antes de realizar el siguiente paso, tenemos que crear la base de datos*
### Configurar el archivo .env
```sh
PORT=3000
#mysql://[USER MYSQL]:[PASSWORD MYSQL]@[HOST MYSQL]:[PORT MYSQL]/[NAME DATABASE]
DATABASE_URL="mysql://root:root@localhost:3306/addin"
JWT_SECRET="jwtsecret"
```

### Inicializamos la base de datos con su estructura.
```sh
npm run init
```

### Corremos el servidor
```sh
npm run dev
```

**Scripts disponibles***
```sh
"init": Inicializa la base de datos
"build": Limpia la carpeta dist y crea el build de la aplicación.
"production": Corre el servidor en modo producción.
"dev": Corre el servidor en modo desarrollo.
```