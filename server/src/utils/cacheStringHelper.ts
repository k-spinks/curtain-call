import type { SearchParams } from '../types/searchParams.ts';

const cacheStringHelper = ({
  show,
  countryCode,
  stateCode,
  city,
}: SearchParams) => {
  // lowercase and trim, and drop colons so a show name can't create a fake segment
  const clean = (value?: string) =>
    (value ?? '').toLowerCase().trim().replaceAll(':', ' ');

  const formattedShow = clean(show);
  const formattedCountry = countryCode.toUpperCase().trim();
  const formattedState = clean(stateCode);
  const formattedCity = clean(city);

  // shows:<term>:<country>:<state>:<city>
  return `shows:${formattedShow}:${formattedCountry}:${formattedState}:${formattedCity}`;
};

export { cacheStringHelper };
