setHelpers([ 
	"Один разряд двоичного кода (двоичная цифра) может принимать только два взаимоисключающих значения: «да» или «нет».", 
	"Основная единица количества информации, воспринимаемая и обрабатываемая в компьютере. Она соответствует восьми битам.", 
	"Минимальная последовательность смежных двоичных цифр, обрабатываемое как единое целое", 
	"При вычислении необходимо учитывать, что в 1 Мб 1024 байт.", 
	"Информационный вес каждого символа, выраженный в битах (b)и мощность алфавита (N) связаны между собой формулой: N=2b", 
	"8 бит=1 байт; 1 КилоБайт=1024 байт; 1 МегаБайт=1024Кб; 1 ГигаБайт=1024 Мб",
	"Для записи каждого символа - буква, цифра, знак препинания или пробел, отводится 1 байт", 
	"8 бит=1 байт; 1 КилоБайт=1024 байт; 1 МегаБайт=1024Кб; 1 ГигаБайт=1024 Мб", 
	"8 бит=1 байт; 1 КилоБайт=1024 байт; 1 МегаБайт=1024Кб; 1 ГигаБайт=1024 Мб", 
	"8 бит=1 байт", 
	"Для вычисления необходимо привести значения к единой единице измерения информации", 
	"Для вычисления необходимо использовать количественное значение 1Кб",
	"Для записи каждого символа - буква, цифра, знак препинания или пробел, отводится 1 байт", 
	"Для вычисления необходимо привести значения к единой единице измерения информации",
	"8 бит=1 байт; 1 КилоБайт=1024 байт; 1 МегаБайт=1024Кб; 1 ГигаБайт=1024 Мб" ]);
initData([ [ "Назовите минимальную единицу измерения информации:", "бит", "байт", "метр"],
		[ "Как называется цепочка из восьми нулей и единиц?", "байт", "бит", "килобайт"],
		[ "Для записи каждого символа - буква, цифра, знак препинания или пробел, отводится:", "один байт", "один бит", "восемь байт"],
		[ "Какое количество бит содержит сообщение объемом 1/512 Мбайта?", "2", "1", "3"],
		[ "Алфавит племени Мульти состоит из 8 букв. Какое количество информации несет 1 буква этого алфавита?", "3 бита", "1 бит", "4 бита"],
		[ "Расположите в порядке возрастания: А) 1 Гбайт  Б) 1 Кбайт   В) 1000 байт  Г) 10 Мбайт", "ВБГА", "ВГБА", "АГБВ"],
		[ "Сколько байт памяти надо для записи шуточного высказывания Оскара Уайльда: «Я такой умный, что иногда не понимаю ни единого слова из того, что говорю»?", "73", "584", "146"],
		[ "В какой из последовательностей единицы измерения указаны в порядке возрастания?", "байт, килобайт, мегабайт, гигабайт", "гигабайт, килобайт, мегабайт, байт", "мегабайт, килобайт, байт, гигабайт"],
		[ "Какой из указанных объемов информации больше?", "1 мегабайт", "1000 килобайт", "1 000 000 бит"],
		[ "Сколько бит в 10 байтах?", "80", "8000", "100"],
		[ "Определи, какое максимальное количество файлов размером 484582б можно разместить на диске, если доступно 1,44 Мб?", "три", "два", "четыре"],
		[ "Текст занимает 1/4 килобайта памяти компьютера. Сколько символов содержит этот текст?", "256 символов", "1000 символов", "312 символов"],
		[ "Для хранения текста требуется 84000 бит. Сколько страниц составит этот текст, если на странице размещается 30 строк по 70 символов в строке?", "5 страниц", "3 страницы", "4 страницы"],
		[ "Определи, какая из указанных величин больше: 0,78 Мб или 800 Кб", "они равны", "0,78 Мб", "800 Кб"],
		[ "Заполните пропуски числами: __Гбайт =1536 Мбайт = __ Кбайт", "1,5; 1572864", "1572864; 1,5", "1536; 1,5"] ], 3, 10);

setTime(60*10,true);