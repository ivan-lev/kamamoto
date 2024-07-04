import { ExhibitCategory } from '../../types/exhibitCategory';
import { CeramicStyleType } from '../../types/ceramicStyleType';
import type { Exhibits } from '../../types/exhibitType';

// {
//     id: 0,
//     name: '',
//     potterName: '',
//     potterJapaneseName: '',
//     potterPhoto: '',
//     additionalPhotos: false,
//     category: ExhibitCategory.vases,
//     style: CeramicStyleType,
//     description: ``,
//     additionalDescription: ``,
//     price: undefined,
//     weigth: undefined,
//     height: undefined,
//     length: undefined,
//     width: undefined
//   }

export const vases: Exhibits = [
  {
    id: 2824,
    name: 'Подвесная ваза Сигараки удзукумару',
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: ExhibitCategory.vases,
    style: CeramicStyleType.kyo,
    description: `<p>Подвесная ваза каке ханаирэ (掛 花入) в форме кувшина удзкукумару (蹲る) с узором кипарисовой решётки. Вазы и кувшины удзукумару производятся мастерами Сигараки очень давно, в музеях Японии есть образцы периода Камакура и Муромати, датированные 15м веком и ранее.</p>
    <p>Ваза украшена х-образным узором между двумя параллельными линиями, хигаки-мон (檜垣文) имитирующими кипарисовые решетки с перекрещивающимися планками, используемыми в японских садах. В 16-17 веке декор подобных ваз стал использоваться мастерами чайного действа для оформления пространства возле чайных домиков и изгороди получили название коэцу-гаки, то есть «изгороди Коэцу» (по имени знаменитого чайного мастера Хонами Коэцу).</p>`,
    additionalDescription: `<p>Глазурь стекает по обширной площади вазы, создавая эффект надарэ (傾れ) и в некоторых местах создаёт прозрачные капли биидоро (ビードロ). У основания вазы крупными засечками создан круговой поясок. На тыльной стороне находится металлическое кольцо для подвешивания и ниже стоит печать мастера.</p>`,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined
  }
];
