import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import {FaCirclePlay} from 'react-icons/fa6';

const VideoComponent: React.FC = () => {
	// State to control video playback and display
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	// Function to toggle video play/pause
	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	// Effect to handle video end
	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			const handleEnded = () => {
				setIsPlaying(false);
			};
			video.addEventListener('ended', handleEnded);
			return () => video.removeEventListener('ended', handleEnded);
		}
	}, []);

	return (
		<div className='flex md:flex-col h-[400px] bg-primaryBlue md:h-auto   justify-center items-end  md:justify-end md:items-end  md:rounded-lg '>
			{/* Video/Image container */}
			<div className='relative  w-full mobile:h-[400px] mobile:w-[400px]       sm:h-[500px] sm:w-[536px] md:w-[636px] md:h-[586px]   md:rounded-t-lg md:overflow-hidden sm:flex-shrink-0'>
				{/* Default image */}
				<Image
					src='https://res.cloudinary.com/djfcozdnf/image/upload/v1726685413/TerryForward_facing_aqnzs4.png'
					alt="Terry's portrait"
					layout='fill'
					objectFit='cover'
					style={{display: isPlaying ? 'none' : 'block'}}
				/>
				{/* Video element */}
				<video
					ref={videoRef}
					className='w-full h-full object-cover'
					src='https://res.cloudinary.com/djfcozdnf/video/upload/v1726976159/terryAI_dtbq5c.mov'
					playsInline
					aria-label="Terry's introduction video"
					style={{display: isPlaying ? 'block' : 'none'}}>
					Your browser does not support the video tag.
				</video>
				{/* Play button */}
				<button
					onClick={togglePlay}
					className='absolute top-4 right-4 text-white  opacity-100 hover:opacity-70 transition-opacity duration-300'
					aria-label='Play video'
					style={{width: '47px', height: '47px'}}>
					<FaCirclePlay className='w-full h-full' />
				</button>
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
