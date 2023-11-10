// ==UserScript==
// @name         Megamarket Final Price
// @namespace    https://github.com/KTOOGER/megamarket-final-price
// @version      0.1
// @description  Добавляет отображение реальных цен на мегамаркете (с учётом бонусов)
// @author       KTOOGER
// @match        https://megamarket.ru/*
// ==/UserScript==

(function () {
	'use strict'

	function priceText(number) {
		// 100200.501 => '100 201'
		return Math.round(number).toString().replace(/(?<=\d)(?=(.{3})+$)/, ` `)
	}

	function addFinalPriceForItems() {
		let itemMoneyArray = app.querySelectorAll("div.item-money:not([data-final-price]), div.product-list-item-price__money:not([data-final-price])")

		console.log(`itemMoneyArray.length`, itemMoneyArray.length)
		const length = itemMoneyArray.length

		for (let i = 0; i < length; i++) {
			const itemMoney = itemMoneyArray[i]
			try {
				const itemBonus = itemMoney.querySelector(`.item-bonus span.bonus-amount, .money-bonus span.bonus-amount `)

				if (itemBonus) {
					const bonus = +itemBonus.getInnerHTML().replace(/\D/g, ``)
					const itemPrice = itemMoney.querySelector(`.item-price > span, div.amount`)
					const price = +itemPrice.getInnerHTML().replace(/\D/g, ``)
					const finalPrice = Math.round(price * price / (price + bonus))

					itemMoney.setAttribute('data-final-price', finalPrice)
					itemPrice.setAttribute('style', 'color: #999')
					itemMoney.insertAdjacentHTML("afterend", `<div class="item-money product-list-item-price__money"><div class="item-price amount"><span>~ ${priceText(finalPrice)} ₽</span></div></div>`)
				} else {
					itemMoney.setAttribute('data-final-price', true)
				}
			} catch (e) {
				console.warn(e)
			}
		}
	}

	setInterval(() => {
		addFinalPriceForItems()
	}, 5000)
})()