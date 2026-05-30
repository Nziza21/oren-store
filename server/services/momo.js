const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const {
  MOMO_SUBSCRIPTION_KEY,
  MOMO_API_USER_ID,
  MOMO_API_KEY,
  MOMO_TARGET_ENVIRONMENT,
  MOMO_BASE_URL
} = process.env;

const getAccessToken = async () => {
  const credentials = Buffer.from(`${MOMO_API_USER_ID}:${MOMO_API_KEY}`).toString('base64');
  const response = await axios.post(
    `${MOMO_BASE_URL}/collection/token/`,
    {},
    {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Ocp-Apim-Subscription-Key': MOMO_SUBSCRIPTION_KEY,
        'X-Target-Environment': MOMO_TARGET_ENVIRONMENT
      }
    }
  );
  return response.data.access_token;
};

const requestToPay = async ({ amount, phone, orderId, orderNumber }) => {
  const accessToken = await getAccessToken();
  const referenceId = uuidv4();

  await axios.post(
    `${MOMO_BASE_URL}/collection/v1_0/requesttopay`,
    {
      amount: amount.toString(),
      currency: 'RWF',
      externalId: orderId.toString(),
      payer: {
        partyIdType: 'MSISDN',
        partyId: phone.replace(/^0/, '250')
      },
      payerMessage: `Payment for ORÉN order ${orderNumber}`,
      payeeNote: `ORÉN order ${orderNumber}`
    },
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Reference-Id': referenceId,
        'X-Target-Environment': MOMO_TARGET_ENVIRONMENT,
        'Ocp-Apim-Subscription-Key': MOMO_SUBSCRIPTION_KEY,
        'Content-Type': 'application/json'
      }
    }
  );

  return referenceId;
};

const getPaymentStatus = async (referenceId) => {
  const accessToken = await getAccessToken();
  const response = await axios.get(
    `${MOMO_BASE_URL}/collection/v1_0/requesttopay/${referenceId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Target-Environment': MOMO_TARGET_ENVIRONMENT,
        'Ocp-Apim-Subscription-Key': MOMO_SUBSCRIPTION_KEY
      }
    }
  );
  return response.data;
};

module.exports = { requestToPay, getPaymentStatus };