import { cacheStringHelper } from '../utils/index.ts';
import { client } from './connection.ts';
import type { ExternalEvent } from '../types/externalEvent.ts';
import type { SearchParams } from '../types/searchParams.ts';

const emptyResultTimer = 300; //5mins
const filledResultTimer = 3600; // 1hr

const setMusicalCacheResults = async (
  { show, countryCode, city, stateCode }: SearchParams,
  resultsArray: ExternalEvent[],
) => {
  if (!client.isReady) {
    return;
  }
  try {
    const keyBuilder = cacheStringHelper({
      show,
      countryCode,
      city,
      stateCode,
    });
    const formattedResults = JSON.stringify(resultsArray);
    await client.set(keyBuilder, formattedResults, {
      EX: resultsArray.length === 0 ? emptyResultTimer : filledResultTimer,
    });
  } catch (error) {
    console.warn('Redis unavailable, continuing without cache:', error);
    return;
  }
};

const getMusicalCacheResults = async ({
  show,
  countryCode,
  city,
  stateCode,
}: SearchParams): Promise<ExternalEvent[] | null> => {
  if (!client.isReady) {
    return null;
  }

  try {
    const keyBuilder = cacheStringHelper({
      show,
      countryCode,
      city,
      stateCode,
    });
    const cachedResults = await client.get(keyBuilder);
    if (!cachedResults) {
      return null;
    }
    const formattedResults = JSON.parse(cachedResults);
    return formattedResults;
  } catch (error) {
    console.warn('Redis unavailable, continuing without cache:', error);
    return null;
  }
};

export { setMusicalCacheResults, getMusicalCacheResults };
