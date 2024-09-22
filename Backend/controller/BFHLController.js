const user = {
  fullName: 'Bishal De',
  dob: '10042003',
  email: 'bb3477@srmist.edu.in',
  rollNumber: 'RA2111026010231'
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

    // Split numbers and alphabets
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

    // File processing (if base64 is provided)
    let file_valid = false;
    let file_mime_type = null;
    let file_size_kb = null;

    if (file_b64) {
      const base64String = file_b64.split(',')[1]; // Remove metadata (data:image/png;base64,)
      if (base64String) {
        // Calculate file size in bytes
        const base64Length = base64String.length;
        const padding = (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);
        const fileSizeBytes = (base64Length * 3) / 4 - padding;
        file_size_kb = (fileSizeBytes / 1024).toFixed(2); // Convert to KB and round to 2 decimal places

        file_valid = true;
        file_mime_type = file_b64.split(';')[0].split(':')[1]; // Extract MIME type (image/png, etc.)
      }
    }

    const response = {
      is_success: true,
      user_id: generateUserId(user.fullName, user.dob),
      email: user.email,
      roll_number: user.rollNumber,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestAlphabet ? [highestAlphabet] : [],
      file_valid,
      file_mime_type,
      file_size_kb: file_size_kb || 0 // If file size is 0, return 0 instead of null
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: 'An error occurred while processing the request.'
    });
  }
};


module.exports = { BFHLGet, BFHLPost };
