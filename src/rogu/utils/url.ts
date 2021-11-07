export const REGEX_URL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*?)/g;

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
