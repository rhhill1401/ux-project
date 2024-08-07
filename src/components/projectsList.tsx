'use client';

import React from 'react';
import {portfolios} from '../data/portfolios';

interface ProjectListProps {
	handleLinkClick: (videoUrl?: string) => void; // Pass video URL on link click
	hoveredIndex: number | null; // Receive hovered index
}

const ProjectList = React.forwardRef<HTMLDivElement, ProjectListProps>(
	({handleLinkClick, hoveredIndex}, ref) => {
		return (
			<div ref={ref} className='w-full flex flex-col gap-7'>
				{portfolios.map((item, index) => (
					<div
						key={index}
						className={`flex justify-between p-4 transition-shadow duration-300 cursor-pointer ${
							hoveredIndex === index
								? 'bg-white bg-opacity-50 shadow-lg rounded-3xl'
								: 'hover:bg-white hover:bg-opacity-50 hover:shadow-lg hover:rounded-3xl'
						}`}
						onClick={() => {
							console.log(
								`Item clicked: ${item.title}, Video URL: ${item.videoUrl}`
							); // Debug log
							handleLinkClick(item.videoUrl);
						}}>
						<h3 className='font-medium text-black font-sans'>
							{item.title}
						</h3>
						<span className='text-links font-sans'>
							{item.year}
						</span>
					</div>
				))}
			</div>
		);
	}
);

ProjectList.displayName = 'ProjectList';

export default ProjectList;
