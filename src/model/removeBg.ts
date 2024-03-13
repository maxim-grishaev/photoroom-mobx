import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from './constants';

export const removeBg = async (imageBase64: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      image_file_b64: imageBase64.replace(BASE64_IMAGE_HEADER, ''),
    }),
  });

  if (!response.ok) {
    throw new Error('Bad response from server');
  }

  const result = await response.json();
  return BASE64_IMAGE_HEADER + result.result_b64;
};
