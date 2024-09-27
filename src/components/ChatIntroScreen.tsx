// src/components/ChatIntroScreen.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import {IoArrowForward} from 'react-icons/io5';
import {useRouter} from 'next/navigation';
import {motion} from 'framer-motion';

const ChatIntroScreen: React.FC = () => {
	const router = useRouter();

	const handleStartChat = () => {
		router.push('/chat');
	};

	return (
		<motion.div
			initial={{opacity: 0, y: 100, scale: 0.95}}
			whileInView={{opacity: 1, y: 0, scale: 1}}
			transition={{duration: 1, ease: 'easeOut'}}
			viewport={{once: true, amount: 0.5}}
			className='sm:min-h-screen bg-lightGray py-28 flex flex-col items-center justify-center px-4'>
			<div className='w-full max-w-[1000px]'>
				<h1 className='text-black font-helvetica text-2xl sm:text-5xl font-normal mb-5 sm:mb-10'>
					{`Let's Chat! Meet My AI Assistant`}
				</h1>
				<div className='bg-secondaryGray rounded-lg px-4 py-6 sm:px-8 sm:py-10 flex flex-col relative'>
					<div className='flex items-start sm:mb-4'>
						<div className='bg-primaryBlue rounded-full sm:mr-6 w-8 h-8 flex-shrink-0 sm:w-20 sm:h-20 overflow-hidden'>
							<Image
								src='https://res.cloudinary.com/djfcozdnf/image/upload/v1726685413/TerryForward_facing_aqnzs4.png'
								alt="Terry's AI Assistant"
								width={100}
								height={100}
								className='object-cover w-full h-full'
							/>
						</div>
						<p className='text-white font-openSans text-sm sm:text-3xl mt-8 pl-2 pr-2 sm:pr-14'>
							{`Hello! I'm Terry's AI assistant. Ask me anything
              about his experience, skills, or projects, and I'll
              help guide you through his portfolio!`}
						</p>
					</div>
					<button
						onClick={handleStartChat}
						className='self-end mt-4 transition-transform duration-300 ease-in-out hover:scale-110'
						aria-label='Start chat'>
						<div className='bg-ctaYellow w-6 h-6 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md'>
							<IoArrowForward className='text-black sm:text-3xl' />
						</div>
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default ChatIntroScreen;
