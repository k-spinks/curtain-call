import type { ExternalEvent, ProductionType } from '../types/externalEvent.ts';

const transformExternalEvent = (payload: any): ExternalEvent[] => {
  if (!payload) {
    throw new Error('No data to transform');
  }
  const { _embedded: embedded } = payload;
  const transformedEventsArray =
    embedded?.events?.map((event: any) => {
      const venue = event?._embedded?.venues?.[0];

      const location =
        [
          venue?.city?.name,
          venue?.state?.stateCode ?? venue?.country?.countryCode,
        ]
          .filter(Boolean)
          .join(', ') || null;

      const eventName = event?.name?.toLowerCase() ?? '';
      const city = venue?.city?.name?.toLowerCase();
      const country = venue?.country?.countryCode?.toUpperCase();

      let productionType: ProductionType;

      if (eventName.includes('touring')) {
        productionType = 'Touring';
      } else if (city === 'new york' && country === 'US') {
        productionType = 'Broadway';
      } else if (city === 'london' && country === 'GB') {
        productionType = 'West End';
      } else {
        productionType = 'Other';
      }

      return {
        externalId: event.id,
        name: event.name,
        url: event.url,
        imageUrl: event?.images?.[0]?.url || null,
        attractionId: event?._embedded?.attractions?.[0]?.id || null,
        startTime: event?.dates?.start?.dateTime,
        venue: venue?.name || null,
        location,
        productionType,
      };
    }) ?? [];

  return transformedEventsArray;
};

export { transformExternalEvent };
