import { each, map } from 'async';
import { readdirSync, statSync } from 'fs';

import getLinks from './get_links';
import path from 'path';
import scrape from './scrape';

type Link = {
  full: string;
  title: string;
  link: string;
};

export const summarize = async ({}) => {
  const eventsDir = path.join(__dirname, '../', 'events');

  const files = readdirSync(eventsDir);

  const newEventFiles = files.filter(file => file.startsWith('new-event') && file.endsWith('.md'));

  if (!newEventFiles.length) {
    throw new Error('No event files found');
  }

  newEventFiles.sort((a, b) => {
    return statSync(path.join(eventsDir, b)).mtime.getTime() - statSync(path.join(eventsDir, a)).mtime.getTime();
  });

  const mostRecentEvent = newEventFiles[0];

  const eventPath = path.join(eventsDir, mostRecentEvent);

  console.log(eventPath);

  console.log(mostRecentEvent);

  const summaryPath = path.join(__dirname, '../', 'summaries', mostRecentEvent.replace('new-event', 'summary'));

  console.log(summaryPath);

  const links = await getLinks({
    path: eventPath,
  });

  const results = await map(links, scrapeFiles);

  return { results, summaryPath };
};

const scrapeFiles = async (link: Link) => {
  const { text } = await scrape({ url: link.link });

  return { text, title: link.title };
};
