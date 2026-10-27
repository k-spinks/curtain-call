import { configs } from '../configs.ts';
import type { SearchParams } from '../types/searchParams.ts';

const fetchExternalMusical = async ({
  show,
  countryCode,
  city,
  stateCode,
}: SearchParams) => {
  const url = new URL(
    `${configs.TICKETMASTER_BASE_URL}/discovery/v2/events.json`,
  );
  url.searchParams.set('keyword', show);
  url.searchParams.set('classificationName', 'Arts & Theatre');
  url.searchParams.set('countryCode', countryCode);
  if (city) {
    url.searchParams.set('city', city);
  }
  if (stateCode) {
    url.searchParams.set('state', stateCode);
  }
  url.searchParams.set('apikey', `${configs.TICKETMASTER_API_KEY}`);

  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  const result = await response.json();
  return result;
};

export { fetchExternalMusical };
