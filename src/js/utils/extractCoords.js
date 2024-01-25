/* eslint-disable no-useless-escape */
const extractCoords = (str) => {
  let res;
  const banList = str.replace(/[\d\.,\[\]\- ]+/g, '');
  if (banList) {
    res = { error: 'Будь умницей, используй только цифры, запятую и точку' };
    return res;
  }
  const coords = str.replace(/[\[\] ]+/g, '').split(',');
  if (coords.length !== 2) {
    res = { error: 'Укажи широту и долгату' };
    return res;
  }

  res = {
    latitude: coords[0],
    longitude: coords[1],
  };

  return res;
};

export default extractCoords;
