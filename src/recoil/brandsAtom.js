import { atom, selector } from 'recoil';

export const brandsState = atom({
  key: 'brandsState',
  default: [
    {
      id: 'brand1',
      name: 'brand1',
      image: 'brand1',
    },
    {
      id: 'brand2',
      name: 'brand2',
      image: 'brand2',
    },
    {
      id: 'brand3',
      name: 'brand3',
      image: 'brand3',
    },
    {
      id: 'brand4',
      name: 'brand4',
      image: 'brand2',
    },
    {
      id: 'brand5',
      name: 'brand5',
      image: 'brand1',
    },
    {
      id: 'brand6',
      name: 'brand6',
      image: 'brand2',
    },
    {
      id: 'brand7',
      name: 'brand7',
      image: 'brand3',
    },
    {
      id: 'brand8',
      name: 'brand8',
      image: 'brand2',
    },
    {
      id: 'brand9',
      name: 'brand9',
      image: 'brand1',
    },
    {
      id: 'brand10',
      name: 'brand10',
      image: 'brand2',
    },
    {
      id: 'brand11',
      name: 'brand11',
      image: 'brand3',
    },
    {
      id: 'brand12',
      name: 'brand12',
      image: 'brand2',
    },
  ],
});

export const allBrands = selector({
  key: 'brands',
  get: ({ get }) => {
    const brands = get(brandsState);
    return brands;
  },
});
