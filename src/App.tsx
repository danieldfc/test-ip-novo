import { useEffect } from 'react';
import {InvokeCommand, LambdaClient} from "@aws-sdk/client-lambda";
import axios from 'axios';
import './App.css'
import { Analytics } from '@vercel/analytics/react';

const client = new LambdaClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: 'f42xcCd4jS7ZQwhyiWd18wW4dyM56Sl42sCJvMfS'
  }
});
  
function App() {
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const responseInfo = await axios.get(`https://geolocation-db.com/json/1b67cc30-0f12-11ef-9f54-4da697c29a34`);
        await client.send(new InvokeCommand({
          FunctionName: "registra-dados",
          Payload: JSON.stringify(responseInfo.data)
        }))
      } catch (error) {
        console.error('Error fetching the IP address:', error);
      }
    };
    fetchIP();
  }, []);

  return (
    <div>
      <h1>Brincadeirinha hahahahaha</h1>
      <div style={{ width: '100%', height: 0, paddingBottom: '100%', position: 'relative' }}>
        <img src="/hehehe.gif" />
      </div>
      <Analytics />
    </div>
  )
}

export default App
