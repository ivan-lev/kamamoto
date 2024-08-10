import type { Exhibits } from '../../types/exhibitType';
import { ExhibitComplectation } from '../../types/exhibitComplectationType';

const { cup, cups2, cups3, tomobakoWooden, protectiveCloth, paperDocument } = ExhibitComplectation;

export const cups: Exhibits = [
  {
    id: 2486,
    name: 'Стеклянные пиалы "Три друга зимы" фабрики Кагами Кристал',
    potterName: 'Kagami Crystal Co., Ltd. (各務クリスタル製作所)',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: 'cups',
    style: 'glass',
    description: `<p>Пиалы «Сосна, бамбук и слива» («cётикубай»), созданные на фабрике по производству изделий из хрусталя Kagami Crystal, которая поставляет для официальных приемов стеклянную посуду Агентству императорского двора, а также производит традиционные японские изделия Эдо Кирико (江戸切子) — вещи с выгравированными узорами.</p>
    <p>Компания Kagami Crystal Co., Ltd. (各務クリスタル製作所), основанная Кагами Кодзо (各務鑛三), открыла первый в Японии завод по производству хрусталя в 1934 году. С момента своего основания более восьмидесяти лет назад компания разработала для создания оригинальных и высококачественных изделий передовые навыки и технологии изготовления стекла, включая ручное выдувание стекла, ручную резку и гравировку.</p>
    <p>Продукция фабрики Кагами широко используется на официальных встречах, таких как приемы государственных гостей и иностранных высокопоставленных лиц в Государственном гостевом доме, а также в посольствах и консульствах Японии по всему миру. Компания неоднократно получала специальные заказы от Императорской семьи. Кагами считается ведущим поставщиком высококачественной стеклянной посуды в Японии.</p>
    <p>Кодзо Кагами сказал: «Мы должны стремиться к созданию истинной ценности, воздерживаясь от недальновидного, эфемерного творчества», и поддержал идею «монозукури-но-кокоро» или страсти к совершенству производства.</p>`,
    additionalDescription: ``,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [cups3, tomobakoWooden]
  },
  {
    id: 2509,
    name: 'Пиала Карацу мастера Накадзато Тароэмона XIII',
    age: 'около 1990 года',
    style: 'karatsu',
    category: 'cups',
    potterName: 'Накадзато Тароэмон XIII',
    potterJapaneseName: '中里太郎右衛門',
    potterLifeDates: '1923-2009',

    description: `Юноми выполнена около 1990 года мастером Накадзато Тароэмоном (中里太郎右衛門) в тринадцатом поколении (1923-2009). Династия уже около 420 лет работает в семейной печи, которая расположена в городе Карацу, префектура Сага. Вещи украшены простыми растительным узорами и кромка подчеркнута железосодержащим пигментом того же цвета. Мастер использует печать, состоящую из трёх точек.`,

    potterPhoto: 'nakazato-taroemon-13.jpg',
    potterInfo: `<p>Унаследовав стиль своего отца, возродившего технику Ко-Карацу (старая Карацу) и придерживаясь традиций, мастер разработал свою собственную технику «постукивания»* и создавал современную керамику с высокой степенью артистизма. Также он активно изучал происхождение керамики Карацу при изготовлении своих работ, а результаты исследований опубликовал во множестве диссертаций и представил их в 2004 году. Докторская диссертация «Исследования керамики Карацу» была признана Киотским университетом искусств, где он получил докторскую степень.</p>
    <p>В 2002 году мастер передал династическое имя своему сыну, Наказато Тароэмону в 14-м поколении. Мастер скончался 12 марта 2009 года в возрасте 85 лет.</p>
    <p>* — Татаки (или постукивание) — техника формирования из глины длинной «струны», укладки ее по спирали, чтобы сформировать сосуд, а затем сглаживания стыков и придания ей формы путем постукивания по поверхности деревянным молотком по деревянным рейкам, помещенным внутри сосуда. На досках и молотке есть резьба для безопасного отделения от глины, а также они создают декоративный эффект, как если бы на поверхности сосуда был выгравирован узор.</p>
    <span>Некоторые вехи в карьере мастера:</span>
    <ul>
    <li>1943 окончил Токийский колледж промышленных искусств (ныне инженерный факультет Университета Тиба), факультет ремесленного дизайна</li>
    <li>1951 получил первый приз на 7-й Выставке Японского Искусства с керамической резьбой «Корова»</li>
    <li>1956 получил премию Хокуто за «Вазу Татаки Мисима» на 12-й Выставке Японского Искусства</li>
    <li>1961 получил премию Японского Керамического Общества (社団法人 日本陶磁協会) за вазу на 3-й выставке Ниттэн</li>
    <li>1962 получил приз на 5й выставке Ниттэн и на следующих 4х</li>
    <li>1964 экспонируется на Выставке Искусства Шедевров (名作美術展), спонсируемой 18-м Олимпийскими играми, Национальным музеем современного искусства и Музеем Гото</li>
    <li>1965 командирован Министерством иностранных дел в качестве члена инспекционной группы Берлинского фестиваля искусств Ассоциации современных художников-ремесленников, также совершает поездку по Ближнему Востоку Европы</li>
    <li>1966 впервые посетил Корею в качестве члена группы экономической инспекции префектуры Сага</li>
    <li>1966 стал судьей 9-й выставки Ниттэн</li>
    <li>1967 стал участником выставки Ниттэн</li>
    <li>1968 экспонируется на «Выставке современного керамического искусства нового поколения» (現代陶芸の新世代展), спонсируемой Национальным музеем современного искусства,в Киото и Токио</li>
    <li>1968 «Керамический горшок» (叩きづくりの壺) выставлен на 9-й выставке Ниттэн, приобретен Министерством образования и выставлен в Национальном музее современного искусства в Киото</li>
    <li>1969 стал новым главой печи и принял имя Накадзато Тароэмон в 13м поколении</li>
    <li>1970 «Расписанная ваза Карацу» (絵唐津壺) экспонировалась на «Специальной выставке современного керамического искусства (Япония и Европа)» (現代陶芸特別展 (日本とヨーロッパ)), спонсируемой Национальным музеем современного искусства в Киото</li>
    <li>1973 «Выставка отца и сына Накадзато Тароэмон» (中里太郎右衛門父子展), спонсируемая корейской газетой Сеул Синмун, проходит в Сеульском музее современного искусства</li>
    <li>1976 стал советником выставки Ниттэн</li>
    <li>1979 организовал передвижную выставку Карацу в Европе</li>
    <li>1981 получил премию премьер-министра за «Горшок Татаки Карацу Мисима» (叩き唐津三島手付壺), представленный на 13-й выставке Ниттэн</li>
    <li>1984 выиграл приз Академии художеств Японии за «Бутылку Татаки Карацу», представленную на 15-й выставке Ниттэн</li>
    <li>1985 стал директором Ниттэн</li>
    <li>1990 назначен заместителем председателя Японской Ассоциации Мастеров Никкокаи (日工会)</li>
    <li>1992 признан важным нематериальным культурным достоянием префектуры Сага</li>
    <li>1992 стал судьей 24-й выставки Ниттэн</li>
    <li>1995 получил награду правительства города Карацу, в том же году получил медаль с темно-синей лентой</li>
    <li>1997 повторно получил медаль с синей лентой</li>
    <li>2000 стал председателем Японской ассоциации мастеров</li>
    <li>2004 получил докторскую степень в Киотском университете</li>
    <li>2007 стал членом Японской художественной академии</li>
    <li>2008 получил Орден Восходящего Солнца</li>
    </ul>`,

    additionalPhotos: false,
    additionalPhotosCount: undefined,
    additionalDescription: `<p>Линия преемственности Тароэмон:<br>I. Матасити ум. 1663<br>II. Тароэмон ум. 1670<br>III. Дзин-эмон ум. 1703<br>IV. Тароэмон ум. 1744<br>V. Кихэидзи ум.1757<br>VI. Тароэмон ум. 1786<br>VII. Тодзи ум. 1811<br>VIII. Тароэмон ум. 1817<br>IX. Сёхэи ум. 1825<br>X. Тотаро ум. 1892<br>XI. Тэню ум. 1924<br>XII. Тароэмон (Муан) ум. 1985<br>XIII. Тароэмон (Хоуан) ум. 2009<br>XIV. Тароэмон</p>`,

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
    id: 2595,
    name: 'Пиала Куромута мастера Марута Масами',
    age: 'до 1980',
    style: 'kuromuta',
    category: 'cups',
    potterName: 'Марута Масами',
    potterJapaneseName: '丸田 正美',
    potterLifeDates: '(10.09.1925 — 6.12.1979)',

    description: `<p>Детальное описание в процессе подготовки</p>
    <p>Надписи на крышке: 黒牟田焼 — керамика Куромута (справа сверху на лицевой стороне), 湯呑 — юноми («пиала», посередине на лицевой стороне), 黒牟田 — Куромута (посередине на обратной стороне крышки), 丸田正美 — имя мастера (слева на обратной стороне, пересекающееся с печатью 正美)</p>`,

    potterPhoto: '',
    potterInfo: `<p>Мастер Марута Масами (10.09.1925 — 6.12.1979) родился в городе Такео, префектура Сага. В 1942 году окончил Факультет керамики Технической средней школы Арита (佐賀県立有田工業高校窯業科). С 1950 года учился у Сёдзи Хамады. В 1960 году получил высшую награду на выставке префектуры Сага (佐賀県展で最高賞). В 1963 году выбран для участия в 37-й Национальной выставке (国展). В 1966 получил высшую награду на западной выставке Японской ассоциации Когэй (日本工芸会西部展). С 1970 года участвует в выставке японских традиционных ремесел (日本伝統工芸展). С 1973 года выставляется на выставке Итимидзукай (一水会展). В 1978 году стал постоянным членом Японской ассоциации Когэй (日本工芸会). В том же году участвует в Выставке трёх человек керамического искусства Кюсю (九州陶芸三人展) в главном магазине Токю (東急本店).</p>
    <p>Для воспроизводства уникального стиля народного искусства, мастер использовал традиционную технику обжига Куромута с соляной глазурью, которая была открыта в конце периода Момояма. В его резиденции был создан и открыт для публики Музей народной художественной керамики Хидзэн (肥前民芸陶器館). Мастера скончался в Национальной больнице Урэсино в районе Фудзицу префектуры Сага 6 декабря 1979 года из-за рака желудка.</p>`,

    additionalPhotos: false,
    additionalPhotosCount: undefined,
    additionalDescription: ``,

    price: 0,
    height: undefined,
    length: undefined,
    width: undefined,
    diameter: undefined,
    footDiameter: undefined,
    weigth: undefined,
    volume: undefined,
    weightOfSet: undefined,
    complectation: [cup, tomobakoWooden],
    preservation: 'состояние новой'
  },
  {
    id: 2751,
    name: 'Мэото юноми (парные пиалы) Кохики мастера Тоиты Такацуги',
    potterName: 'Тоита Такацуги',
    potterJapaneseName: '筧田 孝嗣',
    potterPhoto: '',
    additionalPhotos: false,
    category: 'cups',
    style: 'kohiki',
    description: `<p>На данный момент описание доступно на японском языке</p>`,
    potterInfo: `<p>日本工芸会正会員<br/>
神通窯<br/>
昭和18年<br/>
■富山市塚原に生まれる<br/>
昭和45年<br/>
■師吉田耕三（美術評論家）に作陶指導を受ける<br/>
昭和46年<br/>
■小川哲男（熊本）に師事する<br/>
昭和53年<br/>
■清水卵一（京都）に指導を受け現在に至る<br/>
昭和55年<br/>
■日本伝統工芸展初入選 55,56,57,58年入選<br/>
日本工芸会正会員、以後出品入選<br/>
昭和56年<br/>
■第6回日本陶芸展にて優秀作品・毎日新聞社賞、以後入選<br/>
■富山県民会館にて個展3回、富山、糸魚川、大丸東京<br/>
■ギャラリー丹羽（神田）にて個展2回<br/>
■大丸東京店にて赤会展2回<br/>
昭和56年<br/>
■NNS （日本テレビくらしのやきもの展）新宿伊勢丹に招待出品<br/>
■'84富山の作家選抜展出品<br/>
■粉引大壷、灰釉大鉢富山県買上<br/>
■粉引大壺、刷毛目大鉢富山市立鄉土博物館買上<br/>
昭和59年<br/>
■カーター前アメリカ大統領に大鉢器贈呈（富山県）<br/>
昭和61年<br/>
■憲円宮様に大鉢献上（北陸カナダ協会）<br/>
■ブラジル大使（富山県）、カナダ大使釉大鉢粉<br/>
引花入贈呈（北陸カナダ協会）<br/>
昭和63年<br/>
■特別展（現代北陸陶芸の美）招待出品
</p>`,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [cups2, tomobakoWooden, paperDocument]
  },
  {
    id: 2757,
    name: 'Юноми Ига мастера Атараси Кадзо',
    age: '~1980',
    style: 'iga',
    category: 'cups',
    potterName: 'Атараси Кадзо',
    potterJapaneseName: '新 佳三',
    potterLifeDates: '1948 -',

    description: `<p>Пиала Ига, созданная мастером Атараси Кадзо (新 佳三), работающим в печи Корин-гама (光林窯). Прекрасный образец керамики Ига, выполненный из грубой глины с включениями мелких камешков, расплавившихся в процессе обжига. Пиала внутри и частично снаружи покрыта толстым слоем зольной глазури. По тулову видны бороздки, оставленные пальцами мастера при формовке на гончарном круге. На дне пиалы стоит марка печи 光林窯 и знак мастера 佳 - являющийся частью его имени</p>
    <p>Надписи на коробке: 伊賀 - Ига (справа сверху), 湯呑 - юноми (пиала, по центру), 佳三造 - создано Кадзо (слева внизу, под печатью мастера)</p>`,

    potterPhoto: 'atarashi-kazo.jpg',
    potterInfo: `<p>Мастер родился в Осаке в 1948 году. После окончания университета он работал в гончарной мастерской Масико в префектуре Тотиги. Позже он узнал, что в городе Ига есть почва, пригодная для гончарного дела, и стал часто посещать город. В 1974 году помогал своему старшему брату Кандзи, работая в печи Ига Сангэн, а в 1981 году стал независимым и основал в том же городе собственную печь Корин.</p>
    <p>Работы мастера отбирались для городской выставки (市展), выставки префектуры (県展), выставки ассоциации Синсё Когэй (新匠工芸会展), выставки японских традиционных ремесел отделения Токай (日本伝統工芸東海支部展), художественной выставки чайной церемонии завтрашнего дня (明日への茶道美術展) и многих других. Провёл множество персональных и групповых выставок. Является членом Ассоциации керамики Иги (伊賀陶芸会) и директором Ассоциации художников-керамистов Миэ (三重陶芸作家協会)</p>
    <span>Некоторые вехи в карьере мастера: </span>
    <ul>
    <li>1971 окончил экономический факультет Киотского университета Сангё (京都産業大学)</li>
    <li>1972 грешил стать гончаром и благодаря предпокровительству г-на Сёдзи Камода (加守田章二) устроился студентом-исследователем в <a href="https://tsukamoto.net/">компанию Масико Цукамото</a></li>
    <li>1974 работал в печи Уэно Сангэн (上野三軒窯) в поисках глины</li>
    <li>1981 переехал в город Ига и построил печь Корин (光林窯)</li>
    <li>1995 изготовил свадебные сувениры для г-на Синмона из школы буддизма Сисню Такада (真宗高田派)</li>
    <li>1996 изготовил памятные вещи для Церемонии Подношения Фонарей (伝灯奉告法会) Главного священника школы Синсю Такада</li>
    <li>2008 подарил вазу Ига, названную Ксугаяма (銘春日山), святилищу Касуга Тайся в Наре (奈良春日大社)</li>
    </ul>`,

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
    complectation: [cup, tomobakoWooden, paperDocument],
    preservation: undefined
  },
  {
    id: 2759,
    name: 'Юноми с хвощём',
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: 'cups',
    style: 'unknown',
    description: `<span>На данный момент описание доступно на японском языке</span>`,
    potterInfo: `<p>元行動美術協会々員<br/>
    小西嘉純<br/>
    住所 香川県仲多度郡琴平町榎井 334の5<br/></p>
    <p>画歴</p>
    <ul>
    <li>大正9年 5月 香川県仲多度郡琴平町榎井に生れる</li>
    <li>昭和23年3月 創造美術協会展出品K賞受賞<br/>
    〃 年5月 行動美術協会全関西展出品画人賞受賞<br/>
    〃 年9月 第3回行動美術協会展出品入選</li>
    <li>昭和24年5月 創造美術協会々員に推薦</li>
    <li>〃 30年9月 行動美術協会々友に推薦</li>
    <li>〃 33年 現代具象作家新人100人展に依嘱出品</li>
    <li>〃 44年 高松市石清水会館壁画作成<br/>
    〃 高知鉄道会館壁画作成</li>
    <li>〃 45年8月 香川ビルマ会慰霊塔壁画作成<br/>
    〃 9月 行動美術協会々員に推薦</li>
    <li>〃 47 年徳島駅東ビル壁画作成</li>
    <li>〃 54年愛媛ビルマ会慰霊塔壁画作成<br/>
    香川県及高松市立美術館作品蔵</li>
    <li>〃 57年 総本山善通寺宝物殿作品蔵</li>
    <li>〃 60年 香川県展五十周年記念に感謝状を受ける<br/>
    画業五十年の歩み展を善通寺画廊にて開催</li>
    <li>〃 61年11月 香川県教育文化功労者として表彰される</li>
    <li>63年 松山郵政局の依頼により年賀状 「香川より<br/>
    見た瀬戸大橋」を描く</li>
    <li>平成2年 香川の現代作家シリーズ小西嘉純展香川県<br/>
    文化会館にて開催</li>
    <li>平成3年 観音寺市琴弾公園内 「雅の郷」<br/>
    能楽堂の壁画作成<br/>
    〃 高松市広田八幡神社拝殿天井画作成<br/>
    平成4年 丸亀みなと公園旧金毘羅街道案内板作成<br/>
    香川県展審査員7回<br/>
    香川県展実行委員3回<br/>
    外遊 (東南アジア) 4回</li>
    </ul>`,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [cup, tomobakoWooden, protectiveCloth, paperDocument]
  },
  {
    id: 2769,
    name: 'Пара пиал Кутани мастера Морисавы Сёдзо',
    age: undefined,
    style: 'kutani',
    category: 'cups',
    potterName: 'Морисава Сёдзо',
    potterJapaneseName: '森澤 昭三',
    potterLifeDates: '',

    description: ``,

    potterPhoto: '',
    potterInfo: `<p>Морисава Сёдзо (森澤 昭三) — мастер-гончар, работающий в технике Кутани (九谷焼). В 1954 поступил в Научно-исследовательский институт керамики префектуры Исикава (石川県立陶磁器研究所) и работал под руководством г-на Китаямы Унпэя (北山雲平), в процессе чего изучил основные техники, такие как окраска и лепка. Далее он учился у г-на Ясокити Токуда I (徳田八十吉) — живого национального достояния, перенимая его мастерство и изучал технику Ко-Кутани (古九谷 — техника старого Кутани), современную курамику и каллиграфию у мастера Ясокити II.</p>
    <p>После того, как Ясокити I скончался, Сёдзо Морисава ушел из семьи Токуда и начал своё собственное дело. Мастер разработал свои собственные глазу и техники надглазурного декора, получив широкую известность и признание.</p>
    <p>Мастер отбирался для участия в Выставке современного искусства (現代美術展) и Выставке керамического искусства Иссуикай (一水会陶芸展), выставлялся на выставке Ниттэн (日展), был представлен на выставке керамического искусства Асахи (朝日陶芸展) и многих других.</p>`,

    additionalPhotos: false,
    additionalPhotosCount: undefined,
    additionalDescription: `<p>Цитата мастера<br>
    Я хотел бы посвятить себя созданию керамики Кутани, более красивой, весомой и соответствующей чувству ваби, используя свои собственные глазури и техники.<br>
    私はこれからも独自の釉薬と手法を以ってより美しく重厚で侘の漂う九谷焼の製作に精進したいと思います</p>`,

    price: 0,
    height: undefined,
    length: undefined,
    width: undefined,
    weigth: undefined,
    weightOfSet: undefined,
    complectation: [cups2, tomobakoWooden, paperDocument],
    preservation: undefined
  },
  {
    id: 2826,
    name: 'Мэото юноми (парные пиалы) из корейского селадона',
    age: '~1992',
    style: 'seiji',
    category: 'cups',
    potterName: '',
    potterJapaneseName: '青珍 梁命煥',
    potterLifeDates: '',

    description: `<p>Пара селадоновых пиал, изготовленных в Корее около 1992 года мастером, имя которого известно только в виде кандзи 青珍 梁命煥, а также, что они были созданы в Научно-исследовательском институте керамики (青珍陶芸研究所). Достаточно сложно сказать что-то конкретное об этой паре пиал, так как они сделаны в Корее, но коробка и бумажный документ оформлены японскими кандзи. В документе указан адрес в провинции Кёнгидо в Южной Корее.</p>
    <p>На документе есть напутствие от мастера, которое переводится примерно так:</p>
    <p>«Двадцать лет прошло с тех пор, как я посвятил свою жизнь керамическому искусству. Чтобы освоить традиционное керамическое искусство, переданное предками, которые были очарованы блестящим селадоном династии Корё, не знающим равных за 5000-летнюю историю, я 15 лет получал знания от учителя <a href="https://en.wikipedia.org/wiki/Yu_Geun-Hyeong">Yu Geun-Hyeong (柳根瀅)</a>. Я хотел бы посвятить свою жизнь работе с землей, занимаясь традиционным гончарным искусством, которое я изучил, непрерывным исследованием и творческой деятельностью.»</p>`,

    potterPhoto: '',
    potterInfo: `<span>В документе есть информация на японском языке о карьере мастера:</span>
    <ul>
    <li>1969 поступил в Институт исследования селадона Haegang (海剛 青磁研究所)</li>
    <li>1971 выставляется на Национальном конкурсе ремёсел (全国民芸品競進大会)</li>
    <li>1972 выставляется в Музее современного искусства Корё (高麗現代美術館) в Токио</li>
    <li>1974 победитель Национального конкурса ремёсел (全国民芸品競進大会)</li>
    <li>1979 победитель выставки «Живые национальные сокровища» (人間文化財工芸展)</li>
    <li>1980 выставляется на Выставке традиционных ремесел (伝承工芸展)</li>
    <li>1981 становится членом Корейской ассоциации традиционной керамики (韓国伝承陶芸協会)</li>
    <li>1981 выставляется на Выставке корейского селадона в Токио (東京高麗青磁展)</li>
    <li>1982 приз Конкурса народных промыслов (民芸品 競進大会)</li>
    <li>1983 победитель Конкурса корейской традиционной керамики (韓国伝統陶芸大会)</li>
    <li>1984 становится учеником Yu Geun-Hyeong и учится в течение 15 лет</li>
    <li>1984 основывает Институт исследования керамики (青珍陶芸研究所)</li>
    <li>1984 экспонируется на выставке керамики Китакюсю, Япония (日本北九州市陶磁器展)</li>
    <li>1985 участвует в Международной торговой ярмарке (国際見本市), Токио</li>
    <li>1985 экспонируется на выставке универмагов Даймару (大丸) в Токио и Мацудзакая (松坂屋) в Ёкогаме</li>
    <li>1985 выставляется на Выставке Художественной Ассоциации Корейского Керамического Искусства (韓国陶芸協会展)</li>
    <li>1986 выставляется на Выставке универмага Токю Нихобаси (日本橋 東急百貨店 展示), Токио</li>
    <li>1986 экспонируется на выставке керамики в универмаге Синдзюку Кэйо (新宿京王百貨店 展示), Токио</li>
    <li>1986 экспонируется на выставке керамики в универмаге Мицукоси (三越百貨店 展示), Токио</li>
    <li>1987 победитель Большого фестиваля традиционных ремесел (伝承工芸 大祭典)</li>
    <li>1988 экспонируется на выставке керамики в универмаге Тобу (東武百貨店 陶芸展), Токио</li>
    <li>1989 участвует в выставке двух человек в универмаге Одакю (小田急百貨店 展示) с г-м Андо Го (安東五)</li>
    <li>1992 экспонируется на выставке культурного обмена корейско-японского керамического искусства (韓日陶芸文化交流展)</li>
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
    complectation: [cups2, tomobakoWooden, protectiveCloth],
    preservation: undefined
  },
  {
    id: 2831,
    name: 'Селадоновые мэото юноми (парные пиалы) мастера Като Минору',
    age: `~1990`,
    style: 'seiji',
    category: 'cups',
    potterName: 'Като Минору',
    potterJapaneseName: '加藤 実',
    potterLifeDates: '',

    description: `<p>Пара красивых селадоновых пиал цвета морской волны (青磁考 — сэйдзи иро), выполненных около 1990 года мастером Като Минору (加藤 実).</p>
    <p>В комплекте с пиалами идёт деревянная коробка, две защитные ткани и бумажный документ. На крышке коробки есть каллиграфия: 青磁 — селадон (справа сверху), 湯呑 — пиалы (в центре), 加藤作 — работа Като (над красной печатью, предположительно 貫).</p>`,

    potterPhoto: '',
    potterInfo: `Като-сан родился в 1932 году третьим сыном основателя династии гончаров Като Кэйдзана (加藤 渓山). В 1954 году окончил Университет Рицумэйкан (立命館大学) и начал обучаться гончарному делу у отца. После смерти отца в 1962 году, он открыл основал свою печб Цубанака-гама (壺中窯) в Кинугасе, Киото, и вступил в Киотский ремесленный совет (京都クラフト協議会), посвященный изучению обжига селадона. Начиная с 1980 года, мастер участвует во множестве персональных и общих выставок в Киото, Осаке, Токио, Нагое и других городах.`,

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
    complectation: [cups2, tomobakoWooden, protectiveCloth, paperDocument],
    preservation: undefined
  },
  {
    id: 2834,
    name: 'Юноми Тобэ мастера Като Ивао',
    age: undefined,
    style: 'tobe',
    category: 'cups',
    potterName: 'Като Ивао',
    potterJapaneseName: '加藤 巌',
    potterLifeDates: '',

    description: `<p>Селадоновые пиалы работы мастера Като Ивао (加藤 巌), работающего в Тобэ и занимающегося изготовлением изделий сэйдзи — белоснежного селадона. Пиалы идут без документов, поэтому о мастере нет дополнительной информации.</p>
    <p>На крышке коробки есть надписи: とべ焼 — керамика Тобэ, 青磁湯呑 — селадоновые пиалы, 日本工芸会正会員 — постоянный член японской организации народных промыслов (Когэй), 巌作 — сделано Ивао</p>`,

    potterPhoto: '',
    potterInfo: ``,

    additionalPhotos: false,
    additionalPhotosCount: undefined,
    additionalDescription: `<p>Город Тобэ известен как ведущий в регионе Сикоку район по производству керамических изделий. Что делает керамику Тобэ уникальной, так это ее красивая белая керамическая текстура, которая, кажется, пропускает свет. По сравнению с керамикой Арита (изготовленной в префектуре Сага), белая керамическая текстура керамики Тобэ имеет легкий серый оттенок, что придаёт ей уникальный характер.
    </p>
    <p>Керамика Тобэ родом из города Тобэ, располагающегося в районе Иё префектуры Эхимэ. Производство её началось в 1777 году, когда домен Одзу на территории нынешнего района Иё самостоятельно начал производить керамические изделия. Домен специализировался на производстве точильных камней Иё — иёто (伊豫砥), но так как ресурс был редким, посуду изготавливали из остатков этого камня.</p>
    <p>В период Эдо (1603-1868 гг.) керамика Тобэ производилась независимо, поскольку информация из других доменов была ограниченной. После отмены феодальных владений и учреждения префектур в 1871 г. в период Мэйдзи (1868-1912 гг.) стало возможным перенимать технологии из известных производственных районов, таких как Карацу и Сэто, что привело к быстрому расширению производства продукции Тобэ.</p>
    <p>В 1976 году Министерство экономики, торговли и промышленности зарегистрировало керамику Тобэ в качестве традиционного ремесла.</p>`,

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
    id: 2847,
    name: 'Юноми Агано мастера Кумагаи Коё 15',
    potterName: 'Кумагаи Коё 15',
    potterJapaneseName: '15代熊谷紅陽',
    potterPhoto: '',
    potterLifeDates: '1912-1992',
    additionalPhotos: false,
    category: 'cups',
    style: 'agano',
    description: `<p>Чашка, выполненная в технике Агано (上野燒), одной из так называемых «Семи печей Кобори Энсю (遠州七窯), постоянным членом Японской Ассоциации Когэй (日本工芸会) мастером Кумагаи Коё в 15 поколении (十五代 熊谷紅陽). Керамика Агано, производство которой ранее в период Мэйдзи было прекращено, была возрождена при поддержке правительства Кумагаем Кухатиро, который стал мастером в 13-м поколении, последовавшим за двенадцатью поколениями, работавшими в технике Агано еще с феодальных времён.</p>
    <p>Пиала выполнена из глины с большим содержанием песчинок и равномерно покрыта глазурью желтовато-бежевого оттенка. Печать мастера стоит возле ножки пиалы.</p>`,
    potterInfo: `<p>Мастер родился 13 февраля 1912 года в Уэно, город Акаикэ, район Тагава, префектуре Фукуока (福岡県田川郡赤池町上野). В марте 1929 получил награду губернатора (卒業知事賞) за окончание средней технической школы Арита префектуры Сага (佐賀県立有田工業学校). Далее вошел в семейное дело под руководством отца Рюхо (竜峯) — мастера в 14м поколении. Мастера не стало в 1992 году.</p>
    <span>Некоторые вехи в карьере мастера:</span>
    <ul>
    <li>1937 апрель — персональная выставка в Кокура Изутсуя, Китакюсю (北九州市小倉井筒屋)</li>
    <li>1943 май — по заказу армии начал гончарное дело в Корее для местной самообеспеченности, участвовал в церемонии вручения наборов для саке Его Превосходительству Томоюки Ямасите (山下奉文), командующему армией того времени</li>
    <li>1945 16 октября — вернулся из Кореи в семейное дело</li>
    <li>1951 октябрь — персональная выставка в Тамайе, Фукуока (福岡市玉屋)</li>
    <li>1953 апрель — награжден на Национальном конкурсе керамики (全国陶磁器コンクール)</li>
    <li>1954 15 апреля — получил в храме Дайкакудзи (大覚寺) благодарственное письмо императора за заслуги</li>
    <li>1960 — удостоился чести подарить в качестве поздравления Его Величеству Императору вазу</li>
    <li>1965 3 ноября — получил благодарственное письмо за заслуги за создание особенных вещей префектуры Фукуока на фестивале Мэйдзи Дзингу (明治神宮大祭)</li>
    <li>1966 май — совместная выставка с Ассоциацией Керамики Агано (上野焼組合) в универмагах Сэйбу в Икэбукуро, Токио (東京都池袋西武百貨店)</li>
    <li>1966 сентябрь — отобран для выставки Японских традиционных ремесел (日本伝統工芸展)</li>
    <li>1966 ноябрь — выставка отца и сына (父子展) в Хаката Даймару, Фукуока (福岡市博多大丸)</li>
    <li>1967 сентябрь — отобран для выставки Японских традиционных ремесел</li>
    <li>1968 сентябрь — отобран для выставки Японских традиционных ремесел</li>
    <li>1969 июль — отобран для выставки западных ремесел (西部工芸展)</li>
    <li>1969 сентябрь — отобран для выставки Японских традиционных ремесел, а также для 1-й выставки керамического искусства Кюсю (九州陶芸展), получил награду за отличную работу — премию музея искусств Идэмицу (出光美術館賞)</li>
    </ul>`,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [cup, tomobakoWooden, paperDocument]
  },
  {
    id: 2848,
    name: 'Пиала Хаги с листом клёна мастера Иори Сюраиси',
    age: undefined,
    style: 'hagi',
    category: 'cups',
    potterName: 'Иори Сюраиси',
    potterJapaneseName: '庵松籟',
    potterLifeDates: '',

    description: `<p>Пиала юноми, выполненная мастером Иори Сюраиси (庵松籟) в печи Дзёдзан-гама (城山窯), располагающейся в городе Хаги, у подножья руин замка, некогда принадлежавшего клану Мори.</p>
    <p>У пиалы прекрасная форма, она очень хорошо лежит в руке. Глазурь не похожа на классическую глазурь Хаги - цвета более серо-коричневые, нежели бежево-розовые. Мастер, возможно, хотел подчеркнуть осеннее настроение, чтобы дополнить ощущение, которое передаёт кленовый лист, ассоциирующийся в Японии с осенним периодом.</p>`,

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
    footDiameter: undefined,
    weigth: undefined,
    volume: undefined,
    weightOfSet: undefined,
    complectation: [cup, tomobakoWooden, paperDocument],
    preservation: `состояние новой`
  },
  {
    id: 2939,
    name: 'Юноми Хаги мастера Ямато Хосо',
    age: '1983',
    style: 'hagi',
    category: 'cups',
    potterName: 'Ямато Хосо',
    potterJapaneseName: '大和保罗',
    potterLifeDates: '',

    description: `<p>Чашка создана мастером Ямато Хосо (大和 保罗) в семейной печи Ямато-сёроку-гама (大和松緑窯). В документе сказано, что чашка обожжена в ноябре 1983 года (один из дней 11 луны года Сёва 58).</p>
    <p>Чашка в комплекте с защитной тканью, бумажным документом и деревянной коробкой. На крышке коробки есть каллиграфия 萩焼 (керамика Хаги), 湯呑 (юноми), 大和造 (сделано Ямато) и стоит печать Ямато.</p>
    <p>На одной из сторон коробки написано 米寿 — что может быть отсылкой к подарку на 88-летие, так как это сочетание традиционно используется в таких случаях. Иероглиф 米 похож на цифру «88», составленную из иероглифов 八十八, а 寿 означает «долголетие».</p>`,

    potterPhoto: '',
    potterInfo: `<p>Печь и династия ведут своё начало от года Мэйдзи 25 (1892), когда Ямато Сакутаро (大和作太郎), творческое имя которого было Сёроку (松緑) с тремя своими сыновьями Сёити, Харунобу, и Ёситака (正一, 春信, 吉孝) перенёс производство из места Мацумото (松本), располагавшегося недалеко от храма Токодзи (東光寺横) города Хаги на нове место в Ямагути (山口), оставив старую печь. Ямагути был центром производства керамики Хаги и там были хорошие залежи глины.</p>`,

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
    complectation: [cup, tomobakoWooden, protectiveCloth, paperDocument],
    preservation: undefined
  },
  {
    id: 2944,
    name: 'Пара пиал Хаги мастера Ога Кадзуюки',
    age: '~1998',
    style: 'hagi',
    category: 'cups',
    potterName: 'Ога Кадзуюки',
    potterJapaneseName: '大賀 和幸',
    potterLifeDates: '1956-',

    description: `<p>Интересная пара пиал, созданная около 1998 года мастером Ога Кадзуюки (大賀 和幸) в печи Тинсю-гама (椿秀窯). У пиал интересная форма, с декором в виде диагональных и горизонтальных засечек, созданным шпателем. Глина с большим содержанием кварца создаёт особый визуальный шарм и интересные тактильные ощущения. Резкие переходы от бежево-розового к серому добавляют пиалам драматизма. Особо внимания заслуживает кодай (ножка пиал) - среднее между токин кодай (兜巾, ножка в виде шлема) и кайдзири кодай (貝尻高台, спиралевидная ножка). Верх пиал бежево-розового цвета, покрыт множеством бледных пятен гохонтэ.</p>`,

    potterPhoto: '',
    potterInfo: `<span>Мастер родился в 1956 году в префектуре Ямагути и участвовал во множестве выставок, в частности:</span>
    <ul>
    <li>1989 городская художественная выставка города Хаги (萩市美術展) и выставка керамического искусства Западной Японии (西日本陶芸美術展)</li>
    <li>1991 выставка керамики Кюсю Ямагути (九州山口陶磁展) и художественная выставка Фестиваля искусств префектуры Ямагути (山口県芸術祭美術展)</li>
    <li>1992 художественная выставка Фестиваля искусств префектуры Ямагути</li>
    <li>1995 выставка керамики Кюсю Ямагути, выиграл гран при Ниссин Мэнбати (日清めん鉢)</li>
    <li>1997 получил приз на выставке керамики Кюсю Ямагути, получил награду председателя Ассоциации керамики Арита (有田陶磁器組合長賞)</li>
    <li>1998 принимал участие в освещении храма Мэйдзи (明治神宮)</li>
    <li>2000 выставка керамического искусства Западной Японии</li>
    <li>2001 выставка керамики Кюсю Ямагути</li>
    </ul>`,

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
    complectation: [cups2, tomobakoWooden, protectiveCloth],
    preservation: undefined
  }
];
