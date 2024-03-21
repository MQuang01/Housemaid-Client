const express = require('express');
const cors = require('cors');

const app = express();

// Cấu hình cài đặt CORS
app.use(cors());

// Khai báo các route API ở đây

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
