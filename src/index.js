import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

import { TEMP_UPLOAD_DIR, PUBLIC_DIR } from './constans/uploadFiles.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(PUBLIC_DIR);
  setupServer();
};

bootstrap();
