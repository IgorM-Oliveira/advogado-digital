module.exports = {
    development: {
        client: 'pg', // or any other supported database client
        connection: {
            connectionString: config.DATABASE_URL,
            host: config["DB_HOST"],
            port: config["DB_PORT"],
            user: config["DB_USER"],
            database: config["DB_NAME"],
            password: config["DB_PASSWORD"],

            host: 'postgres',
            user: 'root',
            password: 'root',
            database: 'root',
        },
        migrations: {
            directory: './migrations',
        },
    },
};