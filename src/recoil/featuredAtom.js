import { atom, selector } from 'recoil';

export const featuredState = atom({
  key: 'featuredState',
  default: ['aenean-ru-bristique-9', 'aenean-ru-bristique-8', 'aenean-ru-bristique-13'],
});

export const getAllFeatured = selector({
  key: 'featured',
  get: ({ get }) => {
    const featured = get(featuredState);
    return featured;
  },
});
