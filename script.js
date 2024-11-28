// Локальное хранилище для корзины
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновить количество товаров в корзине
function updateCartCount() {
    const cartCount = cart.length;
    document.getElementById('cart-count').textContent = cartCount;
}

// Сохранить корзину в локальное хранилище
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавить товар в корзину
function addToCart(id, name, price) {
    cart.push({ id, name, price });
    saveCart();
    updateCartCount();
    alert(`${name} добавлен в корзину.`);
}

// Удалить товар из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart(); // Обновить содержимое страницы корзины
}

// Очистить корзину
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
    alert('Корзина очищена.');
}

// Отобразить корзину на странице
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста.</p>';
        totalPrice.textContent = '0';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - ${item.price} ₸</p>
            <button class="remove-btn" data-index="${index}">Удалить</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    totalPrice.textContent = total;

    // Удаление товаров
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            removeFromCart(index);
        });
    });
}

// Обработчик кнопки очистки корзины
document.addEventListener('DOMContentLoaded', () => {
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Рендер корзины только на странице cart.html
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});

// Обработчики добавления в корзину
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const id = parseInt(event.target.dataset.id);
        const name = event.target.dataset.name;
        const price = parseInt(event.target.dataset.price);
        addToCart(id, name, price);
    }
});

// Обновление счётчика при загрузке
updateCartCount();
