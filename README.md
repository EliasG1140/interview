#  馃殌  C贸mo ejecutar la aplicaci贸n
### Clonar la aplicaci贸n
```sh
git clone https://github.com/EliasG1140/interview.git
```
En el repositorio encontraemos dos carpetas, destinadas para el Backend y el Frontend.
Para ello debemos empezar configurando el backend, **entramos a la carpeta** y colocamos los siguiente codigo.

## Configuraci贸n del Backend
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
"build": Limpia la carpeta dist y crea el build de la aplicaci贸n.
"production": Corre el servidor en modo producci贸n.
"dev": Corre el servidor en modo desarrollo.
```


## Frontend

Para ingresar los siguientes comandos, hay que estar ubicados en la carpeta de 'frontend'

### Instalar los paquetes
```sh
npm install
```

### Ejecutar la aplicaci贸n web.
```sh
npm run dev
```
**Scripts disponibles***
```sh
"dev": Corre la aplicaci贸n en modo desarrollo.
"build": Compilar y crea el archivo bundle.
```
