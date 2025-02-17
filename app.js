const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Route to handle incoming webhook requests
app.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);  // Logs the webhook payload
  res.status(200).send('Webhook received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
