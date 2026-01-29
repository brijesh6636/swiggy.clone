import React, { useRef } from 'react';
import { imagelink } from '../Const/Const';
import { restrodata } from '../MockData/RestroApiData';

export const WhatsOnMind = () => {
  const whatonmind = restrodata.data.cards[0].card.card.imageGridCards.info;
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += 244; // Scroll left by 244px
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft -= 244; // Scroll right by 244px
    }
  };

  return (
    <>
      <div className="bg-white flex justify-between py-1.5 px-3">
        <label className="pl-1 font-bold text-base">What's on your mind?</label>
        <div className="flex items-center gap-1.5">
          <span className='p-1.5 bg-slate-300 rounded-full cursor-pointer hover:bg-slate-400 transition duration-200 flex items-center justify-center h-7 w-7 text-sm' onClick={scrollRight}>&#8592;</span>
          <span className='p-1.5 bg-slate-300 rounded-full cursor-pointer hover:bg-slate-400 transition duration-200 flex items-center justify-center h-7 w-7 text-sm' onClick={scrollLeft}>&#8594;</span>
        </div>
      </div>

      <div ref={scrollContainerRef} className="bg-white flex overflow-x-auto gap-x-3 px-3 py-2 pb-3" style={{ scrollbarWidth: 'none' }}>
        {whatonmind.map((data, index) => (
          <img alt="what's on mind" key={index} className='w-[100px] h-[130px] cursor-pointer hover:scale-105 transition-transform duration-200 flex-shrink-0' src={`${imagelink}${data.imageId}`} />
        ))}
      </div>
    </>
  );
};

