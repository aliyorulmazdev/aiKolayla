import Link from "next/link";
const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold relative">
            hadiKolayla
            <span className=" ml-2 bg-gradient-to-r text-transparent bg-clip-text from-red-500 via-yellow-500 to-green-500 shadow-xl p-4 rounded-lg">
              AI
            </span>
          </h1>

          <p className="py-6 text-lg leading-loose">
            Yapay Zeka Destekli Tur Rehberiniz. Gezilerinizi kolaylaştırır,
            keşiflerinizi artırır!
          </p>
          <Link href="/chat" className="btn btn-secondary ">
            Başlamak İçin Tıkla
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
