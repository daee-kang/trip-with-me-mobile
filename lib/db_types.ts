export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          amount: number;
          created_at: string;
          description: string | null;
          from_user_id: string;
          id: string;
          photo: string | null;
          to_user_id: string | null;
          trip_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          description?: string | null;
          from_user_id?: string;
          id?: string;
          photo?: string | null;
          to_user_id?: string | null;
          trip_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          description?: string | null;
          from_user_id?: string;
          id?: string;
          photo?: string | null;
          to_user_id?: string | null;
          trip_id?: string;
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
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          owner_id: string;
          photo: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          owner_id?: string;
          photo?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          photo?: string | null;
        };
      };
      users: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
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
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
