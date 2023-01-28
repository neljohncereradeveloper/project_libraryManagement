import { BigNumber } from "bignumber.js";

BigNumber.set({ DECIMAL_PLACES: 2 });
/**
 * Controller update user
 *
 * @returns `Promise`
 */
const testCalculatePrice = async () => {
  let x = new BigNumber("255.50");
  let y = new BigNumber("22.25");
  let t = x.plus(y);

  console.log("x : ", t.toFormat(2));
};

export default {
  testCalculatePrice,
};
