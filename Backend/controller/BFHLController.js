const user = {
    fullName: 'Bishal De',
    dob: 10042003,
    email: 'bb3477@srmist.edu.in',
    rollNumber: 'RA2111026010231'
  };

const generateUserId = (fullName, dob) => {
    return `${fullName}_${dob}`;
  };

  

const BFHLGet = async (req, res) => {
    const Data = {
      operation_code: 1
    };
  
    res.status(200).json(Data);
};


const BFHLPost = async (req, res) => {
    try {
      const { data } = req.body;
  
      if (!Array.isArray(data)) {
        return res.status(400).json({
          is_success: false,
          message: 'Invalid input format. Expected an array.'
        });
      }
  
      const numbers = [];
      const alphabets = [];
      let highestAlphabet = '';
  
      data.forEach(item => {
        if (/^[0-9]+$/.test(item)) {
          numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
          alphabets.push(item);
          if (!highestAlphabet || item.toLowerCase() > highestAlphabet.toLowerCase()) {
            highestAlphabet = item;
          }
        }
      });
  
      const response = {
        is_success: true,
        user_id: generateUserId(user.fullName, user.dob),
        email: user.email,
        roll_number: user.rollNumber,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        is_success: false,
        message: 'An error occurred while processing the request.'
      });
    }
  };
  
 
  
module.exports = { BFHLGet,BFHLPost };
  