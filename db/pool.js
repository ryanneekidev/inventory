require('dotenv').config();

const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: `postgresql://neondb_owner:${process.env.DB_USER_PASSWORD}@ep-snowy-glade-a5k650ad-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require`
});