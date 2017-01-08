import { BusAppPage } from './app.po';

describe('bus-app App', function() {
  let page: BusAppPage;

  beforeEach(() => {
    page = new BusAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
