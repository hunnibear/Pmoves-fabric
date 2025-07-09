
import { FabricPattern, PatternCategory } from '../types';

export const ALL_PATTERNS: FabricPattern[] = [
  {
    id: 'summarize-concise',
    name: 'Concise Summary',
    description: 'Generates a brief summary of the input text, focusing on key points.',
    category: PatternCategory.SUMMARIZATION,
    instructionPrefix: 'Provide a concise summary of the following text, highlighting only the most critical information:',
    example: 'Input: A long article about climate change. Output: A 2-3 sentence summary of its main arguments.'
  },
  {
    id: 'summarize-custom',
    name: 'Customizable Summary',
    description: 'Generates a summary with adjustable length and focus.',
    category: PatternCategory.SUMMARIZATION,
    instructionPrefix: 'Provide a {{length}} summary of the following text. If a focus topic is provided, emphasize {{focus_topic}} in the summary:',
    variables: [
      { name: 'length', description: 'Desired summary length (e.g., "brief", "detailed", "one-sentence")', defaultValue: 'brief' },
      { name: 'focus_topic', description: 'Optional: A specific topic/aspect to emphasize.', defaultValue: 'all key aspects' }
    ],
    example: 'Summarize a report with length="detailed" and focus_topic="financial performance".'
  },
  {
    id: 'eli5',
    name: 'Explain Like I\'m 5',
    description: 'Simplifies complex topics into language a five-year-old can understand.',
    category: PatternCategory.TRANSFORMATION,
    instructionPrefix: 'Explain the following text as if you were talking to a five-year-old child:',
    example: 'Input: Quantum physics explanation. Output: "Imagine tiny balls that can be in many places at once..."'
  },
  {
    id: 'extract-keywords',
    name: 'Extract Keywords',
    description: 'Identifies and lists the main keywords or key phrases from the text.',
    category: PatternCategory.EXTRACTION,
    instructionPrefix: 'Extract the top {{count}} most important keywords or key phrases from the following text. List them clearly:',
    variables: [
      { name: 'count', description: 'Number of keywords to extract.', defaultValue: '5' }
    ],
    example: 'Input: An article about renewable energy. Output (count=3): Keywords: solar power, wind turbines, sustainability.'
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    description: 'Analyzes the emotional tone (positive, negative, neutral) of the text.',
    category: PatternCategory.ANALYSIS,
    instructionPrefix: 'Analyze the overall sentiment of the following text. Indicate whether it is primarily positive, negative, or neutral, and provide a brief justification for your analysis:',
    example: 'Input: A customer review. Output: Sentiment: Positive. Justification: The customer expresses satisfaction...'
  },
  {
    id: 'bullet-points',
    name: 'Key Ideas to Bullets',
    description: 'Converts the main ideas of the text into a bulleted list for easy reading.',
    category: PatternCategory.RESTRUCTURING,
    instructionPrefix: 'Transform the main ideas of the following text into a concise bulleted list:',
    example: 'Input: A paragraph describing a project. Output: A list of bullet points summarizing project goals and features.'
  },
  {
    id: 'pros-cons',
    name: 'Identify Pros & Cons',
    description: 'Extracts arguments for (pros) and against (cons) a topic discussed in the text.',
    category: PatternCategory.ANALYSIS,
    instructionPrefix: 'Based on the following text, identify and list the main pros (advantages) and cons (disadvantages) discussed. Structure your answer clearly with "Pros:" and "Cons:" headings:',
    example: 'Input: An article comparing two products. Output: Pros: [Feature A], [Benefit B]. Cons: [Drawback C], [Limitation D].'
  },
  {
    id: 'formal-tone',
    name: 'Formal Tone Rewrite',
    description: 'Rewrites the text in a more formal, professional, or academic style.',
    category: PatternCategory.TRANSFORMATION,
    instructionPrefix: 'Rewrite the following text using a more formal and professional tone:',
    example: 'Input: "Hey guys, this stuff is cool!" Output: "Esteemed colleagues, the presented material exhibits notable characteristics."'
  },
  {
    id: 'casual-tone',
    name: 'Casual Tone Rewrite',
    description: 'Rewrites the text in a more relaxed, informal, or conversational style.',
    category: PatternCategory.TRANSFORMATION,
    instructionPrefix: 'Rewrite the following text in a more casual and {{intensity}} conversational tone:',
    variables: [
      { name: 'intensity', description: 'Degree of casualness (e.g., "slightly", "very")', defaultValue: 'moderately' }
    ],
    example: 'Input: "The aforementioned subject matter warrants further investigation." Output (intensity=very): "So, about that thing, wanna check it out more?"'
  },
  {
    id: 'generate-questions',
    name: 'Generate Questions',
    description: 'Creates relevant questions based on the content of the provided text.',
    category: PatternCategory.CREATION,
    instructionPrefix: 'Based on the following text, generate {{num_questions}} insightful questions that could be asked about its content:',
    variables: [
      {name: 'num_questions', description: 'Number of questions to generate.', defaultValue: '3'}
    ],
    example: 'Input: An article about historical events. Output (num_questions=2): Q1..., Q2...'
  },
  {
    id: 'extract-entities',
    name: 'Extract Entities',
    description: 'Identifies and extracts named entities (people, organizations, locations) from text.',
    category: PatternCategory.EXTRACTION,
    instructionPrefix: 'Extract all named entities (such as people, organizations, locations, dates, and products) from the following text. List them under appropriate headings:',
    example: 'Input: "John Smith from Acme Corp visited Paris on July 4th, 2023." Output: People: John Smith. Organizations: Acme Corp. Locations: Paris. Dates: July 4th, 2023.'
  }
];