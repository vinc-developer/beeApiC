// Export de tous les types

export * from './auth';
export * from './beekeeper';
export * from './honey-type';
export * from './product';
export * from './lot';

// Types génériques pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
