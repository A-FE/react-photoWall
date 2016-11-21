'use strict';

describe('ReactPhotoWallApp', () => {
  let React = require('react/addons');
  let ReactPhotoWallApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactPhotoWallApp = require('components/ReactPhotoWallApp.js');
    component = React.createElement(ReactPhotoWallApp);
  });

  it('should create a new instance of ReactPhotoWallApp', () => {
    expect(component).toBeDefined();
  });
});
