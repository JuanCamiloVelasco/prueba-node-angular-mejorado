import { connect, ConnectOptions } from "mongoose";

export const bdConnnect = () => {
    connect(process.env.MONGO_URI!, {} as ConnectOptions).then(
        () => console.log('Conexion exitosa!'),
        (error) => console.log(error)
    )
}

export default bdConnnect;