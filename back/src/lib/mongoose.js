import mongoose from "mongoose";

const connectionToDb = async () => {
    try {
        await mongoose.connect(process.env.MongoUrl)
        console.log("CONECTADO A LA BASE DE DATOS")
    } catch (error) {
        console.log(error)
    }
}

export default connectionToDb