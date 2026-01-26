// Types TypeScript pour la traçabilité et les lots

export interface LotZoneDto {
  id: string;
  lieuxRucher: string;
  environnement?: string;
}

export interface LotProductionDto {
  id: string;
  datesRecolte: string[];
  datesExtractions: string[];
  datesConditionnement: string[];
}

export interface LotDto {
  id: string;
  lotNumber: string;
  humidity?: string;
  beekeeperId: string;
  beekeeper?: {
    id: string;
    code: string;
    firstName: string;
    lastName: string;
    commercialName: string;
    photo?: string;
    logo?: string;
  };
  honeyTypeId?: string;
  honeyType?: {
    id: string;
    code: string;
    name: string;
    description?: string;
  };
  zones: LotZoneDto[];
  production?: LotProductionDto;
  createdAt: Date;
  updatedAt: Date;
}

export interface LotZoneCreateInput {
  lieuxRucher: string;
  environnement?: string;
}

export interface LotProductionCreateInput {
  datesRecolte?: string[];
  datesExtractions?: string[];
  datesConditionnement?: string[];
}

export interface LotCreateInput {
  lotNumber: string;
  humidity?: string;
  beekeeperCode: string; // Code de l'apiculteur (BA, MC, NG)
  honeyTypeCode?: string; // Code du type de miel (P, PA, CH, etc.)
  zones?: LotZoneCreateInput[];
  production?: LotProductionCreateInput;
}

export interface LotUpdateInput extends Partial<LotCreateInput> {}

// Type pour la réponse de traçabilité complète
export interface TraceabilityResponse {
  lot: LotDto;
  beekeeper: {
    code: string;
    firstName: string;
    lastName: string;
    commercialName: string;
    photo?: string;
    logo?: string;
    location?: string;
    website?: string;
    webshop?: string;
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      youtube?: string;
      linkedin?: string;
    };
  };
  honeyType?: {
    code: string;
    name: string;
    description?: string;
  };
  zones: LotZoneDto[];
  production?: LotProductionDto;
}
