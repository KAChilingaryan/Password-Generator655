// Установка длины пароля
const passwordLength = document.querySelector('#len')
const lengthRange = document.querySelector('.length__range')

function lengthValueUpdate(currentLengthValue) {
	passwordLength.value = currentLengthValue;
	stripLength = lengthRange.offsetWidth
	step = (stripLength - passwordLength.offsetWidth) / (lengthRange.max - lengthRange.min)
	passwordLength.style.left = (currentLengthValue - 1) * step + 'px';
	securityLevel()
}

function passwordLengthReduction() {
	let currentLengthValue = lengthRange.value
	if (currentLengthValue != lengthRange.min) {
		currentLengthValue = Number(currentLengthValue) - Number(1)
		lengthRange.value = currentLengthValue;
		passwordLength.value = currentLengthValue;
		lengthValueUpdate(currentLengthValue)
		console.log(passwordLength)
	}
}

function passwordLengthIncreasing() {
	let currentLengthValue = lengthRange.value
	if (currentLengthValue != lengthRange.max) {
		currentLengthValue = Number(currentLengthValue) + Number(1)
		lengthRange.value = currentLengthValue;
		passwordLength.value = currentLengthValue;
		lengthValueUpdate(currentLengthValue)
		console.log(passwordLength)
	}
}

// Изменение картинки в зависимости от надежности пароля
const img = document.querySelector('.img')
function securityLevel() {
	if (lengthRange.value < 4) {
		img.src = './img/01.svg';

	} else if (lengthRange.value < 8) {
		img.src = './img/02.svg';

	} else if (lengthRange.value <= 12) {
		img.src = './img/03.svg';

	} else if (lengthRange.value <= 15) {
		img.src = './img/04.svg';
	}
}

// Генерация случайного пароля

// Массивы с исходными группами символов
var arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var arr_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var arr_symb = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~'];

// Ключевой массив в котором собираются выбранные группы символов
var arr_main = []

// Результат 
let password = ""
let passwordResult = document.querySelector(".result__password");


// Чекбоксы
const chbox_EN = document.getElementById('uppercase-checkbox');
const chbox_en = document.getElementById('lowercase-checkbox');
const chbox_num = document.getElementById('numerals-checkbox');
const chbox_symb = document.getElementById('signs-checkbox');

// Событие для кнопки generate
const generate = document.querySelector('.settings__submit');
keywordInput = document.querySelector(".keyword__input")

keywordInput.addEventListener('keypress', checkInput, false);

function checkInput(symb) {
	let charCode = symb.charCode;
	if (charCode < 65 || charCode > 122) {
		symb.preventDefault();
	}
}

generate.addEventListener('click', () => {
	// Обнуляем прошлый результат
	let chbox_status = 0
	password = ""

	keyword = keywordInput.value

	function arrConcat(arr) {
		arr_main = arr_main.concat(arr)
		chbox_status = 1
	}
	// Проверяем буквенную часть
	if (keyword != "") {
		if (chbox_EN.checked) {
			keywor_EN = keyword.toUpperCase()
			arr_main = arr_main.concat(keywor_EN.split(''))
			chbox_status = 1
		}
		if (chbox_en.checked) {
			keyword_en = keyword.toLowerCase()
			arr_main = arr_main.concat(keyword_en.split(''))
			chbox_status = 1
		}

	} else {
		if (chbox_EN.checked) {
			arrConcat(arr_EN)
		}
		if (chbox_en.checked) {
			arrConcat(arr_en)
		}
	}

	// Проверяем чекбоксы на символы и цифры
	if (chbox_num.checked) {
		arrConcat(arr_num)
	}
	if (chbox_symb.checked) {
		arrConcat(arr_symb)
	}
	// Защита от пустого массива
	if (chbox_status == 0) {
		if (keyword != "") {
			chbox_EN.checked = true
			keywor_EN = keyword.toUpperCase()
			arr_main = arr_main.concat(keywor_EN.split(''))
		} else {
			chbox_EN.checked = true
			arrConcat(arr_EN)
		}
	}

	// Составляем рандомный пароль
	for (let i = 0; i < lengthRange.value; i++) {
		var rand = Math.floor(Math.random() * arr_main.length);
		password = password.concat(arr_main[rand])
	}
	// Выводим результат
	passwordResult.innerText = password;
	// Обнуляем массив с символами
	arr_main = []
})

// кнопка скопировать и цвет копирования
// Решить вопрос с фото
// Адаптив