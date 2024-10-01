import type { Resources } from '../types/fileType';
import { PATHS } from './variables';

export const thanksLetters: Resources = [
  {
    id: 0,
    preview: `${PATHS.BASE_URL}/thanks-letters/2024-ume.webp`,
    link: `${PATHS.BASE_URL}/thanks-letters/2024-ume.pdf`,
    description:
      'Благодарственное письмо от Ю.В. Поповой, директора центра Восточных языков и культуры "Юмэ"'
  },
  {
    id: 1,
    preview: `${PATHS.BASE_URL}/thanks-letters/2024-three-nobles.webp`,
    link: `${PATHS.BASE_URL}/thanks-letters/2024-three-nobles.pdf`,
    description:
      'Благодарственное письмо от И.И. Потаповой, директора курганского ГАУ "КОНДТ"'
  }
];
