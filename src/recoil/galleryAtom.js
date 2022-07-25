import { atom, selectorFamily } from 'recoil';

export const galleryState = atom({
  key: 'gallery',
  default: [
    {
      id: 0,
      productIds: [
        'aenean-ru-bristique-7',
        'aenean-ru-bristique-12',
        'aenean-ru-bristique-15',
        'aenean-ru-bristique-24',
        'aenean-ru-bristique-8',
        'aenean-ru-bristique-10',
        'aenean-ru-bristique-11',
        'aenean-ru-bristique-14',
      ],
    },
    {
      id: 1,
      productIds: [
        'aenean-ru-bristique-1',
        'aenean-ru-bristique-22',
        'aenean-ru-bristique-9',
        'aenean-ru-bristique-4',
        'aenean-ru-bristique-3',
        'aenean-ru-bristique-6',
        'aenean-ru-bristique-19',
        'aenean-ru-bristique-2',
      ],
    },
    {
      id: 2,
      productIds: [
        'aenean-ru-bristique-3',
        'aenean-ru-bristique-14',
        'aenean-ru-bristique-11',
        'aenean-ru-bristique-15',
        'aenean-ru-bristique-4',
        'aenean-ru-bristique-23',
        'aenean-ru-bristique-17',
        'aenean-ru-bristique-6',
      ],
    },
    {
      id: 3,
      productIds: [
        'aenean-ru-bristique-5',
        'aenean-ru-bristique-17',
        'aenean-ru-bristique-23',
        'aenean-ru-bristique-9',
        'aenean-ru-bristique-8',
        'aenean-ru-bristique-13',
        'aenean-ru-bristique-21',
        'aenean-ru-bristique-16',
      ],
    },
  ],
});

export const getGallerySetById = selectorFamily({
  key: 'galleryProductSet',
  get: id => ({ get }) => {
    const gallerySetById = get(galleryState).find(set => set.id === id);
    return gallerySetById.productIds;
  },
});
