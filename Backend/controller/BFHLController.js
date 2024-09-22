const user = {
  fullName: 'Keshavi Sharma',
  dob: '28102002',
  email: 'ks0968@srmist.edu.in',
  rollNumber: 'RA2111026010234'
};
const generateUserId = (fullName, dob) => {
  return `${fullName.toLowerCase().replace(/\s+/g, '_')}_${dob}`;
};

// Helper function to validate and parse base64 file
const processFile = (file_b64) => {
  if (!file_b64) {
    return { file_valid: false };
  }

  // Split the base64 data to extract MIME type
  const matches = file_b64.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return { file_valid: false };
  }

  const mimeType = matches[1];
  const fileSizeInKB = Buffer.from(matches[2], 'base64').length / 1024; // File size in KB

  return {
    file_valid: true,
    file_mime_type: mimeType,
    file_size_kb: Math.round(fileSizeInKB)
  };
};

const BFHLGet = async (req, res) => {
  const Data = {
    operation_code: 1
  };

  res.status(200).json(Data);
};

const BFHLPost = async (req, res) => {
  try {
      const { data, file_b64 } = req.body;

      if (!Array.isArray(data)) {
          return res.status(400).json({
              is_success: false,
              message: 'Invalid input format. Expected an array.'
          });
      }

      const numbers = [];
      const alphabets = [];
      let highestAlphabet = '';
      let file_valid = false;
      let file_mime_type = null;
      let file_size_kb = 0;

      // Check for valid file if file_b64 is provided
      if (file_b64) {
          const buffer = Buffer.from(file_b64, 'base64');
          file_size_kb = buffer.length / 1024; // size in KB

          // Add logic to determine the MIME type
          // This is a placeholder; you can use libraries like 'file-type' to determine the MIME type
          file_mime_type = 'image/png'; // Example, replace with actual detection logic
          file_valid = true; // Set this to true if the file is valid
      }

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
          highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
          file_valid,
      };

      // Only add file information if the file is valid
      if (file_valid) {
          response.file_mime_type = file_mime_type;
          response.file_size_kb = file_size_kb;
      }

      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({
          is_success: false,
          message: 'An error occurred while processing the request.'
      });
  }
};



module.exports = { BFHLGet, BFHLPost };
