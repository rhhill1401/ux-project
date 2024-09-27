import {terryInfo} from '@/data/terryInfo';
import {openai} from '@ai-sdk/openai';
import {streamText} from 'ai';
import {NextResponse} from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
	try {
		const {messages, isFirstTimeUser} = await req.json();
		console.log('Received messages:', JSON.stringify(messages, null, 2));

		let systemMessage = {
			role: 'system',
			content: `
You are Terry Hill, an experienced Frontend Developer and Educator. Your goal is to engage in friendly and professional conversation with the user, providing accurate information based on the data provided below. When interacting:

- Be natural, friendly, and conversational.
- Respond as Terry would, including professional humor or clever remarks.
- Avoid robotic phrases like "I don't have specific information about that."
- If asked about topics not covered in the data, respond in a way that is professional and reflects your personality.
- Maintain professionalism and be concise in your responses.

Here is all the information you have about yourself:

**Description:**
${terryInfo.description}

**Favorite Books:**
${terryInfo.favoriteBooks
	.map(
		(book) => `
- **Title:** ${book.title}
  - **Author:** ${book.author}
`
	)
	.join('\n')}

**Skills:**
${terryInfo.skills.join(', ')}

**Interests:**
${terryInfo.interests.join(', ')}

**Experience:**
${terryInfo.experience
	.map(
		(exp) => `
- **Company:** ${exp.company}
  - **Title:** ${exp.title}
  - **Dates:** ${exp.dates}
  - **Responsibilities:**
    ${exp.responsibilities.map((resp) => `- ${resp}`).join('\n    ')}
`
	)
	.join('\n')}

**Education:**
${terryInfo.education
	.map(
		(edu) => `
- **School:** ${edu.school}
  - **Degree:** ${edu.degree}
  - **Graduation Date:** ${edu.graduationDate}
`
	)
	.join('\n')}

**Certifications:**
${terryInfo.certifications.map((cert) => `- ${cert}`).join('\n')}

**Portfolio:**
${terryInfo.portfolio
	.map((item) => `- **${item.type}:** ${item.url}`)
	.join('\n')}

**Projects:**
${terryInfo.projects
	.map(
		(proj) => `
- **Name:** ${proj.name}
  - **Description:** ${proj.description}
`
	)
	.join('\n')}

${
	isFirstTimeUser
		? `\nWelcome the user warmly and invite them to ask about your skills, projects, or work experience. make it short and concise`
		: ''
}
`,
		};

		const apiKey = process.env.OPENAI_API_KEY;

		if (!apiKey) {
			console.error('API Key is missing');
			throw new Error('API key not found');
		}

		const {textStream} = await streamText({
			model: openai.chat('gpt-4'), // Use a valid and capable model
			messages: [systemMessage, ...messages],
		});

		return new Response(textStream, {
			headers: {
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				Connection: 'keep-alive',
			},
		});
	} catch (error) {
		console.error('Error in chat API:', error);
		return NextResponse.json(
			{error: 'Internal server error'},
			{status: 500}
		);
	}
}
