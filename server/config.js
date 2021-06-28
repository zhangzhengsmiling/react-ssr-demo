import path from 'path';

export const CONFIG_SERVER_KEY = 'SERVER_SIDE';
export const CONFIG_CLIENT_KEY = 'CLIENT_SIDE';

const config = {
  [CONFIG_SERVER_KEY]:  {
    PORT: 3000,
  },
  [CONFIG_CLIENT_KEY]: {
    PORT: 3001,
  },
  templatePath: path.resolve(__dirname, '../template/index.html'),
}

export default config;
