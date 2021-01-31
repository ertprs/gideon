import { Client, create, Message as iMessage } from '@open-wa/wa-automate';
import Message from './classes/Message';

const messageInstance = new Message();

const start = (client: Client) => {
  client.onMessage((message: iMessage) => {
    messageInstance.handler(client, message);
  });
};

const options = {
  sessionId: 'Gideon',
  useChrome: true,
  headless: true,
  cacheEnabled: false,
};

create(options).then(start);
