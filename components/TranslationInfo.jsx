const TranslationInfo = ({ translation }) => {
    const { language, desiredlanguage, translatedtext } = translation;
    return (
      <div className='max-w-2xl'>
        <h1 className='text-4xl font-semibold mb-4'>{language} - {desiredlanguage}</h1>
        <p className='leading-loose mb-6'>İşte çeviriniz</p>
        <ul>
              <li key={translatedtext} className='mb-4 bg-base-100 p-4 rounded-xl'>
                <p>{translatedtext}</p>
              </li>
        </ul>
      </div>
    );
  };
  export default TranslationInfo;