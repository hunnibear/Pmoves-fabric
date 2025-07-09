
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { FabricPattern } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" }); // Fallback to prevent crash if API_KEY is undefined

export const generateTextWithPatterns = async (
  userInput: string,
  patterns: FabricPattern[],
  patternVariableValues: Record<string, string>
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable.");
  }

  if (patterns.length === 0) {
    // If no patterns, just return user input or an empty string, or process with a default behavior.
    // For now, let's assume a default instruction if no patterns are selected but text is submitted.
    // Or, this case might be handled by disabling submit if no patterns are selected.
    // Based on current App.tsx, submit is disabled if patterns.length === 0.
    // So, this path shouldn't be hit if UI logic is correct.
     return "No patterns selected to apply.";
  }

  const processedPatternInstructions = patterns.map(pattern => {
    let instruction = pattern.instructionPrefix;
    if (pattern.variables) {
      for (const variable of pattern.variables) {
        // Regex to safely replace placeholders like {{variable_name}}
        const placeholderRegex = new RegExp(`\\{\\{\\s*${variable.name}\\s*\\}\\}`, 'g');
        const key = `${pattern.id}_${variable.name}`;
        // Use provided value, then default value from pattern definition, then empty string if neither
        const value = patternVariableValues[key] !== undefined ? patternVariableValues[key] : (variable.defaultValue !== undefined ? variable.defaultValue : '');
        instruction = instruction.replace(placeholderRegex, value);
      }
    }
    return instruction.trim();
  }).filter(instr => instr.length > 0);

  let combinedInstructions = processedPatternInstructions.join('\n');

  if (combinedInstructions.length > 0) {
    combinedInstructions += '\n\n---BEGIN TEXT TO PROCESS---\n';
  }
  
  const fullPrompt = `${combinedInstructions}${userInput}\n---END TEXT TO PROCESS---`;

  console.log("Sending prompt to Gemini:", fullPrompt);
  console.log("With variable values:", patternVariableValues);


  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: fullPrompt,
    });
    
    const text = response.text;
    if (typeof text !== 'string') {
        console.error("Unexpected Gemini API response format. Expected text property.", response);
        throw new Error("Received an unexpected response format from the AI. Text content is missing.");
    }
    return text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the Gemini API.");
  }
};