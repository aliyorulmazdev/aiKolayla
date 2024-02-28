
import TranslationsPage from '@/components/TranslationsPage';
import { getAllTranslations } from '@/utils/actions';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const AllTranslationsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['translations', ''],
    queryFn: () => getAllTranslations(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TranslationsPage />
    </HydrationBoundary>
  );
};
export default AllTranslationsPage;