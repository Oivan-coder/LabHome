import { DEFAULT_SETTINGS, calculateDashboard, toMoney } from './finance-model.js';

const STORAGE_KEY = 'atlas-finance-state-v2';
const LEGACY_STORAGE_KEY = 'atlas-finance-state-v1';

const infoBtn = document.getElementById('forecastInfoBtn');
const dailyInfoBtn = document.getElementById('dailyInfoBtn');
const dialog = document.getElementById('forecastDialog');
const title = document.getElementById('forecastDialogTitle');
const closeBtn = document.getElementById('closeForecastInfoBtn');
const content = document.getElementById('forecastInfoContent');

if (dialog && closeBtn && content) {
  if (infoBtn) {
  infoBtn.addEventListener('click', () => {
    if (title) title.textContent = 'Как считается прогноз';
    renderForecastExplanation();
    dialog.showModal();
  });
  }

  if (dailyInfoBtn) {
    dailyInfoBtn.addEventListener('click', () => {
      if (title) title.textContent = 'Как считается дневной лимит';
      renderDailyLimitExplanation();
      dialog.showModal();
    });
  }

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
    console.warn('Forecast info state parse failed', error);
    return null;
  }
}

function renderForecastExplanation() {
  const state = loadState();
  if (!state?.transactions || !state?.settings) {
    content.innerHTML = `
      <p>Данные еще загружаются из Google Sheets. Попробуй открыть подсказку после синхронизации.</p>
    `;
    return;
  }

  const settings = {
    ...DEFAULT_SETTINGS,
    ...state.settings
  };
  const model = calculateDashboard(state.transactions, settings, new Date());
  const projectedSpend = model.burnRate * model.cycle.daysLeft;
  const forecast = model.forecastBalance;
  const sign = forecast >= 0 ? '' : '−';

  content.innerHTML = `
    <p><strong>Прогноз</strong> показывает, сколько денег останется к следующей основной зарплате, если продолжать тратить в текущем среднем темпе.</p>

    <div class="formula-card">
      <div><span>Свободно сейчас</span><b>${toMoney(model.freeMoney)}</b></div>
      <div><span>Текущий темп</span><b>${toMoney(model.burnRate)}/д</b></div>
      <div><span>Дней до выплаты</span><b>${model.cycle.daysLeft}</b></div>
      <div><span>Ожидаемые траты</span><b>${toMoney(projectedSpend)}</b></div>
    </div>

    <p class="formula-line">Формула: ${toMoney(model.freeMoney)} − (${toMoney(model.burnRate)} × ${model.cycle.daysLeft}) = <strong>${sign}${toMoney(Math.abs(forecast))}</strong></p>

    <p class="info-note">Темп считается только по обычным расходам. Доходы и распределения из вкладки "Вопросы" не входят в темп и не раздувают прогноз.</p>
  `;
}

function renderDailyLimitExplanation() {
  const state = loadState();
  if (!state?.transactions || !state?.settings) {
    content.innerHTML = `
      <p>Данные еще загружаются из Google Sheets. Попробуй открыть подсказку после синхронизации.</p>
    `;
    return;
  }

  const settings = {
    ...DEFAULT_SETTINGS,
    ...state.settings
  };
  const model = calculateDashboard(state.transactions, settings, new Date());

  content.innerHTML = `
    <p><strong>Можно сегодня</strong> — это текущий свободный остаток, растянутый до следующей основной зарплаты.</p>

    <div class="formula-card">
      <div><span>Свободно сейчас</span><b>${toMoney(model.freeMoney)}</b></div>
      <div><span>Дней до зарплаты</span><b>${model.cycle.daysLeft}</b></div>
      <div><span>Можно сегодня</span><b>${toMoney(model.dailyLimit)}</b></div>
    </div>

    <p class="formula-line">Формула: ${toMoney(model.freeMoney)} / ${model.cycle.daysLeft} = <strong>${toMoney(model.dailyLimit)}</strong></p>

    <p class="info-note">Аванс не прибавляется заранее. Когда он придет, внеси его как доход, и остаток с дневным лимитом пересчитаются после синхронизации.</p>
  `;
}
