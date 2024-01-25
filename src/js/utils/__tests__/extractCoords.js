import extractCoords from '../extractCoords';

test.each([
  ['51.50851, -0.12572', { latitude: '51.50851', longitude: '-0.12572' }],
  ['51.50851,-0.12572', { latitude: '51.50851', longitude: '-0.12572' }],
  ['[51.50851, -0.12572]', { latitude: '51.50851', longitude: '-0.12572' }],
  ['', { error: 'Укажи широту и долгату' }],
  ['[51.50851]', { error: 'Укажи широту и долгату' }],
  ['[51.50851, -0.12572asdq]', { error: 'Будь умницей, используй только цифры, запятую и точку' }],
])('test extracting coords from %s', (str, expected) => {
  const res = extractCoords(str);

  expect(res).toEqual(expected);
});
