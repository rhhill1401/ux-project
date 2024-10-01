import React from 'react';
import {FaCirclePlay, FaCirclePause} from 'react-icons/fa6'; // Import both play and pause icons

const AnimatedPlayButton: React.FC<{
	isPlaying: boolean;
	onClick: () => void;
}> = ({isPlaying, onClick}) => {
	return (
		<div className='relative w-12 h-12'>
			{/* Render the gradient rotating circle only when not playing */}
			{!isPlaying && (
				<div className='absolute inset-0'>
					<svg className='w-full h-full' viewBox='0 0 50 50'>
						<defs>
							{/* Define a linear gradient with multiple color stops */}
							<linearGradient
								id='gradient'
								x1='0%'
								y1='0%'
								x2='100%'>
								<stop offset='10%' stopColor='#8654F0' />
								<stop offset='70%' stopColor='#D654F0' />
								<stop offset='30%' stopColor='#D654F0' />
								<stop offset='100%' stopColor='#FFFFFF' />
							</linearGradient>
						</defs>
						{/* Animated circle with gradient stroke */}
						<circle
							cx='25'
							cy='25'
							r='23'
							fill='none'
							stroke='url(#gradient)'
							strokeWidth='3'
							strokeLinecap='round'
							className={!isPlaying ? 'animate-draw-stroke' : ''} // Apply animation only when not playing
						/>
					</svg>
				</div>
			)}

			{/* Conditional rendering for Play and Pause buttons based on isPlaying state */}
			<button
				onClick={onClick}
				className='absolute inset-0 flex items-center justify-center text-white opacity-100 hover:opacity-70 transition-opacity duration-300'
				aria-label={isPlaying ? 'Pause video' : 'Play video'} // Accessible labels for play/pause
			>
				{isPlaying ? (
					<FaCirclePause className='w-10 h-10' /> // Render pause icon when playing
				) : (
					<FaCirclePlay className='w-10 h-10' /> // Render play icon when paused
				)}
			</button>
		</div>
	);
};

export default AnimatedPlayButton;
