'use client';

import {useEffect} from 'react';

const AnimatedBackground = () => {
	useEffect(() => {
		const createDot = () => {
			const dot = document.createElement('div');
			const size = Math.random() * 300 + 900; // Increased size range
			const colors = ['#EBFAF0', '#F6EBFA', '#F3F1D3', '#E9F0F9'];
			const color = colors[Math.floor(Math.random() * colors.length)];

			dot.style.width = `${size}px`;
			dot.style.height = `${size}px`;
			dot.style.backgroundColor = color;
			dot.style.borderRadius = '50%';
			dot.style.position = 'absolute';
			dot.style.top = `${Math.random() * 100}%`;
			dot.style.left = `${Math.random() * 100}%`;
			dot.style.filter = 'blur(30px)';
			dot.style.animation = `move ${
				Math.random() * 20 + 20
			}s linear infinite`;

			const backgroundContainer =
				document.querySelector('.animated-gradient');
			if (backgroundContainer) {
				backgroundContainer.appendChild(dot);
			}
		};

		for (let i = 0; i < 20; i++) {
			// Increased the number of dots
			createDot();
		}
	}, []);

	return <div className='animated-gradient'></div>;
};

export default AnimatedBackground;
