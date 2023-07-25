import { writeFileSync } from 'fs';

type Args = {
  path: string;
  data: Results;
};

type Results = {
  text: string;
  title: string;
}[];

const writeSummary = async ({ path, data }: Args) => {
  try {
    const writeData = data.map(n => {
      return [`\n## ${n.title}`, '\n', n.text].join('\n');
    });

    writeFileSync(path, writeData.join('\n'));
  } catch (err) {
    throw err;
  }
};

export default writeSummary;
