import { Logger } from '@nestjs/common';
import 'dotenv/config';

const getEnv = (name: string): string => {
  const value = process.env[name];

  if (value === undefined) {
    const err = `${name} 환경변수가 정의되지 않았습니다`;
    Logger.error(err, 'getEnv');
    throw new Error(err);
  }

  return value;
};

export default {
  APP: {
    PORT: parseInt(getEnv('PORT')),
  },
};
