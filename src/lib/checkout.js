import axios from "axios"
import { calculateCartTotal } from "./pricing_algo";

export async function checkout(cart, authUser, payload) {
  const getTotal = () => calculateCartTotal(cart);

  if (authUser) {
    console.log(cart)
    const token = await authUser.getIdToken(true)
    try {
      const response = await axios.post('/api/order', {
        cart,
        total: getTotal(),
        payload
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 201 && response.data.success) {
        console.log("Order created, initiating payment for:", response.data.id);
        const paymentResponse = await axios.post('/api/payment', {
          amount: getTotal().toFixed(2),
          email: authUser.email,
          orderId: response.data.id,
          contact: "8888888888" // Default or fetch from profile
        });

        if (paymentResponse.data && paymentResponse.data.token) {
          return paymentResponse.data;
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
}
