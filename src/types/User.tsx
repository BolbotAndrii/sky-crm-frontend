export interface IUser {
  background_color: string
  created_at: string
  email: string
  first_name: string
  id: string
  last_name: string
  notes: string
  password: string
  role_id: number
  status: number
  title: string
  updated_at: string
  user_identifier: string
  user_logo: string
}

export enum UserRole {
  SUPER_ADMIN = 1,
  OWNER = 2,
  ADMIN = 3,
  MANAGER = 4,
  BAYER = 5,
  ACCOUNTANT = 6,
  HELPER = 7,
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 2,
}

export const UserStatusStr = {
  [UserStatus.ACTIVE]: 'ACTIVE',
  [UserStatus.INACTIVE]: 'INACTIVE',
}

export const UserRoleStr = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.OWNER]: 'Owner',
  [UserRole.ADMIN]: 'Admin',
  [UserRole.MANAGER]: 'Manager',
  [UserRole.BAYER]: 'Bayer',
  [UserRole.ACCOUNTANT]: 'Accountant',
  [UserRole.HELPER]: 'Helper',
}

export const UserStatusColors = {
  [UserStatus.ACTIVE]: '#008000', // Зеленый
  [UserStatus.INACTIVE]: '#FF0000', // Красный
}

export const UserRoleColors = {
  [UserRole.SUPER_ADMIN]: '#FFA500', // Оранжевый
  [UserRole.OWNER]: '#FF4500', // Оранжево-красный
  [UserRole.ADMIN]: '#0000FF', // Синий
  [UserRole.MANAGER]: '#800080', // Пурпурный
  [UserRole.BAYER]: '#FFFF00', // Желтый
  [UserRole.ACCOUNTANT]: '#FF1493', // Розовый
  [UserRole.HELPER]: '#14ff99', // green
}
