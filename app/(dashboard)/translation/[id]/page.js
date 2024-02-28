import TourInfo from "@/components/TourInfo";
import prisma from "@/utils/db";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import TranslationInfo from "@/components/TranslationInfo";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTranslationPage = async ({ params }) => {
  const translation = await prisma.translation.findUnique({
    where: {
      id: params.id,
    },
  });

  const { data } = await axios(`${url}${translation.language}`);
  const translationImage = data?.results[0]?.urls?.raw;

  return (
    <div>
      <Link href="/translation" className="btn btn-secondary mb-12">
        çevirilere geri dön
      </Link>

      {translationImage ? (
        <div>
          <Image
            src={translationImage}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
            alt={translation.language}
            priority
          />
        </div>
      ) : null}

      <TranslationInfo translation={translation} />
    </div>
  );
};
export default SingleTranslationPage;
