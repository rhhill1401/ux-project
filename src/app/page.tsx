'use client';

import {useState, useEffect} from 'react';
import SVGOverlay from '@/components/SVGOverlay';
import Header from '@/components/header';
import ProjectList from '@/components/projectsList';
import ParticlesBackground from '@/components/particlesBG';

export default function Home() {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);

	const handleOverlayClose = () => {
		setIsHovered(false);
		setHoveredIndex(null);
		setVideoUrl(null);
		console.log('Overlay closed');
	};

	const handleLinkClick = (url?: string) => {
		setIsHovered(true);
		if (url) {
			setVideoUrl(url); // Set the video URL
			console.log(`Video URL set in handleLinkClick: ${url}`);
		} else {
			console.log('No video URL provided in handleLinkClick');
		}
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className='relative min-h-screen overflow-hidden'>
			<div className='fixed inset-0 z-0'>
				<ParticlesBackground />
			</div>

			<div className='px-8 min-h-screen   flex flex-col   items-center relative z-10'>
				<main
					className={`w-full max-w-6xl flex flex-col-reverse sm:flex-row sm:justify-between gap-8 mt-44 ${
						isHovered && isMobile ? 'hidden' : 'flex'
					}`}>
					<div className='w-full  min-w-[300px] sm:w-4/5 sm:pr-40 lg:pr-60 '>
						<ProjectList
							handleLinkClick={handleLinkClick}
							hoveredIndex={hoveredIndex}
						/>
					</div>
					<div className='w-full mt-20 mb-20 sm:order-last sm:relative sm:top-[100px]'>
						{!isHovered && <Header />}
					</div>
				</main>
				<SVGOverlay
					isVisible={isHovered}
					onClose={handleOverlayClose}
					isMobile={isMobile}
					videoUrl={videoUrl as string | undefined}
				/>
			</div>
		</div>
	);
}
