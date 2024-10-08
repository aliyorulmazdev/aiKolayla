import Link from 'next/link';
const TranslationCard = ({ translation }) => {
  const { language, id, desiredlanguage } = translation;

  return (
    <Link
      href={`/translation/${id}`}
      className='card card-compact rounded-xl bg-base-100'
    >
      <div className='card-body items-center text-center'>
        <h2 className='card-title text-center'>
          {language}, {desiredlanguage}
        </h2>
      </div>
    </Link>
  );
};
export default TranslationCard;