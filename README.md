# rs-school-nodejs

## Запуск
Находясь в директории `rs-school-nodejs`, нужно в терминале выполнить команду `node my_caesar_cli --config "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"`
Для работы приложения у вас должен быть установлен nodejs

## Настройки
Приложение принимает следущие настройки:

- `-c "{XY(-)}n"` или `--config "{XY(-)}n"` (обязательный аргумент)

- `-i "some-file-for-input.txt"` или `--input "some-file-for-input.txt"`

- `-o "some-file-for-output.txt"` или `--output "some-file-for-output.txt"`

 config имеет формат `{XY(-)}n`, где X соответствует одному из шифров (C, A, R)  
  для ROT-8 (R) и Цезаря (C) присутствует элемент Y  
  Y — это 1 (шифрование) или 0 (дешифрование)  
  для Атбаш (A) отсутствует элемент Y  

  В конфигурации может быть несколько последовательных операций разделённых дефисом

  Например `"C1-C0-A-R1-R0-A-R0-R0-C1-A"`

Для настройки ввода/вывода используются флаги `-i`, `-o` с путём к соответствующему файлу
