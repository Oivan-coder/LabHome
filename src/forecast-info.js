import { DEFAULT_SETTINGS, calculateDashboard, toMoney } from './finance-model.js';

const STORAGE_KEY = 'atlas-finance-state-v2';
const LEGACY_STORAGE_KEY = 'atlas-finance-state-v1';

const forecastBtn = document.getElementById('forecastInfoBtn');
const dailyBtn = document.getElementById('dailyLimitInfoBtn');
const dialog = document.getElementById('forecastDialog');
const closeBtn = document.getElementById('closeForecastInfoBtn');
const title = document.getElementById('infoDialogTitle');
const content = document.getElementById('forecastInfoContent');

if (dialog && closeBtn && content) {
  forecastBtn?.addEventListener('click', () => {
    renderForecastExplanation();
    dialog.showModal();
  });

  dailyBtn?.addEventListener('click', () => {
    renderDailyLimitExplanation();
    dialog.showModal();
  });

  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn('Finance info state parse failed', error);
    return null;
  }
}

function getModel() {
  const state = loadState();
  if (!state?.transactions || !state?.settings) return null;
  const settings = { ...DEFAULT_SETTINGS, ...state.settings };
  return calculateDashboard(state.transactions, settings, new Date());
}

function renderEmptyState() {
  content.innerHTML = '<p>Данные еще загружаются из Google Sheets. Попробуй открыть подсказку после синхронизации.</p>';
}

function renderForecastExplanation() {
  if (title) title.textContent = 'Как считается прогноз';
  const model = getModel();
  if (!model) {
    renderEmptyState();
    return;
  }

  const projectedSpend = model.burnRate * model.cycle.daysLeft;
  const forecast = model.forecastBalance;
  const sign = forecast >= 0 ? '' : '−';

  content.innerHTML = `
    <p><strong>Прогноз</strong> показывает, сколько денег останется к выплате, если продолжать тратить в текущем среднем темпе.</p>

    <div class="formula-card">
      <div><span>Свободно сейчас</span><b>${toMoney(model.freeMoney)}</b></div>
      <div><span>Текущий темп</span><b>${toMoney(model.burnRate)}/д</b></div>
      <div><span>Дней до выплаты</span><b>${model.cycle.daysLeft}</b></div>
      <div><span>Ожидаемые траты</span><b>${toMoney(projectedSpend)}</b></div>
    </div>

    <p class="formula-line">Формула: ${toMoney(model.freeMoney)} − (${toMoney(model.burnRate)} × ${model.cycle.daysLeft}) = <strong>${sign}${toMoney(Math.abs(forecast))}</strong></p>

    <p class="info-note">Если значение отрицательное, это не текущий минус. Это предупреждение: при таком темпе расходов до выплаты может не хватить указанной суммы.</p>
  `;
}

function renderDailyLimitExplanation() {
  if (title) title.textContent = 'Как считается «Можно сегодня»';
  const model = getModel();
  if (!model) {
    renderEmptyState();
    return;
  }

  content.innerHTML = `
    <p><strong>Можно сегодня</strong> — это безопасный дневной лимит до следующей выплаты.</p>

    <div class="formula-card">
      <div><span>Баланс счетов</span><b>${toMoney(model.accountBalance)}</b></div>
      <div><span>Будущие обязательства</span><b>${toMoney(model.futureObligations)}</b></div>
      <div><span>Свободно</span><b>${toMoney(model.freeMoney)}</b></div>
      <div><span>Дней до выплаты</span><b>${model.cycle.daysLeft}</b></div>
    </div>

    <p class="formula-line">Формула: ${toMoney(model.freeMoney)} ÷ ${model.cycle.daysLeft} = <strong>${toMoney(model.dailyLimit)}/д</strong></p>

    <p class="info-note">Если есть будущие обязательства в текущем цикле, они сначала вычитаются из баланса. Поэтому лимит показывает не весь остаток, а сумму, которую можно распределять по дням.</p>
  `;
}
