require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Habit tracker API running"})
});

app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
}).catch((error) => {
    console.error('DB connection failed:', error);
    process.exit(1);
})