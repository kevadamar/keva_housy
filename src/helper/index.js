const formatPriceStringToInt = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (value.includes('.')) {
    return parseInt(value.split('.').join(''));
  }

  return isNaN(parseInt(value)) ? 0 : parseInt(value);
};

const formatNumberToIDR = (angka) => {
  if (typeof angka === 'number') angka = angka.toString();

  let number_string = angka.replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  return rupiah;
};

const saveToLocalStorage = ({ key, payload }) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

const getDataLocalStorage = ({ key }) => {
  return JSON.parse(localStorage.getItem(key));
};

const removeDataLocalStorage = ({ key }) => {
  localStorage.removeItem(key);
};

const changeFormatDate = (datetime) => {
  const date = datetime.toLocaleString('id-ID').split(' ')[0].split('/');

  const month = parseInt(date[1]) <= 9 ? '0' + date[1] : date[1];
  const day = parseInt(date[0]) <= 9 ? '0' + date[0] : date[0];
  const year = date[2];

  return `${month}-${day}-${year}`;
};

const countDiffrenceDays = (date1, date2) => {
  var Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  return Difference_In_Time / (1000 * 3600 * 24);
};

export {
  formatPriceStringToInt,
  formatNumberToIDR,
  saveToLocalStorage,
  getDataLocalStorage,
  removeDataLocalStorage,
  changeFormatDate,
  countDiffrenceDays,
};
