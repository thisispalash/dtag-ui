import { atom } from 'recoil';

export const loginState = atom({
  key: 'login',
  default: false,
});

export const gameIDState = atom({
  key: 'gameID',
  default: '',
});

export const livesState = atom({
  key: 'lives',
  default: 2.5,
});

export const energyState = atom({
  key: 'energy',
  default: 5.2,
});