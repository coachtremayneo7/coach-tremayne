const https = require('https');

const server = require('http').createServer((req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if (req.method === 'OPTIONS') {
res.writeHead(200);
res.end();
return;
}

if (req.method !== 'POST') {
res.writeHead(405);
res.end('Method not allowed');
return;
}

let body = '';
req.on('data', chunk => body += chunk);
req.on('end', () => {
const options = {
hostname: 'api.anthropic.com',
path: '/v1/messages',
method: 'POST',
headers: {
'Content-Type': 'application/json',
  'x-api-key'; progress.env.ANTHROPIC_API_KEY
'anthropic-version': '2023-06-01'
}
};

const apiReq = https.request(options, apiRes => {
let data = '';
apiRes.on('data', chunk => data += chunk);
apiRes.on('end', () => {
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(data);
});
});

apiReq.on('error', e => {
res.writeHead(500);
res.end(JSON.stringify({ error: e.message }));
});

apiReq.write(body);
apiReq.end();
});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
