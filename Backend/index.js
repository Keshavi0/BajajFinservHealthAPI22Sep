const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors())
app.use(morgan('dev'))

const BFHL = require('./routes/BFHLroute');

const user = {
  fullName: 'Bishal De',
  dob: 10042003,
  email: 'bb3477@srmist.edu.in',
  rollNumber: 'RA2111026010231'
};

// Helper function to generate user_id
const generateUserId = (fullName, dob) => {
  return `${fullName}_${dob}`;
};


app.get('/', (req, res) => {
    const Data = {
        is_success: true,
        user_id: generateUserId(user.fullName, user.dob),
        email: user.email,
        roll_number: user.rollNumber,
        message: `'Bajaj Finserv Health | Fullstack Qualifier | SRM | 2nd August'24'`,
    }
    res.status(200).json(Data);

});

app.use("/bfhl",BFHL)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
