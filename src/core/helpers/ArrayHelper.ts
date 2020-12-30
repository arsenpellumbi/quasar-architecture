/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
class ArrayHelper {
  public convertArrayToObject = (array: any[], key: string, value: string): any[] => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item[value]
      };
    }, initialValue);
  };
}

export default new ArrayHelper();
