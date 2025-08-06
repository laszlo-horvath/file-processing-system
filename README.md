# File Processing System Implementation
Technical Interview Assignment

## Overview
Create a file processing system with two main components:
1. An API server for file uploads and status monitoring
2. A background processor that automatically processes files in the inbox folder

## System Architecture
```
project-root/
  ├── data/
  │   ├── inbox/        (uploaded files go here)
  │   ├── processing/   (files being processed)
  │   ├── completed/    (successfully processed)
  │   └── failed/       (processing failed)
  └── src/
      ├── api/          (API server code)
      │   ├── server.ts
      │   └── routes.ts
      ├── processor/    (Background processor code)
      │   ├── worker.ts
      └── shared/       (Shared code)
          └── FileManager.ts
```

## Component 1: API Server
Handles external interactions through HTTP endpoints.

### Required Endpoints

1. **Upload File**
```bash
POST /api/upload
Content-Type: multipart/form-data
Body:
  - file: (text file)
```

Response:
```JavaScript
{
  "message": "File uploaded successfully",
  "filename": "example.txt",
  "size": 1234
}
```

2. **Get System Status**
```bash
GET /api/status
```

Response:

```JavaScript
{
  "inbox": number,        // Files in inbox
  "processing": number,   // Files being processed
  "completed": number,    // Files completed
  "failed": number        // Files failed
}
```

3. **Get Processing Reports**
```bash
GET /api/reports
```

Response:
```TypeScript
{
  "reports": ProcessingReport[]
}
```

## Component 2: Background Processor
Runs continuously to process files in the inbox folder.

### Requirements
1. Periodically check inbox folder (e.g., every 30 seconds)
2. Process one file at a time
3. Move files through folders based on status
4. Generate processing reports
5. Handle errors appropriately

### Processing Steps for Each File
1. Move file from `inbox` to `processing` folder
2. Read and process file content:
   - Count lines, words, characters
   - Convert to uppercase
   - Add timestamp
3. Save processed file to `completed` folder
4. Generate processing report
5. If any error occurs, move file to `failed` folder

## Shared Components

### FileManager Class
```typescript
class FileManager {
  constructor(rootPath: string);

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
```

### ProcessingReport Interface
```typescript
interface ProcessingReport {
  filename: string;
  timestamp: string;
  statistics: {
    lines: number;
    words: number;
    characters: number;
  };
  processingTime: number;
}
```

## Getting Started

1. Initialize project:
```bash
mkdir file-processor
cd file-processor
npm init -y
```

2. Install dependencies:
```bash
npm install express multer typescript ts-node @types/node @types/express @types/multer
```

3. Running the System:

Start API Server:
```bash
npm run start:api
```

Start Background Processor:
```bash
npm run start:processor
```

## Evaluation Criteria

1. **Architecture (30%)**
   - Clean separation of components
   - Proper file management
   - Error handling
   - Logging

2. **API Implementation (35%)**
   - Proper file upload handling
   - Status reporting
   - Error handling
   - Input validation

3. **Background Processor (35%)**
   - Reliable file processing
   - Proper queuing (one file at a time)
   - Error recovery
   - Report generation

## Tips
- Start with the FileManager class
- Test file operations thoroughly
- Handle edge cases (empty files, large files)
- Add detailed logging
- Consider using PM2 or similar for process management

## Time Expectation
- Expected completion time: 2 hours
- Focus on core functionality first
- Add error handling and logging after basics work

## Example File Upload Usage

You can test file upload using curl with the included test file:
```bash
curl -F "file=@test.txt" http://localhost:3000/api/upload
```

Or with any other text file:
```bash
curl -F "file=@example.txt" http://localhost:3000/api/upload
```

Or using a simple HTML form:
```html
<form action="/api/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" accept=".txt">
  <input type="submit" value="Upload">
</form>
```
