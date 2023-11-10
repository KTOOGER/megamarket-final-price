Этот пользовательский скрипт добавляет товарам на сайте мегамаркета "итоговую" цену. Она учитывает бонусы магазина (бонусы спасибо) и ею удобно пользоваться для сравнения с другими магазинами/маркетплейсами.
## Метод подсчёта
Итоговая цена подсчитывается по формуле:
`final_price = price ^ 2 / (price + bonus)`,
где
`final_price` —  число, к которому будет стремиться цена за каждую последующую покупку единицы одного и того же товара, при максимально возможной оплате бонусами,
`price` — цена товара
`bonus` — бонусы получаемые с покупки товара
### Почему такой метод?
Этот метод учитывает основной недостаток бонусов и даёт безошибочно точный результат при одинаковом проценте возвращаемых бонусов. Да, он всё ещё не очень хорошо показывает себя в реальной ситуации, когда процент возвращаемых бонусов разнится от товара к товару, и особенно при сильной разнице в ценах товаров (на порядки), но в целом можно считать, что в типичных ситуациях ошибка менее 5%.
#### Метод `price - bonus`
Не учитывает особенности бонусов. Из-за чего в реальных ситуациях ошибка спокойно переваливает за 30% в сторону переплаты.
## Немного про бонусы
Следует понимать, что **бонус Спасибо ≠ рублю**. Да, за один бонус можно оплатить один рубль, но есть несколько нюансов:
* **C бонусов не возвращаются бонусы**
* Бонусы можно тратить только в экосистеме Сбера
* Бонусами можно оплатить ~~только~~ 99% цены