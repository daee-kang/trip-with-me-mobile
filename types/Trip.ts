export type Trip = {
  id: string;
  created_at: string;
  name: string;
  description: string | null;
  photo: string | null;
  owner_id: string;
};
