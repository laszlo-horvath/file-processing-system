import express from 'express';
import multer from 'multer';
import { FileManager } from '../shared/file-manager';

const app = express();
const fileManager = new FileManager('./data');

// TODO: Implement API endpoints...
console.log('Server API is running...');