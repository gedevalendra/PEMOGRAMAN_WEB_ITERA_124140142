// State Management
let cart = JSON.parse(localStorage.getItem('toksir_cart')) || [];
let isPromoApplied = false;

// DOM Elements
const itemForm = document.getElementById('item-form');
const itemNameInput = document.getElementById('item-name');
const itemPriceInput = document.getElementById('item-price');
const itemQtyInput = document.getElementById('item-qty');
const cartItemsContainer = document.getElementById('cart-items');
const displaySubtotal = document.getElementById('display-subtotal');
const displayDiscount = document.getElementById('display-discount');
const displayTotal = document.getElementById('display-total');
const paymentInput = document.getElementById('payment-amount');
const displayChange = document.getElementById('display-change');
const insufficientMsg = document.getElementById('insufficient-msg');
const resetBtn = document.getElementById('reset-btn');
const promoInput = document.getElementById('promo-code');
const applyPromoBtn = document.getElementById('apply-promo');
const promoStatus = document.getElementById('promo-status');

// Error Elements
const errorName = document.getElementById('error-name');
const errorPrice = document.getElementById('error-price');
const errorQty = document.getElementById('error-qty');

// Modal Elements
const modalOverlay = document.getElementById('custom-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalBtnConfirm = document.getElementById('modal-btn-confirm');
const modalBtnCancel = document.getElementById('modal-btn-cancel');

let modalCallback = null;

function showModal(title, message, type = 'success', showCancel = false, onConfirm = null) {
    modalTitle.innerText = title;
    modalBody.innerText = message;
    
    modalIcon.className = `modal-icon ${type}`;
    if (type === 'success') {
        modalIcon.innerText = '✓';
    } else if (type === 'error') {
        modalIcon.innerText = '✕';
    } else {
        modalIcon.innerText = '!';
    }

    if (showCancel) {
        modalBtnCancel.style.display = 'block';
        modalBtnConfirm.innerText = 'Ya';
    } else {
        modalBtnCancel.style.display = 'none';
        modalBtnConfirm.innerText = 'OK';
    }

    modalCallback = onConfirm;
    modalOverlay.classList.add('active');
}

modalBtnConfirm.onclick = () => {
    modalOverlay.classList.remove('active');
    if (modalCallback) {
        modalCallback(true);
        modalCallback = null;
    }
};

modalBtnCancel.onclick = () => {
    modalOverlay.classList.remove('active');
    if (modalCallback) {
        modalCallback(false);
        modalCallback = null;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    // Setup Preset Item Buttons
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price');
            
            itemNameInput.value = name;
            itemPriceInput.value = price;
            if (!itemQtyInput.value || parseInt(itemQtyInput.value) < 1) {
                itemQtyInput.value = 1;
            }

            // Hide validation error messages
            errorName.style.display = 'none';
            errorPrice.style.display = 'none';
            errorQty.style.display = 'none';

            itemQtyInput.focus();
        });
    });
});

// Form Validation & Submission
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = itemNameInput.value.trim();
    const price = parseFloat(itemPriceInput.value);
    const qty = parseInt(itemQtyInput.value);
    
    let isValid = true;

    // Validate Name (Wajib diisi, minimal 3 karakter)
    if (name.length < 3) {
        errorName.style.display = 'block';
        isValid = false;
    } else {
        errorName.style.display = 'none';
    }

    // Validate Price (Wajib berupa angka positif & minimal Rp 500)
    if (isNaN(price) || price < 500) {
        errorPrice.style.display = 'block';
        isValid = false;
    } else {
        errorPrice.style.display = 'none';
    }

    // Validate Qty (Wajib berupa angka bulat minimal 1)
    if (isNaN(qty) || qty < 1) {
        errorQty.style.display = 'block';
        isValid = false;
    } else {
        errorQty.style.display = 'none';
    }

    if (isValid) {
        const newItem = {
            id: Date.now(),
            name,
            price,
            qty,
            subtotal: price * qty
        };

        cart.push(newItem);
        saveCart();
        renderCart();
        itemForm.reset();
        // Reset qty default value back to 1 after reset
        itemQtyInput.value = 1;
    }
});

// Render Cart Table
function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #777;">Keranjang belanja kosong.</td>
            </tr>
        `;
    } else {
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString('id-ID')}</td>
                <td>${item.qty}</td>
                <td>Rp ${item.subtotal.toLocaleString('id-ID')}</td>
                <td>
                    <button class="btn-danger" onclick="removeItem(${item.id})">Hapus</button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });
    }

    calculateTotals();
}

// Remove Item
window.removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
};

// Calculate Totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    
    // Kalkulator Diskon Sederhana:
    // Minimal Rp 50.000 -> diskon 10% ATAU input kode promo HEMAT10
    let currentDiscount = 0;
    if (subtotal >= 50000) {
        currentDiscount = subtotal * 0.10;
    } else if (isPromoApplied) {
        currentDiscount = subtotal * 0.10; // Kode promo HEMAT10
    }

    const total = subtotal - currentDiscount;

    displaySubtotal.innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    displayDiscount.innerText = `Rp ${currentDiscount.toLocaleString('id-ID')}`;
    displayTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;

    calculateChange();
}

// Calculate Change & Payment Validation
paymentInput.addEventListener('input', calculateChange);

function calculateChange() {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    let currentDiscount = 0;
    if (subtotal >= 50000 || isPromoApplied) {
        currentDiscount = subtotal * 0.10;
    }
    const total = subtotal - currentDiscount;
    const payment = parseFloat(paymentInput.value) || 0;

    if (payment === 0 || cart.length === 0) {
        displayChange.innerText = 'Rp 0';
        insufficientMsg.style.display = 'none';
        return;
    }

    const change = payment - total;

    if (change < 0) {
        displayChange.innerText = 'Rp 0';
        insufficientMsg.style.display = 'block';
    } else {
        displayChange.innerText = `Rp ${change.toLocaleString('id-ID')}`;
        insufficientMsg.style.display = 'none';
    }
}

// Promo Code Event Listener
applyPromoBtn.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === 'HEMAT10') {
        isPromoApplied = true;
        promoStatus.innerText = 'Kode promo HEMAT10 berhasil diterapkan (Diskon 10%)!';
        promoStatus.style.color = 'black';
        promoStatus.style.fontWeight = 'bold';
    } else {
        isPromoApplied = false;
        promoStatus.innerText = 'Kode promo tidak valid.';
        promoStatus.style.color = 'red';
        promoStatus.style.fontWeight = 'normal';
    }
    calculateTotals();
});

// Save to LocalStorage
function saveCart() {
    localStorage.setItem('toksir_cart', JSON.stringify(cart));
}

// Reset Transaction / Clear LocalStorage
resetBtn.addEventListener('click', () => {
    if (cart.length === 0 && !paymentInput.value && !promoInput.value) {
        return;
    }
    showModal(
        'Konfirmasi Reset',
        'Apakah Anda yakin ingin mereset transaksi dan mengosongkan keranjang?',
        'warning',
        true,
        (confirmed) => {
            if (confirmed) {
                cart = [];
                isPromoApplied = false;
                promoInput.value = '';
                promoStatus.innerText = '';
                paymentInput.value = '';
                saveCart();
                renderCart();
            }
        }
    );
});

// Checkout Button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showModal('Keranjang Kosong', 'Keranjang belanja masih kosong! Silakan tambahkan barang terlebih dahulu.', 'error');
        return;
    }
    
    const payment = parseFloat(paymentInput.value) || 0;
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    let currentDiscount = 0;
    if (subtotal >= 50000 || isPromoApplied) {
        currentDiscount = subtotal * 0.10;
    }
    const total = subtotal - currentDiscount;

    if (payment < total) {
        showModal('Pembayaran Kurang', 'Uang bayar belum mencukupi untuk menyelesaikan transaksi!', 'error');
    } else {
        const change = payment - total;
        showModal(
            'Transaksi Berhasil!',
            `Total Akhir: Rp ${total.toLocaleString('id-ID')}\nBayar: Rp ${payment.toLocaleString('id-ID')}\nKembalian: Rp ${change.toLocaleString('id-ID')}\n\nTerima kasih atas kunjungan Anda!`,
            'success'
        );
        cart = [];
        isPromoApplied = false;
        promoInput.value = '';
        promoStatus.innerText = '';
        paymentInput.value = '';
        saveCart();
        renderCart();
    }
});
