// 'use client';

// import {useEffect} from 'react';

// const AnimatedBackground = () => {
// 	useEffect(() => {
// 		const createDot = () => {
// 			const dot = document.createElement('div');
// 			const size = Math.random() * 100 + 900; // Increased size range
// 			const colors = ['#ECEBFA', '#EBFAF8', '#EBF7FA', '#EEEEF7'];
// 			const color = colors[Math.floor(Math.random() * colors.length)];

// 			dot.style.width = `${size}px`;
// 			dot.style.height = `${size}px`;
// 			dot.style.backgroundColor = color;
// 			dot.style.borderRadius = '200%';
// 			dot.style.position = 'absolute';
// 			dot.style.top = `${Math.random() * 100}%`;
// 			dot.style.left = `${Math.random() * 100}%`;
// 			dot.style.filter = 'blur(80px)';
// 			dot.style.animation = `move ${
// 				Math.random() * 10 + 10
// 			}s linear infinite`;

// 			const backgroundContainer =
// 				document.querySelector('.animated-gradient');
// 			if (backgroundContainer) {
// 				backgroundContainer.appendChild(dot);
// 			}
// 		};

// 		for (let i = 0; i < 20; i++) {
// 			createDot();
// 		}
// 	}, []);

// 	return <div className='animated-gradient'></div>;
// };

// export default AnimatedBackground;
