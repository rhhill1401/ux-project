'use client';

const SVGOverlay = ({
	isVisible,
	onClose,
	isMobile,
	videoUrl,
}: {
	isVisible: boolean;
	onClose: () => void;
	isMobile: boolean;
	videoUrl?: string;
}) => {
	if (!isVisible) return null;

	console.log(`SVGOverlay isVisible: ${isVisible}, videoUrl: ${videoUrl}`); // Debug log\

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className={`fixed inset-0 z-50 flex justify-center items-center ${
				isMobile ? 'bg-opacity-75' : 'bg-opacity-50'
			}`}
			onClick={handleBackgroundClick}>
			<div className='  flex justify-center  sm:flex-none sm:block  p-8 mt-8 top-4 sm:absolute sm:top-52 sm:right-4 sm:mr-2 lg:mr-[200px] 2xl:mr-[400px] w-full h-full sm:max-w-md sm:max-h-md lg:max-w-lg lg:max-h-lg'>
				{videoUrl ? (
					<video
						src={videoUrl}
						controls
						autoPlay
						className=' w-6/6  h-6/6  sm:w-5/6 sm:h-6/6   object-cover rounded-3xl'
						style={{
							borderRadius: '1.5rem',
							backgroundColor: 'black',
						}} // Ensure video area has a background
					/>
				) : (
					<div>No video URL provided</div>
				)}

				{isMobile && (
					<button
						onClick={onClose}
						className='absolute top-2 right-4 w-8 h-8 bg-black text-white rounded-full flex justify-center items-center'>
						&times;
					</button>
				)}
			</div>
			<div className='mb-2'></div>
		</div>
	);
};

export default SVGOverlay;
