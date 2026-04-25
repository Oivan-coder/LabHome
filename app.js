const mockData = {
  patient: {
    name: "Алексей Петров",
    shortName: "АП",
    sex: "Мужской",
    age: 42,
    birthDate: "14.08.1983",
    phone: "+7 900 123-45-67",
    misCard: "MIS-248019",
    policy: "ОМС •••• 9381",
    clinic: "ГБУЗ Центральная поликлиника",
    lastSync: "25.04.2026, 09:42",
    address: "Московская область"
  },
  activities: [
    { type: "lab", title: "Готовы результаты биохимии крови", text: "3 показателя выше референса: глюкоза, ЛПНП и общий холестерин.", date: "Сегодня, 09:10", status: "Требует внимания", level: "warn", icon: "◌" },
    { type: "report", title: "Добавлено заключение терапевта", text: "Рекомендован контроль липидного профиля и повтор глюкозы натощак.", date: "Вчера, 17:35", status: "Новое", level: "info", icon: "□" },
    { type: "visit", title: "Прием у кардиолога", text: "Плановый прием завершен. Следующий контроль через 3 месяца.", date: "22.04.2026", status: "Завершено", level: "ok", icon: "⌘" },
    { type: "doc", title: "Загружена выписка", text: "PDF-документ доступен в разделе документов.", date: "20.04.2026", status: "Файл", level: "purple", icon: "☷" },
    { type: "lab", title: "Общий анализ крови", text: "Критических отклонений нет. Гемоглобин, лейкоциты и тромбоциты в норме.", date: "18.04.2026", status: "Все ок", level: "ok", icon: "◌" }
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
  documents: [
    { title: "Результаты биохимии", type: "PDF", size: "146 КБ", date: "25.04.2026", icon: "◌" },
    { title: "Заключение терапевта", type: "PDF", size: "118 КБ", date: "24.04.2026", icon: "□" },
    { title: "ЭКГ", type: "PDF", size: "204 КБ", date: "22.04.2026", icon: "⌁" },
    { title: "Выписка из карты", type: "PDF", size: "312 КБ", date: "20.04.2026", icon: "☷" },
    { title: "ОАК", type: "PDF", size: "96 КБ", date: "18.04.2026", icon: "◌" },
    { title: "Справка", type: "PDF", size: "74 КБ", date: "28.03.2026", icon: "✓" }
  ],
  labGroups: ["Все", "ОАК", "Биохимия", "Липидный профиль", "Коагулограмма", "Гормоны", "Воспаление"],
  labs: [
    {
      id: "glucose", group: "Биохимия", name: "Глюкоза", unit: "ммоль/л", value: 6.2, low: 3.9, high: 5.5, flag: "high",
      date: "25.04.2026", material: "Венозная кровь", method: "Гексокиназный метод", lab: "Центральная лаборатория",
      interpretation: "Показатель выше референсного интервала. Для интерпретации важно, сдавался ли анализ натощак. Однократное повышение не является диагнозом.",
      history: [["10.01", 5.1], ["07.02", 5.3], ["02.03", 5.7], ["02.04", 5.9], ["25.04", 6.2]]
    },
    {
      id: "hba1c", group: "Биохимия", name: "HbA1c", unit: "%", value: 5.7, low: 4.0, high: 5.6, flag: "high",
      date: "25.04.2026", material: "Венозная кровь", method: "ВЭЖХ", lab: "Центральная лаборатория",
      interpretation: "Значение находится немного выше верхней границы демо-референса. Нужна очная интерпретация с учетом анамнеза.",
      history: [["10.01", 5.3], ["07.02", 5.4], ["02.03", 5.5], ["02.04", 5.6], ["25.04", 5.7]]
    },
    {
      id: "cholesterol", group: "Липидный профиль", name: "Общий холестерин", unit: "ммоль/л", value: 5.8, low: 0, high: 5.2, flag: "high",
      date: "25.04.2026", material: "Сыворотка", method: "Ферментативный метод", lab: "Центральная лаборатория",
      interpretation: "Показатель выше условного диапазона. Обычно оценивается вместе с ЛПНП, ЛПВП, триглицеридами и сердечно-сосудистым риском.",
      history: [["10.01", 5.0], ["07.02", 5.1], ["02.03", 5.4], ["02.04", 5.6], ["25.04", 5.8]]
    },
    {
      id: "ldl", group: "Липидный профиль", name: "ЛПНП", unit: "ммоль/л", value: 3.6, low: 0, high: 3.0, flag: "high",
      date: "25.04.2026", material: "Сыворотка", method: "Расчетный", lab: "Центральная лаборатория",
      interpretation: "ЛПНП выше условного целевого значения. Целевой уровень зависит от индивидуального риска.",
      history: [["10.01", 2.9], ["07.02", 3.0], ["02.03", 3.2], ["02.04", 3.4], ["25.04", 3.6]]
    },
    {
      id: "hdl", group: "Липидный профиль", name: "ЛПВП", unit: "ммоль/л", value: 1.2, low: 1.0, high: 99, flag: "normal",
      date: "25.04.2026", material: "Сыворотка", method: "Ферментативный метод", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах демо-референса.",
      history: [["10.01", 1.1], ["07.02", 1.1], ["02.03", 1.2], ["02.04", 1.2], ["25.04", 1.2]]
    },
    {
      id: "triglycerides", group: "Липидный профиль", name: "Триглицериды", unit: "ммоль/л", value: 1.6, low: 0, high: 1.7, flag: "normal",
      date: "25.04.2026", material: "Сыворотка", method: "Ферментативный метод", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референсного интервала.",
      history: [["10.01", 1.4], ["07.02", 1.5], ["02.03", 1.7], ["02.04", 1.5], ["25.04", 1.6]]
    },
    {
      id: "hgb", group: "ОАК", name: "Гемоглобин", unit: "г/л", value: 144, low: 130, high: 170, flag: "normal",
      date: "18.04.2026", material: "Венозная кровь", method: "SLS", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референсного интервала.",
      history: [["10.01", 141], ["07.02", 139], ["02.03", 142], ["02.04", 143], ["18.04", 144]]
    },
    {
      id: "wbc", group: "ОАК", name: "Лейкоциты", unit: "10⁹/л", value: 6.1, low: 4.0, high: 9.0, flag: "normal",
      date: "18.04.2026", material: "Венозная кровь", method: "Проточная цитометрия", lab: "Центральная лаборатория",
      interpretation: "Критических отклонений нет.",
      history: [["10.01", 5.7], ["07.02", 6.0], ["02.03", 5.9], ["02.04", 6.3], ["18.04", 6.1]]
    },
    {
      id: "plt", group: "ОАК", name: "Тромбоциты", unit: "10⁹/л", value: 256, low: 150, high: 400, flag: "normal",
      date: "18.04.2026", material: "Венозная кровь", method: "Импедансный", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референса.",
      history: [["10.01", 240], ["07.02", 251], ["02.03", 260], ["02.04", 248], ["18.04", 256]]
    },
    {
      id: "esr", group: "Воспаление", name: "СОЭ", unit: "мм/ч", value: 12, low: 0, high: 15, flag: "normal",
      date: "18.04.2026", material: "Венозная кровь", method: "Капиллярная фотометрия", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах демо-референса.",
      history: [["10.01", 10], ["07.02", 11], ["02.03", 13], ["02.04", 12], ["18.04", 12]]
    },
    {
      id: "crp", group: "Воспаление", name: "СРБ", unit: "мг/л", value: 6.8, low: 0, high: 5.0, flag: "high",
      date: "25.04.2026", material: "Сыворотка", method: "Иммунотурбидиметрия", lab: "Центральная лаборатория",
      interpretation: "СРБ слегка выше референсного диапазона. Интерпретируется с учетом симптомов и осмотра.",
      history: [["10.01", 2.1], ["07.02", 2.6], ["02.03", 3.8], ["02.04", 5.2], ["25.04", 6.8]]
    },
    {
      id: "creatinine", group: "Биохимия", name: "Креатинин", unit: "мкмоль/л", value: 88, low: 62, high: 106, flag: "normal",
      date: "25.04.2026", material: "Сыворотка", method: "Jaffe compensated", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референсного интервала.",
      history: [["10.01", 84], ["07.02", 86], ["02.03", 85], ["02.04", 89], ["25.04", 88]]
    },
    {
      id: "alt", group: "Биохимия", name: "АЛТ", unit: "Ед/л", value: 32, low: 0, high: 41, flag: "normal",
      date: "25.04.2026", material: "Сыворотка", method: "IFCC", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референса.",
      history: [["10.01", 28], ["07.02", 30], ["02.03", 31], ["02.04", 33], ["25.04", 32]]
    },
    {
      id: "ast", group: "Биохимия", name: "АСТ", unit: "Ед/л", value: 27, low: 0, high: 40, flag: "normal",
      date: "25.04.2026", material: "Сыворотка", method: "IFCC", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референса.",
      history: [["10.01", 25], ["07.02", 27], ["02.03", 29], ["02.04", 28], ["25.04", 27]]
    },
    {
      id: "inr", group: "Коагулограмма", name: "МНО", unit: "", value: 1.04, low: 0.85, high: 1.15, flag: "normal",
      date: "12.04.2026", material: "Плазма", method: "Коагулометрия", lab: "Центральная лаборатория",
      interpretation: "Показатель в пределах референса для пациента без антикоагулянтной терапии.",
      history: [["10.01", 1.00], ["07.02", 1.02], ["02.03", 1.03], ["02.04", 1.01], ["12.04", 1.04]]
    },
    {
      id: "fibrinogen", group: "Коагулограмма", name: "Фибриноген", unit: "г/л", value: 3.1, low: 2.0, high: 4.0, flag: "normal",
      date: "12.04.2026", material: "Плазма", method: "Коагулометрия", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референсного интервала.",
      history: [["10.01", 2.9], ["07.02", 3.0], ["02.03", 3.2], ["02.04", 3.1], ["12.04", 3.1]]
    },
    {
      id: "tsh", group: "Гормоны", name: "ТТГ", unit: "мМЕ/л", value: 2.1, low: 0.4, high: 4.0, flag: "normal",
      date: "10.04.2026", material: "Сыворотка", method: "Хемилюминесцентный иммуноанализ", lab: "Центральная лаборатория",
      interpretation: "Значение в пределах референсного интервала.",
      history: [["10.01", 2.5], ["07.02", 2.4], ["02.03", 2.2], ["02.04", 2.0], ["10.04", 2.1]]
    },
    {
      id: "vitd", group: "Гормоны", name: "Витамин D", unit: "нг/мл", value: 22, low: 30, high: 100, flag: "low",
      date: "10.04.2026", material: "Сыворотка", method: "ИФА", lab: "Центральная лаборатория",
      interpretation: "Значение ниже демо-целевого диапазона. Тактика зависит от клинического контекста.",
      history: [["10.01", 18], ["07.02", 19], ["02.03", 20], ["02.04", 21], ["10.04", 22]]
    }
  ],
  specialties: [
    { id: "therapy", name: "Терапевт", icon: "✚", description: "анализы, жалобы, профилактика" },
    { id: "cardio", name: "Кардиолог", icon: "♡", description: "АД, ЭКГ, липиды" },
    { id: "endo", name: "Эндокринолог", icon: "◍", description: "глюкоза, ТТГ, витамин D" },
    { id: "neuro", name: "Невролог", icon: "⌁", description: "головная боль, спина" },
    { id: "lab", name: "Забор крови", icon: "◌", description: "процедурный кабинет" },
    { id: "ultrasound", name: "УЗИ", icon: "▣", description: "диагностика" }
  ],
  doctors: [
    { id: "d1", specialty: "therapy", name: "Иванова Мария Сергеевна", role: "Терапевт", rating: "4.9", experience: "12 лет", room: "214", initials: "МИ" },
    { id: "d2", specialty: "therapy", name: "Орлова Наталья Николаевна", role: "Терапевт", rating: "4.8", experience: "9 лет", room: "219", initials: "НО" },
    { id: "d3", specialty: "cardio", name: "Кузнецов Андрей Олегович", role: "Кардиолог", rating: "4.9", experience: "15 лет", room: "305", initials: "АК" },
    { id: "d4", specialty: "endo", name: "Соколова Елена Викторовна", role: "Эндокринолог", rating: "4.7", experience: "11 лет", room: "118", initials: "ЕС" },
    { id: "d5", specialty: "lab", name: "Процедурный кабинет", role: "Забор крови", rating: "—", experience: "08:00–12:00", room: "101", initials: "ПК" },
    { id: "d6", specialty: "ultrasound", name: "Медведев Павел Игоревич", role: "УЗИ-диагност", rating: "4.8", experience: "10 лет", room: "412", initials: "ПМ" }
  ],
  slots: {
    "26.04": ["09:00", "10:30", "11:30", "14:00", "16:30"],
    "27.04": ["08:30", "12:00", "13:30", "15:40"],
    "28.04": ["09:20", "10:40", "12:20", "17:00"],
    "29.04": ["08:20", "11:00", "15:10", "18:00"],
    "30.04": ["09:10", "13:20", "16:20"]
  }
};

let state = {
  currentSection: "home",
  currentLabGroup: "Все",
  selectedLabId: "glucose",
  labSearch: "",
  historyFilter: "all",
  reportFilter: "all",
  specialty: "therapy",
  doctorId: "d1",
  bookingDate: "26.04",
  bookingSlot: "11:30"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function statusClass(level) {
  if (level === "ok" || level === "normal") return "status-ok";
  if (level === "warn" || level === "high" || level === "low") return "status-warn";
  if (level === "bad") return "status-bad";
  if (level === "purple") return "status-purple";
  return "status-info";
}

function iconClass(level) {
  if (level === "ok" || level === "normal") return "ok";
  if (level === "warn" || level === "high" || level === "low") return "warn";
  if (level === "purple") return "purple";
  return "";
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
    $("#sidebar").style.display = "flex";
    renderAll();
  });

  $("#demoFill").addEventListener("click", () => {
    $("#phoneInput").value = "+7 900 123-45-67";
    $("#smsInput").value = "2480";
    $("#cardInput").value = "MIS-248019";
    showToast("Поля заполнены демо-данными");
  });

  $$(".nav-item").forEach(btn => btn.addEventListener("click", () => navigate(btn.dataset.section)));

  document.body.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) {
      navigate(go.dataset.go);
      closeDrawer();
    }
  });

  $("#mobileMenu").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#openQuickActions").addEventListener("click", openDrawer);
  $("#drawerBackdrop").addEventListener("click", closeDrawer);
  $("#closeDrawer").addEventListener("click", closeDrawer);
  $("#drawerRefresh").addEventListener("click", () => {
    refreshDemo();
    closeDrawer();
  });

  $("#demoRefresh").addEventListener("click", refreshDemo);

  $("#downloadMock").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(mockData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mock-patient-data-v2.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  $("#labSearch").addEventListener("input", (e) => {
    state.labSearch = e.target.value.trim().toLowerCase();
    renderLabs();
  });

  $("#closeModal").addEventListener("click", closeBookingModal);
  $("#modalBackdrop").addEventListener("click", closeBookingModal);
  $("#modalToVisits").addEventListener("click", () => {
    closeBookingModal();
    navigate("visits");
  });
}

function refreshDemo() {
  mockData.patient.lastSync = new Date().toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  renderAll();
  showToast("Демо-данные обновлены");
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
  renderLabTimeline();
  renderAppointments();
  renderVisits();
  renderReports();
  renderDocuments();
  renderProfile();
}

function navigate(section) {
  state.currentSection = section;
  $$(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.section === section));
  $$(".section").forEach(sec => sec.classList.remove("active"));
  const target = $(`#section-${section}`);
  if (target) target.classList.add("active");
  $("#sidebar").classList.remove("open");
  if (section === "labs") setTimeout(drawSelectedChart, 50);
}

function renderHome() {
  const abnormal = mockData.labs.filter(l => l.flag !== "normal");
  const normal = mockData.labs.filter(l => l.flag === "normal");
  $("#normalCount").textContent = normal.length;
  $("#warnCount").textContent = abnormal.length;
  $("#healthSummary").textContent = abnormal.length ? "Есть показатели вне референса" : "Все последние показатели в норме";
  $("#healthSummaryText").textContent = abnormal.length
    ? `Внимания требуют: ${abnormal.slice(0, 4).map(x => x.name).join(", ")}. Критических значений в демо-данных нет.`
    : "По последним лабораторным данным отклонений не выявлено.";

  $("#activityFeed").innerHTML = mockData.activities.map(item => `
    <article class="activity-item">
      <div class="icon-bubble ${iconClass(item.level)}">${item.icon}</div>
      <div>
        <div class="activity-title">${item.title}</div>
        <div class="muted">${item.text}</div>
        <div class="card-meta">${item.date}</div>
      </div>
      <span class="status-pill ${statusClass(item.level)}">${item.status}</span>
    </article>
  `).join("");

  $("#lastLabs").innerHTML = mockData.labs.slice(0, 6).map(lab => `
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
  let labs = state.currentLabGroup === "Все"
    ? mockData.labs
    : mockData.labs.filter(l => l.group === state.currentLabGroup);
  if (state.labSearch) {
    labs = labs.filter(l => `${l.name} ${l.group} ${l.material} ${l.method}`.toLowerCase().includes(state.labSearch));
  }
  return labs;
}

function renderLabs() {
  const labs = getFilteredLabs();
  const normal = mockData.labs.filter(l => l.flag === "normal").length;
  const warn = mockData.labs.length - normal;
  $("#labStatNormal").textContent = normal;
  $("#labStatWarn").textContent = warn;
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
      ${sparklineSvg(lab)}
    </button>
  `).join("") || `<div class="muted">Ничего не найдено.</div>`;

  $$("#labCards .lab-card").forEach(card => {
    card.addEventListener("click", () => {
      state.selectedLabId = card.dataset.lab;
      renderLabs();
    });
  });

  renderLabDetail();
}

function sparklineSvg(lab) {
  const values = lab.history.map(x => x[1]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values.map((v, i) => {
    const x = i * 72 / (values.length - 1) + 2;
    const y = 28 - ((v - min) / Math.max(0.001, max - min)) * 22 + 2;
    return `${x},${y}`;
  }).join(" ");
  return `<svg class="sparkline" viewBox="0 0 78 34" preserveAspectRatio="none">
    <polyline points="${points}" fill="none" stroke="${lab.flag === "normal" ? "#34c759" : "#ff9500"}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function renderLabDetail() {
  const lab = mockData.labs.find(l => l.id === state.selectedLabId) || mockData.labs[0];

  $("#labDetail").innerHTML = `
    <div class="lab-detail-head">
      <div>
        <div class="eyebrow">${lab.group}</div>
        <h3>${lab.name}</h3>
        <p class="muted">${lab.lab} • ${lab.date}</p>
      </div>
      <div>
        <div class="detail-value">${formatValue(lab)}</div>
        <span class="status-pill ${statusClass(lab.flag)}">${flagText(lab.flag)}</span>
      </div>
    </div>

    <div class="interpretation-box">
      <strong>Пациентское пояснение</strong>
      <p class="muted">${lab.interpretation}</p>
    </div>

    <div class="detail-grid">
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
      <div class="detail-tile">
        <span class="tiny-label">Статус</span>
        <strong>final</strong>
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

  canvas.width = Math.max(760, rect.width * dpr);
  canvas.height = 340 * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const w = rect.width || 860;
  const h = 340;
  ctx.clearRect(0, 0, w, h);

  const pad = { left: 58, right: 32, top: 32, bottom: 52 };
  const values = lab.history.map(x => x[1]);
  const min = Math.min(...values, lab.low) * 0.90;
  const max = Math.max(...values, lab.high) * 1.10;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const x = i => pad.left + (plotW * i / (lab.history.length - 1));
  const y = v => pad.top + plotH - ((v - min) / Math.max(0.001, max - min)) * plotH;

  const yLow = y(lab.low);
  const yHigh = y(lab.high);
  ctx.fillStyle = "rgba(52,199,89,.12)";
  ctx.fillRect(pad.left, Math.min(yLow, yHigh), plotW, Math.abs(yLow - yHigh));

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
    ctx.strokeStyle = "rgba(255,149,0,.82)";
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
  gradient.addColorStop(0, "rgba(0,122,255,.24)");
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
  ctx.strokeStyle = lab.flag === "normal" ? "#34c759" : "#ff9500";
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
    ctx.strokeStyle = lab.flag === "normal" ? "#34c759" : "#ff9500";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "rgba(107,114,128,.95)";
    ctx.fillText(point[0], xx - 15, h - 18);
  });

  ctx.fillStyle = "#111827";
  ctx.font = "800 13px -apple-system, BlinkMacSystemFont, Segoe UI";
  ctx.fillText(`${lab.name}: динамика`, pad.left, 22);
}

function renderLabTimeline() {
  const grouped = {};
  let labs = mockData.labs;
  if (state.historyFilter === "abnormal") labs = labs.filter(l => l.flag !== "normal");
  else if (state.historyFilter !== "all") labs = labs.filter(l => l.group === state.historyFilter);

  labs.forEach(lab => {
    if (!grouped[lab.date]) grouped[lab.date] = [];
    grouped[lab.date].push(lab);
  });

  $("#labTimeline").innerHTML = Object.entries(grouped).map(([date, items]) => `
    <section class="timeline-day">
      <div class="block-header compact">
        <h3>${date}</h3>
        <span class="pill">${items.length} показателей</span>
      </div>
      <div class="timeline-tests">
        ${items.map(lab => `
          <div class="timeline-test">
            <span class="status-pill ${statusClass(lab.flag)}">${flagText(lab.flag)}</span>
            <b>${lab.name}</b>
            <div>${formatValue(lab)}</div>
            <div class="muted">${lab.group} • реф. ${lab.low}–${lab.high} ${lab.unit}</div>
            <button class="text-btn" onclick="selectLabAndOpen('${lab.id}')">Открыть график</button>
          </div>
        `).join("")}
      </div>
    </section>
  `).join("") || `<div class="mini-card">Нет данных по выбранному фильтру.</div>`;

  $$(".timeline-filters .filter-chip").forEach(btn => {
    btn.onclick = () => {
      state.historyFilter = btn.dataset.historyFilter;
      $$(".timeline-filters .filter-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderLabTimeline();
    };
  });
}

window.selectLabAndOpen = function(id) {
  state.selectedLabId = id;
  state.currentLabGroup = "Все";
  navigate("labs");
  renderTabs();
  renderLabs();
};

function renderAppointments() {
  $("#specialtyList").innerHTML = mockData.specialties.map(s => `
    <button class="specialty-card ${state.specialty === s.id ? "active" : ""}" data-specialty="${s.id}">
      <div class="specialty-icon">${s.icon}</div>
      <div class="lab-name">${s.name}</div>
      <div class="muted">${s.description}</div>
    </button>
  `).join("");

  $$("#specialtyList .specialty-card").forEach(card => {
    card.addEventListener("click", () => {
      state.specialty = card.dataset.specialty;
      const first = mockData.doctors.find(d => d.specialty === state.specialty);
      if (first) state.doctorId = first.id;
      renderAppointments();
    });
  });

  const doctors = mockData.doctors.filter(d => d.specialty === state.specialty);
  $("#doctorCount").textContent = doctors.length;
  $("#doctorList").innerHTML = doctors.map(d => `
    <button class="doctor-card ${state.doctorId === d.id ? "active" : ""}" data-doctor="${d.id}">
      <div class="doctor-avatar">${d.initials}</div>
      <div>
        <div class="lab-name">${d.name}</div>
        <div class="muted">${d.role} • стаж ${d.experience}</div>
        <div class="card-meta">★ ${d.rating} • каб. ${d.room}</div>
      </div>
    </button>
  `).join("");

  $$("#doctorList .doctor-card").forEach(card => {
    card.addEventListener("click", () => {
      state.doctorId = card.dataset.doctor;
      renderAppointments();
    });
  });

  renderBookingDetail();
}

function renderBookingDetail() {
  const doctor = mockData.doctors.find(d => d.id === state.doctorId) || mockData.doctors[0];
  const dates = Object.keys(mockData.slots);

  $("#bookingDetail").innerHTML = `
    <div class="booking-doctor">
      <div class="doctor-avatar">${doctor.initials}</div>
      <div>
        <div class="eyebrow">Выбранный врач</div>
        <h3>${doctor.name}</h3>
        <div class="muted">${doctor.role} • каб. ${doctor.room}</div>
      </div>
    </div>

    <div class="tiny-label">Дата</div>
    <div class="date-strip">
      ${dates.map(d => `
        <button class="date-btn ${state.bookingDate === d ? "active" : ""}" data-date="${d}">
          <span>${d}</span><small>апр</small>
        </button>
      `).join("")}
    </div>

    <div class="tiny-label">Свободное время</div>
    <div class="slots-grid">
      ${mockData.slots[state.bookingDate].map(slot => `
        <button class="slot-btn ${state.bookingSlot === slot ? "active" : ""}" data-slot="${slot}">${slot}</button>
      `).join("")}
    </div>

    <div class="booking-summary">
      <strong>Итог записи</strong>
      <p class="muted">${doctor.role}, ${doctor.name}. Дата ${state.bookingDate}.2026, время ${state.bookingSlot}, кабинет ${doctor.room}.</p>
      <button class="primary-btn full" id="bookBtn">Записаться</button>
    </div>
  `;

  $$("#bookingDetail .date-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.bookingDate = btn.dataset.date;
      state.bookingSlot = mockData.slots[state.bookingDate][0];
      renderBookingDetail();
    });
  });

  $$("#bookingDetail .slot-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.bookingSlot = btn.dataset.slot;
      renderBookingDetail();
    });
  });

  $("#bookBtn").addEventListener("click", createBooking);
}

function createBooking() {
  const doctor = mockData.doctors.find(d => d.id === state.doctorId);
  const dateFull = `${state.bookingDate}.2026`;
  const newVisit = {
    date: dateFull,
    time: state.bookingSlot,
    title: doctor.role,
    doctor: doctor.name,
    place: `Каб. ${doctor.room}`,
    status: "Запланировано",
    note: "Запись создана в демо-кабинете. В боевой версии уйдет POST /appointments/book."
  };
  mockData.visits.unshift(newVisit);
  mockData.activities.unshift({
    type: "visit",
    title: "Создана новая запись",
    text: `${doctor.role}: ${doctor.name}, ${dateFull} в ${state.bookingSlot}.`,
    date: "Только что",
    status: "Запланировано",
    level: "info",
    icon: "＋"
  });
  renderAll();
  $("#bookingResult").innerHTML = `
    <p class="muted">Вы записаны к врачу:</p>
    <div class="visit-card">
      <h3>${doctor.role}</h3>
      <div class="card-meta">${dateFull}, ${state.bookingSlot} • каб. ${doctor.room}</div>
      <div class="doctor">${doctor.name}</div>
    </div>
  `;
  $("#modalBackdrop").classList.add("show");
  $("#bookingModal").classList.add("show");
}

function closeBookingModal() {
  $("#modalBackdrop").classList.remove("show");
  $("#bookingModal").classList.remove("show");
}

function renderVisits() {
  $("#visitsList").innerHTML = mockData.visits.map(v => `
    <article class="visit-card">
      <span class="status-pill ${v.status === "Запланировано" ? "status-info" : "status-ok"}">${v.status}</span>
      <h3>${v.title}</h3>
      <div class="card-meta">${v.date}, ${v.time} • ${v.place}</div>
      <div class="doctor">${v.doctor}</div>
      <p class="muted">${v.note}</p>
      <button class="text-btn" data-go="${v.status === "Запланировано" ? "appointments" : "reports"}">${v.status === "Запланировано" ? "Изменить запись" : "Смотреть заключение"}</button>
    </article>
  `).join("");
}

function renderReports() {
  let reports = mockData.reports;
  if (state.reportFilter !== "all") reports = reports.filter(r => r.status === state.reportFilter);

  $("#reportsList").innerHTML = reports.map(r => `
    <article class="report-card">
      <span class="status-pill ${r.status === "Новое" ? "status-info" : r.status === "Архив" ? "status-purple" : "status-ok"}">${r.status}</span>
      <h3>${r.title}</h3>
      <div class="card-meta">${r.date}</div>
      <div class="doctor">${r.doctor}</div>
      <p class="muted">${r.text}</p>
      <button class="text-btn">Открыть документ</button>
    </article>
  `).join("");

  $$(".report-tabs .filter-chip").forEach(btn => {
    btn.onclick = () => {
      state.reportFilter = btn.dataset.reportFilter;
      $$(".report-tabs .filter-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderReports();
    };
  });
}

function renderDocuments() {
  $("#documentsList").innerHTML = mockData.documents.map(doc => `
    <article class="doc-card">
      <div class="doc-icon">${doc.icon}</div>
      <h3>${doc.title}</h3>
      <div class="card-meta">${doc.date}</div>
      <div class="muted">${doc.type} • ${doc.size}</div>
      <button class="text-btn">Открыть</button>
    </article>
  `).join("");
}

function renderProfile() {
  const p = mockData.patient;
  $("#profileCard").innerHTML = `
    <h3>${p.name}</h3>
    <div class="detail-grid">
      <div class="detail-tile"><span class="tiny-label">Возраст</span><strong>${p.age}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Дата рождения</span><strong>${p.birthDate}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Пол</span><strong>${p.sex}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Телефон</span><strong>${p.phone}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Карта МИС</span><strong>${p.misCard}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Полис</span><strong>${p.policy}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Регион</span><strong>${p.address}</strong></div>
      <div class="detail-tile"><span class="tiny-label">Синхронизация</span><strong>${p.lastSync}</strong></div>
    </div>
    <p class="muted">Медицинская организация: ${p.clinic}</p>
  `;
}

function openDrawer() {
  $("#drawerBackdrop").classList.add("show");
  $("#quickDrawer").classList.add("show");
}

function closeDrawer() {
  $("#drawerBackdrop").classList.remove("show");
  $("#quickDrawer").classList.remove("show");
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
