import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import AnimatedPlayButton from './AnimatedPlayButton';
import Skeleton from '@mui/material/Skeleton';

const VideoComponent: React.FC = () => {
	const [isPlaying, setIsPlaying] = useState(false); // State to control video playback and button display
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isLoading, setIsLoading] = useState(true); // Tracks if the content is loading
	const [isImageLoaded, setIsImageLoaded] = useState(true);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	// Function to toggle video play/pause
	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				setIsPlaying(false);
			} else {
				setIsPlaying(true);
				setIsLoading(true);
				if (isVideoLoaded) {
					videoRef.current.play();
					setIsLoading(false);
				} else {
					videoRef.current.load();
				}
			}
		}
	};

	// Effect to handle video end and reset play state
	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			const handleEnded = () => {
				setIsPlaying(false);
			};
			video.addEventListener('ended', handleEnded);

			// Preload the video without playing it
			video.load();
			video.preload = 'auto';

			return () => video.removeEventListener('ended', handleEnded);
		}
	}, []);

	return (
		<div className='flex md:flex-col  bg-primaryBlue  justify-center  h-[400px]   md:h-auto md:justify-end md:items-end md:rounded-lg'>
			{/* Video/Image container */}
			<div className='relative w-full mobile:h-[400px] mobile:w-[400px] sm:h-[500px] sm:w-[536px] md:w-[636px] md:h-[586px] md:rounded-t-lg md:overflow-hidden sm:flex-shrink-0'>
				{/* Skeleton Loader */}
				{isLoading && (
					<Skeleton
						variant='rounded'
						width='100%'
						height='100%'
						animation='wave'
						className='absolute top-0 left-0'
					/>
				)}
				{/* Default image */}
				<Image
					src='https://res.cloudinary.com/djfcozdnf/image/upload/v1726685413/TerryForward_facing_aqnzs4.png'
					alt="Terry's portrait"
					fill
					style={{
						objectFit: 'cover',
						display:
							!isPlaying && isImageLoaded && !isLoading
								? 'block'
								: 'none',
					}}
					onLoadingComplete={() => {
						console.log('Image loaded');
						setIsImageLoaded(true);
						setIsLoading(false);
					}}
				/>
				{/* Video element */}
				<video
					ref={videoRef}
					className='w-full h-full object-cover'
					src='https://res.cloudinary.com/djfcozdnf/video/upload/v1726976159/terryAI_dtbq5c.mov'
					playsInline
					aria-label="Terry's introduction video"
					onLoadedData={() => {
						console.log('Video data loaded');
						setIsVideoLoaded(true);
						setIsLoading(false);
					}}
					style={{
						display: isPlaying && isVideoLoaded ? 'block' : 'none',
					}}>
					Your browser does not support the video tag.
				</video>
				{/* Play/Pause button */}
				<div
					className='absolute top-4 right-4'
					style={{display: !isLoading ? 'block' : 'none'}}>
					<AnimatedPlayButton
						isPlaying={isPlaying}
						onClick={togglePlay}
					/>
				</div>
			</div>

			{/* Logo container */}
			<div className='hidden md:flex md:items-center md:justify-center md:gap-8 md:bg-white md:px-2 md:py-6 md:rounded-b-lg md:w-full'>
				<Image
					src='/Milli.png'
					alt='Milli Logo'
					width={50}
					height={40}
				/>
				<Image
					src='/LovelySkin_blue.png'
					alt='LovelySkin Logo'
					width={100}
					height={40}
				/>
				<Image
					src='/Union-Pacific-Logo.png'
					alt='Union Pacific Logo'
					width={50}
					height={40}
				/>
			</div>
		</div>
	);
};

export default VideoComponent;
