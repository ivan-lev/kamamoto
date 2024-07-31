import type { Exhibits } from '../../types/exhibitType';
import { ExhibitCategory } from '../../types/exhibitCategory';
import { ExhibitComplectation } from '../../types/exhibitComplectationType';

const { plate, tomobakoWooden, paperDocument, protectiveCloth } = ExhibitComplectation;

export const plates: Exhibits = [
  {
    id: 2004,
    name: 'Декоративная тарелка с воробьями',
    age: '1980-1985',
    potterName: '',
    potterJapaneseName: '',
    category: ExhibitCategory.plates,
    style: 'unknown',
    description: `<p>Красивая коллекционная тарелка с мастерски вручную нарисованными воробьями, выполненная около 40-50 лет назад. В ножке тарелки есть отверстие для размещения её на стене в качестве декоративного элемента помещения. Тарелка поставляется с деревянной коробкой, защитной тканью и бумажным документом.</p>`,

    potterPhoto: '',
    potterInfo: '',

    additionalDescription: ``,
    additionalPhotos: false,
    additionalPhotosCount: undefined,
    price: 15400,
    height: 4.5,
    length: 24,
    width: undefined,
    weigth: 760,
    weightOfSet: 1500,
    complectation: [plate, tomobakoWooden, paperDocument, protectiveCloth]
  },
  {
    id: 2330,
    name: 'Тарелка с каллиграфией Какиномото-но Хитомаро',
    potterName: 'неизвестен',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: ExhibitCategory.plates,
    style: 'kyo',
    description: ``,
    additionalDescription: ``,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [plate]
  },
  {
    id: 2424,
    name: 'Японская большая тарелка с цветущей сливой',
    age: undefined,
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    category: ExhibitCategory.plates,
    description: `<p>Большая тарелка, выполненная в технике Э-Сино. Она покрыто толстым слоем белой глазури, под которой находится изображение цветущей сливы на фоне розового круга. Такое блюдо украсит любое пространство, подчеркнув природную красоту фруктов или других вещей, расположенных на нём.</p>
    <p>На коробке есть царапины и трещины из-за того, что набор действительно старый, но сама тарелка в отличном состоянии, скорее всего она просто хранилась на складе вещей, которые часто встречаются в традиционных японских домах. Также в комплекте есть защитная ткань оранжевого цвета.</p>`,
    additionalDescription: ``,
    additionalPhotos: false,
    additionalPhotosCount: undefined,
    style: 'shino',
    price: 16500,
    height: 4,
    length: 23,
    width: 23,
    weigth: 1360,
    weightOfSet: 1780,
    complectation: [plate, tomobakoWooden, protectiveCloth]
  },
  {
    id: 2449,
    name: 'Японская старая большая тарелка для сладостей мастера Эираку',
    age: undefined,
    potterName: 'Эираку',
    potterJapaneseName: '永楽',
    potterPhoto: '',
    category: ExhibitCategory.plates,
    description: `<p>Очень старая тарелка, предположительно из Киото, покрытая прозрачной глазурью и украшенная каллиграфией и изображением копытня (род растений, широко известный как дикий имбирь). В нижней части тарелки стоит печать мастера Эйраку (永楽). Тарелка идёт со старой деревянной коробкой, которая потемнела от времени. На боку коробки есть надпись: 菓子鉢 — чаша для сладостей и 焼拓 — керамика.</p>
    <p>Хотя тарелка выглядит скромно, каллиграфия придает ей изысканность, а растение выполнено мастерски. Тарелка станет хорошим дополнением вашей коллекции, ее можно использовать как в быту, так и в качестве отдельного элемента декора. Вероятно, тарелка изготовлена одним из известных гончаров семьи Эйраку.</p>`,
    additionalDescription: ``,
    additionalPhotos: false,
    additionalPhotosCount: undefined,
    style: 'kiyomizu',
    price: 17300,
    height: 3.5,
    length: 18.3,
    width: 18.3,
    weigth: 265,
    weightOfSet: undefined,
    complectation: [plate, tomobakoWooden]
  },
  {
    id: 2493,
    name: 'Тарелка Сэто в виде кленового листа',
    age: undefined,
    style: 'seto',
    category: ExhibitCategory.plates,
    potterName: '',
    potterJapaneseName: '',
    potterLifeDates: '',

    description: `<p>Прекрасная "осенняя" тарелка неизвестного мастера, повторяющая форму кленового листа, как она традиционно изображалась в японском искусстве мастерами Кэндзаном, Нинсэем и другими выдающимися художниками Японии. Тарелка имеет слегка вогнутую форму, стоит на трёх ножка. Она полностью (за исключением "подошв" ножек) покрыта слоем глазури с небольшим содержанием железа, придающим ей желтовато-зеленый оттенок с сетью глубоких трещинок кракле, и с наплывом голубовато-фиолетового цвета с одной стороны.</p>
    <p>Печать мастера стоит на дне тарелки возле одной из ножек и на крышке коробки, которая идёт в комплекте.</p>`,

    potterPhoto: '',
    potterInfo: ``,

    additionalPhotos: false,
    additionalPhotosCount: undefined,
    additionalDescription: ``,

    price: 0,
    height: undefined,
    length: undefined,
    width: undefined,
    diameter: undefined,
    weigth: undefined,
    volume: undefined,
    weightOfSet: undefined,
    complectation: [plate, tomobakoWooden],
    preservation: undefined
  },
  {
    id: 2793,
    name: 'Японская большая тарелка мастера Суисэна',
    age: '1980-1985',
    potterName: 'Суисэн',
    potterJapaneseName: '翆泉',
    potterPhoto: '',
    category: ExhibitCategory.plates,
    description: `<p>Интересная тарелка, выполненная в смешанном стиле. Внутри располагается декор в виде цветущей ветви сливы, выполненный в технике похожей на Сино, а дно украшено широким мазком кисти, цвет которой характерен для керамики Сэто.</p>
    <p>Тулово тарелки выполнено из белой мелкозернистой глины. По ободу штампиками вдавлены растительные узоры. Печать мастера стоит внизу возле ножки.</p>
    <p>В комплекте с тарелкой идёт коробка. Надписи на крышке коробки: «тарелка для сладостей» (菓子鉢) по центру, и «сделано Суйсэном» (翆泉造) рядом с печатью слева внизу.</p>`,
    additionalDescription: ``,
    additionalPhotos: false,
    additionalPhotosCount: undefined,
    style: 'shino',
    price: 14700,
    height: 5,
    length: 24,
    width: 24,
    weigth: undefined,
    weightOfSet: undefined,
    complectation: [plate, tomobakoWooden],
    preservation: undefined
  },
  {
    id: 2794,
    name: 'Японская тарелка Мино мастера Като Кобэя 5',
    age: '~1970',
    potterName: 'Като Кобэй 5',
    potterJapaneseName: '五代 加藤幸兵衛',
    potterLifeDates: '1893-1982',
    category: ExhibitCategory.plates,
    description: `<p>Винтажная тарелка, выполненная около 1970 года мастером Като Кобэем в пятом поколении. Тарелка украшена изображением ирисов, выполненных коричневой, зелёной, синей и золотой эмалями. Тулово тарелки сформировано из толстого слоя бежевой глины и покрыто серо-голубой глазурью. Подпись мастера стоит на дне тарелки.</p>`,
    potterPhoto: 'kobei-kato-5.jpg',
    potterInfo: `<p>Мастер Като в полной мере использовал широкий спектр керамических техник, включая китайские, такие ​​как Сэйдзи (селадон), Тэммоку, Сомэцукэ (роспись синим), Акаэ (роспись красным) и Кинрандэ (золотая парча), а также техники, заимствованные у династий Цяньшань и Лян. В 1973 году мастер был признан важной нематериальной культурной ценностью префектуры Гифу.</p>
    <p>Като-сан является основателем возрождения современной керамики Кохэй и в течение 23 лет был директором Научно-исследовательского института керамики префектуры Гифу, за что был назван «отцом керамики Мино», неустанно работающим над улучшением техник и обучением будущих поколений.</p>
    <span>Некоторые вехи в карьере мастера:</span>
    <ul>
    <li>1921 Унаследовал имя от мастера Кобэя в 4м поколении (四代目幸兵衛)</li>
    <li>1928 Начал получать заказы на изготовление посуды и предметов декора от Министерства императорского двора (宮内省)</li>
    <li>1931 мастер начал участвовать в выставках: Футэй, Бун и Ниттэн (降帝、文、日展)</li>
    <li>1940 отмечен знаком за сохрание традиционных технологий (技術保存)</li>
    <li>1948 при поддержке Министерства иностранных дел (外務省) участвовал в выставке японской керамики в Париже</li>
    <li>1952 судействовал на Национальной выставке керамики (全国陶芸展)</li>
    <li>1955 экспонируется на выставке традиционных ремесел Японии (日本伝統工芸展)</li>
    <li>1960 переехал в Нью-Йорк и провел персональную выставку керамики</li>
    <li>1962 получил награду председателя 9-й Японской выставки традиционных ремесел (第九回日本伝統工芸展)</li>
    <li>1967 Награжден орденом Священного сокровища 4-й степени (勲四等瑞宝章)</li>
    </ul>
    <p>В 1950 году мастер был назначен директором Экспериментальной станции керамики префектуры Гифу (岐阜県立陶磁器試験場長)</p>`,
    additionalDescription: `<p><a href="http://www.koubei-gama.co.jp/en">Гончарная печь Кобэй (幸兵衛陶窯)</a> расположена в районе Итинокура города Тадзими, префектура Гифу. Она была основана впервый год эпохи Бунка (1804). Мастер Кобэй (первый мастер династии) был очарован уникальной глиной, которую добывали у подножия горы Итинокура, и построил печь в Адзадзаве, чтобы исследовать новую для того времени область китайской керамики. Позже печь стала официальной печью Хонмару (本丸御用窯 - печь в центральной части замка) сёгуната Токугава.</p>
    <p>Ниже несколько фотографий, передающих атмосферу, при которой создаются вещи в семейной печи:</p>`,
    additionalPhotos: true,
    additionalPhotosCount: 8,
    style: 'mino',
    price: 27900,
    height: 4,
    length: 21,
    width: 18.5,
    weigth: undefined,
    weightOfSet: undefined,
    complectation: [plate, tomobakoWooden, protectiveCloth, paperDocument],
    preservation: undefined
  }
];
