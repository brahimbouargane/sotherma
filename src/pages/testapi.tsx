// Add this to a component where you want to test the customer endpoint
import { useEffect, useState } from "react";
import orderService from "../lib/api/orderService";

const TestComponent = () => {
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testCustomerEndpoint = async () => {
      try {
        // Check if authenticated
        console.log("Is authenticated:", orderService.isAuthenticated());

        // Log token for debugging (never do this in production)
        const token =
          localStorage.getItem("auth_token") ||
          localStorage.getItem("token") ||
          sessionStorage.getItem("auth_token") ||
          sessionStorage.getItem("token");

        console.log("Token available:", !!token);
        if (token) {
          console.log("Token prefix:", token.substring(0, 15) + "...");
        }

        // Try to get customer data
        const data = await orderService.getCustomerDetails(1960);
        console.log("Customer data:", data);
        setCustomerData(data);
      } catch (err) {
        console.error("Error in test:", err);
        setError(err.message);
      }
    };

    testCustomerEndpoint();
  }, []);

  return (
    <div>
      <h2>API Test</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {customerData && <div>Customer data loaded successfully!</div>}
    </div>
  );
};

export default TestComponent;
