import { EasymovePage } from './app.po';

describe('easymove App', () => {
  let page: EasymovePage;

  beforeEach(() => {
    page = new EasymovePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
