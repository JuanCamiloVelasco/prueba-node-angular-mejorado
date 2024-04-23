## Pasos de desarrollo
1. backend
    1. creacion de la base de datos en mongo atlas
    2. creacion de los modelos
    3. creacion de la conexion a la base de datos (configs y server.ts)
    4. creacion de los controladores con todas las apis y filtros
    5. creacion de las rutas
2. frontend
    1. creacion del homeComponent
    2. creacion y conexion del header con sus estilos y logo
    3. creacion y conexion de las rutas
    4. creacion del eventosService para realizar la conexion backend frontend
    5. implementacion del service en el component .ts para obtener todos los eventos y darles estilos
    6. creacion de default components para mayor escalabilidad y verificacion de errores
    7. registration page: se crean los metodos para realizar el registro y se realiza el html y css correspondientes
    8. mensajes personalizados usando toastr (sweet alert no es compatible con angular 17 por el momento)
    9. terminar de implementar el metodo eliminar
    10. creacion pagina-eventos para mostrar mas informacion de los mismos
    11. not found component para mostrar un mensaje en caso que no existan resultados a la busqueda
    12. loading component e interceptors para mostrar un logo de carga en la pagina
3. deployment
    1. modificar el outputhpath en angular.json
    2. crear el package.json para
        1. frontend
        2. backend
        3. root
    3. BASE_URL en urls.ts
    4. publicar el folder en server.ts
    5. correr los comandos
    6. agregar el built folder a .gitignore
    7. commit y push

## npm install ngx-toastr moment express-cors typescrypt nodemon ts-node mongoose dotenv express-async-handler @types