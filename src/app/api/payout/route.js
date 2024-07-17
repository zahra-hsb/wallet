// const { default: dbConnect } = require('@/lib/dbConnect');
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const port = 3000;


// await dbConnect()

// app.post('/webhook', async (req, res) => {
//     // تایید اعتبار وب‌هوک (HMAC)
//     const payout = req.body;

//     console.log(payout);
//     // save to db

//     res.status(200).send('OK');
// });

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });



const http = require('http');
const crypto = require('crypto');

const server = http.createServer((req, res) => {
    if (req.url === '/api/payout' && req.method === 'POST') {
        // Validate HMAC signature
        let postData = '';

        req.on('data', chunk => {
            postData += chunk;
        });

        req.on('end', () => {
            // Parse the JSON data
            let data = null;
            try {
                data = JSON.parse(postData);
            } catch (error) {
                res.statusCode = 400;
                res.end('Invalid JSON data');
                return;
            }

            const apiSecretKey = (data.type === 'payment') ? 'N1CGY7-7963BT-MCCLX7-V3F74B' : 'S35UYY-T3E96V-A3VNKK-SUDT3H';
            // const apiSecretKey = (data.type === 'payment') ? 'sandbox' : 'S35UYY-T3E96V-A3VNKK-SUDT3H';
            const hmacHeader = req.headers['hmac'];
            const calculatedHmac = crypto
                .createHmac('sha512', apiSecretKey)
                .update(postData)
                .digest('hex');

            if (calculatedHmac === hmacHeader) {
                // HMAC signature is valid
                // Process the callback data based on the type
                if (data.type === 'payment') {
                    console.log('Received payment callback:', data);
                    // Process payment data here
                } else if (data.type === 'payout') {
                    console.log('Received payout callback:', data);
                    // Process payout data here
                }

                // Return HTTP Response 200 with content "OK"
                res.statusCode = 200;
                res.end('OK');
                console.log('hagsdf ', data);
            } else {
                // HMAC signature is not valid
                // Handle the error accordingly
                res.statusCode = 400;
                res.end('Invalid HMAC signature');
            }
        });
    } else {
        // Invalid path or method
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});
