import { extractUrls } from './url';

describe('utils/url', () => {
  it('should return all urls within a text', () => {
    const { urls, sentences } = extractUrls(
      'Hi, my Name is Kukuh! Visit me on aa.com, https://bb.com/suliskh, http://cc.com/suliskh, or www.dd.com! Also, I have another website: https://www.ee.com.'
    );

    expect(urls.length).toEqual(5);
  });
});
