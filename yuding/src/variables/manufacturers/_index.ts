import type { Manufacturer, manufacturersNames } from '@/variables/incences.types';
import { baieido } from '@/variables/manufacturers/baieido';
import { gyokushodo } from '@/variables/manufacturers/gyokushodo';
import { kunmeido } from '@/variables/manufacturers/kunmeido';
import { kyukyodo } from '@/variables/manufacturers/kyukyodo';
import { seijudo } from '@/variables/manufacturers/seijudo';
import { shoyeido } from '@/variables/manufacturers/shoyeido';
import { tennendo } from '@/variables/manufacturers/tennendo';
import { unknown } from '@/variables/manufacturers/unknown';
import { yamadamatsu } from '@/variables/manufacturers/yamadamatsu';

export const manufacturers: Record<manufacturersNames, Manufacturer> = {
	baieido,
	gyokushodo,
	kunmeido,
	kyukyodo,
	seijudo,
	shoyeido,
	tennendo,
	yamadamatsu,
	unknown,
};
