import { config } from 'dotenv';
import { IsUrl, IsDefined } from 'class-validator';
import * as path from 'path';
import { transformAndValidateSync } from 'class-transformer-validator';
import log from 'loglevel';

config({ path: path.join(process.cwd(), '.env') });

class Config {
  @IsUrl()
  JIRA_URL!: string;

  @IsDefined()
  JIRA_USERNAME!: string;

  @IsDefined()
  JIRA_PASSWORD!: string;

  @IsDefined()
  JQL!: string;
}

export const getConfig = (): Config => {
  try {
    return transformAndValidateSync<Config>(Config, process.env);
  } catch (e) {
    if (Array.isArray(e)) {
      e.map((error) => error.toString()).forEach(log.error);
    }
    throw new Error('Bad config');
  }
};
