const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.get('/', (res, req) => req.json({ msg: 'Welcom to Contact Keeper' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server start on ${PORT} - port`);
});
