import { FirebaseTestPage } from './app.po';

describe('firebase-test App', () => {
  let page: FirebaseTestPage;

  beforeEach(() => {
    page = new FirebaseTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
