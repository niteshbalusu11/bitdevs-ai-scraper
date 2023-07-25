import { writeFileSync } from 'fs';

type Args = {
  path: string;
  data: string;
};

const writeSummary = async ({ path, data }: Args) => {
  try {
    writeFileSync(path, data);
  } catch (err) {
    throw err;
  }
};

export default writeSummary;
