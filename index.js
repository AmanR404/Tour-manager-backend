import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'
import bodyParser from 'body-parser'
import { ObjectId } from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Database connection
import { MongoClient } from 'mongodb'
const url = process.env.DATABASE_URL
const client = new MongoClient(url)

const dbName = 'tourism'
client.connect()

// Endpoints
app.get('/tour', async (req, res) => {
    try {
        const db = client.db(dbName)
        const collection = db.collection("tourDetails")
        const findResult = await collection.find({}, { _id: 0, }).toArray()
        res.json(findResult)
    } catch (error) {
        console.error('Error retrieving tour details:', error);         //Error Logging
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/tour', async (req, res) => {
    try {
        const data = req.body
        const db = client.db(dbName)
        const collection = db.collection('tourDetails')
        const findResult = await collection.findOne({ "tour_id": data.tour_id })
        if (findResult == null) {
            // insert
            const insertResult = await collection.insertOne(data)
            res.send({ success: true, result: insertResult })
        }
        else {
            // update
            const updateResult = await collection.updateOne(
                { "tour_id": data.tour_id },
                { $set: data }
            )
            res.send({ success: true, result: updateResult })
        }
    } catch (error) {
        console.error('Error in POST /tour :', error);                      //Error Logging
        res.status(500).json({ success: false, error: 'Internal server error' })
    }
})

app.delete('/tour', async (req, res) => {
    try {
        const { id } = req.body
        const db = client.db(dbName)
        const collection = db.collection('tourDetails')
        const findResult = await collection.deleteOne({ _id: new ObjectId(id) })
        res.send({ success: true, result: findResult })
    } catch (error) {
        console.error('Error in DELETE /tour :', error);                   //Error Logging
        res.status(500).json({ success: false, error: 'Internal server error' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
