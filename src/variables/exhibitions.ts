import type { Exhibitions } from '../types/exhibitionType';

export const exhibitions: Exhibitions = [
  {
    id: 1,
    year: 2021,
    dates: '17 декабря - 17 января',
    city: 'Челябинск',
    place: 'Челябинский гос. исторический музей Южного Урала',
    name: 'Луна и Момидзи',
    link: '',
    description: '',
    photosCount: 10,
    poster: true,
    organisators: '',
    curators: `<ul>
    <li><a href="https://vk.com/id18845601">Наталья Смирнова</a> (г.Челябинск)</li>
    <li><a href="https://vk.com/id249439815">Галия Малоушкина</a> (г.Челябинск)</li>
    </ul>`,
    isPageActive: true
  },
  {
    id: 2,
    year: 2022,
    dates: '1 февраля - 4 марта',
    city: 'Миасс',
    place: '«Городской краеведческий музей» Миасского городского округа',
    name: 'Путь к Фудзи',
    link: '',
    description: '',
    photosCount: 0,
    poster: false,
    organisators: '',
    curators: `<ul>
    <li><a href="https://vk.com/id18845601">Наталья Смирнова</a> (г.Челябинск)</li>
    <li><a href="https://vk.com/id249439815">Галия Малоушкина</a> (г.Челябинск)</li>
    </ul>`,
    isPageActive: false
  },
  {
    id: 3,
    year: 2022,
    dates: '30 августа - 3 октября',
    city: 'Уфа',
    place: 'Выставочный зал «Ижад» Башкирского гос. худ. музея имени М. В. Нестерова',
    address: 'ул. Космонавтов 22',
    name: 'Путь к Фудзи',
    link: '',
    description: `<p>Выставочный проект «Путь к Фудзи» представляет собой собрание редких артефактов из частных коллекций и произведений современных уральских художников, созданных в традиционных техниках японского искусства.</p>
    <p>Выставка знакомит зрителей с традициями и особенностями японской культуры, принципами эстетического мировосприятия и освоения природного пространства, произведениями живописи, декоративно-прикладного искусства, каллиграфии, керамики, традиционного костюма.</p>
    <p>Экспозиция создана с учетом принципов основных организующих начал японского искусства – неизменным круговоротом времен года (кисэцукан): весны, лета, осени, зимы. Это пространство диалога артефактов традиционной японской культуры и произведений современных уральских художников.</p>
    <p>Пространство выставки – соприкосновение, сопряжение с культурой и традициями Страны восходящего солнца, которое позволяет зрителю почувствовать и насладиться обретенной гармонией «японской Вселенной».</p>
    <p>В пространстве зала представлены кимоно, фуросики, а также работы в техниках вышивки тэмари, монохромной живописи сумиэ, графики. Наиболее полно экспозиционная идея раскрывается в представленной на выставке частной коллекции японской керамики.</p>
    <p>В рамках выставки пройдут тематические мастер-классы и творческие встречи.</p>`,
    photosCount: 15,
    poster: true,
    organisators: `<ul>
    <li>Выставочный зал «Ижад» Башкирского гос-го худ-го музея имени М. В. Нестерова</li>
    <li>АНО ИКЦ «Ракуда» (Челябинское региональное отделение Общества «Россия – Япония»)</li></ul> 
 `,
    curators: `<ul>
    <li>Татьяна Капина (г.Уфа)</li>
    <li>Стелла Маркова (г.Уфа)</li>
    <li><a href="https://vk.com/id18845601">Наталья Смирнова</a> (г.Челябинск)</li>
    <li><a href="https://vk.com/id249439815">Галия Малоушкина</a> (г.Челябинск)</li>
    </ul>`,
    isPageActive: true
  },
  {
    id: 4,
    year: 2023,
    dates: '20 мая - 18 июня',
    city: 'Челябинск',
    place: 'Государственный исторический музей Южного Урала',
    address: 'ул. Труда, 100, фойе 2-го этажа Западной башни музея',
    name: 'Беседы о Востоке',
    link: 'https://russiajapansociety.ru/?p=48129',
    description: `<p>Фестиваль «Беседы о Востоке» задуман как серия выставоч-ных проектов, посвященных различным регионам Востока.</p>
    <p>Пилотная экспозиция представляет собой собрание редких артефактов из фондов Государственного исторического музея Южного Урала, а также частных коллекций и произведений современных художников, созданных в техниках японского традиционного искусства.</p>
    <p>Выставка знакомит зрителей с традициями и особенностями японской культуры, принципами эстетического мировосприя-тия и освоения природного пространства, произведениями каллиграфии, живописи, декоративно-прикладного искус-ства, керамики и традиционного костюма. Также представлены работы современного японского фотохудожника Дайсаку Икэда — «Диалог с природой».</p>
    <p>Экспозиция создана с учетом принципов основных органи-зующих начал японского искусства — неизменного кругово-рота времен года (кисэцукан): весны, лета, осени, зимы. Это пространство диалога артефактов традиционной японской культуры и произведений современных уральских и японских художников.</p>
    <p>Пространство выставки - соприкосновение, сопряжение с культурой и традициями Страны восходящего солнца, которое позволяет зрителю почувствовать обретенную гармонию "японской вселенной" и насладиться ею.</p>
    <p>В пространстве зала представлены кимоно, фуросики, а также работы в техниках вышивки тэмари, монохромной живописи суми-э, графики. Наиболее полно экспозиционная идея раскрывается в представленных на выставке частных коллекциях японской керамики и традиционной японской одежды.</p>`,
    photosCount: 11,
    poster: true,
    organisators: `<ul>
    <li>АНО ИКЦ"РАКУДА"</li></ul>`,
    curators: `<ul>
    <li><a href="https://vk.com/id18845601">Наталья Смирнова</a> (г.Челябинск)</li>
    <li><a href="https://vk.com/id249439815">Галия Малоушкина</a> (г.Челябинск)</li>
    </ul>`,
    isPageActive: true
  },
  {
    id: 5,
    year: 2024,
    dates: '23 марта - 27 апреля',
    city: 'Екатеринбург',
    place: 'Библиотека им. А.И. Герцена',
    address: 'ул. Чапаева, д. 5',
    name: 'Фестиваль Восточной Культуры',
    link: 'https://vostokfest.ru/',
    description: `<p>На фестивале вас ждут уникальные мероприятия, посвящённые культуре Японии, Кореи и Китая. Вы сможете посетить выставку винтажной японской посуды, попробовать свои силы в благородных искусствах Востока и обязательно узнаете много нового о культуре этих стран.</p>
    <p>На экспозиции будет представлена винтажная посуда для японской чайной церемонии из уникальной коллекции. Эта керамика не раскрывает полностью какую-то отдельную префектуру, стиль или вид исполнения изделий, а охватывает максимально широкий спектр регионов, техник и авторов. Это позволит сделать "срез" огромного пласта культуры Японии и взглянуть на страну под новым углом.</p>`,
    photosCount: 0,
    poster: true,
    organisators: `<ul>
    <li><a href="https://yume.center" target="_blank">Центр восточных языков и культуры "Юмэ"</a></li>
    <li><a href="https://vk.com/ekb_gachami" target="_blank">Клуб ценителей хорошего чая "Чайная Гавань"</a></li>
    </ul>`,
    curators: `<ul>
    <li><a href="https://vk.com/id4652198">Юлия Попова</a></li>
    <li><a href="https://vk.com/id51134852">Максим Долбилин</a></li>
    </ul>`,
    isPageActive: true
  },
  {
    id: 6,
    year: 2024,
    dates: '1 сентября - 20 октября',
    city: 'Курган',
    place: 'ГАУ Курганский областной Дом народного творчества',
    address: 'ул. гоголя, 30',
    name: 'Три благородных господина',
    description: `<p>Уникальная выставка, которая проводится в Кургане впервые. На ней будут представлены работы мастеров из Москвы, Санкт-Петербурга, Екатеринбурга, Челябинска, Дзержинска, Ростова-на-Дону, Севастополя и Кургана.</p>
    <p>Все работы, представленные на выставке, посвящены различным японским искусствам и ремеслам: тушевой живописи суми-э, каллиграфии, оригами, национальной японской вышивке сашико, батику сибори. Будут представлены образцы традиционной японской одежды - хаори, выполненные в новой, необычной технике.</p>
    <p>Большая часть работ созданы исключительно для данной выставки.</p>
    <p>Большинство мастеров, чьи работы все желающие смогут увидеть на выставке, являются мастерами мирового уровня, не раз представляли свои работы на международных выставках.</p>
    <p>"Жемчужиной" выставки станет частная коллекция чайной керамики: чайницы, бамбуковые принадлежности для приготовления чая, чаши сино, раку, тэммоку, вазы, выполненные японскими мастерами.</p>
    <p>Во время работы выставки ее гостей ждут творческие занятия, лекции, кинопоказы. Также все желающие смогут приобрести на память скетчбуки, календари, открытки, раскраски, значки и многое другое.</p>`,
    photosCount: 0,
    poster: true,
    organisators: `<ul>
    <li><a href="https://vk.com/public193971791" target="_blank">ИКЦ "Мидори" (отделение Общества "Россия - Япония", Курган)</a></li>
    <li><a href="http://kodnt.kurganobl.ru/" target="_blank">Курганский областной культурно-выставочный центр</a></li>
    </ul>`,
    curators: `<ul>
    <li><a href="https://vk.com/id224502196">Юлиана Данилова</a></li>
    <li><a href="https://vk.com/id201566146">Наталья Карпович</a></li>
    </ul>`,
    isPageActive: true
  }
];
