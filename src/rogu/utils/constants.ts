export const META_ARRAY_VALUE_MAX_CHAR = 128;
export const REPLIED_MESSAGE_MAX_CHAR = 200;
export const REPLIED_MESSAGE_QUOTE_FORMAT = '>';

export const REGEX_LINE_BREAK = /\r?\n|\r/g;

// Note: Source thread: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
// Note: Source demo: https://regexr.com/3e6m0
export const REGEX_URL = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+~#?&//=]*)/g;
// export const REGEX_URL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*?)/g;
