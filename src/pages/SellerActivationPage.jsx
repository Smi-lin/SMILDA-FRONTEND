import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { pass } from '../server';

const SellerActivationPage = () => {
  const { activation_token } = useParams();

  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${pass}/activation`, {
            activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          console.error("Error during activation:", error);
  
          if (error.response) {
            console.log("Server responded with error:", error.response.data.message);
          } else if (error.request) {
            console.log("No response received from server.");
          } else {
            console.log("Error setting up the request:", error.message);
          }
  
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  
  return (
    <div style={{
      width: '100%',
      height: "100vh",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {
        error ? (
          <p>Your token is expired!</p>
        ) : (
          <p>Your account has been created successfully!</p>
        )
      }
    </div>
  )
}

export default SellerActivationPage;
