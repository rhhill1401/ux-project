// src/components/Navigation.tsx
'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {IoClose} from 'react-icons/io5';
import {useRouter, usePathname} from 'next/navigation';

const Navigation: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('');
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
	};

	useEffect(() => {
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersection, {
			threshold: 0.5,
		});

		const sections = document.querySelectorAll('section');
		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, []);

	const handleProjectsClick = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) => {
		e.preventDefault();
		if (pathname === '/') {
			const target = document.getElementById('web-ai-integration');
			if (target) {
				target.scrollIntoView({behavior: 'smooth'});
				setActiveSection('web-ai-integration');
			}
		} else {
			router.push('/#web-ai-integration');
		}
		if (isMobileMenuOpen) {
			toggleMobileMenu();
		}
	};

	const isActive = (sectionId: string) => activeSection === sectionId;

	return (
		<>
			{/* Overlay */}
			{isMobileMenuOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-90 z-40'
					onClick={toggleMobileMenu}></div>
			)}

			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? 'md:bg-black md:text-white bg-primaryBlue text-white'
						: 'bg-transparent text-white'
				}`}>
				<div className='md:container md:mx-auto px-4 md:px-4 py-4 flex justify-between items-center'>
					{/* Desktop Home Link */}
					<Link
						href='/'
						className='hidden md:block text-xl font-medium font-openSans'
						aria-label='Home'>
						Rudolph Terry Hill
					</Link>
					{/* Desktop Menu */}
					<div className='hidden md:flex space-x-4 font-openSans'>
						<Link
							href='#about'
							className={`hover:text-primaryBlue ${
								isActive('about') ? 'underline' : ''
							}`}
							aria-label='About'>
							About
						</Link>
						<a
							href='#web-ai-integration'
							onClick={handleProjectsClick}
							className={`cursor-pointer hover:text-primaryBlue ${
								isActive('web-ai-integration')
									? 'underline'
									: ''
							}`}
							aria-label='Projects'>
							Projects
						</a>
						<Link
							href='#contact'
							className={`hover:text-primaryBlue ${
								isActive('contact') ? 'underline' : ''
							}`}
							aria-label='Contact'>
							Contact
						</Link>
					</div>
					{/* Hamburger Menu Icon */}
					<button
						className='md:hidden text-white focus:outline-none'
						onClick={toggleMobileMenu}
						aria-label='Toggle mobile menu'>
						<svg
							className='w-6 h-6'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path d='M4 6h16M4 12h16M4 18h16'></path>
						</svg>
					</button>
				</div>
				{/* Mobile Menu */}
				<div
					className={`fixed top-0 left-0 bottom-0 w-64 bg-primaryGray text-white transform transition-transform duration-300 ease-in-out z-60 ${
						isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
					}`}>
					<div className='relative h-full'>
						<button
							className='absolute top-4 right-4 text-white focus:outline-none'
							onClick={toggleMobileMenu}
							aria-label='Close mobile menu'>
							<IoClose className='w-6 h-6' />
						</button>
						<div className='p-4 pt-16 space-y-4'>
							<Link
								href='/'
								className='block py-2 px-4 hover:bg-gray-600 font-medium'
								onClick={toggleMobileMenu}>
								Home
							</Link>
							<Link
								href='#about'
								className='block py-2 px-4 hover:bg-gray-600'
								onClick={toggleMobileMenu}>
								About
							</Link>
							<a
								href='#web-ai-integration'
								onClick={handleProjectsClick}
								className='block py-2 px-4 hover:bg-gray-600'
								aria-label='Projects'>
								Projects
							</a>
							<Link
								href='#contact'
								className='block py-2 px-4 hover:bg-gray-600'
								onClick={toggleMobileMenu}>
								Contact
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navigation;
