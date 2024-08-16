'use client';
import React, {useEffect, useRef} from 'react';
import {tsParticles} from '@tsparticles/engine';
import {loadStarsPreset} from '@tsparticles/preset-stars';

const ParticlesBackground = () => {
	const particlesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const setupParticles = async () => {
			await loadStarsPreset(tsParticles);

			tsParticles.load({
				id: 'tsparticles',
				options: {
					preset: 'stars',
					particles: {
						color: {
							value: [
								'#eaf2f5',
								'#ECEBFA',
								'#EBF7FA',
								'#EEEEF7',
								'FAF8EB',
							],
						},
						move: {
							speed: 5,
						},
						size: {
							value: {min: 400, max: 600},
						},
					},

					background: {
						color: '#FBFBFE',
					},
				},
			});
		};

		setupParticles();

		return () => {
			if (particlesContainerRef.current) {
				particlesContainerRef.current.innerHTML = '';
			}
		};
	}, []);

	return (
		<div>
			<div
				ref={particlesContainerRef}
				id='tsparticles'
				className='absolute inset-0'
				style={{filter: 'blur(20px)'}}></div>
		</div>
	);
};

export default ParticlesBackground;
