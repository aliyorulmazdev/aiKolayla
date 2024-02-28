'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchUserTokensById,
  subtractTokens,
  generateTranslationResponse,
  createNewTranslation,
  getExistingTranslation,
} from '@/utils/actions';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';
import TranslationInfo from './TranslationInfo';
const NewTranslation = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const {
    mutate,
    isPending,
    data: translation,
  } = useMutation({
    mutationFn: async (translation) => {
      const existingTranslation = await getExistingTranslation(translation);
      if (existingTranslation) return existingTranslation;

      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 300) {
        toast.error('Token krediniz çok yetersiz...');
        return;
      }

      const newTranslation = await generateTranslationResponse(translation);
      if (!translation) {
        toast.error('İlgili çeviri yapılamadı...');
        return null;
      }
      const response = await createNewTranslation(newTranslation.translation);
      queryClient.invalidateQueries({ queryKey: ['translations'] });
      const newTokens = await subtractTokens(userId, newTranslation.tokens);
      toast.success(`${newTokens} token kaldı...`);
      console.log(newTranslation);
      return newTranslation.translation;
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const translation = Object.fromEntries(formData.entries());
    mutate(translation);
  };

  if (isPending) {
    return <span className='loading loading-lg'></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className='mb-4'>Hayalinizdeki turu oluşturun...</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='Lang'
            name='language'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='DesLang'
            name='desiredlanguage'
            required
          />
                    <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='Text'
            name='message'
            required
          />
          <button className='btn btn-primary join-item' type='submit'>
            Beni şaşırt
          </button>
        </div>
      </form>
      <div className='mt-16'>{translation ? <TranslationInfo translation={translation} /> : null}</div>
    </>
  );
};
export default NewTranslation;