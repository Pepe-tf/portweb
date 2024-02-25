const express = require('express');
const request = require('request-promise');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const colors = require('colors');
const config = require('./options/config'); // Import the configuration options
const router = require('./router/router');

const app = express();
const port = config.port;
const discordWebhookConfig = config.discordWebhookConfig; // Define discordWebhookConfig here

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Function to get country flag emoji based on ISO 3166-1 alpha-2 code
function getCountryFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

  return codePoints.join('');
}

// Function to get the current timestamp in the format [h:min:sec]
function getCurrentTimestamp() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `[${hours}:${minutes}:${seconds}]`;
}

// Function to write the log to a file
async function writeToLogFile(logMessage) {
  const now = new Date();
  const year = now.getFullYear().toString(); // Convert year to string
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const logFileName = `log-${year}-${month}-${day}.txt`;
  const logFilePath = path.join(__dirname, 'logs', logFileName);

  try {
    // Ensure the directory exists
    await fs.mkdir(path.dirname(logFilePath), { recursive: true });

    // Append the log message to the file
    await fs.appendFile(logFilePath, `${logMessage}\n`);
  } catch (error) {
    console.error(`Error writing log to file: ${error.message}`);
  }
}

// Function to send the log to Discord
async function sendLogToDiscord(logMessage, countryCode) {
  try {
    // Remove color codes before sending to Discord
    const cleanLogMessage = logMessage.replace(/\x1b\[\d+m/g, '');

    // Construct custom username and avatar based on the country code
    const username = `${getCountryFlagEmoji(countryCode)} P o r t W e b`;
    const avatarUrl = `https://example.com/avatars/${countryCode}.png`; // Replace with actual avatar URL

    // Make a POST request to the Discord webhook
    await axios.post(discordWebhookConfig.url, {
      content: cleanLogMessage, // Use the cleaned log message
      username: username,
      avatar_url: avatarUrl,
    });
  } catch (error) {
    console.error(`Error sending log to Discord: ${error.message}`);
  }
}

// Middleware to log user IP and requested route
app.use(async (req, res, next) => {
  // Extracting the public IP address from headers, considering a chain of proxy servers
  const forwardedIps = req.headers['x-forwarded-for'];

  let userIP;
  if (forwardedIps) {
    const ips = forwardedIps.split(',');
    userIP = ips[0];
  } else {
    userIP =
      req.headers['x-real-ip'] ||
      req.headers['x-client-ip'] ||
      req.headers['x-remote-ip'] ||
      req.headers['x-ip'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
  }

  const ipv4 = userIP.includes('::ffff:') ? userIP.split('::ffff:')[1] : userIP;

  try {
    const ipDetails = await request({ uri: `https://ipinfo.io/${ipv4}/json`, json: true });
    const countryFlag = ipDetails.country ? getCountryFlagEmoji(ipDetails.country) : '🌐';
    const countryCode = ipDetails.country || 'Unknown';

    const logMessage = `${getCurrentTimestamp()} ${'🌐 User'.blue} ${countryFlag.green} ${ipv4.yellow} accessed ${req.method.cyan} ${req.url.magenta}`;
    console.log(logMessage);
    req.logMessage = logMessage;

    await writeToLogFile(logMessage);
    await sendLogToDiscord(logMessage, countryCode);
  } catch (error) {
    console.error(`Error getting IP information: ${error.message}`);
  }

  next();
});

// Use the router for defined routes
app.use(router);

// Startup log
app.listen(port, () => {
  console.log(`${getCurrentTimestamp()} 🚀 Server is starting at port:${port}`);
});

// Error route
router.use((err, req, res, next) => {
  console.error(err.stack); // Log the error to the console

  // Render the error page with the error message
  res.status(500).render('error', { message: err.message || 'Something went wrong!' });
});

// Function to send the log to Discord
async function sendLogToDiscord(logMessage, countryCode) {
  try {
    // Remove color codes before sending to Discord
    const cleanLogMessage = logMessage.replace(/\x1b\[\d+m/g, '');

    // Construct custom username and avatar based on the country code
    const username = `${getCountryFlagEmoji(countryCode)} P o r t W e b`;
    const avatarUrl = `https://example.com/avatars/${countryCode}.png`; // Replace with actual avatar URL

    // Make a POST request to the Discord webhook
    await axios.post(discordWebhookConfig.url, {
      content: cleanLogMessage, // Use the cleaned log message
      username: username,
      avatar_url: avatarUrl,
    });
  } catch (error) {
    console.error(`Error sending log to Discord: ${error.message}`);
  }
}