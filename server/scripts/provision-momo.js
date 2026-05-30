const https = require('https');
const { v4: uuidv4 } = require('uuid');

const SUBSCRIPTION_KEY = '4332f92be1ef4feaa7a74b127616c8cf';
const API_USER_ID = uuidv4();

console.log('Creating API User with ID:', API_USER_ID);

const createUser = () => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ providerCallbackHost: 'localhost' });
    const options = {
      hostname: 'sandbox.momodeveloper.mtn.co.rw',
      path: '/v1_0/apiuser',
      method: 'POST',
      headers: {
        'X-Reference-Id': API_USER_ID,
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      console.log('Create User Status:', res.statusCode);
      resolve(res.statusCode);
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
};

const getApiKey = () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'sandbox.momodeveloper.mtn.co.rw',
      path: `/v1_0/apiuser/${API_USER_ID}/apikey`,
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('API Key Response:', data);
        resolve(JSON.parse(data));
      });
    });

    req.on('error', reject);
    req.end();
  });
};

const run = async () => {
  try {
    const status = await createUser();
    if (status === 201) {
      console.log('User created successfully');
      const { apiKey } = await getApiKey();
      console.log('\n--- SAVE THESE ---');
      console.log('MOMO_API_USER_ID=' + API_USER_ID);
      console.log('MOMO_API_KEY=' + apiKey);
      console.log('MOMO_SUBSCRIPTION_KEY=' + SUBSCRIPTION_KEY);
    } else {
      console.log('User creation failed with status:', status);
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

run();