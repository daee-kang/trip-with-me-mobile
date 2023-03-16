import { Database } from '../lib/db_types';

export type Trip = Database['public']['Tables']['trips']['Row'];
export type TripTransaction = Database['public']['Tables']['transactions']['Row'];
