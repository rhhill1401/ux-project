'use client';

import React, {useState, useRef, useEffect, FormEvent} from 'react';
import Navigation from './Navigation';
import Image from 'next/image';
import {IoArrowUpCircle} from 'react-icons/io5';

const ChatInterface: React.FC = () => {
	const [messages, setMessages] = useState<{role: string; content: string}[]>(
		[]
	);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

	// Function to fetch the assistant's initial message
	const fetchInitialMessage = async () => {
		setMessages((prevMessages) => [
			...prevMessages,
			{role: 'assistant', content: ''}, // Add placeholder for assistant
		]);
		setIsLoading(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					messages: [],
					isFirstTimeUser: true, // Indicate it's the first time user
				}),
			});

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let done = false;
			let assistantMessage = '';

			while (!done) {
				const {value, done: readerDone} = await reader!.read();
				done = readerDone;

				assistantMessage += decoder.decode(value, {stream: true});

				// Update the assistant's message
				setMessages((prevMessages) => {
					const updatedMessages = [...prevMessages];
					updatedMessages[updatedMessages.length - 1] = {
						role: 'assistant',
						content: assistantMessage,
					};
					return updatedMessages;
				});
			}
		} finally {
			setIsLoading(false);
			setIsFirstTimeUser(false); // Set to false after initial message
		}
	};

	// Trigger the fetch when the component mounts
	useEffect(() => {
		if (messages.length === 0) {
			fetchInitialMessage();
		}
		// Scroll to bottom whenever messages update
		messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
	}, [messages]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!input.trim()) return;

		setMessages((prevMessages) => [
			...prevMessages,
			{role: 'user', content: input},
			{role: 'assistant', content: ''}, // Add placeholder for assistant
		]);
		setInput('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					messages: [...messages, {role: 'user', content: input}],
					isFirstTimeUser,
				}),
			});

			const reader = response.body?.getReader();
			const decoder = new TextDecoder();
			let done = false;
			let assistantMessage = '';

			while (!done) {
				const {value, done: readerDone} = await reader!.read();
				done = readerDone;

				assistantMessage += decoder.decode(value, {stream: true});

				setMessages((prevMessages) => {
					const updatedMessages = [...prevMessages];
					updatedMessages[updatedMessages.length - 1] = {
						role: 'assistant',
						content: assistantMessage,
					};
					return updatedMessages;
				});
			}
		} finally {
			setIsLoading(false);
			setIsFirstTimeUser(false);
		}
	};

	return (
		<div className='min-h-screen bg-primaryGray text-white flex flex-col'>
			<Navigation />
			<div className='flex-grow px-4  mt-28 sm:ml-16'>
				<h1 className='text-4xl font-bold sm:ml-28 font-helvetica mb-4'>
					Chat with Terry
				</h1>
				<div className='max-w-3xl mx-auto'>
					{isLoading && (
						<p className='text-center mt-2'>AI is thinking...</p>
					)}
					<div className='rounded-lg p-4 h-[60vh] overflow-y-auto mb-4'>
						{messages.map((message, index) => {
							if (!message.content.trim()) return null; // Skip rendering if content is empty
							return (
								<div
									key={index}
									className={`flex mb-4 ${
										message.role === 'user'
											? 'justify-end'
											: 'justify-start'
									}`}>
									{message.role === 'assistant' && (
										<div className='bg-primaryBlue rounded-full mr-4 w-10 h-10 overflow-hidden flex-shrink-0'>
											<Image
												src='https://res.cloudinary.com/djfcozdnf/image/upload/v1726685413/TerryForward_facing_aqnzs4.png'
												alt="Terry's AI"
												width={100}
												height={100}
												className='object-cover w-full h-full'
											/>
										</div>
									)}
									<div
										className={`inline-block p-2 rounded-lg mb-4 ${
											message.role === 'user'
												? 'bg-blue-500 text-white'
												: 'bg-lightGray text-black'
										}`}>
										<p>{message.content}</p>
									</div>
								</div>
							);
						})}

						<div ref={messagesEndRef} />
					</div>
					<form onSubmit={handleSubmit}>
						<div className='relative'>
							<input
								type='text'
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder='Type your message here...'
								className='w-full p-3 pr-12 rounded border bg-[#303134] text-white'
							/>
							{input.trim() !== '' && (
								<button
									type='submit'
									className='absolute right-2 top-1/2 transform -translate-y-1/2 text-ctaYellow hover:text-[#DAB708] transition-colors duration-200'>
									<IoArrowUpCircle size={30} />
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
