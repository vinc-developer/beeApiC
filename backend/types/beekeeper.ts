// Types TypeScript pour les apiculteurs

export interface SocialMediaDto {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  linkedin?: string;
}

export interface BeekeeperDto {
  id: string;
  code: string;
  useProxy: boolean;
  type: string;
  partnerSince?: string;
  firstName: string;
  lastName: string;
  commercialName: string;
  address: string;
  email?: string;
  phone?: string;
  website?: string;
  webshop?: string;
  siret?: string;
  photo?: string;
  logo?: string;
  bio?: string;
  hivesCount?: string;
  location?: string;
  distance?: string;
  beekeeperSince?: string;
  ruchers: string[];
  gallery: string[];
  socialMedia?: SocialMediaDto;
  createdAt: Date;
  updatedAt: Date;
}

export interface BeekeeperCreateInput {
  code: string;
  useProxy?: boolean;
  type: string;
  partnerSince?: string;
  firstName: string;
  lastName: string;
  commercialName: string;
  address: string;
  email?: string;
  phone?: string;
  website?: string;
  webshop?: string;
  siret?: string;
  photo?: string;
  logo?: string;
  bio?: string;
  hivesCount?: string;
  location?: string;
  distance?: string;
  beekeeperSince?: string;
  ruchers?: string[];
  gallery?: string[];
  socialMedia?: SocialMediaDto;
}

export interface BeekeeperUpdateInput extends Partial<BeekeeperCreateInput> {}
