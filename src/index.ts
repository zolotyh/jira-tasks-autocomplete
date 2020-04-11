import {
  createConnection,
  DidChangeTextDocumentNotification,
  ProposedFeatures,
} from 'vscode-languageserver';
import { getTasks } from './getTasks';

const connection = createConnection(ProposedFeatures.all);

connection.onInitialized(() => {
  connection.client.register(DidChangeTextDocumentNotification.type);
});

connection.onInitialize(() => {
  return {
    capabilities: {
      completionProvider: {
        resolveProvider: true,
      },
    },
  };
});

connection.onCompletion(async () => {
  return await getTasks();
});

connection.listen();
