const sizes = {
  resSmall: "325px",
  resMob: "375px",
  resIos: "420px",
  resSm: "576px",
  resMd: "768px",
  resLg: "992px",
  resXl: "1280px",
  resMac: "1370px",
  resHd: "1550px",
  resHdPlus: "1680px",
  resFull: "1920px",
  resFullFixo: "1921px",
};

export const devices = {
  resSmall: `(max-width: ${sizes.resSmall})`,
  resMob: `(max-width: ${sizes.resMob})`,
  resIos: `(max-width: ${sizes.resIos})`,
  resSm: `(max-width: ${sizes.resSm})`,
  resMd: `(max-width: ${sizes.resMd})`,
  resLg: `(max-width: ${sizes.resLg})`,
  resXl: `(max-width: ${sizes.resXl})`,
  resMac: `(max-width: ${sizes.resMac})`,
  resHd: `(max-width: ${sizes.resHd})`,
  resHdPlus: `(max-width: ${sizes.resHdPlus})`,
  resFull: `(max-width: ${sizes.resFull})`,
  resFullFixo: `(min-width: ${sizes.resFullFixo})`,
};
