export interface Zone {
  publicName: string;
  environment: string;
}

export interface Production {
  extractionDates: string[];
  bottlingDate: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
}

export interface Beekeeper {
  code: string;
  useProxy: boolean;
  type: string;
  partnerSince?: string | number;
  firstName: string;
  lastName: string;
  commercialName?: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  siret: string;
  photo?: string;
  logo?: string;
  bio?: string;
  hivesCount?: string;
  location?: string;
  distance?: string;
  beekeeperSince?: string;
  gallery?: string[];
  socialMedia?: SocialMedia;
}

export interface TraceabilityData {
  lotNumber: string;
  zone: Zone;
  production: Production;
  beekeeper?: Beekeeper;
}

export interface LotsGroupedByBeekeeper {
  beekeeperName: string;
  beekeeperCode: string;
  lots: string[];
}

export interface HoneyType {
  code: string;
  name: string;
  description: string;
  color: string;
  season?: string;
}
