import { atom } from 'recoil';

export default atom({
  key: 'logoColorState', // unique ID (with respect to other atoms/selectors)
  default: '#ffffff',
});
