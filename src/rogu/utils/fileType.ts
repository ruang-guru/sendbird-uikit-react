type RoguFileTypes = {
  IMAGE: 'IMAGE';
  VIDEO: 'VIDEO';
  PDF: 'PDF';
  WORD: 'WORD';
  EXCEL: 'EXCEL';
  POWERPOINT: 'POWERPOINT';
  OTHERS: 'OTHERS';
};

// TODO: consider to use enum instead
export const RoguFileTypes: RoguFileTypes = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  PDF: 'PDF',
  WORD: 'WORD',
  EXCEL: 'EXCEL',
  POWERPOINT: 'POWERPOINT',
  OTHERS: 'OTHERS',
};

export type MimeData = {
  mimeType: string;
  extension: string;
};

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
export const SUPPORTED_MIMES: { [k: string]: Array<MimeData> } = {
  IMAGE: [
    { mimeType: 'image/jpeg', extension: 'JPEG' },
    { mimeType: 'image/jpg', extension: 'JPG' },
    { mimeType: 'image/png', extension: 'PNG' },
    { mimeType: 'image/gif', extension: 'GIF' },
  ],
  VIDEO: [
    { mimeType: 'video/mp4', extension: 'MP4' },
    { mimeType: 'video/quicktime', extension: 'MOV' },
  ],
  PDF: [{ mimeType: 'application/pdf', extension: 'PDF' }],
  WORD: [
    { mimeType: 'application/msword', extension: 'DOC' },
    {
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: 'DOCX',
    },
  ],
  EXCEL: [
    { mimeType: 'application/vnd.ms-excel', extension: 'XLS' },
    {
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      extension: 'XLSX',
    },
  ],
  POWERPOINT: [
    { mimeType: 'application/vnd.ms-powerpoint', extension: 'PPT' },
    {
      mimeType:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      extension: 'PPTX',
    },
  ],
};

export const isImage = (mimeType: string): boolean =>
  SUPPORTED_MIMES.IMAGE.some((mime) => mime.mimeType === mimeType);
export const isVideo = (mimeType: string): boolean =>
  SUPPORTED_MIMES.VIDEO.some((mime) => mime.mimeType === mimeType);
export const isPDF = (mimeType: string): boolean =>
  SUPPORTED_MIMES.PDF.some((mime) => mime.mimeType === mimeType);
export const isWord = (mimeType: string): boolean =>
  SUPPORTED_MIMES.WORD.some((mime) => mime.mimeType === mimeType);
export const isPPT = (mimeType: string): boolean =>
  SUPPORTED_MIMES.POWERPOINT.some((mime) => mime.mimeType === mimeType);
export const isExcel = (mimeType: string): boolean =>
  SUPPORTED_MIMES.EXCEL.some((mime) => mime.mimeType === mimeType);

export const isSupportedFileView = (mimeType: string): boolean =>
  isImage(mimeType) || isVideo(mimeType);

export const getFileType = (mimeType: string): string => {
  if (isImage(mimeType)) return RoguFileTypes.IMAGE;
  if (isVideo(mimeType)) return RoguFileTypes.VIDEO;
  if (isPDF(mimeType)) return RoguFileTypes.PDF;
  if (isWord(mimeType)) return RoguFileTypes.WORD;
  if (isPPT(mimeType)) return RoguFileTypes.POWERPOINT;
  if (isExcel(mimeType)) return RoguFileTypes.EXCEL;
  return RoguFileTypes.OTHERS;
};

export const getMimeExtension = (mimeType: string): string | undefined => {
  for (const mimes of Object.values(SUPPORTED_MIMES)) {
    const mimeFound = mimes.find((mime) => mime.mimeType === mimeType);

    if (mimeFound) {
      return mimeFound.extension;
    }
  }
};

export const getMimeTypesString = (): string => {
  const mimeTypes = [];

  for (const mimes of Object.values(SUPPORTED_MIMES)) {
    mimes.forEach((mime) => mimeTypes.push(mime.mimeType));
  }

  return mimeTypes.join(',');
};
