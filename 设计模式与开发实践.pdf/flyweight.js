/**
 * 享元模式
 */

/**
 * @实例 五十个模特(男女)试穿五十件衣服(男女)
 */
class Model {
  constructor(sex) {
    this.sex = sex;
    this.clothes = {};
  }

  show() {
    console.log(this.clothes);
  }
}

const createModel = () => {
  const modelStore = {};

  return (sex) => {
    if (!modelStore[sex]) {
      return modelStore[sex] = new Model(sex);
    }

    return modelStore[sex];
  };
}();

Array.apply(null, {
  length: 50
}).forEach((item, ix) => {
  const clothes = new Clothes();
  const modle = createModel(clothes.sex);

  model.clothes = clothes;
  model.show();
});