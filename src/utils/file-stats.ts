import fs from 'node:fs/promises';

export interface FileStatistics {
  lines: number;
  words: number;
  characters: number;
}

export async function getFileStats(filePath: string): Promise<FileStatistics> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');

    const lines = content.split('\n').length;
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    const characters = content.length;

    return {
      lines,
      words,
      characters
    };
  } catch (error) {
    throw new Error(`Failed to read file stats for ${filePath}: ${error}`);
  }
}