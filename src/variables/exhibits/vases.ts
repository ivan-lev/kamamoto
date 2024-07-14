import type { Exhibits } from '../../types/exhibitType';
import { ExhibitCategory } from '../../types/exhibitCategory';
import { ExhibitComplectation } from '../../types/exhibitComplectationType';

const { vase, tomobakoCarton, tomobakoWooden, protectiveCloth, paperDocument } =
  ExhibitComplectation;

export const vases: Exhibits = [
  {
    id: 2237,
    name: 'Металлическая ваза',
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: ExhibitCategory.vases,
    style: 'other',
    description: `<p>Чугунная цветочная ваза, выполненная в форме тэокэ (手桶), или мидзуокэ (水桶) - традиционного японского ведёрка ручной работы, предназначенного для переноса и хранения воды.</p>
    <p>Форма тэокэ часто используется при создании вещей, связанных с чайной церемонией: ею вдохновляются при изготовлении сосудов для воды мидзусаси, чайниц нацумэ, да и просто красивых лакированных контейнеров.</p>`,
    additionalDescription: ``,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [vase]
  },
  {
    id: 2383,
    name: 'Ваза Танба Татикуи мастера Итино Хироюки',
    age: undefined,
    style: 'other',
    category: ExhibitCategory.vases,
    potterName: 'Итино Хироюки',
    potterJapaneseName: '市野 弘之',
    potterLifeDates: '1924-2016',

    description: `<p>Небольшая ваза, украшенная изображениями сосновых иголок и цветами сливы, изготовленная ​​около 1975-1980 года мастером Итино Хироюки (市野 弘之), который работал в префектуре Хёго, Кондатё Камитатикуи. Несмотря на лаконичный вид, она была выполнена руками одного из выдающихся мастеров своего времени. На дне вазы стоит подпись хираганой «хи» (ひ), очевидно намекая на первый слог имени мастера.</p>`,

    potterPhoto: '',
    potterInfo: `<p>Итино Хироюки (1924-2016) был одним из самых известных гончаров Танба Татикуи. Он и несколько других гончаров возродили местные традиционные методы, которые были утеряны примерно за 100 лет до этого. Основатели движения Мингэй, Янаги Соэцу и Хамада Сёдзи, в своё время посещали район Татикуи и были впечатлены печами местных гончаров.</p>
    <p>Некоторые вехи в карьере мастера:</p>
    <ul>
    <li>1947 Экспонируется на выставке Японского музея народных ремесел (выставляется ежегодно с 1947 года)</li>
    <li>1953 Премия председателя Японской Выставки Керамики</li>
    <li>1955 Выставка Кокугакай (затем выставлялся на этой выставке еще 5 раз)</li>
    <li>1955 участвует в выставке современной японской керамики</li>
    <li>1958 Гран-при на выставке в Брюсселе</li>
    <li>1958 Первая персональная выставка в Кобэ Даймару (далее выставляется каждый год)</li>
    <li>1959 Премия Префектуры Хёго в области культуры</li>
    <li>1960 Персональная выставка в Осаке (еще семь выставок в последствии)</li>
    <li>1962 Стал членом Ассоциации художников-ремесленников префектуры Хёго</li>
    <li>1963 Участвовал в качестве судьи на выставке префектуры Хёго (в дальнейшем — ежегодно)</li>
    <li>1964 Удостоился чести сделать подарок Императорскому дворцу в виде большой тарелки</li>
    <li>1965 Создал творческую группу Saien (彩炎)</li>
    <li>1968 Персональная выставка в Токио (в дальнейшем ежегодно)</li>
    <li>1970 Получил премию за отличные навыки» «№ 1 в Японии» (技能日本一)</li>
    <li>1971 Музей современного искусства префектуры Хёго приобрел и разместил в постоянной экспозиции большую тарелку, изготовленную Итино-сан</li>
    <li>1973 Построил новый цех и печь типа Анагама, получившей имя «Эннэнгама» (延年窯) от Хигасифусими Дзидзимона, главного настоятеля киотского храма Сёрэн-ин</li>
    <li>1973 Посетил Китай в апреле в качестве посла доброй воли</li>
    <li>1973 Посетил Советский Союз в июне в качестве посла доброй воли</li>
    <li>1975 Стал членом комитета по искусству и культуре префектуры Хёго</li>
    <li>1977 Экспонируется на Европейской художественной выставке в Греции</li>
    <li>1978 Стал лектором на факультете искусствоведения, университет Фукуямы</li>
    </ul>`,

    additionalPhotos: false,
    additionalPhotosCount: undefined,
    additionalDescription: ``,

    price: 0,
    height: undefined,
    length: undefined,
    width: undefined,
    weigth: undefined,
    weightOfSet: undefined,
    complectation: [ExhibitComplectation.bowl],
    preservation: undefined
  },
  {
    id: 2423,
    name: 'Большая корейская ваза из селадона',
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: ExhibitCategory.vases,
    style: 'seiji',
    description: ``,
    additionalDescription: ``,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [vase]
  },
  {
    id: 2653,
    name: 'Лаковая ваза Вадзима-нури',
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: ExhibitCategory.vases,
    style: 'other',
    description: `<p>Великолепная черная ваза элегантной формы с изысканной росписью в виде веточек и листьев тыквы-горлянки. В комплект входит картонная коробка, бумажный документ и пара деревянных лакированных черных планок.</p>
    <p>Вадзима-нури (輪島塗) — тип японской лакированной посуды из Вадзима, Исикава. Вадзима-нури представляет собой форму и стиль лакированных изделий, которые отличаются от других японских лакированных изделий. Главной отличительной чертой вадзима-нури является прочное покрытие, получаемое путем нанесения нескольких слоев лака уруси, смешанного с порошком диатомита (дзи-но-ко), на тонкие деревянные подложки. Говорят, что лакированная посуда Вадзима возникла около 1000 лет назад, а характерный для Вадзима метод росписи был установлен около 600 лет назад. После исследований и усовершенствований мастера смогли изготавливать лучшие лакированные изделия в Японии. Каждая вещь Вадзима покрывается от 75 до 124 слоями лака. Это обеспечивает надежность, не встречающуюся у других лакированных вещей. Вещи Вадзима-нури были блестяще дополнены техникой декорации золотом, изобретённой в Вадзиме, и техникой лакирования, которая была внедрена позже, что добавило этим элегантным вещам прочности.</p>`,
    additionalDescription: ``,
    price: 0,
    weigth: undefined,
    height: 26,
    length: undefined,
    width: 5.7,
    complectation: [vase, tomobakoCarton, paperDocument]
  },
  {
    id: 2734,
    name: 'Ваза хакудзи мастера Накао Ясудзуми',
    potterName: 'Накао Ясудзуми',
    potterJapaneseName: '中尾 恭純',
    potterPhoto: 'nakao_yasuzumi.jpg',
    additionalPhotos: false,
    category: ExhibitCategory.vases,
    style: 'hakuji',
    description: `<p>Печь Накасэн-гама (中仙窯) расположена в городе Арита, префектура Сага — месте рождения японского фарфора Арита (有田焼) с четырехсотлетней историей. Эта печь была основана дедом Накао Ясудзуми (中尾 恭純), одного из трёх гончаров, которые работают в печи на данный момент. Остальные два — Накао Дзюн (中尾 純) — его сын, и Накао Хидэдзуми (中尾 英純) — его брат. Они производят керамику мирового уровня, соединяя в своих работах два принципа: «Почва и огонь» (土と焔) и «Дух ремесленника» (工人の心). Ключевая основа их работ — фарфоровая поверхность цвета белого жемчуга (白玉の磁肌) и секретная техника моделирования (造形の秘技). Придерживаясь этого ключа, они непрерывно совершенствуют технологию, унаследованную от предков и посвящают себя изделиям ручной работы, которые будут актуальны в наше время.</p>
    <p>Все работы выполнены вручную на гончарном круге поштучно. Их формуют, сушат, соскабливают и обжигают в печи неглазурованными при температуре около 900°С. После этого работы окрашивают, украшают резьбой, раскрашивают и расписывают, покрывают глазурью и обжигают около 23 часов при температуре около 1300°С.</p>
    <p>Ваза была создана в 1995-2000 годах мастером Накао Ясудзуми. Он родился в 1950 году в городе Арита. С 1971 года в течение 5 лет учился гончарному делу в Экспериментальном Отделении керамики префектуры Сага под руководством Иноуэ Мандзи (井上 萬二), который был признан важным нематериальным культурным достоянием (живым национальным сокровищем), переняв технику Рокуро. Накао Ясудзуми является действительным членом Японской ассоциации Когэй и одним из лучших мастеров инкрустации дзоган, представляющей собой гравировку сложного узора на белом фарфоре. Его работы — это, в основном, белый фарфор (хакудзи) и сине-белый фарфор. Форма, закругленная на гончарном круге, изменяется путем нажатия пальцем, пока материал мягкий, или путем вырезания материала в квадратную форму после высыхания. Он использует метод срезания под острым углом и техники линейного срезания для создания поверхностей путем соскабливания по толстому слою материала.</p>
`,
    potterInfo: `<p>Некоторые вехи в карьере мастера:</p>
    <ul>
    <li>1968 Окончил керамический факультет технической средней школы Арита (有田工業高校窯業科)</li>
    <li>1971 Изучал технологию гончарства в течение 5 лет у профессора Мандзи Иноуэ (井上 萬二), «Живого национального достояния» (人間国宝).</li>
    <li>1972 Впервые отобран для Выставки Керамики Кюсю Ямагути (九州山口陶磁展), Выставки Сэйбу Когэй (西部工芸展), Художественной Выставки Префектуры Сага (佐賀県美術展覧会)</li>
    <li>1975 Впервые отобран на Выставку Японских Традиционных Ремёсел (日本伝統工芸展)</li>
    <li>1976 Впервые отобран на Выставки Исимидзукай (一水会展), далее отбирался и получал награды в 1986, 1989, 1993, 1995, 1996</li>
    <li>1978 Золотая награда выставки западных ремесел (西部工芸展), поощрительная награда Министра Образования, Культуры, Спорта, Науки и Технологий на Выставке префектуры Сага (佐賀県展)</li>
    <li>1980 Сертификация в качестве постоянного члена Японской ассоциации Когэй (日本工芸会)</li>
    <li>1987 Награда Министра Образования, Науки и Культуры на Выставке Керамического Искусства Западной Японии (Ниси-Ниппон) (西日本陶芸美術展)</li>
    <li>1991 Премия Губергатора Саги на Выставке Керамического Искусства Западной Японии</li>
    <li>1993 Участие в Выставке Современной Японской Керамики (日本現代陶磁展) в Национальном музее Саклера в США, премия выставки керамики Кюсю Ямагути (九州山口陶磁展), далее получал награды и участвовал в 1996, 2005, 2008, 2010, 2011, 2014, 2015</li>
    <li>1994 Приз Художественной Выставки Префектуры Сага (佐賀県美術展覧会), также приз Выставки Керамического Искусства Западной Японии (в 2010 году получил Гран-При)</li>
    <li>1996 Победитель Выставки Суторито Фанитя в рамках World Flame Expo (世界焱博覧会ストリートファニチャー)</li>
    <li>2000 Участие в Выставке Керамического Искусства Сага (佐賀県陶芸展) в Британском музее</li>
    <li>2001 Участие в трансляции NHK «Изучение керамики» — знакомство с росписью и инкрустацией</li>
    <li>2004 Выставлялся на Немецкой выставке керамики Арита (ドイツ有田陶芸展), в Мейсене, Берлине и др.</li>
    <li>2008 Выставка Керамики Кюсю Ямагути (九州山口陶磁展), 1 премия (Премия Министра Образования, Культуры, Спорта, Науки и Технологий)</li>
    <li>2009 Приз Губернатора префектуры Оита на Выставке Западных Традиционных Ремёсел (西部伝統工芸展), также отобран для выставок 2010-2019 и 2021. Также с 2009 и до 2021 отбирался для Выставки Японских Традиционных Ремёсел (日本伝統工芸展)</li>
    <li>2013 Благодарность губернатора префектуры Сага в сфере художественной культуры, отобран для выставки Тоби (平成二十五年), далее отбирался в 2014-2021 годах</li>
    <li>2016 Отобран для участия в Международной Выставке Керамики Арита (有田国際陶磁展), также отбирался в 2017 и 2018 годах</li>
    </ul>
    <p>В настоящее время мастер является:</p>
    <ul>
    <li>постоянным членом японской Ассоциации Когэй (日本工芸会)</li>
    <li>членом Ассоциации Керамического Искусства Японии (日本陶芸美術協会)</li>
    <li>директором Керамической Ассоциации Сага (佐賀県陶芸協会)</li>
    <li>директором Керамической Ассоциации Арита (有田陶芸協会).</li>
    </ul>`,
    additionalDescription: `<p>Интервью с мастером Ясудзуми, проведённое в августе 2015 года Юмико Уэно:</p>
    <ul>
    <li>Что вас сподвигло создать уникальную технику цветной инкрустации?</li>
    <li>После обучения у Мандзи Иноуэ, живого национального сокровища, я в основном раскрывал форму белого фарфора при помощи гончарного круга. На выставке керамического искусства около 35 лет назад учитель-критик спросил меня: «Арита умеет делать только белый фарфор?». И это было озарением. На самом деле, в Арите живёт большое количество гончаров, и я думал, что не буду создавать ничего непохожего, чтобы на меня не смотрели косо, поэтому я занимался лишь формовкой фарфора. Первой попыткой был госу (呉須) синими линиями на белом фарфоре. Простые линии постепенно усложнялись и превращались в более сложные с классическими узорами панциря черепахи и четырехсторонними узорами ёмотасуки (四方襷).</li>
    <li>В чём состоит суть вашей техники?</li>
    <li>Чтобы создать на фарфоровой поверхности изящный линейный узор, который нельзя создать при помощи кисти, нужно сделать вручную резной узор, пока поверхность еще мягкая, нанести воском ограничители и применить пигмент. Воск выжигается для каждого цвета, процесс повторяется до момента готовности. Если повторять это многократно, то к моменту готовности могут образоваться трещины, поэтому в последнее время я придумываю как сократить количество обжигов.</li>
    <li>По завершении появляется сложный узор.</li>
    <li>Даже если цвет один, он будет выглядеть по-разному там, где есть вырез, и там, где его нет. Пересекающиеся линии механические, но основа и уток кажутся переплетенными, и они образуют сложный узор. Переплетение линий создает тонкий визуальный эффект, и так можно создавать множество оттенков, которые превышают количество фактически используемых цветов. Вы когда-нибудь видели мозаику в церкви в Стамбуле, Турция? Это полезный визуальный эффект.</li>
    <li>Что такое пунктирная инкрустация?</li>
    <li>Это метод нанесения пигмента на поверхность с помощью хлопковой иглы, пока поверхность фарфора мягкая. Пожалуйста, посмотрите внимательно. Вы можете увидеть бесчисленные отверстия от игл. Результат похож на пуантилизм в живописи. Этот тонкий процесс окраски — задача для упорных.</li>
    <li>Почему вы не научите этой технике своего сына Дзюна?</li>
    <li>Таким хлопотным делом никто не занимается, и не будет заниматься в будущем.</li>
    </ul>`,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [vase, tomobakoWooden, paperDocument]
  },
  {
    id: 2748,
    name: 'ваза Сэто мастера Като Кэия',
    age: undefined,
    style: 'seto',
    category: ExhibitCategory.vases,
    potterName: 'Като Кэйя',
    potterJapaneseName: '',
    potterLifeDates: '',

    description: ``,

    potterPhoto: 'kato-keiya.jpg',
    potterInfo: `<p>Като Кэия (加藤敬也) - выдающийся гончар Сэто, родившийся в 1935 году. Его заслуги в развитие керамики Сэто просто огромны, и он заслуженно получил множество призов на десятках выставок.</p>
    <p>По указанию её Императорского Высочества принцессы Китасиракавы, мастер несколько раз обжигал утварь для чаных церемоний, а также преподносил свои творения Их Величествам Императору и Императрице. Большой сосуд его производства был подарен храму Кодай (皇大神宮). Несколько раз был приглашен на выставки "Хорошего Дизайна Японии" (ニッポングッド・デザイン賞), Сюсэнтэн (秀選). Несколько раз участвовал и дважды получал высшую награду Выставки Керамики Сэто (瀬戸陶芸展). Получил высшую награду на Общей Художественной Выставке Кансай (関西綜合美術展). Получил награду за отличную работу и премию губернатора на Выставке керамики Асахи (朝日陶芸展), награду выставки КОфукай (光風会展). Несколько раз участвовал в Выставке японского современного ремесленного искусства (日本現代工芸美術展).</p>
    <p>Работы мастера экспонироались на выставках Великобритании, США, Германии, Италии, Австралии, Мексики. Работы с выставки Ниттэн (日展出品作品), где мастер был представлен более 16 раз, приобретались в Министерство иностранных дел японии, канцелярию премьер-министра, для постоянного хранения города Сэто.</p>
    <p>В определённый период мастер перестал участвовать в публичных выставках и усердно работал над созданием работ, используя новые техники и глазури. В деревне Охара им была основана новая печь, которая существует и по сей день.</p>`,

    additionalPhotos: false,
    additionalPhotosCount: undefined,
    additionalDescription: ``,

    price: 0,
    height: undefined,
    length: undefined,
    width: undefined,
    weigth: undefined,
    weightOfSet: undefined,
    complectation: [ExhibitComplectation.bowl],
    preservation: undefined
  },
  {
    id: 2824,
    name: 'Подвесная ваза Сигараки удзукумару',
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: ExhibitCategory.vases,
    style: 'shigaraki',
    description: `<p>Подвесная ваза каке ханаирэ (掛 花入) в форме кувшина удзкукумару (蹲る) с узором кипарисовой решётки. Вазы и кувшины удзукумару производятся мастерами Сигараки очень давно, в музеях Японии есть образцы периода Камакура и Муромати, датированные 15м веком и ранее.</p>
    <p>Ваза украшена х-образным узором между двумя параллельными линиями, хигаки-мон (檜垣文) имитирующими кипарисовые решетки с перекрещивающимися планками, используемыми в японских садах. В 16-17 веке декор подобных ваз стал использоваться мастерами чайного действа для оформления пространства возле чайных домиков и изгороди получили название коэцу-гаки, то есть «изгороди Коэцу» (по имени знаменитого чайного мастера Хонами Коэцу).</p>
    <p>Глазурь стекает по обширной площади вазы, создавая эффект надарэ (傾れ) и в некоторых местах создаёт прозрачные капли биидоро (ビードロ). У основания вазы крупными засечками создан круговой поясок. На тыльной стороне находится металлическое кольцо для подвешивания и ниже стоит печать мастера.</p>`,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [vase]
  },
  {
    id: 2845,
    name: 'Ваза Кё мастера Кимуры Норитады',
    potterName: 'Кимура Норитада',
    potterJapaneseName: '木村 宜正',
    potterPhoto: 'kimura-noritada.jpg',
    additionalPhotos: false,
    category: ExhibitCategory.vases,
    style: 'kyo',
    description: `<p>Круглая ваза, созданная около 1998 года Кимурой Норитадой, сыном Кимуры Моринобу — мастера современной японской традиционной керамики и обладателя нематериальных культурных ценностей (национального сокровища). Работы Кимуры Норитады неоднократно выставлялись на выставках японских традиционных искусств и ремесел. Он является лидером нового поколения в японской керамической промышленности и признанным преемником керамики Кимуры.</p>`,
    potterInfo: `<p>Некоторые вехи в жизни мастера</p>
    <ul>
    <li>1968 Родился в Ивакуре (岩倉), Киото</li>
    <li>1989 Окончил Технический колледж керамики префектуры Киото (京都府立陶工高等技術専門校)</li>
    <li>1992 Провел выставку трех человек отца и сына в Киото Мандзюдо (京都萬珠堂). Был отобран для участия в 21-й Выставке традиционных японских ремёсел (日本伝統工芸展). С тех пор участвовал каждый год.</li>
    <li>1994 Участвовал в «Выставке предметов, украшающих жизнь 94» (暮らしを彩る器展 94) в Tokyo Dome (東京ドーム)</li>
    <li>1995 Первая персональная выставка в Арт-пространстве Хатигэн (アートスペース八源)</li>
    <li>1995 Выбран для участия во 2-й выставке посуды BONSAI (盆栽), выбран для участия в выставке современной чайной керамики (现代茶陶展)</li>
    <li>1997 Персональная выставка в Сэйкадо, Аояма, Токио (東京青山 青花堂), после чего проводит там выставки каждый год</li>
    <li>1997 Лапшичная миска (めん鉢) получила Гран-при на 5-й выставке современной керамики Nissin Foods (日清食品現代陶芸)</li>
    <li>1998 Участие в Уити Симидзу [выставка Хорайкай (蓬莱会展)], с 2004 года выставляется ежегодно</li>
    <li>1998 Участвует в выставке универмага Токие Икэбукуро Сэйбу (東京池袋西武百貨展) и в выставке керамики Хорайкай (蓬莱会作陶展), где с тех пор принимает участие ежегодно</li>
    <li>1998 Выбран для Арт-парка Биама Гранд Кай (芸術の森ビアマグランカイ) в Саппоро</li>
    <li>1998 Выставка отца и сына Кимуры Моринобу (木村盛伸) в Ёкогама Сого</li>
    <li>1998 Провел выставку отца и сына Кимура Моринобу в магазине Уцува-я Мэнами (うつわ屋めなみ) в Киото</li>
    <li>2003 Выбран для участия в выставке японских традиционных ремесел (日本传统工艺展)</li>
    <li>2007 Участие в главной выставке Ассоциации искусств и культуры города Киото [Выставка CRIA] и выставке японских традиционных ремесел</li>
    <li>2008 Участие в выставке KYOTO & LITTLE KYOTO</li>
    <li>2012 Выставка художественных промыслов в Киото (京都美术工艺美术展览会)</li>
    </ul>`,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [vase, tomobakoWooden, protectiveCloth, paperDocument]
  }
];
