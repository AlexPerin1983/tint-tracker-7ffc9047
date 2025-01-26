interface ConversionAPIEvent {
  event_name: string;
  event_time: number;
  user_data?: {
    client_ip_address?: string;
    client_user_agent?: string;
  };
  custom_data?: {
    value?: number;
    currency?: string;
  };
}

const META_TOKEN = 'EAAPKt7CmR10BO8mwuqVanhZCrZA3gGlZBs0tfO1zprwFPpqnY1rCvE4BhHH2KZAIWmNQc6ZCJ9ZClTpPZA7sbFtNH35sgKUaTILqlUU74rEZC7R6V9brZCSYAP2zCzM5cZCkLoqKcvhy93FCMmhQQATyLsaQ4dLOivShRRdFJE32HmUi98zTtIYd6Wvhmd7svBCqujNAZDZD';
const PIXEL_ID = '1621095305954112';

export async function sendConversionEvent(eventName: string, value?: number) {
  try {
    const event: ConversionAPIEvent = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      user_data: {
        client_ip_address: window.localStorage.getItem('client_ip') || undefined,
        client_user_agent: navigator.userAgent,
      },
    };

    if (value) {
      event.custom_data = {
        value: value,
        currency: 'USD',
      };
    }

    const response = await fetch(
      `https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${META_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [event],
        }),
      }
    );

    const result = await response.json();
    console.log('Conversion API Response:', result);
    return result;
  } catch (error) {
    console.error('Error sending conversion event:', error);
    return null;
  }
}