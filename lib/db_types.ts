export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      transaction_detail: {
        Row: {
          id: string;
          transaction_id: string;
          to_user: string;
          amount: number;
        };
        Insert: {
          id: string;
          transaction_id: string;
          to_user: string;
          amount: number;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          to_user?: string;
          amount?: number;
        };
      };
      transactions: {
        Row: {
          id: string;
          created_at: string;
          trip_id: string;
          for_user: string;
          description: string | null;
          photo: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          trip_id: string;
          for_user: string;
          description?: string | null;
          photo?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          trip_id?: string;
          for_user?: string;
          description?: string | null;
          photo?: string | null;
        };
      };
      trip_members: {
        Row: {
          id: string;
          trip_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          trip_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          trip_id?: string;
          user_id?: string;
        };
      };
      trips: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          photo: string | null;
          owner_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          photo?: string | null;
          owner_id?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          photo?: string | null;
          owner_id?: string;
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string | null;
          email: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          email: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          email?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
