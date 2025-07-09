
export enum PatternCategory {
  SUMMARIZATION = "Summarization",
  TRANSFORMATION = "Transformation",
  ANALYSIS = "Analysis",
  EXTRACTION = "Extraction",
  CREATION = "Content Creation",
  RESTRUCTURING = "Restructuring",
}

export interface PatternVariable {
  name: string; // e.g., "length", "tone"
  description: string; // e.g., "Desired length of the summary (short, medium, long)"
  defaultValue?: string;
  // type?: 'string' | 'number' | 'boolean'; // Future: for typed inputs
}

export interface FabricPattern {
  id: string;
  name: string;
  description: string;
  category: PatternCategory;
  instructionPrefix: string;
  variables?: PatternVariable[];
  example?: string;
}