### Instalación de dependencias (requiere node)

    npm i

### Iniciar el proyecto

    npm run dev

Se abre en el puerto http://localhost:3001

### Endpoints
#### url login

    localhost:3001/api/v1/user/doLogin
#### body
    {
        "userName":"json",
        "password":"admin"
    }

#### url order

    localhost:3001/api/v1/order/createOrder
#### header
    tokensito: token generado con el login