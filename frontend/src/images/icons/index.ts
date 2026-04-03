import avatar1 from './Multiavatar-1.svg';
import avatar10 from './Multiavatar-10.svg';
import avatar11 from './Multiavatar-11.svg';
import avatar12 from './Multiavatar-12.svg';
import avatar13 from './Multiavatar-13.svg';
import avatar2 from './Multiavatar-2.svg';
import avatar3 from './Multiavatar-3.svg';
import avatar4 from './Multiavatar-4.svg';
import avatar5 from './Multiavatar-5.svg';
import avatar6 from './Multiavatar-6.svg';
import avatar7 from './Multiavatar-7.svg';
import avatar8 from './Multiavatar-8.svg';
import avatar9 from './Multiavatar-9.svg';

export const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
];

export const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
};
