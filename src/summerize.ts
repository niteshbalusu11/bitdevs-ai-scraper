import getLinks from './get_links';
import { map } from 'async';
import path from 'path';
import { readdirSync } from 'fs';
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

  // Sort the files based on the date in their filenames
  newEventFiles.sort((a, b) => {
    // Extract the dates from the filenames
    const dateA = a.slice('new-event-'.length);
    const dateB = b.slice('new-event-'.length);

    // Compare the dates lexicographically
    return dateB.localeCompare(dateA);
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
