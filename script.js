// Каталог: двопідвіси Santa Cruz (V10, V12, Nomad), вилки FOX, керма та амортизатори
const products = [
  {
    id: 1,
    name: "Двопідвіс Santa Cruz V10 CC X01 DH",
    category: "bikes",
    categoryLabel: "Двопідвіс (DH)",
    price: 345000,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Двопідвіс Santa Cruz V12 Carbon Concept",
    category: "bikes",
    categoryLabel: "Двопідвіс (DH)",
    price: 389000,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Двопідвіс Santa Cruz Nomad Carbon CC",
    category: "bikes",
    categoryLabel: "Двопідвіс (Enduro)",
    price: 298000,
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Вилка FOX 40 Float Factory Kashima 29",
    category: "forks",
    categoryLabel: "Вилка",
    price: 78500,
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Вилка FOX 38 Factory Grip X2 Orange",
    category: "forks",
    categoryLabel: "Вилка",
    price: 62500,
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Кермо карбонове Renthal Fatbar Lite 35",
    category: "handlebars",
    categoryLabel: "Кермо",
    price: 6400,
    image: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Кермо FOX Factory DH Carbon Bar",
    category: "handlebars",
    categoryLabel: "Кермо",
    price: 7200,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Амортизатор FOX DHX2 Factory Coil",
    category: "shocks",
    categoryLabel: "Амортизатор",
    price: 29400,
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80"
  }
];

let cart = [];

const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalPrice = document.getElementById('cartTotalPrice');

// Слайдер
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
let currentSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

if (nextSlideBtn && prevSlideBtn) {
  nextSlideBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  prevSlideBtn.addEventListener('click', () => showSlide(currentSlide - 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.getAttribute('data-slide')));
    });
  });

  setInterval(() => { showSlide(currentSlide + 1); }, 6000);
}

function filterFromHero(category) {
  filterBtns.forEach(b => {
    b.classList.remove('active');
    if (b.getAttribute('data-filter') === category) b.classList.add('active');
  });
  displayProducts(products.filter(p => p.category === category));
}

// Рендеринг товарів
function displayProducts(items) {
  if (!productsGrid) return;
  productsGrid.innerHTML = '';

  items.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <div>
          <div class="product-category-tag">${product.categoryLabel}</div>
          <h3>${product.name}</h3>
        </div>
        <div>
          <p class="product-price">${product.price.toLocaleString()} ₴</p>
          <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">Додати в кошик</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    if (filter === 'all') displayProducts(products);
    else displayProducts(products.filter(p => p.category === filter));
  });
});

// Кошик
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  if (!cartCount || !cartItemsList || !cartTotalPrice) return;
  
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalCount;

  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p style="color: #a1a1aa;">Ваш кошик порожній</p>';
    cartTotalPrice.textContent = '0 ₴';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('div');
    itemEl.classList.add('cart-item');
    itemEl.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.price.toLocaleString()} ₴ × ${item.quantity}</p>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart(${item.id})">&times;</button>
    `;
    cartItemsList.appendChild(itemEl);
  });

  cartTotalPrice.textContent = `${total.toLocaleString()} ₴`;
}

function checkoutOrder() {
  if (cart.length === 0) {
    alert('Додайте товари в кошик перед оформленням!');
    return;
  }
  alert('Дякуємо! Ваше замовлення успішно оформлено.');
  cart = [];
  updateCartUI();
  if (cartModal) cartModal.style.display = 'none';
}

if (cartBtn && cartModal && closeModal) {
  cartBtn.addEventListener('click', () => { cartModal.style.display = 'flex'; });
  closeModal.addEventListener('click', () => { cartModal.style.display = 'none'; });
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
  });
}

displayProducts(products);
updateCartUI();
