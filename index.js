require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 9000;
const app = express();

// middleware start
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
// mongodb connection
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.xqgbxlh.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        //create collection of data
        const jobsCollection = client.db('solosphere').collection('jobs');
        // const bidsCollection = client.db('solosphere').collection('bids');

        // fetch all data from db
        app.get('/jobs', async (req, res) => {
            const result = await jobsCollection.find().toArray();
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);

// REST APIs

app.get('/', (req, res) => {
    res.send('Server is running...');
});




app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
