import type { Incense } from '@/variables/incences.types';
import { bayeidoIncences } from '@/variables/incenses/bayeido';
import { gyokushodoIncences } from '@/variables/incenses/gyokushodo';
import { kunmeidoIncences } from '@/variables/incenses/kunmeido';
import { kyukyodoIncences } from '@/variables/incenses/kyukyodo';
import { shoyeidoIncences } from '@/variables/incenses/shoyeido';
import { yamadamatsuIncences } from '@/variables/incenses/yamadamatsu';

export const incenses: Incense[] = [...bayeidoIncences, ...gyokushodoIncences, ...kunmeidoIncences, ...kyukyodoIncences, ...shoyeidoIncences, ...yamadamatsuIncences];
