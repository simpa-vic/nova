// NovaBank Application Logic

// Initial Mock Data
const sampleTransactions = [
  { date: '28 Jan 2026', merchant: 'Starbucks Coffee', type: 'Expense', category: 'Food & Beverage', ref: 'Card Swipe', channel: 'Main Account', refId: 'TRX-938421', amount: -12.50, status: 'Completed' },
  { date: '28 Jan 2026', merchant: 'Starbucks Coffee', type: 'Expense', category: 'Food & Beverage', ref: 'Card Swipe', channel: 'Main Account', refId: 'TRX-938421', amount: -12.50, status: 'Completed' },
  { date: '28 Jan 2026', merchant: 'Starbucks Coffee', type: 'Expense', category: 'Food & Beverage', ref: 'Card Swipe', channel: 'Main Account', refId: 'TRX-938421', amount: -12.50, status: 'Completed' },
  { date: '27 Jan 2026', merchant: 'Employer Salary', type: 'Income', category: 'Salary', ref: 'Direct Deposit', channel: 'Main Account', refId: 'TRX-882194', amount: 4500.00, status: 'Completed' },
  { date: '25 Jan 2026', merchant: 'Apple Store', type: 'Expense', category: 'Electronics', ref: 'Card Swipe', channel: 'Main Account', refId: 'TRX-771203', amount: -299.00, status: 'Completed' },
  { date: '24 Jan 2026', merchant: 'Vault Deposit', type: 'Transfer', category: 'Savings', ref: 'Internal Auto', channel: 'Savings Account', refId: 'TRX-102938', amount: -500.00, status: 'Completed' },
];

let activeCategory = 'All';

// Render Transactions Table
function renderTransactions() {
  const tbody = document.getElementById('transaction-rows');
  const searchVal = document.getElementById('tx-search')?.value.toLowerCase() || '';

  const filtered = sampleTransactions.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.type === activeCategory;
    const matchesSearch = item.merchant.toLowerCase().includes(searchVal) ||
                          item.refId.toLowerCase().includes(searchVal) ||
                          item.category.toLowerCase().includes(searchVal);
    return matchesCategory && matchesSearch;
  });

  tbody.innerHTML = filtered.map(item => `
    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
      <td class="py-3 px-6 whitespace-nowrap text-gray-500 dark:text-gray-400">${item.date}</td>
      <td class="py-3 px-6 font-semibold text-gray-900 dark:text-white">${item.merchant}</td>
      <td class="py-3 px-6">${item.category}</td>
      <td class="py-3 px-6">${item.ref}</td>
      <td class="py-3 px-6">${item.channel}</td>
      <td class="py-3 px-6 font-mono text-gray-500">${item.refId}</td>
      <td class="py-3 px-6 font-semibold ${item.amount < 0 ? 'text-rose-500' : 'text-emerald-500'}">
        ${item.amount < 0 ? '-' : '+'}$${Math.abs(item.amount).toFixed(2)}
      </td>
      <td class="py-3 px-6 text-right">
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
          ${item.status}
        </span>
      </td>
    </tr>
  `).join('');
}

// Navigation Handler
function switchPage(pageId) {
  document.querySelectorAll('.page-section').forEach(p => p.classList.add('hidden'));
  document.getElementById(`page-${pageId}`).classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.className = "nav-btn px-4 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition";
  });
  
  const activeBtn = document.getElementById(`nav-${pageId}`);
  if (activeBtn) {
    activeBtn.className = "nav-btn px-4 py-1.5 rounded-full bg-indigo-600 text-white shadow-sm transition";
  }
}

// Table Filters
function filterTable(cat) {
  activeCategory = cat;
  document.querySelectorAll('.tx-filter-btn').forEach(btn => {
    if (btn.innerText === cat) {
      btn.className = "tx-filter-btn px-3 py-1 rounded-full bg-indigo-600 text-white";
    } else {
      btn.className = "tx-filter-btn px-3 py-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900";
    }
  });
  renderTransactions();
}

function searchTable() {
  renderTransactions();
}

// Theme Switcher
function setTheme(mode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
    document.getElementById('theme-dark-btn').className = "p-1.5 rounded-full text-indigo-400 bg-gray-800 shadow-sm transition";
    document.getElementById('theme-light-btn').className = "p-1.5 rounded-full text-gray-400 transition";
  } else {
    document.documentElement.classList.remove('dark');
    document.getElementById('theme-light-btn').className = "p-1.5 rounded-full text-yellow-500 bg-white shadow-sm transition";
    document.getElementById('theme-dark-btn').className = "p-1.5 rounded-full text-gray-400 transition";
  }
}

// Toast Notifications
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

// Modal Handlers
function handlePaymentSubmit(e) {
  e.preventDefault();
  document.getElementById('payment-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('payment-modal').classList.add('hidden');
}

function confirmPayment() {
  closeModal();
  showToast("Payment executed successfully!");
  switchPage('dashboard');
}

// Initialize Chart
function initOverviewChart() {
  const ctx = document.getElementById('overviewChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
      datasets: [{
        data: [25, 22, 32, 18, 20, 15, 20, 22, 28, 38, 36, 40],
        borderColor: '#4f46e5',
        borderWidth: 3,
        tension: 0.4,
        fill: false,
        pointBackgroundColor: ['#4f46e5', '#4f46e5', '#4f46e5', '#ef4444', '#4f46e5', '#4f46e5', '#4f46e5', '#4f46e5', '#4f46e5', '#10b981', '#4f46e5', '#4f46e5'],
        pointRadius: [0, 0, 0, 6, 0, 0, 0, 0, 0, 6, 0, 0]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#f3f4f6' }, ticks: { callback: v => '$' + v } }
      }
    }
  });
}

// Setup PIN Input Auto-focus
document.addEventListener('DOMContentLoaded', () => {
  renderTransactions();
  initOverviewChart();

  const pinInputs = document.querySelectorAll('.pin-input');
  pinInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (input.value.length === 1 && index < pinInputs.length - 1) {
        pinInputs[index + 1].focus();
      }
    });
  });
});
