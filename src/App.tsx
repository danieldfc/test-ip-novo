import { useEffect } from 'react';
import {InvokeCommand, LambdaClient} from "@aws-sdk/client-lambda";
import axios from 'axios';
import './App.css'

const client = new LambdaClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_ACCESS_SECRET_KEY || ''
  }
});
  
function App() {
  useEffect(() => {
    const fetchIP = async () => {
      try {
        console.log('heelo', import.meta.env.VITE_AWS_ACCESS_KEY_ID, import.meta.env.VITE_AWS_ACCESS_SECRET_KEY);
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
    </div>
  )
}

export default App
