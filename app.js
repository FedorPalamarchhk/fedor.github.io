let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let cart = []; // Корзина

// Меню с товарами
const menu = [
    { id: 1, name: "🥤Adrenalin rush 0.449", price: 140 },
    { id: 2, name: "🥤Adrenalin rush 0.25", price: 99 },
    { id: 3, name: "🥐Булочка с корицей", price: 70 },
    { id: 4, name: "🥐Булочка с маком", price: 70 },
    { id: 5, name: "🍕Пицца", price: 220 }
];

// Обновление текста основной кнопки
function updateCartDisplay() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let names = cart.map(item => item.name).join(", ");
    tg.MainButton.setText(`Корзина: ${names} | Сумма: ${total}₽`);
}

// Добавление товара в корзину
function toggleItem(itemId) {
    let item = menu.find(product => product.id === itemId);

    if (!item) return;

    if (cart.some(product => product.id === itemId)) {
        // Если товар уже есть в корзине — удаляем
        cart = cart.filter(product => product.id !== itemId);
    } else {
        // Если товара нет в корзине — добавляем
        cart.push(item);
    }

    if (cart.length > 0) {
        tg.MainButton.show();
        updateCartDisplay();
    } else {
        tg.MainButton.hide();
    }
}

// Навешиваем обработчики на кнопки
document.querySelectorAll(".btn").forEach((btn, index) => {
    btn.addEventListener("click", function () {
        toggleItem(index + 1);
    });
});

// Обработчик нажатия на основную кнопку
Telegram.WebApp.onEvent("mainButtonClicked", function () {
    let order = cart.map(item => `${item.name} - ${item.price}₽`).join("\n");
    let total = cart.reduce((sum, item) => sum + item.price, 0);

    tg.sendData(JSON.stringify({
        order: order,
        total: total
    }));
});

// Отображение имени пользователя
let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `Привет, ${tg.initDataUnsafe.user.first_name}! Выберите еду 👇`;
usercard.appendChild(p);








