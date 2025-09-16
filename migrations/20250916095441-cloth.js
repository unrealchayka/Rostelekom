const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const collections = ['street', 'black', 'casual', 'orange', 'line']
const colors = ['purple', 'yellow', 'orange', 'black', 'white']
const compositions = ['cotton', 'synthetics', 'polyester']
const clothTypes = ['t-shirts', 'long-sleeves', 'hoodie', 'outerwear']
const images = [
  '/img/clothes/cloth-hoodie-1.png',
  '/img/clothes/cloth-long-sleeves-1.png',
  '/img/clothes/cloth-long-sleeves-2.png',
  '/img/clothes/cloth-outerwear-1.png',
  '/img/clothes/cloth-outerwear-2.png',
  '/img/clothes/cloth-t-shirts-1.png',
  '/img/clothes/cloth-t-shirts-2.png',
]
const lineImages = [
  '/img/black-t.png',
  '/img/violet-t.png',
  '/img/orange-t.png',
]
const fabricTypes = [
  'natural',
  'non-natural',
  'mixed',
  'non-woven',
  'stockinette',
]
const features = [
  'breathable material, knitwear',
  'contrasting color',
  'soft fabric',
  'hood, pockets',
]
const collars = [
  'polo',
  'shirt-rack',
  'apache',
  'tangerine',
  'golf',
  'round neck',
]
const sleeves = ['long', 'short']
const seasons = ['demi-season', 'all season']
const upperMaterials = [
  'synthetic material',
  'quilted jacket fabric',
  'eco leather',
  'denim',
]
const liningMaterials = ['taffeta', 'viscose', 'polyester', 'chiffon', 'satin']

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    // Динамический импорт faker
    const { faker } = await import('@faker-js/faker');
    
    const clothes = [...Array(50)].map(() => {
      const type = getRandomArrayValue(clothTypes);
      const characteristics = [
        {
          type: 't-shirts',
          color: getRandomArrayValue(colors),
          collar: getRandomArrayValue(collars),
          silhouette: 'straight',
          print: 'chocolate, print, melange',
          decor: Math.random() > 0.5,
          composition: getRandomArrayValue(compositions),
          season: getRandomArrayValue(seasons),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'long-sleeves',
          color: getRandomArrayValue(colors),
          collar: getRandomArrayValue(collars),
          silhouette: 'straight',
          print: 'chocolate, print, melange',
          decor: Math.random() > 0.5,
          composition: getRandomArrayValue(compositions),
          features: getRandomArrayValue(features),
          fabricType: getRandomArrayValue(fabricTypes),
          sleeve: getRandomArrayValue(sleeves),
          season: getRandomArrayValue(seasons),
          collection: getRandomArrayValue(collections),
        },
        {
          type: 'hoodie',
          color: getRandomArrayValue(colors),
          collar: getRandomArrayValue(collars),
          silhouette: 'straight',
          print: 'chocolate, print, melange',
          decor: Math.random() > 0.5,
          composition: getRandomArrayValue(compositions),
          features: getRandomArrayValue(features),
          fabricType: getRandomArrayValue(fabricTypes),
          sleeve: getRandomArrayValue(sleeves),
          clasp: Math.random() > 0.5,
          season: getRandomArrayValue(seasons),
        },
        {
          type: 'outerwear',
          color: getRandomArrayValue(colors),
          collar: getRandomArrayValue(collars),
          decor: Math.random() > 0.5,
          composition: getRandomArrayValue(compositions),
          features: getRandomArrayValue(features),
          upperMaterial: getRandomArrayValue(upperMaterials),
          liningMaterial: getRandomArrayValue(liningMaterials),
          collection: getRandomArrayValue(collections),
        },
      ];
      
      const currentCharacteristics = characteristics.find(
        (item) => item.type === type
      );

      // Исправленные методы faker
      const price = parseInt(faker.commerce.price(100, 1000)); // Генерация цены
      const vendorCode = faker.string.numeric(4); // Генерация vendor code
      const inStock = faker.number.int({ min: 0, max: 100 }); // Количество в наличии
      const popularity = faker.number.int({ min: 0, max: 1000 }); // Популярность

      return {
        category: 'cloth',
        type,
        price: price,
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(2),
        characteristics: currentCharacteristics,
        images: type === 't-shirts' && currentCharacteristics.collection === 'line'
          ? [getRandomArrayValue(lineImages)]
          : images.filter((item) => item.includes(type)),
        vendorCode: vendorCode,
        inStock: inStock,
        isBestseller: Math.random() > 0.5,
        isNew: Math.random() > 0.5,
        popularity: popularity,
        sizes: {
          s: Math.random() > 0.5,
          l: Math.random() > 0.5,
          m: Math.random() > 0.5,
          xl: Math.random() > 0.5,
          xxl: Math.random() > 0.5,
        },
      };
    });

    await db.collection('cloth').insertMany(clothes);
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db) {
    await db.collection('cloth').deleteMany({});
  }
};