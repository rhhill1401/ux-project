'use client';

import {useState, useCallback, useEffect} from 'react';
import SVGOverlay from '@/components/SVGOverlay';
import Header from '@/components/header';
import ProjectList from '@/components/projectsList';
// import AnimatedBackground from '@/components/animatedBackground';

export default function Home() {
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState(false);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);

	const handleOverlayClose = () => {
		setIsHovered(false); // Reset hover state when overlay closes
		setHoveredIndex(null); // Reset hovered index when overlay closes
		setVideoUrl(null); // Reset video URL when overlay closes
		console.log('Overlay closed'); // Debug log
	};

	const handleLinkClick = (url?: string) => {
		setIsHovered(true);
		if (url) {
			setVideoUrl(url); // Set the video URL
			console.log(`Video URL set in handleLinkClick: ${url}`); // Debug log
		} else {
			console.log('No video URL provided in handleLinkClick'); // Debug log for no URL
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
		<div className='px-8 min-h-screen bg-[#FBFBFE] flex flex-col justify-center items-center overflow-hidden'>
			<main
				className={`w-full max-w-6xl flex flex-col-reverse sm:flex-row sm:justify-between gap-8 ${
					isHovered && isMobile ? 'hidden' : 'flex'
				}`}>
				<div className='w-full min-w-[300px] sm:w-4/5  sm:pr-40 lg:pr-60 z-10'>
					<ProjectList
						handleLinkClick={handleLinkClick} // Pass the link click handler
						hoveredIndex={hoveredIndex} // Pass the hovered index
					/>
				</div>
				<div className='w-full mt-20 mb-20 sm:order-last sm:relative sm:top-[200px] z-10'>
					{!isHovered && <Header />}
				</div>
			</main>
			<div>
				<SVGOverlay
					isVisible={isHovered}
					onClose={handleOverlayClose} // Pass the handler for closing the overlay
					isMobile={isMobile}
					videoUrl={videoUrl as string | undefined} // Pass the video URL
				/>
			</div>
			{/* <div className='absolute inset-0 z-0'>
				<AnimatedBackground />
			</div> */}
		</div>
	);
}
