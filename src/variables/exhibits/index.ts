import { archive } from './archive';
import { bowls } from './bowls';
import { caddies } from './caddies';
import { cups } from './cups';
import { plates } from './plates';
import { other } from './other';

export const exhibits = [...archive, ...bowls, ...caddies, ...cups, ...plates, ...other];
