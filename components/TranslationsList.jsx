import TourCard from './TourCard';
import TranslationCard from './TranslationCard';
const TranslationsList = ({ data }) => {
  if (data.length === 0) return <h4 className='text-lg '>No translations found...</h4>;

  return (
    <div className='grid sm:grid-cols-2  lg:grid-cols-4 gap-8'>
      {data.map((translation) => {
        return <TranslationCard key={translation.id} translation={translation} />;
      })}
    </div>
  );
};
export default TranslationsList;