import type { Manufacturer } from '@/variables/incences.types';
import { baieido } from '@/variables/manufacturers/baieido';
import { gyokushodo } from '@/variables/manufacturers/gyokushodo';
import { kunmeido } from '@/variables/manufacturers/kunmeido';
import { kyukyodo } from '@/variables/manufacturers/kyukyodo';
import { shoyeido } from '@/variables/manufacturers/shoyeido';
import { unknown } from '@/variables/manufacturers/unknown';
import { yamadamatsu } from '@/variables/manufacturers/yamadamatsu';

export const manufacturers: { [key: string]: Manufacturer } = {
	baieido,
	gyokushodo,
	kunmeido,
	kyukyodo,
	shoyeido,
	yamadamatsu,
	unknown,
};
