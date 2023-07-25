import * as dotenv from 'dotenv';

import { Configuration, OpenAIApi } from 'openai';

import { auto } from 'async';
import { summarize } from './summerize';
import writeSummary from './write_summary';

dotenv.config();

type Tasks = {
  initAi: {
    openai: OpenAIApi;
  };
  test: any;
};

const main = async () => {
  try {
    return await auto<Tasks>({
      initAi: async () => {
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        return { openai };
      },

      test: [
        'initAi',
        async ({ initAi }) => {
          const { text, summaryPath } = await summarize({});

          await writeSummary({ path: summaryPath, data: text });
          // const { openai } = initAi;
          // const response = await openai.createCompletion({
          //   model: 'text-davinci-003',
          //   prompt: 'what is 2 + 2',
          //   max_tokens: 7,
          //   temperature: 0,
          // });
          // console.log(response.data);
        },
      ],
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

main();
