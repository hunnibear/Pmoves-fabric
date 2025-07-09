
import { PatternCategory } from './types';

export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";
export const APP_TITLE = "Fabric Pattern Text Agent";

export const CATEGORY_COLORS: { [key in PatternCategory]: string } = {
  [PatternCategory.SUMMARIZATION]: "bg-blue-600 hover:bg-blue-700",
  [PatternCategory.TRANSFORMATION]: "bg-purple-600 hover:bg-purple-700",
  [PatternCategory.ANALYSIS]: "bg-green-600 hover:bg-green-700",
  [PatternCategory.EXTRACTION]: "bg-yellow-600 hover:bg-yellow-700 text-yellow-900",
  [PatternCategory.CREATION]: "bg-pink-600 hover:bg-pink-700",
  [PatternCategory.RESTRUCTURING]: "bg-teal-600 hover:bg-teal-700",
};

export const CATEGORY_TAG_COLORS: { [key in PatternCategory]: string } = {
  [PatternCategory.SUMMARIZATION]: "bg-blue-200 text-blue-800",
  [PatternCategory.TRANSFORMATION]: "bg-purple-200 text-purple-800",
  [PatternCategory.ANALYSIS]: "bg-green-200 text-green-800",
  [PatternCategory.EXTRACTION]: "bg-yellow-200 text-yellow-800",
  [PatternCategory.CREATION]: "bg-pink-200 text-pink-800",
  [PatternCategory.RESTRUCTURING]: "bg-teal-200 text-teal-800",
};