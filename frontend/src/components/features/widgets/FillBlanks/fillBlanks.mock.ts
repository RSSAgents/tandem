import { IFillBlanksTask } from '@/types/fillBlanks.types';

export const MOCK_FILL_BLANKS: IFillBlanksTask[] = [
  {
    id: 'fill-blanks-001',
    type: 'fill-blanks',
    payload: {
      code: `export default function factorial(number) {
  let result = 1;

  for (let i = 2; i <= number; i += 1) {
    result *= i;
  }

  return result;
}`,
      statements: [
        {
          id: 's1',
          text: 'Функция factorial вычисляет {{blank}} числа.',
          options: ['сумму', 'факториал', 'квадрат', 'корень'],
          correctAnswer: 'факториал',
        },
        {
          id: 's2',
          text: 'Переменная result изначально равна {{blank}}.',
          options: ['0', '1', 'number', 'undefined'],
          correctAnswer: '1',
        },
        {
          id: 's3',
          text: 'Цикл for начинается с i = {{blank}}.',
          options: ['0', '1', '2', 'number'],
          correctAnswer: '2',
        },
        {
          id: 's4',
          text: 'Оператор *= означает {{blank}} значения result.',
          options: ['сложение', 'умножение', 'деление', 'сравнение'],
          correctAnswer: 'умножение',
        },
        {
          id: 's5',
          text: 'Цикл продолжается пока i {{blank}} number.',
          options: ['<', '>', '<=', '==='],
          correctAnswer: '<=',
        },
        {
          id: 's6',
          text: 'На каждой итерации i увеличивается на {{blank}}.',
          options: ['0', '1', '2', '10'],
          correctAnswer: '1',
        },
        {
          id: 's7',
          text: 'Функция возвращает {{blank}}.',
          options: ['number', 'result', 'i', 'factorial'],
          correctAnswer: 'result',
        },
      ],
    },
  },

  {
    id: 'fill-blanks-002',
    type: 'fill-blanks',
    payload: {
      code: `const numbers = [1, 2, 3, 4, 5];

const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .reduce((acc, n) => acc + n, 0);

console.log(result);`,
      statements: [
        {
          id: 's1',
          text: 'Метод filter выбирает {{blank}} числа.',
          options: ['нечётные', 'чётные', 'все', 'случайные'],
          correctAnswer: 'чётные',
        },
        {
          id: 's2',
          text: 'После filter массив будет {{blank}}.',
          options: ['[1,2,3]', '[2,4]', '[1,3,5]', '[4,5]'],
          correctAnswer: '[2,4]',
        },
        {
          id: 's3',
          text: 'Метод map умножает каждый элемент на {{blank}}.',
          options: ['1', '2', '3', '0'],
          correctAnswer: '2',
        },
        {
          id: 's4',
          text: 'После map массив станет {{blank}}.',
          options: ['[2,4]', '[4,8]', '[6,10]', '[1,2,3]'],
          correctAnswer: '[4,8]',
        },
        {
          id: 's5',
          text: 'Метод reduce используется для {{blank}} значений.',
          options: ['фильтрации', 'суммирования', 'удаления', 'сортировки'],
          correctAnswer: 'суммирования',
        },
        {
          id: 's6',
          text: 'Начальное значение accumulator равно {{blank}}.',
          options: ['1', '0', 'undefined', 'null'],
          correctAnswer: '0',
        },
        {
          id: 's7',
          text: 'В консоль будет выведено {{blank}}.',
          options: ['12', '8', '10', '6'],
          correctAnswer: '12',
        },
      ],
    },
  },

  {
    id: 'fill-blanks-003',
    type: 'fill-blanks',
    payload: {
      code: `async function getData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
}

getData().then(console.log);`,
      statements: [
        {
          id: 's1',
          text: 'Ключевое слово async означает, что функция возвращает {{blank}}.',
          options: ['число', 'Promise', 'строку', 'объект'],
          correctAnswer: 'Promise',
        },
        {
          id: 's2',
          text: 'Оператор await используется для {{blank}} Promise.',
          options: ['создания', 'ожидания', 'удаления', 'копирования'],
          correctAnswer: 'ожидания',
        },
        {
          id: 's3',
          text: 'Метод fetch выполняет {{blank}} запрос.',
          options: ['HTTP', 'локальный', 'файловый', 'синхронный'],
          correctAnswer: 'HTTP',
        },
        {
          id: 's4',
          text: 'Метод response.json() возвращает {{blank}}.',
          options: ['строку', 'объект', 'Promise', 'число'],
          correctAnswer: 'Promise',
        },
        {
          id: 's5',
          text: 'Переменная data содержит {{blank}} данные.',
          options: ['сырые', 'обработанные', 'ошибочные', 'пустые'],
          correctAnswer: 'обработанные',
        },
        {
          id: 's6',
          text: 'Метод then используется для {{blank}} результата.',
          options: ['обработки', 'создания', 'удаления', 'сравнения'],
          correctAnswer: 'обработки',
        },
        {
          id: 's7',
          text: 'В консоль будет выведено {{blank}}.',
          options: ['Promise', 'data', 'undefined', 'error'],
          correctAnswer: 'data',
        },
      ],
    },
  },

  {
    id: 'fill-blanks-004',
    type: 'fill-blanks',
    payload: {
      code: `function outer() {
  let count = 0;

  return function inner() {
    count += 1;
    return count;
  };
}

const counter = outer();
counter();
counter();`,
      statements: [
        {
          id: 's1',
          text: 'Функция inner имеет доступ к переменной {{blank}}.',
          options: ['count', 'counter', 'inner', 'outer'],
          correctAnswer: 'count',
        },
        {
          id: 's2',
          text: 'Это пример {{blank}}.',
          options: ['hoisting', 'closure', 'callback', 'promise'],
          correctAnswer: 'closure',
        },
        {
          id: 's3',
          text: 'Переменная count сохраняет значение между вызовами благодаря {{blank}}.',
          options: ['циклу', 'замыканию', 'условию', 'объекту'],
          correctAnswer: 'замыканию',
        },
        {
          id: 's4',
          text: 'Первый вызов counter() вернёт {{blank}}.',
          options: ['0', '1', '2', 'undefined'],
          correctAnswer: '1',
        },
        {
          id: 's5',
          text: 'Второй вызов counter() вернёт {{blank}}.',
          options: ['1', '2', '3', '0'],
          correctAnswer: '2',
        },
        {
          id: 's6',
          text: 'Функция outer возвращает {{blank}}.',
          options: ['число', 'функцию', 'объект', 'строку'],
          correctAnswer: 'функцию',
        },
        {
          id: 's7',
          text: 'Переменная counter хранит {{blank}}.',
          options: ['результат', 'функцию', 'массив', 'объект'],
          correctAnswer: 'функцию',
        },
      ],
    },
  },

  {
    id: 'fill-blanks-005',
    type: 'fill-blanks',
    payload: {
      code: `import Sort from "../Sort";

export default class InsertionSort extends Sort {
  sort(originalArray) {
    const array = [...originalArray];

    for (let i = 1; i < array.length; i += 1) {
      let currentIndex = i;

      this.callbacks.visitingCallback(array[i]);

      while (
        array[currentIndex - 1] !== undefined &&
        this.comparator.lessThan(array[currentIndex], array[currentIndex - 1])
      ) {
        this.callbacks.visitingCallback(array[currentIndex - 1]);

        [array[currentIndex - 1], array[currentIndex]] = [
          array[currentIndex],
          array[currentIndex - 1],
        ];

        currentIndex -= 1;
      }
    }

    return array;
  }
}`,
      statements: [
        {
          id: 's1',
          text: 'Алгоритм Insertion Sort вставляет элементы в {{blank}} порядке.',
          options: ['случайном', 'отсортированном', 'обратном', 'новом'],
          correctAnswer: 'отсортированном',
        },
        {
          id: 's2',
          text: 'Переменная currentIndex используется для {{blank}} позиции элемента.',
          options: ['сохранения', 'смещения', 'удаления', 'создания'],
          correctAnswer: 'смещения',
        },
        {
          id: 's3',
          text: 'Цикл while выполняется пока элементы находятся в {{blank}} порядке.',
          options: ['правильном', 'неправильном', 'случайном', 'равном'],
          correctAnswer: 'неправильном',
        },
        {
          id: 's4',
          text: 'Метод comparator.lessThan выполняет {{blank}} элементов.',
          options: ['удаление', 'сравнение', 'копирование', 'создание'],
          correctAnswer: 'сравнение',
        },
        {
          id: 's5',
          text: 'Оператор деструктуризации используется для {{blank}} элементов.',
          options: ['удаления', 'обмена', 'сравнения', 'сортировки'],
          correctAnswer: 'обмена',
        },
        {
          id: 's6',
          text: 'После каждой итерации currentIndex {{blank}}.',
          options: ['увеличивается', 'уменьшается', 'обнуляется', 'не меняется'],
          correctAnswer: 'уменьшается',
        },
        {
          id: 's7',
          text: 'Функция возвращает {{blank}} массив.',
          options: ['исходный', 'отсортированный', 'пустой', 'случайный'],
          correctAnswer: 'отсортированный',
        },
      ],
    },
  },

  {
    id: 'fill-blanks-006',
    type: 'fill-blanks',
    payload: {
      code: `import Sort from "../Sort";

export default class SelectionSort extends Sort {
  sort(originalArray) {
    const array = [...originalArray];

    for (let i = 0; i < array.length - 1; i += 1) {
      let minIndex = i;

      this.callbacks.visitingCallback(array[i]);

      for (let j = i + 1; j < array.length; j += 1) {
        this.callbacks.visitingCallback(array[j]);

        if (this.comparator.lessThan(array[j], array[minIndex])) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }

    return array;
  }
}`,
      statements: [
        {
          id: 's1',
          text: 'Алгоритм Selection Sort находит {{blank}} элемент.',
          options: ['случайный', 'минимальный', 'максимальный', 'последний'],
          correctAnswer: 'минимальный',
        },
        {
          id: 's2',
          text: 'Переменная minIndex хранит {{blank}}.',
          options: ['значение', 'индекс', 'тип', 'размер'],
          correctAnswer: 'индекс',
        },
        {
          id: 's3',
          text: 'Внутренний цикл начинается с {{blank}}.',
          options: ['0', 'i', 'i + 1', 'array.length'],
          correctAnswer: 'i + 1',
        },
        {
          id: 's4',
          text: 'Метод comparator.lessThan используется для {{blank}}.',
          options: ['удаления', 'сравнения', 'копирования', 'сортировки'],
          correctAnswer: 'сравнения',
        },
        {
          id: 's5',
          text: 'Если найден новый минимум, minIndex {{blank}}.',
          options: ['сбрасывается', 'обновляется', 'удаляется', 'копируется'],
          correctAnswer: 'обновляется',
        },
        {
          id: 's6',
          text: 'Обмен происходит если {{blank}}.',
          options: ['i === j', 'minIndex !== i', 'array пустой', 'j > i'],
          correctAnswer: 'minIndex !== i',
        },
        {
          id: 's7',
          text: 'После итерации фиксируется {{blank}} элемент.',
          options: ['последний', 'случайный', 'минимальный', 'максимальный'],
          correctAnswer: 'минимальный',
        },
      ],
    },
  },

  {
    id: 'fill-blanks-007',
    type: 'fill-blanks',
    payload: {
      code: `const numbers = [1, 2, 3, 4];

const result = numbers.reduce((acc, n) => {
  return acc + n * 2;
}, 0);

console.log(result);`,
      statements: [
        {
          id: 's1',
          text: 'Метод reduce используется для {{blank}} значений.',
          options: ['сравнения', 'суммирования', 'удаления', 'сортировки'],
          correctAnswer: 'суммирования',
        },
        {
          id: 's2',
          text: 'Начальное значение accumulator равно {{blank}}.',
          options: ['1', '0', 'undefined', 'null'],
          correctAnswer: '0',
        },
        {
          id: 's3',
          text: 'Каждый элемент умножается на {{blank}}.',
          options: ['1', '2', '3', '0'],
          correctAnswer: '2',
        },
        {
          id: 's4',
          text: 'На каждой итерации acc {{blank}}.',
          options: ['уменьшается', 'увеличивается', 'обнуляется', 'не меняется'],
          correctAnswer: 'увеличивается',
        },
        {
          id: 's5',
          text: 'Метод reduce возвращает {{blank}}.',
          options: ['массив', 'число', 'строку', 'объект'],
          correctAnswer: 'число',
        },
        {
          id: 's6',
          text: 'После первой итерации acc будет {{blank}}.',
          options: ['1', '2', '3', '0'],
          correctAnswer: '2',
        },
        {
          id: 's7',
          text: 'В консоль будет {{blank}}.',
          options: ['20', '10', '8', '16'],
          correctAnswer: '20',
        },
      ],
    },
  },

  {
    id: 'fill-blanks-008',
    type: 'fill-blanks',
    payload: {
      code: `const user = {
  name: "Alex",
  age: 25,
  getInfo() {
    return this.name + " is " + this.age;
  }
};

const result = user.getInfo();
console.log(result);`,
      statements: [
        {
          id: 's1',
          text: 'this ссылается на {{blank}}.',
          options: ['глобальный объект', 'объект user', 'функцию', 'window'],
          correctAnswer: 'объект user',
        },
        {
          id: 's2',
          text: 'Метод возвращает {{blank}}.',
          options: ['число', 'строку', 'объект', 'массив'],
          correctAnswer: 'строку',
        },
        {
          id: 's3',
          text: 'this.name обращается к {{blank}}.',
          options: ['методу', 'свойству', 'массиву', 'функции'],
          correctAnswer: 'свойству',
        },
        {
          id: 's4',
          text: 'result содержит {{blank}}.',
          options: ['Alex is 25', '25 is Alex', 'undefined', 'error'],
          correctAnswer: 'Alex is 25',
        },
        {
          id: 's5',
          text: 'Метод вызывается как {{blank}}.',
          options: ['user()', 'user.getInfo()', 'getInfo()', 'this.getInfo()'],
          correctAnswer: 'user.getInfo()',
        },
        {
          id: 's6',
          text: 'age хранит {{blank}}.',
          options: ['строку', 'число', 'объект', 'массив'],
          correctAnswer: 'число',
        },
        {
          id: 's7',
          text: 'В консоль выводится {{blank}}.',
          options: ['Alex is 25', 'Alex', '25', 'undefined'],
          correctAnswer: 'Alex is 25',
        },
      ],
    },
  },
];
