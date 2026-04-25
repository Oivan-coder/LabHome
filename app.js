const mockData = {
  patient: {
    name: "Алексей Петров",
    shortName: "АП",
    sex: "Мужской",
    age: 42,
    phone: "+7 900 123-45-67",
    misCard: "MIS-248019",
    policy: "ОМС •••• 9381",
    clinic: "ГБУЗ Центральная поликлиника",
    lastSync: "25.04.2026, 09:42"
  },
  activities: [
    { type: "lab", title: "Готовы результаты биохимии крови", text: "2 показателя выше референса: глюкоза и общий холестерин.", date: "Сегодня, 09:10", status: "Требует внимания", level: "warn", icon: "◌" },
    { type: "report", title: "Добавлено заключение терапевта", text: "Рекомендован контроль липидного профиля и повтор глюкозы натощак.", date: "Вчера, 17:35", status: "Новое", level: "info", icon: "□" },
    { type: "visit", title: "Прием у кардиолога", text: "Плановый прием завершен. Следующий контроль через 3 месяца.", date: "22.04.2026", status: "Завершено", level: "ok", icon: "⌘" },
    { type: "lab", title: "Общий анализ крови", text: "Критических отклонений нет. Гемоглобин и лейкоциты в норме.", date: "18.04.2026", status: "Все ок", level: "ok", icon: "◌" }
  ],
  visits: [
    { date: "26.04.2026", time: "11:30", title: "Терапевт", doctor: "Иванова Мария Сергеевна", place: "Каб. 214", status: "Запланировано", note: "Обсуждение лабораторных результатов и коррекция рекомендаций." },
    { date: "22.04.2026", time: "15:00", title: "Кардиолог", doctor: "Кузнецов Андрей Олегович", place: "Каб. 305", status: "Завершено", note: "АД стабильное. Рекомендован дневник давления и контроль липидов." },
    { date: "10.04.2026", time: "09:45", title: "Эндокринолог", doctor: "Соколова Елена Викторовна", place: "Каб. 118", status: "Завершено", note: "Назначен контроль глюкозы натощак и HbA1c." },
    { date: "02.04.2026", time: "08:20", title: "Забор крови", doctor: "Процедурный кабинет", place: "Каб. 101", status: "Завершено", note: "Венозная кровь. Биохимия, ОАК, липидный профиль." }
  ],
  reports: [
    { date: "24.04.2026", title: "Заключение терапевта", doctor: "Иванова М.С.", status: "Новое", text: "Состояние удовлетворительное. Рекомендовано: контроль глюкозы натощак, коррекция питания, повторный липидный профиль через 8–12 недель." },
    { date: "22.04.2026", title: "Заключение кардиолога", doctor: "Кузнецов А.О.", status: "Подписано", text: "Данных за острый коронарный синдром нет. Рекомендован контроль АД, липидного профиля, умеренная аэробная нагрузка." },
    { date: "10.04.2026", title: "Заключение эндокринолога", doctor: "Соколова Е.В.", status: "Подписано", text: "Пограничное повышение глюкозы. Диагноз по одному анализу не устанавливается. Назначен HbA1c." },
    { date: "28.03.2026", title: "Профилактический осмотр", doctor: "Орлова Н.Н.", status: "Архив", text: "Жалоб на момент осмотра нет. Рекомендована диспансеризация по возрастной группе." }
  ],
  labGroups: ["Все", "ОАК", "Биохимия", "Липидный профиль", "Коагулограмма", "Гормоны"],
  labs: [
    {
      id: "glucose", group: "Биохимия", name: "Глюкоза", unit: "ммоль/л", value: 6.2, low: 3.9, high: 5.5, flag: "high",
      date: "25.04.2026", material: "Венозная кровь", method: "Гексокиназный метод", lab: "Центральная лаборатория",
      note: "Показатель выше референсного интервала. Для интерпретации важно, сдавался ли анализ натощак.",
      history: [
        ["10.01", 5.1], ["07.02", 5.3], ["02.03", 5.7], ["02.04", 5.9], ["25.04", 6.2]
      ]
    },
    {
      id: "cholesterol", group: "Липидный профиль", name: "Общий холестерин", unit: "ммоль/л", value: 5.8, low: 0, high: 5.2, flag: "high",
      date: "25.04.2026", material: "Сыворотка", method: "Ферментативный метод", lab: "Центральная лаборатория",
      note: "Показатель выше целевого диапазона. Обычно оценивается вместе с ЛПНП, ЛПВП и триглицеридами.",
      history: [
        ["10.01", 5.0], ["07.02", 5.1], ["02.03", 5.4], ["02.04", 5.6], ["25.04", 5.8]
      ]
    },
    {
      id: "ldl", group: "Липидный профиль", name: "ЛПНП", unit: "ммоль/л", value: 3.6, low: 0, high: 3.0, flag: "high",
      date: "25.04.2026", material: "Сыворотка", method: "Расчетный", lab: "Центральная лаборатория",
      note: "ЛПНП выше условного целевого значения. Цель зависит от сердечно-сосудистого риска.",
      history: [["10.01", 2.9], ["07.02", 3.0], ["02.03", 3.2], ["02.04", 3.4], ["25.04", 3.6]]
    },
    {
      id: "hgb", group: "ОАК", name: "Гемоглобин", unit: "г/л", value: 144, low: 130, high: 170, flag: "normal",
      date: "18.04.2026", material: "Венозная кровь", method: "SLS", lab: "Центральная лаборатория",
      note: "Значение в пределах референсного интервала.",
      history: [["10.01", 141], ["07.02", 139], ["02.03", 142], ["02.04", 143], ["18.04", 144]]
    },
    {
      id: "wbc", group: "ОАК", name: "Лейкоциты", unit: "10⁹/л", value: 6.1, low: 4.0, high: 9.0, flag: "normal",
      date: "18.04.2026", material: "Венозная кровь", method: "Проточная цитометрия", lab: "Центральная лаборатория",
      note: "Критических отклонений нет.",
      history: [["10.01", 5.7], ["07.02", 6.0], ["02.03", 5.9], ["02.04", 6.3], ["18.04", 6.1]]
    },
    {
      id: "plt", group: "ОАК", name: "Тромбоциты", unit: "10⁹/л", value: 256, low: 150, high: 400, flag: "normal",
      date: "18.04.2026", material: "Венозная кровь", method: "Импедансный", lab: "Центральная лаборатория",
      note: "Значение в пределах референса.",
      history: [["10.01", 240], ["07.02", 251], ["02.03", 260], ["02.04", 248], ["18.04", 256]]
    },
    {
      id: "creatinine", group: "Биохимия", name: "Креатинин", unit: "мкмоль/л", value: 88, low: 62, high: 106, flag: "normal",
      date: "25.04.2026", material: "Сыворотка", method: "Jaffe compensated", lab: "Центральная лаборатория",
      note: "Значение в пределах референсного интервала.",
      history: [["10.01", 84], ["07.02", 86], ["02.03", 85], ["02.04", 89], ["25.04", 88]]
    },
    {
      id: "alt", group: "Биохимия", name: "АЛТ", unit: "Ед/л", value: 32, low: 0, high: 41, flag: "normal",
      date: "25.04.2026", material: "Сыворотка", method: "IFCC", lab: "Центральная лаборатория",
      note: "Значение в пределах референса.",
      history: [["10.01", 28], ["07.02", 30], ["02.03", 31], ["02.04", 33], ["25.04", 32]]
    },
    {
      id: "inr", group: "Коагулограмма", name: "МНО", unit: "", value: 1.04, low: 0.85, high: 1.15, flag: "normal",
      date: "12.04.2026", material: "Плазма", method: "Коагулометрия", lab: "Центральная лаборатория",
      note: "Показатель в пределах референса для пациента без антикоагулянтной терапии.",
      history: [["10.01", 1.00], ["07.02", 1.02], ["02.03", 1.03], ["02.04", 1.01], ["12.04", 1.04]]
    },
    {
      id: "tsh", group: "Гормоны", name: "ТТГ", unit: "мМЕ/л", value: 2.1, low: 0.4, high: 4.0, flag: "normal",
      date: "10.04.2026", material: "Сыворотка", method: "Хемилюминесцентный иммуноанализ", lab: "Центральная лаборатория",
      note: "Значение в пределах референсного интервала.",
      history: [["10.01", 2.5], ["07.02", 2.4], ["02.03", 2.2], ["02.04", 2.0], ["10.04", 2.1]]
    }
  ]
};

let state = {
  currentSection: "home",
  currentLabGroup: "Все",
  selectedLabId: "glucose"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function statusClass(level) {
  if (level === "ok" || level === "normal") return "status-ok";
  if (level === "warn" || level === "high" || level === "low") return "status-warn";
  if (level === "bad") return "status-bad";
  return "status-info";
}

function flagText(flag) {
  if (flag === "high") return "Выше";
  if (flag === "low") return "Ниже";
  return "Норма";
}

function formatValue(lab) {
  return `${lab.value}${lab.unit ? " " + lab.unit : ""}`;
}

function boot() {
  $("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    mockData.patient.phone = $("#phoneInput").value || mockData.patient.phone;
    mockData.patient.misCard = $("#cardInput").value || mockData.patient.misCard;
    $("#loginScreen").classList.add("hidden");
    $("#dashboard").classList.remove("hidden");
    $(".sidebar").style.display = "flex";
    renderAll();
  });

  $$(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => navigate(btn.dataset.section));
  });

  document.body.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) navigate(go.dataset.go);
  });

  $("#mobileMenu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));

  $("#demoRefresh").addEventListener("click", () => {
    mockData.patient.lastSync = new Date().toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    renderAll();
    showToast("Демо-данные обновлены");
  });

  $("#downloadMock").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mock-patient-data.json";
    link.click();
    URL.revokeObjectURL(url);
  });
}

function renderAll() {
  const p = mockData.patient;
  $("#patientName").textContent = p.name;
  $("#avatar").textContent = p.shortName;
  $("#sidebarCardNumber").textContent = p.misCard;
  $("#lastUpdated").textContent = `синхронизация ${p.lastSync}`;
  renderHome();
  renderTabs();
  renderLabs();
  renderVisits();
  renderReports();
  renderProfile();
}

function navigate(section) {
  state.currentSection = section;
  $$(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.section === section));
  $$(".section").forEach(sec => sec.classList.remove("active"));
  $(`#section-${section}`).classList.add("active");
  $("#sidebar").classList.remove("open");
  if (section === "labs") setTimeout(drawSelectedChart, 50);
}

function renderHome() {
  const abnormal = mockData.labs.filter(l => l.flag !== "normal");
  $("#healthSummary").textContent = abnormal.length ? "Есть показатели вне референса" : "Все последние показатели в норме";
  $("#healthSummaryText").textContent = abnormal.length
    ? `Последняя лаборатория: ${abnormal.map(x => x.name).join(", ")} требуют внимания. Критических значений в демо-данных нет.`
    : "По последним лабораторным данным отклонений не выявлено.";

  $("#activityFeed").innerHTML = mockData.activities.map(item => `
    <article class="activity-item">
      <div class="icon-bubble">${item.icon}</div>
      <div>
        <div class="activity-title">${item.title}</div>
        <div class="muted">${item.text}</div>
        <div class="card-meta">${item.date}</div>
      </div>
      <span class="status-pill ${statusClass(item.level)}">${item.status}</span>
    </article>
  `).join("");

  $("#lastLabs").innerHTML = mockData.labs.slice(0, 5).map(lab => `
    <div class="lab-row">
      <div>
        <strong>${lab.name}</strong>
        <small>${lab.date} • ${lab.group}</small>
      </div>
      <div>
        <strong>${formatValue(lab)}</strong>
        <span class="status-pill ${statusClass(lab.flag)}">${flagText(lab.flag)}</span>
      </div>
    </div>
  `).join("");

  const next = mockData.visits[0];
  $("#nextVisit").innerHTML = `
    <div class="visit-card">
      <span class="status-pill status-info">${next.status}</span>
      <h3>${next.title}</h3>
      <div class="card-meta">${next.date}, ${next.time} • ${next.place}</div>
      <div class="doctor">${next.doctor}</div>
      <p class="muted">${next.note}</p>
    </div>
  `;
}

function renderTabs() {
  $("#labTabs").innerHTML = mockData.labGroups.map(group => `
    <button class="tab ${state.currentLabGroup === group ? "active" : ""}" data-group="${group}">${group}</button>
  `).join("");

  $$("#labTabs .tab").forEach(tab => {
    tab.addEventListener("click", () => {
      state.currentLabGroup = tab.dataset.group;
      const filtered = getFilteredLabs();
      if (!filtered.some(l => l.id === state.selectedLabId)) state.selectedLabId = filtered[0]?.id || "glucose";
      renderTabs();
      renderLabs();
    });
  });
}

function getFilteredLabs() {
  if (state.currentLabGroup === "Все") return mockData.labs;
  return mockData.labs.filter(l => l.group === state.currentLabGroup);
}

function renderLabs() {
  const labs = getFilteredLabs();
  $("#labGroupTitle").textContent = state.currentLabGroup === "Все" ? "Все показатели" : state.currentLabGroup;
  $("#labCount").textContent = labs.length;

  $("#labCards").innerHTML = labs.map(lab => `
    <button class="lab-card ${lab.id === state.selectedLabId ? "active" : ""}" data-lab="${lab.id}">
      <div class="lab-card-top">
        <div>
          <div class="lab-name">${lab.name}</div>
          <div class="muted">${lab.date} • ${lab.material}</div>
        </div>
        <span class="status-pill ${statusClass(lab.flag)}">${flagText(lab.flag)}</span>
      </div>
      <div class="lab-value">${formatValue(lab)}</div>
      <div class="muted">Референс: ${lab.low}–${lab.high} ${lab.unit}</div>
    </button>
  `).join("");

  $$("#labCards .lab-card").forEach(card => {
    card.addEventListener("click", () => {
      state.selectedLabId = card.dataset.lab;
      renderLabs();
    });
  });

  renderLabDetail();
}

function renderLabDetail() {
  const lab = mockData.labs.find(l => l.id === state.selectedLabId) || mockData.labs[0];

  $("#labDetail").innerHTML = `
    <div class="lab-detail-head">
      <div>
        <div class="eyebrow">${lab.group}</div>
        <h3>${lab.name}</h3>
        <p class="muted">${lab.note}</p>
      </div>
      <div class="detail-value">${formatValue(lab)}</div>
    </div>

    <div class="detail-grid">
      <div class="detail-tile">
        <span class="tiny-label">Статус</span>
        <strong><span class="status-pill ${statusClass(lab.flag)}">${flagText(lab.flag)}</span></strong>
      </div>
      <div class="detail-tile">
        <span class="tiny-label">Референс</span>
        <strong>${lab.low}–${lab.high} ${lab.unit}</strong>
      </div>
      <div class="detail-tile">
        <span class="tiny-label">Материал</span>
        <strong>${lab.material}</strong>
      </div>
      <div class="detail-tile">
        <span class="tiny-label">Метод</span>
        <strong>${lab.method}</strong>
      </div>
    </div>
  `;

  drawSelectedChart();
}

function drawSelectedChart() {
  const canvas = $("#labChart");
  if (!canvas) return;
  const lab = mockData.labs.find(l => l.id === state.selectedLabId) || mockData.labs[0];
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.max(700, rect.width * dpr);
  canvas.height = 320 * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = rect.width || 760;
  const h = 320;
  ctx.clearRect(0, 0, w, h);

  const pad = { left: 54, right: 28, top: 28, bottom: 48 };
  const values = lab.history.map(x => x[1]);
  const min = Math.min(...values, lab.low) * 0.92;
  const max = Math.max(...values, lab.high) * 1.08;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const x = i => pad.left + (plotW * i / (lab.history.length - 1));
  const y = v => pad.top + plotH - ((v - min) / (max - min)) * plotH;

  ctx.strokeStyle = "rgba(17,24,39,.08)";
  ctx.lineWidth = 1;
  ctx.font = "12px -apple-system, BlinkMacSystemFont, Segoe UI";
  ctx.fillStyle = "rgba(107,114,128,.95)";

  for (let i = 0; i < 5; i++) {
    const yy = pad.top + plotH * i / 4;
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(w - pad.right, yy);
    ctx.stroke();
  }

  function drawRef(value, label) {
    const yy = y(value);
    ctx.strokeStyle = "rgba(255,149,0,.8)";
    ctx.setLineDash([7, 7]);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(w - pad.right, yy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(164,92,0,.95)";
    ctx.fillText(label, pad.left + 4, yy - 7);
  }

  drawRef(lab.low, "нижняя граница");
  drawRef(lab.high, "верхняя граница");

  const gradient = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  gradient.addColorStop(0, "rgba(0,122,255,.22)");
  gradient.addColorStop(1, "rgba(0,122,255,0)");

  ctx.beginPath();
  lab.history.forEach((point, i) => {
    const xx = x(i), yy = y(point[1]);
    if (i === 0) ctx.moveTo(xx, yy);
    else ctx.lineTo(xx, yy);
  });
  ctx.lineTo(x(lab.history.length - 1), h - pad.bottom);
  ctx.lineTo(x(0), h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  lab.history.forEach((point, i) => {
    const xx = x(i), yy = y(point[1]);
    if (i === 0) ctx.moveTo(xx, yy);
    else ctx.lineTo(xx, yy);
  });
  ctx.strokeStyle = "#007aff";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();

  lab.history.forEach((point, i) => {
    const xx = x(i), yy = y(point[1]);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(xx, yy, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#007aff";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "rgba(107,114,128,.95)";
    ctx.fillText(point[0], xx - 15, h - 18);
  });

  ctx.fillStyle = "#111827";
  ctx.font = "700 13px -apple-system, BlinkMacSystemFont, Segoe UI";
  ctx.fillText(`${lab.name}, динамика`, pad.left, 20);
}

function renderVisits() {
  $("#visitsList").innerHTML = mockData.visits.map(v => `
    <article class="visit-card">
      <span class="status-pill ${v.status === "Запланировано" ? "status-info" : "status-ok"}">${v.status}</span>
      <h3>${v.title}</h3>
      <div class="card-meta">${v.date}, ${v.time} • ${v.place}</div>
      <div class="doctor">${v.doctor}</div>
      <p class="muted">${v.note}</p>
    </article>
  `).join("");
}

function renderReports() {
  $("#reportsList").innerHTML = mockData.reports.map(r => `
    <article class="report-card">
      <span class="status-pill ${r.status === "Новое" ? "status-info" : "status-ok"}">${r.status}</span>
      <h3>${r.title}</h3>
      <div class="card-meta">${r.date}</div>
      <div class="doctor">${r.doctor}</div>
      <p class="muted">${r.text}</p>
    </article>
  `).join("");
}

function renderProfile() {
  const p = mockData.patient;
  $("#profileCard").innerHTML = `
    <h3>${p.name}</h3>
    <div class="detail-grid">
      <div class="detail-tile"><span class="tiny-label">Возраст</span><strong>${p.age}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Пол</span><strong>${p.sex}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Телефон</span><strong>${p.phone}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Карта МИС</span><strong>${p.misCard}</strong></div>
    </div>
    <p class="muted">Полис: ${p.policy}</p>
    <p class="muted">Медицинская организация: ${p.clinic}</p>
    <p class="muted">Последняя синхронизация: ${p.lastSync}</p>
  `;
}

function showToast(text) {
  const toast = $("#toast");
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

window.addEventListener("resize", () => {
  if (!$("#dashboard").classList.contains("hidden") && state.currentSection === "labs") drawSelectedChart();
});

boot();
