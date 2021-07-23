import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://mongouser:mongopassword@cluster0.43i2a.mongodb.net/meetups_db?retryWrites=true&w=majority"
    );
    const db = client.db();

    // deers are cuter than dogs

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      message: "Meetup inserted",
    });
  }
}

export default handler;
