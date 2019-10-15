import { NewprodPage } from './app.po';

describe('newprod App', () => {
  let page: NewprodPage;

  beforeEach(() => {
    page = new NewprodPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
