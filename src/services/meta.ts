interface ConversionAPIEvent {
  event_name: string;
  event_time: number;
  user_data?: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;          // Facebook Browser ID
    fbc?: string;          // Facebook Click ID
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_type?: string;
    content_ids?: string[];
  };
  event_source_url?: string;
  action_source?: string;
}

const PIXEL_ID = '1621095305954112';

function getFacebookCookie(name: string): string | undefined {
  const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return match ? match.pop() : undefined;
}

export async function sendConversionEvent(eventName: string, value?: number) {
  try {
    const event: ConversionAPIEvent = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: {
        client_ip_address: localStorage.getItem('client_ip') || undefined,
        client_user_agent: navigator.userAgent,
        fbp: getFacebookCookie('_fbp'),         // Facebook Browser ID
        fbc: getFacebookCookie('_fbc'),         // Facebook Click ID
      },
    };

    if (value) {
      event.custom_data = {
        value: value,
        currency: 'USD',
        content_type: 'product',
        content_name: 'Window Film Course',
        content_ids: ['COURSE_001'],
      };
    }

    const token = process.env.META_PIXEL_TOKEN;
    if (!token) {
      console.error('Meta Pixel Token não encontrado');
      return null;
    }

    const response = await fetch(
      `https://graph.facebook.com/v17.0/${PIXEL_ID}/events?access_token=${token}`,
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
    console.log('Resposta da API de Conversão:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar evento de conversão:', error);
    return null;
  }
}