import { supabase } from '../lib/supabase';

export async function getTripsDB(userid: string) {
  return await supabase.from('trips').select().eq('owner_id', userid);
}
export type GetTripsDBResponse = Awaited<ReturnType<typeof getTripsDB>>;

export async function getTripDB(id: string) {
  return await supabase.from('trips').select().eq('id', id);
}
export type GetTripDBResponse = Awaited<ReturnType<typeof getTripDB>>;

export async function deleteTripDB(id: string) {
  return await supabase.from('trips').delete().eq('id', id);
}
export type DeleteTripDBResponse = Awaited<ReturnType<typeof deleteTripDB>>;
