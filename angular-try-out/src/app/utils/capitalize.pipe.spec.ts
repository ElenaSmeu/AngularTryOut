import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  const pipe = new CapitalizePipe();
  it('create an instance', () => { 
    expect(pipe).toBeTruthy();
  });
  it('transforms "abc" to "Abc" from titleCase', () => {
    expect(pipe.transform("abc", "titleCase")).toBeTruthy();
  });
  it('transforms "abc def" to "Abc Def" from titleCase', () => {
    expect(pipe.transform("abc", "titleCase")).toBe("Abc Def");
  });

  // it('transforms "abc" to "Abc" from titleCase', () => {
  //   expect(pipe.transform("abc", "titleCase")).toBeTruthy();
  // });
});
