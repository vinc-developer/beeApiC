// Types TypeScript pour les types de miel

export interface HoneyTypeDto {
  id: string;
  code: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HoneyTypeCreateInput {
  code: string;
  name: string;
  description?: string;
}

export interface HoneyTypeUpdateInput extends Partial<HoneyTypeCreateInput> {}
