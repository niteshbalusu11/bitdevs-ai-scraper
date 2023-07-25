import { readdirSync, statSync } from 'fs';

import getLinks from './get_links';
import path from 'path';
import scrape from './scrape';

/*
  1. Ingest a markdown file and extract each link.
  2. For each link, read each webpage and summarize it.
  3. Create sumaries at multiple skill levels for each link ("Detailed", "ELI5")
  4. Create a new markdown file with the summaries.
*/
const NYC_BITDEVS = 'https://github.com/BitDevsNYC/BitDevsNYC.github.io';

/**
 * Ingest a markdown file and extract each link.
 */

export const summarize = async ({}) => {
  const eventsDir = path.join(__dirname, '../', 'events');

  const files = readdirSync(eventsDir);

  const newEventFiles = files.filter(file => file.startsWith('new-event') && file.endsWith('.md'));

  console.log(newEventFiles);

  if (!newEventFiles.length) {
    throw new Error('No event files found');
  }

  newEventFiles.sort((a, b) => {
    return statSync(path.join(eventsDir, b)).mtime.getTime() - statSync(path.join(eventsDir, a)).mtime.getTime();
  });

  const mostRecentEvent = newEventFiles[0];

  const eventPath = path.join(eventsDir, mostRecentEvent);

  const summaryPath = path.join(__dirname, '../', 'summaries', mostRecentEvent.replace('new-event', 'summary'));

  console.log(summaryPath);

  const links = await getLinks({
    path: eventPath,
  });

  const { text } = await scrape({ url: links[0].link });

  return { text, summaryPath };
};
