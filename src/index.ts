import * as dotenv from 'dotenv';

import { Configuration, OpenAIApi } from 'openai';
import { auto, map } from 'async';

import { summarize } from './summerize';
import writeSummary from './write_summary';

dotenv.config();

type Results = {
  text: string;
  title: string;
};

type Tasks = {
  initAi: {
    openai: OpenAIApi;
  };
  getSummary: {
    results: Results[];
    summaryPath: string;
  };
  summarize: Results;
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

      getSummary: [
        'initAi',
        async ({}) => {
          const { results, summaryPath } = await summarize({});

          return { results, summaryPath };
        },
      ],

      summarize: [
        'getSummary',
        'initAi',
        async ({ getSummary, initAi }) => {
          const aiResults = async (summary: Results) => {
            try {
              const chatCompletion = await initAi.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: `Summerize this for me: ${summary.text}` }],
              });
              const text = chatCompletion.data.choices[0].message?.content || 'No summary generated';
              return { text, title: summary.title };
            } catch (err: any) {
              console.error(`Summarization failed for ${summary.title} \n ${err.message}`);
            }
          };
          const results = (await map(getSummary.results, aiResults)).filter(
            (result): result is Results => result !== undefined
          );
          await writeSummary({ path: getSummary.summaryPath, data: results });
        },
      ],
    });
  } catch (err: any) {
    throw err.message;
  }
};

main();
