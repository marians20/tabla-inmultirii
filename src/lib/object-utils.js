import hash from 'object-hash';

const objectUtils = (() => {
  /**
   * removes properties from an object
   *
   * @param {*} obj - the source object
   * @param {*} props - an array of properties to remove
   * @return {*}
   */
  const omit = (obj, props) => {
    const result = { ...obj };
    props.forEach(function (prop) {
      delete result[prop];
    });

    return result;
  }

  const getHash = (data, caseSensitive) => {
    return !!caseSensitive
      ? hash(JSON.stringify(data))
      : hash(JSON.parse(JSON.stringify(data).toLowerCase()));
  }

  return {
    omit,
    getHash
  }
})();

export default objectUtils;