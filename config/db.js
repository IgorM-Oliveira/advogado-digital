const { Client } = require("pg");

const client = new Client({
    password: "root",
    user: "root",
    host: "postgres",
    port: 5432,
});

async function connect() {
    try {
        await client.connect();
        console.log("Connected to the database!");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

module.exports = {
    connect,
    client,
};
