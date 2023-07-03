import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import 'isomorphic-fetch';
import { Readable, Writable } from 'stream';

const importDynamic = new Function('modulePath', 'return import(modulePath)');

const configuration = new Configuration({
  basePath: 'https://api.openai-asia.com/v1',
  apiKey: 'sk-rs2fJeuMOEgq41jlLmJ4tW9EjoxS9bprJZJdWVe48enxM8Y2',
});

@Injectable()
export class AppService {
  private openAi = new OpenAIApi(configuration);
  private chatGpt;
  constructor() {
    this.initGpt();
  }
  getHello(): string {
    return 'Hello World!';
  }

  async initGpt() {
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    const api = new ChatGPTAPI({
      apiKey: 'sk-rs2fJeuMOEgq41jlLmJ4tW9EjoxS9bprJZJdWVe48enxM8Y2',
      apiBaseUrl: 'https://api.openai-asia.com/v1',
      stream: true,
    });
    this.chatGpt = api;
    return api;
  }

  async getText(api, word, readstream: Readable) {
    const res = await api.sendMessage(word, {
      onProgress: (progress) => {
        if (progress.delta) {
          console.log(progress.delta);
        }
      },
    });

    // readstream.push(null)
  }

  async getGptText({
    word,
    conversationId="",
    parentMessageId="",
    callback
  }) {
    const res = await this.chatGpt.sendMessage(word, {
      conversationId: conversationId,
      parentMessageId: parentMessageId,
      onProgress: (progress) => {
        if (progress.delta) {
          // console.log(progress);
          callback(progress.delta)
          // callback(progress.delta)
        }
      },
    });
    console.log(res)

    return res ?? '';
  }
}
