import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { supabase } from '../../lib/supabase';

const getSignedImageDB = async (path: string, timeout = 1000) => {
  return await supabase.storage.from('transaction-images').createSignedUrl(path, timeout);
};

export const useGetSignedImage = (
  params: {
    path: string | null;
    timeout?: number;
  },
  options: UseQueryOptions<string | null>
) => {
  const key = ['signedImage', params.path];

  const path = params.path == null ? '' : params.path;

  return useQuery<string | null>(
    key,
    async () => {
      return getSignedImageDB(path, params.timeout)
        .then((res) => res.data?.signedUrl ?? null)
        .catch((err) => err);
    },
    options
  );
};

export type GetSignedImageDBResponse = Awaited<ReturnType<typeof getSignedImageDB>>;
