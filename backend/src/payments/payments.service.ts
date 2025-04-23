import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(private configService: ConfigService) {}

  private readonly paytabsApiUrl = this.configService.get<string>('PAYTABS_API_URL');
  private readonly profileId = this.configService.get<string>('PAYTABS_PROFILE_ID');
  private readonly serverKey = this.configService.get<string>('PAYTABS_SERVER_KEY');

  async createPayment() {
    try {
      const paymentData = {
        profile_id: this.profileId,
        tran_type: 'sale',
        tran_class: 'ecom',
        cart_id: 'CART-' + Date.now(),
        cart_currency: 'EGP',
        cart_amount: 100.0,
        cart_description: 'Test Payment',
        paypage_lang: 'en',
        customer_details: {
          name: 'Test Customer',
          email: 'test@example.com',
          phone: '1234567890',
          street1: 'Test Street',
          city: 'Cairo',
          country: 'EG',
        },
        return_url: 'http://localhost:5173/payment/success',
        callback_url: 'http://localhost:3000/payments/callback',
      };

      const response = await axios.post(this.paytabsApiUrl, paymentData, {
        headers: {
          authorization: this.serverKey,
          'Content-Type': 'application/json',
        },
      });

      console.log('PayTabs response:', response.data);

      return {
        redirect_url: response.data.redirect_url,
      };
    } catch (error) {
      console.error('PayTabs payment creation failed:', error.response?.data || error.message);
      throw new Error('Failed to create payment: ' + (error.response?.data?.message || error.message));
    }
  }
}
