import express from 'express'
import dotenv from 'dotenv'
// import connectDB from './config/db.js'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

dotenv.config()

//APP CONFIG
const app = express()
const port =  process.env.PORT || 4000


//middleware
app.use(express.json())
app.use(cors())

// api endpoints

app.get('/' ,(req, res)=>{
    res.send('API WORKING')
})

const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (error) {
        console.error('Failed to start server:', error.message)
        process.exit(1)
    }
}

startServer()
