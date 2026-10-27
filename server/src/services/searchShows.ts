import type { ExternalEvent } from '../types/externalEvent.ts';
import type { SearchParams } from '../types/searchParams.ts';
import {
  getMusicalCacheResults,
  setMusicalCacheResults,
} from '../cache/index.ts';
import {
  fetchExternalMusical,
  transformExternalEvent,
} from '../external/index.ts';

const searchShows = async (
  searchParams: SearchParams,
): Promise<ExternalEvent[]> => {
  //Ask for cache results
  const cacheResults = await getMusicalCacheResults(searchParams);

  // If no results query external api
  if (cacheResults === null) {
    const externalResults = await fetchExternalMusical(searchParams);

    const transformedResults = transformExternalEvent(externalResults);
    await setMusicalCacheResults(searchParams, transformedResults);
    return transformedResults;
  }

  return cacheResults;
};

export { searchShows };
