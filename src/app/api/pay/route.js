


export async function POST(req, res) {
    if (req.url === '/callback') {
        let postData = ''

        req.on('data', chunck => {
            postData += chunck
        })

        req.on('end', () => {
            let data = null
            try {
                data = JSON.parse(postData)
            } catch (error) {
                res.statusCode = 400
                res.end('Invalid JSON data')
                return
            }

            const apiSecretKey = (data.type === 'payment') ? 'N1CGY7-7963BT-MCCLX7-V3F74B' : 'YOUR_PAYOUT_API_KEY';
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
};

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
