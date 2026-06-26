import type { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { total } = req.body;
    
    if (!total) {
      return res.status(400).json({ error: 'Missing total amount' });
    }

    const API_KEY = process.env.FISERV_API_KEY;
    const API_SECRET = process.env.FISERV_API_SECRET;
    const STORE_ID = process.env.FISERV_STORE_ID;
    const BASE_URL = process.env.FISERV_BASE_URL || 'https://cert.api.firstdata.com/gateway/v2';

    if (!API_KEY || !API_SECRET || !STORE_ID) {
      console.error('Missing Fiserv credentials in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const uuid = uuidv4();
    const timestamp = new Date().getTime().toString();
    
    // Payload for Fiserv MakeSalePaymentURL + Installments
    const payload = {
      storeId: STORE_ID,
      transactionAmount: {
        total: total.toString(),
        currency: "MXN"
      },
      transactionType: "SALE",
      // En producción, esto debería ser la URL real a donde regresará el usuario (tu dominio real)
      transactionNotificationURL: "https://herramaxplus.com/checkout/success",
      clientLocale: {
        language: "es_MX",
        country: "MX"
      },
      installmentOptions: {
        numberOfInstallments: 12, // Fiserv allows max installments or specific, we pass 12 to show up to 12
        installmentsInterest: false
      }
    };

    const payloadString = JSON.stringify(payload);

    // Message-Signature encryption (api_key + uuid + timestamp + requestData)
    const msg = API_KEY + uuid + timestamp + payloadString;
    const hmac = crypto.createHmac('sha256', API_SECRET);
    hmac.update(msg);
    const messageSignature = hmac.digest('base64');

    const headers = {
      'Content-Type': 'application/json',
      'Api-Key': API_KEY,
      'Client-Request-Id': uuid,
      'Timestamp': timestamp,
      'Message-Signature': messageSignature
    };

    const response = await fetch(`${BASE_URL}/payment-url`, {
      method: 'POST',
      headers,
      body: payloadString
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Fiserv Error:', data);
      return res.status(response.status).json({ error: data });
    }

    // Fiserv returns the paymentUrl in the response
    return res.status(200).json(data);

  } catch (error: any) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
