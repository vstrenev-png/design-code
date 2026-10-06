(function () {
  'use strict';

  const DEFAULT_LANG = 'bg';
  const STORAGE_KEY = 'dc-lang';

  const translations = {
    bg: {
      // nav / menu
      nav_projects: 'Проекти',
      nav_services: 'Услуги',
      nav_residential: 'Жилищни',
      nav_hospitality: 'Хотелиерство',
      nav_commercial: 'Търговски',
      nav_spa_wellness: 'Спа & Уелнес',
      nav_about: 'За нас',
      nav_contacts: 'Контакти',
      nav_recommendations: 'Препоръки',
      menu_label: 'Меню',
      // loader
      loader_word_1: 'Интериорен',
      loader_word_2: 'Дизайн',
      // hero
      hero_tagline: 'Създаваме изключителни интериорни пространства, където функционалността среща изкуството. Всеки детайл е обмислен, всяка линия е създадена със страст.',
      hero_cta: 'Разгледай проектите',
      hero_scroll: 'Скролирайте',
      // marquee
      marquee_residential: 'Жилищни интериори',
      marquee_commercial: 'Търговски пространства',
      marquee_3d: '3D визуализации',
      marquee_supervision: 'Авторски надзор',
      marquee_detail: 'Внимание към детайла',
      // spaces
      spaces_heading: 'Пространства, които проектираме',
      space_residential: 'Жилищни',
      space_residential_desc: 'Домът отразява начина, по който животът се разгръща в него.',
      space_hospitality: 'Хотелиерство',
      space_hospitality_desc: 'Идентичността определя стойността на всяко гостоприемно пространство.',
      space_commercial: 'Търговски',
      space_commercial_desc: 'Средата ви е вашето конкурентно предимство.',
      space_spa_wellness: 'Спа & Уелнес',
      space_spa_wellness_desc: 'Спокойствието също се проектира — със светлина, текстура и тишина.',
      // projects
      projects_selected: 'Избрани проекти',
      view_all_projects: 'Всички проекти',
      view_project: 'Виж проекта',
      // showreel
      showreel_label: '03 — Видео',
      showreel_hint: '3D визуализация · Twinmotion',
      // about
      about_heading: 'За нас',
      about_since: 'Design-Code · от 2018 г.',
      about_lead: 'Вярваме, че добрият интериор не се забелязва веднага — той се усеща.',
      about_p1: '<strong>Design-Code</strong> е студио за интериорен дизайн, създадено от страст към пространството, светлината и материалите. Подхождаме към пространството отвъд естетиката — оформяме среди чрез логика, контекст и човешко преживяване.',
      about_p2: 'Всеки проект започва с разговор — за навиците, мечтите и начина ви на живот. От там нататък превръщаме идеите в пространства, които изглеждат безвремеви и се живеят лесно.',
      stat_years: 'години опит',
      stat_projects: 'завършени проекта',
      stat_detail: 'внимание към детайла',
      // cta
      cta_heading: 'Какво трябва да направи<br>възможно <em>вашето пространство?</em>',
      cta_button: 'Започнете разговор',
      // footer
      footer_inquiry: 'Запитване',
      footer_new_projects: 'Нови проекти',
      footer_suppliers: 'Доставчици',
      footer_main: 'Основно',
      footer_services: 'Услуги',
      footer_office: 'Офис',
      footer_location: 'София, България',
      footer_copyright: '© 2026 Design-Code — Интериорен дизайн',
      // projects list page
      list_portfolio: 'Портфолио',
      list_title: 'Всички проекти',
      list_sub: 'завършени интериорни проекта — от жилищни интериори до търговски и обществени пространства.',
      // project detail page
      project_label: 'Проект',
      meta_type: 'Тип',
      meta_location: 'Локация',
      meta_year: 'Година',
      meta_area: 'Площ',
      next_project: 'Следващ проект',
      back_to_projects: 'Всички проекти',
    },
    en: {
      // nav / menu
      nav_projects: 'Projects',
      nav_services: 'Services',
      nav_residential: 'Residential',
      nav_hospitality: 'Hospitality',
      nav_commercial: 'Commercial',
      nav_spa_wellness: 'Spa & Wellness',
      nav_about: 'About us',
      nav_contacts: 'Contacts',
      nav_recommendations: 'Recommendations',
      menu_label: 'Menu',
      // loader
      loader_word_1: 'Interior',
      loader_word_2: 'Design',
      // hero
      hero_tagline: 'We create exceptional interior spaces where functionality meets art. Every detail is considered, every line is created with passion.',
      hero_cta: 'View projects',
      hero_scroll: 'Scroll',
      // marquee
      marquee_residential: 'Residential interiors',
      marquee_commercial: 'Commercial spaces',
      marquee_3d: '3D visualizations',
      marquee_supervision: 'Author supervision',
      marquee_detail: 'Attention to detail',
      // spaces
      spaces_heading: 'Spaces we design',
      space_residential: 'Residential',
      space_residential_desc: 'The home reflects the way life unfolds within it.',
      space_hospitality: 'Hospitality',
      space_hospitality_desc: 'Identity defines the value of every hospitality space.',
      space_commercial: 'Commercial',
      space_commercial_desc: 'Your environment is your competitive advantage.',
      space_spa_wellness: 'Spa & Wellness',
      space_spa_wellness_desc: 'Calm is also designed — with light, texture, and silence.',
      // projects
      projects_selected: 'Selected projects',
      view_all_projects: 'All projects',
      view_project: 'View project',
      // showreel
      showreel_label: '03 — Video',
      showreel_hint: '3D visualization · Twinmotion',
      // about
      about_heading: 'About us',
      about_since: 'Design-Code · since 2018',
      about_lead: 'We believe that good interior design is not noticed immediately — it is felt.',
      about_p1: '<strong>Design-Code</strong> is an interior design studio born from a passion for space, light, and materials. We approach space beyond aesthetics — shaping environments through logic, context, and human experience.',
      about_p2: 'Every project begins with a conversation — about your habits, dreams, and way of life. From there, we turn ideas into spaces that look timeless and live easily.',
      stat_years: 'years of experience',
      stat_projects: 'completed projects',
      stat_detail: 'attention to detail',
      // cta
      cta_heading: 'What needs to happen<br>to make <em>your space possible?</em>',
      cta_button: 'Start a conversation',
      // footer
      footer_inquiry: 'Inquiry',
      footer_new_projects: 'New projects',
      footer_suppliers: 'Suppliers',
      footer_main: 'Main',
      footer_services: 'Services',
      footer_office: 'Office',
      footer_location: 'Sofia, Bulgaria',
      footer_copyright: '© 2026 Design-Code — Interior design',
      // projects list page
      list_portfolio: 'Portfolio',
      list_title: 'All projects',
      list_sub: 'completed interior projects — from residential interiors to commercial and public spaces.',
      // project detail page
      project_label: 'Project',
      meta_type: 'Type',
      meta_location: 'Location',
      meta_year: 'Year',
      meta_area: 'Area',
      next_project: 'Next project',
      back_to_projects: 'All projects',
    },
  };

  function getStoredLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'bg' || stored === 'en' ? stored : DEFAULT_LANG;
  }

  function updateLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function setLanguage(lang) {
    if (lang !== 'bg' && lang !== 'en') lang = DEFAULT_LANG;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const text = translations[lang][key];
      if (text === undefined) return;
      if (el.dataset.i18nHtml === 'true') {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll('[data-i18n-project]').forEach((container) => {
      container.querySelectorAll('[data-i18n-project-field]').forEach((el) => {
        const field = el.dataset.i18nProjectField;
        const value = container.getAttribute(`data-${field}-${lang}`);
        if (value !== null) {
          el.textContent = value;
        }
      });
    });

    document.querySelectorAll('[data-view-text]').forEach((el) => {
      el.dataset.viewText = translations[lang].view_project;
    });

    updateLangButtons(lang);
  }

  function initLanguage() {
    const lang = getStoredLang();
    setLanguage(lang);

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
  }

  window.i18n = { setLanguage, initLanguage };
})();
