import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'cha-company',
    title: '查公司 (Cha Company)',
    category: 'SaaS Platform',
    thumbnail: 'https://picsum.photos/id/1/800/600',
    role: {
      zh: '品牌識別設計 & UI 設計',
      en: 'Brand Identity & UI Design',
    },
    techStack: ['Figma', 'Illustrator'],
    description: {
      zh: '全國首創商業履歷查詢系統。擔任品牌識別設計師，負責品牌形象與 Logo 識別設計，建立一致的品牌視覺。',
      en: 'The nation\'s first business resume query system. Led brand identity and Logo design to establish a consistent visual language.',
    },
    details: {
      zh: [
        '擔任品牌識別設計師，負責品牌形象與 Logo 識別設計。',
        '擔任 UI 設計師，完成網站設計稿與 Prototype，確保介面與互動符合使用者需求。',
        '與 PM 與 RD 緊密協作，推動專案順利上線。',
      ],
      en: [
        'Served as Brand Identity Designer, responsible for brand image and Logo design.',
        'Created website design drafts and Prototypes as UI Designer.',
        'Collaborated closely with PM and RD to ensure successful project launch.',
      ],
    },
  },
  {
    id: 'open-taipei',
    title: 'Open Taipei (臺北市資料大平台)',
    category: 'Government / Open Data',
    thumbnail: 'https://picsum.photos/id/20/800/600',
    role: {
      zh: 'UI 設計 & 前端切版',
      en: 'UI Design & Frontend',
    },
    techStack: ['Vue 3', 'Nuxt 3', 'Accessibility AA', 'SASS'],
    description: {
      zh: '與 PM、RD 跨部門合作，進行前臺改版，優化操作流程。執行前端切版並確保通過無障礙 AA 等級標章認證。',
      en: 'Collaborated on frontend redesign to optimize workflows. Implemented frontend code ensuring Accessibility AA certification.',
    },
    details: {
      zh: [
        '繪製 Mockup 與 Prototype，優化使用者操作流程。',
        '執行前端切版 (Vue3 & Nuxt3)，確保 RWD 與設計規格落地。',
        '新增色彩模式切換與字級大小調整功能，增加網頁易用性。',
        '專案通過無障礙 AA 等級標章認證。',
      ],
      en: [
        'Created Mockups and Prototypes to optimize user flows.',
        'Implemented frontend (Vue3 & Nuxt3), ensuring RWD compliance.',
        'Added color mode switching and font size adjustment for better usability.',
        'Achieved Accessibility AA Level Certification.',
      ],
    },
  },
  {
    id: 'scout-kyc',
    title: 'Scout | KYC Finance SaaS',
    category: 'FinTech / B2B',
    thumbnail: 'https://picsum.photos/id/3/800/600',
    role: {
      zh: '介面設計',
      en: 'Interface Design',
    },
    techStack: ['Figma', 'Wireframing', 'Data Visualization'],
    description: {
      zh: '擔任介面設計師，參與核心功能設計與產品優化，依據使用者訪談與數據分析優化流程體驗。',
      en: 'Designed core features and optimized product based on user interviews and data analysis.',
    },
    details: {
      zh: [
        '擔任介面設計師，參與核心功能設計與產品優化，持續迭代。',
        '依據使用者訪談與數據分析，繪製 Wireframe 優化流程體驗。',
        '確保設計目標與技術實作能成功推動功能上線。',
      ],
      en: [
        'Participated in core feature design and continuous product iteration.',
        'Created Wireframes to optimize flow based on user data.',
        'Ensured design goals were technically feasible for launch.',
      ],
    },
  },
  {
    id: 'taiwan-empirical',
    title: 'Taiwan Experience Empirical Survey',
    category: 'Education / Research',
    thumbnail: 'https://picsum.photos/id/180/800/600',
    role: {
      zh: 'UI 設計 & 前端',
      en: 'UI Design & Frontend',
    },
    techStack: ['Vue 3', 'Nuxt 3', 'i18n'],
    description: {
      zh: '負責網站介面設計稿與 Prototype 製作，執行前端切版並規劃多國語系設計。',
      en: 'Responsible for UI design, prototyping, and frontend implementation with multi-language support.',
    },
    details: {
      zh: [
        '擔任 UI 設計師，負責網站介面設計稿與 Prototype 製作。',
        '執行前端切版 (Vue3 & Nuxt3)，確保 RWD 與設計規格落地。',
        '規劃多國語系設計，提供可用性。',
      ],
      en: [
        'Responsible for website UI design and Prototyping.',
        'Implemented frontend (Vue3 & Nuxt3) with RWD.',
        'Planned and implemented multi-language support.',
      ],
    },
  },
  {
    id: 'the-f2e',
    title: 'The F2E (喵立翰)',
    category: 'Side Project',
    thumbnail: 'https://picsum.photos/id/40/800/600',
    role: {
      zh: 'UI & 前端',
      en: 'UI & Frontend',
    },
    techStack: ['React', 'Event Campaign'],
    description: {
      zh: 'The F2E 前端 & UI 修煉精神時光屋參賽作品 - 喵立翰競選官網。',
      en: 'The F2E Frontend & UI Challenge entry - Meow Li-Han Election Website.',
    },
    details: {
      zh: ['參與 2023 The F2E 挑戰，負責視覺設計與前端實作。'],
      en: ['Participated in 2023 The F2E Challenge, handling visual design and frontend.'],
    },
  },
];