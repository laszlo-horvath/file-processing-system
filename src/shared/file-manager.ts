import { config } from './config';

export class FileManager {
  private dataFolderPath: string;

  constructor(dataFolderPath?: string) {
    this.dataFolderPath = dataFolderPath || config.dataFolderPath;
  }
}