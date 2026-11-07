// База даних товарів
const products = [
  {
    id: 1,
    name: "Вилка FOX 36 Factory Grip2",
    category: "forks",
    price: 45000,
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Вилка FOX 38 Factory Kashima",
    category: "forks",
    price: 52000,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Гірський велосипед FOX Enduro Pro",
    category: "bikes",
    price: 185000,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Задній амортизатор DHX2 Factory",
    category: "shocks",
    price: 28000,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Велосипед FOX Downhill Expert",
    category: "bikes",
    price: 210000,
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Амортизатор Float X2 Factory",
    category: "shocks",
    price: 31000,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=600&q=80"
  }
];

// Стан кошика
let cart = [];

// DOM елементи
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCount = document.getElementById('cartCount');

// Рендер картки товару
function renderProducts(items) {
  productsGrid.innerHTML = items.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">${product.price.toLocaleString()} ₴</div>
        <button class="btn btn-primary" onclick="addToCart(${product.id})">У кошик</button>
      </div>
    </div>
  `).join('');
}

// Фільтрація товарів
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    if (filter === 'all') {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === filter);
      renderProducts(filtered);
    }
  });
});

// Додавання у кошик
window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
};

// Видалення з кошика
window.removeFromCart = function(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};

// Оновлення інтерфейсу кошика
function updateCartUI() {
  // Лічильник товарів
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Загальна вартість
  const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotalPrice.textContent = `${totalSum.toLocaleString()} ₴`;

  // Список у модальному вікні
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Кошик порожній</p>';
  } else {
    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.name}</span>
          <span class="cart-item-price">${item.quantity} x ${item.price.toLocaleString()} ₴</span>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">&times;</button>
      </div>
    `).join('');
  }
}

// Модальне вікно
cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeModal.addEventListener('click', () => cartModal.classList.remove('active'));

window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('active');
  }
});

// Ініціалізація
renderProducts(products);