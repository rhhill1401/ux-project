// src/components/WebAIIntegration.tsx
'use client';

import React, {useRef, useEffect} from 'react';
import Image from 'next/image';
import {RiTailwindCssFill} from 'react-icons/ri';
import {SiPostgresql, SiTypescript, SiGraphql, SiRedux} from 'react-icons/si';
import {TbBrandNextjs} from 'react-icons/tb';
import {motion, useViewportScroll, useTransform} from 'framer-motion';

const TechIcon = ({
	Icon,
	name,
	color,
}: {
	Icon: React.ElementType;
	name: string;
	color: string;
}) => (
	<div className='flex items-center gap-2'>
		<Icon className={`text-2xl ${color}`} />
		<span className='text-sm text-gray-600'>{name}</span>
	</div>
);

const WebAIIntegration = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					videoElement.play().catch((error) => {
						console.error('Error attempting to play', error);
					});
				} else {
					videoElement.pause();
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersection, {
			threshold: 0.5,
		});

		observer.observe(videoElement);

		return () => {
			observer.unobserve(videoElement);
		};
	}, []);

	// Parallax effect
	const {scrollY} = useViewportScroll();
	// Reduce the range to make the parallax effect subtler
	const yParallax = useTransform(scrollY, [0, 500], [50, -50]);

	// Define variants for entrance animation
	const sectionVariants = {
		hidden: {opacity: 0, y: 150, scale: 0.95},
		visible: {opacity: 1, y: 0, scale: 1},
	};

	return (
		<motion.section
			variants={sectionVariants}
			initial='hidden'
			whileInView='visible'
			transition={{duration: 1.2, ease: 'easeOut'}}
			viewport={{once: true, amount: 0.5}}
			className='bg-white sm:min-h-screen py-20 sm:py-40'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center mb-12 sm:mb-24'>
					<div className='relative'>
						<div className='w-8 h-8 sm:w-14 sm:h-14 p-2 rounded-full border-2 border-lightGray flex items-center justify-center'>
							<Image
								src='/LegendLogo.svg'
								alt='Legend Logo'
								width={12}
								height={12}
								className='w-18 h-18 sm:w-[40px] sm:h-[40px]'
							/>
						</div>
					</div>
					<h2 className='font-helvetica font-medium text-base sm:text-xl text-primaryGray ml-4'>
						Web & AI Integration
					</h2>
				</div>
				<div className='flex items-baseline mb-8 sm:mb-16'>
					<h1 className='font-helvetica text-2xl sm:text-5xl font-bold text-secondaryText mr-2'>
						Developing
					</h1>
					<h1 className='font-helvetica text-2xl sm:text-5xl font-light text-secondaryText'>
						WeAreLegends
					</h1>
				</div>
				<div className='flex flex-col lg:flex-row gap-16'>
					<div className='lg:w-2/5 '>
						<p className='font-openSans text-sm sm:text-xl leading-loose text-secondaryGray mb-8'>
							I created and designed WeAreLegends, a platform that{' '}
							<span className='relative inline-block'>
								uses AI
								<Image
									src='/strike.svg'
									alt='Strike'
									width={85}
									height={10}
									className='absolute left-0 bottom-0'
								/>
							</span>{' '}
							to offer personalized mentorship from icons like
							Warren Buffett and Kobe Bryant. Users receive
							real-time advice and accountability to help form
							habits and reach their goals, with custom guidance
							tailored to their personal growth journey. This
							project reflects my expertise in building impactful,
							user-focused solutions from the ground up.
						</p>
						<div className='flex flex-col w-[540px] mb-12 gap-8 sm:gap-[68px] sm:mt-24'>
							<div className='flex justify-between'>
								<TechIcon
									Icon={TbBrandNextjs}
									name='NextJs'
									color='text-black'
								/>
								<TechIcon
									Icon={SiPostgresql}
									name='Postgres'
									color='text-blue-800'
								/>
								<TechIcon
									Icon={RiTailwindCssFill}
									name='TailwindCSS'
									color='text-blue-400'
								/>
							</div>
							<div className='flex justify-between'>
								<TechIcon
									Icon={SiRedux}
									name='Redux'
									color='text-[#7E57C2]'
								/>
								<TechIcon
									Icon={SiTypescript}
									name='Typescript'
									color='text-blue-600'
								/>
								<TechIcon
									Icon={SiGraphql}
									name='GraphQL'
									color='text-[#FF4081]'
								/>
							</div>
						</div>
					</div>
					{/* Parallax Video Container */}
					<motion.div
						className='w-full sm:lg:w-1/2'
						style={{y: yParallax}} // Apply parallax y transformation
					>
						<video
							ref={videoRef}
							src='https://res.cloudinary.com/djfcozdnf/video/upload/v1727379894/0926_1_o7laud.mov'
							controls
							loop
							muted
							className='rounded-lg shadow-lg w-full'>
							Your browser does not support the video tag.
						</video>
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
};

export default WebAIIntegration;
