/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

interface Hadith {
  hadith: string;
  source: string;
  narrator: string;
}

interface HBannerProps {
  setBanner: (value: boolean) => void;
}

const api = process.env.NEXT_PUBLIC_ENDPOINT as string;

export default function HBanner({ setBanner }: HBannerProps) {
  const [hadith, setHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => setHadith(data))
      .catch((error) => console.error('Failed to fetch Hadith:', error));
  }, []);

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {hadith ? (
          <small>
            <p className="text-black">
              {hadith.hadith} - {hadith.source} - <small>{hadith.narrator}</small>
            </p>
          </small>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
      <div className="flex flex-1 justify-end">
        <button
          onClick={() => setBanner(false)}
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <RiCloseLine className="h-5 w-5 text-gray-900" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
