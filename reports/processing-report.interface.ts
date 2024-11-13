export interface ProcessingReport {
  filename: string;
  timestamp: string;
  statistics: {
    lines: number;
    words: number;
    characters: number;
  };
  processingTime: number;
}
