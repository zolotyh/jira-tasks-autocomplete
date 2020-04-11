require('dotenv').config();
import got from 'got';
import { CompletionItem } from 'vscode-languageserver';
import { getConfig } from './getConfig';
import log from 'loglevel';

type Issue = { key: string; fields: { summary: string } };
type Issues = {
  issues: Issue[];
};

const config = getConfig();

let cache: CompletionItem[];

const getRawTaskList = async (): Promise<Issues> => {
  return got
    .get(`${config.JIRA_URL}${config.JQL}`, {
      username: config.JIRA_USERNAME,
      password: config.JIRA_PASSWORD,
    })
    .json<Issues>();
};

const fromRawIssueToCompleteItem = (item: Issue): CompletionItem => {
  return {
    label: `${item?.fields?.summary?.substring(0, 60)} [${item.key}]`,
    insertText: `feat: close ${item.key} (${item?.fields?.summary})`,
  };
};

export const getTasks = async (): Promise<CompletionItem[]> => {
  if (cache) {
    log.info('get tasks from cache');
    return cache;
  }
  log.info('start gettings the tasks');

  try {
    const tasks = (await getRawTaskList()).issues.map(
      fromRawIssueToCompleteItem,
    );
    log.info('tasks are successfully loaded');
    return tasks;
  } catch (e) {
    log.error('error on gettings task');
    throw e;
  }
};
