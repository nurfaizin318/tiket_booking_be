// interfaces/user.interface.ts

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  profile_picture?: string;
  gender?: string;
  birthdate?: Date;
  address?: string;
  role: 'ADMIN' | 'CUSTOMER' | 'DRIVER';
  is_verified?: boolean;
  verification_token?: string;
  last_login?: Date | null;
  login_attempts?: number;
  blocked_until?: Date | null;
  device_type?: string;
  device_id?: string;
  last_ip?: string;
  last_location?: string;
  socket_id?: string;
  fcm_token?: string;
}

// Relational types
export interface Wallet { id: string; user_id: string; balance: number }
export interface Topup { id: string; user_id: string; amount: number; status: string; created_at: Date }
export interface Withdrawal { id: string; user_id: string; amount: number; bank_code: string; account_number: string; status: string; created_at: Date }
export interface Booking { id: string; user_id: string; schedule_id: string; total_amount: number; status: string; created_at: Date }

// ✅ interface untuk data dengan relasi
export interface UserWithRelations extends User {
  wallet?: Wallet | null;
  topups?: Topup[];
  withdrawals?: Withdrawal[];
  bookings?: Booking[];
}
