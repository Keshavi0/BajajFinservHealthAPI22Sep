const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '50mb' })); // Allow larger payloads for base64 files
app.use(cors());
app.use(morgan('dev'));

const BFHL = require('./routes/BFHLroute');

const user = {
  fullName: 'Keshavi Sharma',
  dob: '28102002',
  email: 'ks0968@srmist.edu.in',
  rollNumber: 'RA2111026010234'
};

// Helper function to generate user_id
const generateUserId = (fullName, dob) => {
  return `${fullName.toLowerCase().replace(/\s+/g, '_')}_${dob}`;
};

app.get('/', (req, res) => {
  const Data = {
    is_success: true,
    user_id: generateUserId(user.fullName, user.dob),
    email: user.email,
    roll_number: user.rollNumber,
    message: `Bajaj Finserv Health | Fullstack Qualifier | SRM | 22nd September 24`,
  };
  res.status(200).json(Data);
});

app.use("/bfhl", BFHL);

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
