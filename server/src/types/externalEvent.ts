export type ProductionType = 'Broadway' | 'Touring' | 'West End' | 'Other';

export type ExternalEvent = {
  externalId: string;
  attractionId: string | null;
  name: string;
  productionType: ProductionType;
  startTime: string;
  venue: string | null;
  location: string | null;
  imageUrl: string | null;
  url: string;
};
