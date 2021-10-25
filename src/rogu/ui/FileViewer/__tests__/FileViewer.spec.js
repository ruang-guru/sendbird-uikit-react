import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import { FileViewerComponent as FileViewer } from "../index";
import { msg0, msg1 } from '../data.mock';

describe('FileViewer', () => {
  it('should display image', function () {
    const {
      sender,
      type,
      url,
      name: captionMsg = '',
      createdAt
    } = msg0;
    const { profileUrl, nickname: userName = '' } = sender;
    const component = shallow(
      <FileViewer
        profileUrl={profileUrl}
        userName={userName}
        type={type}
        url={url}
        captionMsg={captionMsg}
        onClose={() => { }}
        onDelete={() => { }}
        createdAt={createdAt}
      />
    );
    const img = component.find('.rogu-fileviewer__content__img');
    expect(img.length).toEqual(1);
    expect(img.prop('src')).toEqual(msg0.url);
  });

  it('should display video', function () {
    const {
      sender,
      type,
      url,
      name: captionMsg = '',
      createdAt
    } = msg1;
    const { profileUrl, nickname: userName = '' } = sender;
    const component = shallow(
      <FileViewer
        profileUrl={profileUrl}
        userName={userName}
        type={type}
        url={url}
        captionMsg={captionMsg}
        onClose={() => { }}
        onDelete={() => { }}
        createdAt={createdAt}
      />
    );
    const video = component.find('.rogu-fileviewer__content__video source');
    expect(video.length).toEqual(1);
    expect(video.prop('src')).toEqual(msg1.url);
  });

  it('should handle unsupported msg', function () {
    const unsupportedMsg = { sender: {} };
    const profileUrl = '';
    const userName = '';
    const {
      sender,
      type = '',
      url = '',
      name: captionMsg = '',
      createdAt = 0
    } = unsupportedMsg;
    const component = shallow(
      <FileViewer
        profileUrl={profileUrl}
        userName={userName}
        type={type}
        url={url}
        captionMsg={captionMsg}
        onClose={() => { }}
        onDelete={() => { }}
        createdAt={createdAt}
      />
    );
    const fallback = component.find('.rogu-fileviewer__content__unsupported');
    expect(fallback.length).toEqual(1);
    const headerActions = component.find('.rogu-fileviewer__header__right__actions');
    expect(headerActions.length).toEqual(0);
  });

  it('should do a snapshot test of the FileViewer DOM', function () {
    const {
      sender,
      type,
      url,
      name: captionMsg = '',
      createdAt
    } = msg0;
    const { profileUrl, nickname: userName = '' } = sender;
    const component = renderer.create(
      <FileViewer
        profileUrl={profileUrl}
        userName={userName}
        type={type}
        url={url}
        captionMsg={captionMsg}
        onClose={() => { }}
        onDelete={() => { }}
        createdAt={createdAt}
      />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
