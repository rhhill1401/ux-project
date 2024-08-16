'use client';

import Link from 'next/link';

export default function Header() {
	return (
		<header className='mb-8'>
			<h1 className='text-3xl text-black font-extrabold mb-1'>
				Rudolph Hill,
			</h1>
			<h2 className='text-2xl font-extrabold text-black font-roboto mb-4'>
				front end developer and ux{' '}
				<span className='bg-gradient-to-r from-[#FF1B6B] to-[#45CAFF] bg-clip-text text-transparent font-roboto'>
					designer
				</span>
			</h2>
			<nav className='flex gap-4 font-inter text-lg'>
				<Link
					href='/Resume%20Final.pdf'
					className='text-links hover:text-black'
					target='_blank'>
					Resume
				</Link>
				<Link
					href='https://www.linkedin.com/in/rudolph-hill/'
					className='text-links hover:text-black'
					target='_blank'
					rel='noopener noreferrer'>
					LinkedIn
				</Link>
			</nav>
		</header>
	);
}
