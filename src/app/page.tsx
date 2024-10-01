// src/app/page.tsx
'use client';

import React from 'react';
import VideoComponent from '@/components/VideoComponent';
import CardComponent from '@/components/CardComponent';
import Navigation from '@/components/Navigation';
import ChatIntroScreen from '@/components/ChatIntroScreen';
import WebAIIntegration from '@/components/WebAIIntegration';

export default function Home() {
	return (
		<>
			<Navigation />
			<div className='scroll-smooth w-full overflow-x-hidden'>
				<section
					id='home'
					className='h-auto bg-primaryBlue flex flex-col items-center justify-start sm:bg-primaryGray sm:p-8 sm:flex-row sm:justify-center mb-0'>
					<div className='flex flex-col sm:items-center  justify-end min-h-screen sm:justify-center w-full sm:flex-row'>
						{/* Video container */}
						<div className='flex  justify-center   w-full mt-28 sm:mt-0 order-first sm:order-last sm:mb-0 sm:max-w-[650px]'>
							<VideoComponent />
						</div>
						{/* Card container */}
						<div className='w-full z-0 order-second sm:order-first sm:-mr-36 sm:-mt-20 sm:w-[936px] sm:max-w-none'>
							<CardComponent />
						</div>
						<div className='sm:hidden '>
							<ChatIntroScreen />
						</div>
					</div>
				</section>
				<section
					id='chat-intro'
					className='bg-lightGray mt-0 hidden sm:block'>
					<ChatIntroScreen />
				</section>
				<section id='web-ai-integration'>
					<WebAIIntegration />
				</section>
			</div>
		</>
	);
}
