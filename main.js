/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 * Tulis seluruh kode JavaScript kamu di sini.
 */

let transactions = [];
let editingId = null;
let searchKeyword = '';

const STORAGE_KEY = 'transactions';

function generateId() {
  return +new Date();
}


/**
 * ========================================================
 * Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
 * ========================================================
 */
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');

const transactionForm = document.getElementById('transactionForm');
const transactionFormTitleInput = document.getElementById('transactionFormTitleInput');
const transactionFormAmountInput = document.getElementById('transactionFormAmountInput');
const transactionFormDateInput = document.getElementById('transactionFormDateInput');
const transactionFormTypeSelect = document.getElementById('transactionFormTypeSelect');
const transactionFormSubmitButton = document.querySelector('[data-testid="transactionFormSubmitButton"]');

const balanceAmountEl = document.querySelector('.tracker-summary__balance-amount');
const incomeAmountEl = document.querySelector('.tracker-summary__stat-amount--income');
const expenseAmountEl = document.querySelector('.tracker-summary__stat-amount--expense');

function getFilteredTransactions() {
  if (searchKeyword === '') {
    return transactions;
  }

  const result = [];
  for (let i = 0; i < transactions.length; i++) {
    const title = transactions[i].title.toLowerCase();
    const keyword = searchKeyword.toLowerCase();
    if (title.indexOf(keyword) !== -1) {
      result.push(transactions[i]);
    }
  }
  return result;
}

function createTransactionElement(transaction) {
  const typeLabel = transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran';

  const item = document.createElement('div');
  item.className = 'tracker-transaction-item';
  item.setAttribute('data-testid', 'transactionItem');

  const icon = document.createElement('div');
  icon.className = 'tracker-transaction-item__icon tracker-transaction-item__icon--' + transaction.type;
  icon.textContent = transaction.type === 'income' ? '⬆' : '⬇';

  const detail = document.createElement('div');
  detail.className = 'tracker-transaction-item__detail';

  const titleEl = document.createElement('h3');
  titleEl.className = 'tracker-transaction-item__title';
  titleEl.setAttribute('data-testid', 'transactionItemTitle');
  titleEl.textContent = transaction.title;

  const dateEl = document.createElement('p');
  dateEl.className = 'tracker-transaction-item__date';
  dateEl.setAttribute('data-testid', 'transactionItemDate');
  dateEl.textContent = 'Tanggal: ' + transaction.date;

  const typeEl = document.createElement('p');
  typeEl.className = 'tracker-transaction-item__type tracker-transaction-item__type--' + transaction.type;
  typeEl.setAttribute('data-testid', 'transactionItemType');
  typeEl.textContent = 'Tipe: ' + typeLabel;

  detail.appendChild(titleEl);
  detail.appendChild(dateEl);
  detail.appendChild(typeEl);

  const right = document.createElement('div');
  right.className = 'tracker-transaction-item__right';

  const amountEl = document.createElement('p');
  amountEl.className = 'tracker-transaction-item__amount tracker-transaction-item__amount--' + transaction.type;
  amountEl.setAttribute('data-testid', 'transactionItemAmount');
  amountEl.textContent = 'Nominal: Rp' + transaction.amount;

  const actions = document.createElement('div');
  actions.className = 'tracker-transaction-item__actions';

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'tracker-transaction-item__btn';
  editButton.setAttribute('data-testid', 'transactionItemEditButton');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function () {
    startEditTransaction(transaction.id);
  });

  const editTypeButton = document.createElement('button');
  editTypeButton.type = 'button';
  editTypeButton.className = 'tracker-transaction-item__btn';
  editTypeButton.setAttribute('data-testid', 'transactionItemEditTypeButton');
  editTypeButton.textContent = 'Ubah Tipe';
  editTypeButton.addEventListener('click', function () {
    toggleTransactionType(transaction.id);
  });

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'tracker-transaction-item__btn tracker-transaction-item__btn--delete';
  deleteButton.setAttribute('data-testid', 'transactionItemDeleteButton');
  deleteButton.textContent = 'Hapus';
  deleteButton.addEventListener('click', function () {
    deleteTransaction(transaction.id);
  });

  actions.appendChild(editButton);
  actions.appendChild(editTypeButton);
  actions.appendChild(deleteButton);

  right.appendChild(amountEl);
  right.appendChild(actions);

  item.appendChild(icon);
  item.appendChild(detail);
  item.appendChild(right);

  return item;
}

function renderTransactions() {
  while (incomeList.firstChild) {
    incomeList.removeChild(incomeList.firstChild);
  }
  while (expenseList.firstChild) {
    expenseList.removeChild(expenseList.firstChild);
  }

  const filtered = getFilteredTransactions();
  for (let i = 0; i < filtered.length; i++) {
    const element = createTransactionElement(filtered[i]);
    if (filtered[i].type === 'income') {
      incomeList.appendChild(element);
    } else {
      expenseList.appendChild(element);
    }
  }
}

function updateDashboard() {
  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === 'income') {
      totalIncome += transactions[i].amount;
    } else {
      totalExpense += transactions[i].amount;
    }
  }

  const balance = totalIncome - totalExpense;

  balanceAmountEl.textContent = 'Rp ' + balance.toLocaleString('id-ID');
  incomeAmountEl.textContent = 'Rp ' + totalIncome.toLocaleString('id-ID');
  expenseAmountEl.textContent = 'Rp ' + totalExpense.toLocaleString('id-ID');
}

function resetForm() {
  transactionForm.reset();
  editingId = null;
  transactionFormSubmitButton.textContent = 'Simpan';
}

transactionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = transactionFormTitleInput.value.trim();
  const amount = Number(transactionFormAmountInput.value);
  const date = transactionFormDateInput.value;
  const type = transactionFormTypeSelect.value;

  if (title === '') {
    alert('Keterangan transaksi tidak boleh kosong.');
    return;
  }

  if (amount < 1) {
    alert('Nominal transaksi minimal Rp1.');
    return;
  }

  if (editingId !== null) {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id === editingId) {
        transactions[i].title = title;
        transactions[i].amount = amount;
        transactions[i].date = date;
        transactions[i].type = type;
        break;
      }
    }
  } else {
    transactions.push({
      id: generateId(),
      title: title,
      amount: amount,
      date: date,
      type: type,
    });
  }

  resetForm();
  refreshView();
});


/**
 * ========================================================
 * Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
 * ========================================================
 */
function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function loadTransactions() {
  const stored = localStorage.getItem(STORAGE_KEY);
  transactions = stored ? JSON.parse(stored) : [];
}

function refreshView() {
  saveTransactions();
  renderTransactions();
  updateDashboard();
}

function deleteTransaction(id) {
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {
      transactions.splice(i, 1);
      break;
    }
  }

  if (editingId === id) {
    resetForm();
  }

  refreshView();
}

function startEditTransaction(id) {
  let transaction = null;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {
      transaction = transactions[i];
      break;
    }
  }

  if (!transaction) {
    return;
  }

  transactionFormTitleInput.value = transaction.title;
  transactionFormAmountInput.value = transaction.amount;
  transactionFormDateInput.value = transaction.date;
  transactionFormTypeSelect.value = transaction.type;

  editingId = transaction.id;
  transactionFormSubmitButton.textContent = 'Update';
  transactionFormTitleInput.focus();
}

/**
 * ========================================================
 * Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
 * ========================================================
 */
function toggleTransactionType(id) {
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {
      transactions[i].type = transactions[i].type === 'income' ? 'expense' : 'income';
      break;
    }
  }

  refreshView();
}

const searchTransactionForm = document.getElementById('searchTransactionForm');
const searchTransactionFormTitleInput = document.getElementById('searchTransactionFormTitleInput');

searchTransactionForm.addEventListener('submit', function (event) {
  event.preventDefault();
  searchKeyword = searchTransactionFormTitleInput.value.trim();
  renderTransactions();
});

searchTransactionFormTitleInput.addEventListener('input', function () {
  const keyword = searchTransactionFormTitleInput.value.trim();

  if (keyword === '') {
    return;
  }

  searchKeyword = keyword;
  renderTransactions();
});


loadTransactions();
renderTransactions();
updateDashboard();
