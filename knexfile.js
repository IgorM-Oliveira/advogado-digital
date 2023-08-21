module.exports = {
    development: {
        client: 'pg', // or any other supported database client
        connection: {
            host: '127.0.0.1',
            user: 'your_db_user',
            password: 'your_db_password',
            database: 'your_db_name',
        },
        migrations: {
            directory: './migrations',
        },
    },
    // ... other environments like test and production
};