import { app } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config({
    path: "./.env"
})



connectDB()
.then()
.catch((err)=>{
    console.log(`Server is running on port ${PORT}`)
})



const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

