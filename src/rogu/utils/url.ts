import { REGEX_URL } from './constants';

const K = '[[SPLIT_KEYWORD]]';
export const extractUrls = (
  text: string
): { urls: string[]; sentences: string[] } => {
  // Array of extracted urls
  const urls = text.match(REGEX_URL) || [];

  // Array of splitted sentences without any url
  const sentences = text.replace(REGEX_URL, K).split(K) || [];

  return { urls, sentences };
};
