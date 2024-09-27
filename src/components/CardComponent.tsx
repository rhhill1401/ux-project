import React from 'react';
import Image from 'next/image';

const CardComponent: React.FC = () => {
	return (
		<div className='bg-white md:rounded-md md:py-10 pt-5 pb-5 sm:shadow-lg w-full flex items-center justify-center max-w-[700px] mx-auto transform transition-all duration-300 ease-in-out hover:scale-105 mb-0'>
			<div className='flex flex-col   items-center md:items-start md:justify-center'>
				<h1 className='text-black font-helvetica -ml-2 text-5xl sm:text-6xl md:text-8xl font-bold leading-tight  mb-1 2md:mb-4'>
					Hi, I&apos;m Terry!
				</h1>
				<div className='flex flex-col items-center md:items-start'>
					<p className='text-black font-helvetica  text-lg  sm:text-2xl md:text-3xl font-normal  mb-1  md:mb-2'>
						I love creating digital experiences
					</p>
					<p className='text-black font-helvetica  text-lg  sm:text-2xl md:text-3xl font-normal mb-10  md:mb-20'>
						for{' '}
						<span className='font-bold font-helvetica relative inline-block'>
							<span className='relative z-10 italic text-black'>
								everyone
							</span>
							<Image
								src='/strike.svg'
								alt='Underline'
								width={100}
								height={10}
								className='absolute -bottom-1 left-0 w-full z-0'
							/>
						</span>
						.
					</p>
				</div>
				<div className='flex flex-col items-start'>
					<div className='flex flex-wrap md:justify-center  gap-2  md:gap-4'>
						<span className='text-tertiaryGray font-helvetica  text-xs  md:text-lg'>
							20 years experience
						</span>
						<span className='text-tertiaryGray font-helvetica text-xs  md:text-lg'>
							User Experience Design
						</span>
						<span className='text-tertiaryGray font-helvetica text-xs md:text-lg'>
							Frontend development
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardComponent;
