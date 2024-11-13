interface FileManager {
  // constructor(rootPath: string);

  // Folder management
  initialize(): Promise<void>;
  getInboxFiles(): Promise<string[]>;
  moveFile(filename: string, fromFolder: string, toFolder: string): Promise<void>;

  // File operations
  readTextFile(folder: string, filename: string): Promise<string>;
  writeTextFile(folder: string, filename: string, content: string): Promise<void>;

  // Status
  getFolderCounts(): Promise<{
    inbox: number;
    processing: number;
    completed: number;
    failed: number;
  }>;
}
