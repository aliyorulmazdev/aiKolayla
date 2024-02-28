'use client';
import { getAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import TranslationsList from './TranslationsList';

const TranslationsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isPending } = useQuery({
    queryKey: ['translations', searchValue],
    queryFn: () => getAllTranslations(searchValue),
  });

  return (
    <>
      <form className='max-w-lg mb-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='Buraya dil giriniz..'
            className='input input-bordered join-item w-full'
            name='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className='btn btn-primary join-item'
            type='button'
            disabled={isPending}
            onClick={() => setSearchValue('')}
          >
            {isPending ? 'lütfen bekleyin' : 'sıfırla'}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className=' loading'></span>
      ) : (
        <TranslationsList data={data} />
      )}
    </>
  );
};
export default TranslationsPage;