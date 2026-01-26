// Types TypeScript pour l'authentification

export interface UserDto {
  id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateInput {
  email: string;
  password: string;
  name?: string;
  role?: 'admin' | 'editor' | 'viewer';
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<UserDto, 'createdAt' | 'updatedAt'>;
  token: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export interface UserUpdateInput {
  email?: string;
  password?: string;
  name?: string;
  role?: 'admin' | 'editor' | 'viewer';
}
