import axios from 'axios';
import { load } from 'cheerio';

type Args = {
  url: string;
};

type Return = {
  text: string;
};
const scrape = async ({ url }: Args): Promise<Return> => {
  try {
    // Make an HTTP GET request to the URL
    const response = await axios.get(url);
    const html = response.data;

    // Use cheerio to parse the HTML and extract text content
    const $ = load(html);

    const title = $('title').text();
    console.log(title);

    const paragraphs = $('p')
      .map((index, element) => $(element).text())
      .get()
      .join('\n');

    const preTags = $('pre')
      .map((index, element) => $(element).text())
      .get()
      .join('\n');

    const scrapedText = [title, paragraphs, preTags].join('\n\n');

    return { text: scrapedText };
  } catch (error: any) {
    console.error('Error occurred during scraping:', error.message);
    return { text: '' };
  }
};

export default scrape;
