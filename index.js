const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//user:userdb2
//password: r1x2nazImaJvNSyA



const uri = "mongodb+srv://userdb2:r1x2nazImaJvNSyA@cluster0.xicrlbt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
	try {
		const userCollection = client.db("nodeMongoCrud").collection("user")

		// read data 

		app.get("/users", async (req, res) => {
			const query = {};
			const cursor =  userCollection.find(query)
			const user = await cursor.toArray()
			res.send(user)
		})
		app.get('/users/:id', async (req, res) => {
			const id = req.params.id
			const query = { _id: ObjectId(id) }
			const result = await userCollection.findOne(query)
			res.send(result)
		}
		)


		// post data 
		app.post('/users', async(req, res) => {
			const user = req.body
			console.log(user)
			const result = await userCollection.insertOne(user)
			res.send(result)
		})

		// app.put('/users/:id', async (req, res) => {
		// 	const id = req.params.id 
		// 	const filter = { _id: ObjectId(id) }
		// 	const options ={upsert:true}
		// 	const user = req.body
		// 	const updateUser = {
		// 		$set: {
		// 			name: user.name,
		// 			address: user.address,
		// 			email:user.email
		// 		}
		// 	}
		// 	const result = await userCollection.updateOne(filter,updateUser,options)
		// 	res.send(result)
		// })
		// const user = { name: "n", email: "n@gmai.com" }
		// const result = await userCollection.insertOne(user)
		// console.log(result)
		app.delete('/users/:id', async (req, res) => {
			const id = req.params.id
			const quary = { _id: ObjectId(id) }
			const result = await userCollection.deleteOne(quary)
			console.log(result)
			res.send(result)
		})
	}
	finally {
		
	}

}
run().catch(err=>console.log(err))




app.get("/", (req, res) => {
	res.send('node mongo server is running')
})

app.listen(port, () => {
	console.log(`node mongo server is running ${port}`)
})
