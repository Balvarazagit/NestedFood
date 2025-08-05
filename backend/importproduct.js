// Import required modules
const fs = require('fs');
const { MongoClient } = require('mongodb');

// MongoDB URI and database name
const uri = "mongodb+srv://Aliraza:Aliraza%4012345@cluster0.jzd0g3d.mongodb.net/nestedfood?retryWrites=true&w=majority&appName=Cluster0"; // Use your MongoDB URI here
const dbName = "nestedfood"; // Name of the database
const collectionName = "products"; // Name of the collection where you want to store the products

// Function to import JSON data into MongoDB
async function importData() {
    // Read the JSON file
    const jsonData = fs.readFileSync('./data.json'); // Path to your JSON file
    const products = JSON.parse(jsonData);

    try {
        // Connect to MongoDB
        const client = new MongoClient(uri);
        await client.connect();

        // Access the database
        const db = client.db(dbName);

        // Access the collection
        const collection = db.collection(collectionName);

        // Insert the products into MongoDB
        const result = await collection.insertMany(products);
        console.log(`${result.insertedCount} products were successfully inserted.`);

        // Close the connection
        await client.close();
    } catch (error) {
        console.error('Error importing data:', error);
    }
}

// Run the import function
importData();
