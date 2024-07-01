import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise
    const db = client.db("wallet")
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body)
            let user = await db.collection('users').insertOne(bodyObject)
            res.json(user)
            break;
        case "GET":
            const allUsers = await db.collection('users').find({}).toArray()
            res.json({ status: 200, data: allUsers })
            break
    }
}