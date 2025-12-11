# Eleanore Wu Portfolio - 系統規格書

## 📋 專案概述

### 專案名稱

Eleanore Wu Portfolio Website

### 專案簡介

Eleanore Wu 的個人作品集網站，展示 UI/UX 設計作品、專業經歷與技能。網站提供深淺模式切換、中英文雙語支援,並採用現代化的動畫與互動設計。

### 開發時間

2024 - 2025

### 版本資訊

- 版本號: 1.0.0
- 最後更新: 2025 年 12 月 11 日

---

## 🎯 核心功能

### 1. 首頁 (Home Page)

- **Hero Section**: 大型視覺展示區,包含個人照片、姓名與職業介紹
- **Preloader 動畫**: 首次訪問時顯示多國語言"你好"動畫
- **關於區塊**: 簡介個人專業背景
- **作品展示**: 以卡片形式展示所有專案作品
- **跑馬燈效果**: 展示專業技能關鍵字
- **聯絡區塊**: 互動式聯絡按鈕與社群連結

### 2. 作品詳情頁 (Project Detail Page)

- **專案標題與分類**: 大型標題配視覺圖片
- **專案概覽**: 詳細描述專案背景與目標
- **專案亮點**: 條列式展示專案核心成果
- **技術資訊**: 展示使用的設計與開發工具
- **下一個專案導航**: 便捷的作品瀏覽動線

### 3. 全域功能

- **響應式導航列**:
  - Logo (點擊返回首頁)
  - 深淺模式切換按鈕
  - 語言切換按鈕 (中文/英文)
  - 漢堡選單按鈕
- **全屏選單**:
  - 導航連結 (首頁、作品、關於、聯絡)
  - 色彩模式與語言切換按鈕
  - 社群媒體連結
- **回到頂部按鈕**: 捲動式圓形按鈕,附帶文字動畫
- **頁面轉場動畫**: 路由切換時的流暢過渡效果

---

## 🛠 技術架構

### 前端框架與函式庫

| 技術                 | 版本     | 用途                 |
| -------------------- | -------- | -------------------- |
| **React**            | 19.2.1   | 核心 UI 框架         |
| **TypeScript**       | 5.8.2    | 型別安全與開發效率   |
| **Vite**             | 6.2.0    | 建置工具與開發伺服器 |
| **React Router DOM** | 7.10.1   | 單頁應用路由管理     |
| **Framer Motion**    | 12.23.26 | 動畫與過渡效果       |
| **GSAP**             | 3.14.1   | 高性能捲動動畫       |
| **Lucide React**     | 0.559.0  | Icon 圖示庫          |
| **Tailwind CSS**     | CDN      | CSS 框架 (透過 CDN)  |

### 專案結構

```
eleanore-wu-portfolio/
├── components/           # React 元件
│   ├── BackToTopButton.tsx    # 回到頂部按鈕
│   ├── Magnetic.tsx           # 磁吸互動效果元件
│   ├── MarqueeParallax.tsx    # 跑馬燈視差效果
│   ├── Navbar.tsx             # 導航列
│   ├── Preloader.tsx          # 載入動畫
│   ├── ProjectCard.tsx        # 專案卡片
│   └── Transition.tsx         # 頁面轉場動畫
├── context/             # React Context
│   └── AppContext.tsx         # 全域狀態管理 (語言、主題)
├── pages/               # 頁面元件
│   ├── Home.tsx              # 首頁
│   └── ProjectDetail.tsx     # 作品詳情頁
├── constants.ts         # 常數定義 (專案資料)
├── types.ts             # TypeScript 型別定義
├── App.tsx              # 主應用程式元件
├── index.tsx            # 應用程式入口點
├── index.html           # HTML 模板
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 專案依賴與腳本
```

---

## 🎨 設計系統

### 色彩配置

#### 淺色模式 (Light Mode)

- **背景色**: `#E5E5E5` (淺灰)
- **表面色**: `#FFFFFF` (白色)
- **文字色**: `#0F0F0F` (深黑)
- **主要色**: `#999999` (灰色)
- **次要色**: `#CCCCCC` (淡灰)
- **強調色**: `#FFFFFF` (白色)

#### 深色模式 (Dark Mode)

- **背景色**: `#0F0F0F` (純黑)
- **表面色**: `#1A1A1A` (深灰)
- **文字色**: `#FAFAFA` (淡白)
- **主要色**: `#999999` (灰色)
- **次要色**: `#CCCCCC` (淡灰)
- **強調色**: `#FFFFFF` (白色)

### 字體系統

- **主字體**: Inter, Noto Sans TC, sans-serif
- **標題字體**: Syne, Oswald, sans-serif
- **字重**: 300, 400, 500, 600, 700, 800

### 圓角設計

- **一般圓角**: `1rem`, `1.5rem`, `2rem`
- **大型圓角**: `2.5rem`, `3rem`

### 文字選取樣式

- **淺色模式**: 深色背景 (#0F0F0F) + 白色文字
- **深色模式**: 白色背景 (#FFFFFF) + 深色文字

---

## 📊 資料結構

### Project (專案)

```typescript
interface Project {
  id: string; // 專案唯一識別碼
  title: string; // 專案標題
  category: string; // 專案分類
  thumbnail: string; // 縮圖 URL
  period?: string; // 專案時期
  role: {
    // 角色描述 (多語言)
    zh: string;
    en: string;
  };
  description: {
    // 專案描述 (多語言)
    zh: string;
    en: string;
  };
  details: {
    // 專案細節 (多語言)
    zh: string[];
    en: string[];
  };
  techStack: string[]; // 技術堆疊
  link?: string; // 專案連結 (選填)
}
```

### Language & Theme

```typescript
type Language = "zh" | "en";
type Theme = "light" | "dark";
```

---

## 🎬 動畫與互動

### 頁面動畫

1. **Preloader 動畫**:

   - 多國語言文字依序淡入淡出
   - 僅在首次訪問首頁時顯示
   - 使用 GSAP Timeline 實現

2. **頁面轉場**:

   - 路由切換時的滑動覆蓋效果
   - 使用 Framer Motion 與 AnimatePresence

3. **Hero Section**:

   - 照片與文字的淡入上升動畫
   - GSAP ScrollTrigger 視差效果

4. **作品卡片**:
   - Hover 時縮放與覆蓋層動畫
   - 圖片視差滾動效果

### 互動效果

1. **Magnetic 磁吸效果**:

   - 滑鼠接近時按鈕會產生吸附跟隨效果
   - 應用於所有主要按鈕

2. **跑馬燈視差**:

   - 隨滾動位置移動的文字跑馬燈
   - 使用 Framer Motion useTransform

3. **回到頂部按鈕**:
   - 捲動超過 100px 後淡入顯示
   - 圓形按鈕配旋轉文字動畫

---

## 🌐 國際化 (i18n)

### 支援語言

- **繁體中文** (zh)
- **英文** (en)

### 實作方式

- 使用 React Context (`AppContext`) 管理當前語言
- 所有文字內容以物件形式定義 `{ zh: string, en: string }`
- 提供 `t()` 輔助函數自動根據當前語言回傳對應文字
- 語言偏好儲存於 localStorage

---

## 🎨 主題系統

### 深淺模式切換

- **預設行為**: 偵測系統偏好 `prefers-color-scheme`
- **手動切換**: 透過 UI 按鈕切換
- **持久化**: 儲存於 localStorage
- **實作方式**:
  - HTML 根元素添加/移除 `dark` class
  - Tailwind CSS 的 `dark:` 前綴自動應用樣式

### 切換按鈕位置

- **桌面版**: 導航列右上角 (選單關閉時)
- **選單內**: 所有裝置在選單打開時都可見

---

## 📱 響應式設計

### 斷點設計

- **手機**: < 768px
- **平板**: 768px - 1024px
- **桌面**: > 1024px

### 適配策略

- **Hero Section**: 手機版垂直排列,桌面版水平排列
- **導航列**: 手機版使用全屏選單,桌面版顯示內聯按鈕
- **作品卡片**: 響應式圖片比例與間距
- **文字大小**: 使用視窗單位 (vw) 與響應式 Tailwind 類別

---

## 🔧 開發與部署

### 開發指令

```bash
npm run dev        # 啟動開發伺服器 (http://localhost:3000)
npm run build      # 建置生產版本
npm run preview    # 預覽生產版本
```

### 建置輸出

- 輸出目錄: `dist/`
- 靜態資源優化與壓縮
- Hash 檔名以支援長期快取

### 環境需求

- Node.js 18+
- npm 或 yarn 套件管理器

---

## 🚀 效能優化

### 已實作優化

1. **Lazy Loading**: 圖片延遲載入
2. **Code Splitting**: React Router 自動程式碼分割
3. **Preloader 限制**: 僅首次訪問首頁顯示,避免重複載入
4. **SessionStorage**: 追蹤 Preloader 顯示狀態
5. **GSAP ScrollTrigger**: 高效能捲動動畫
6. **Framer Motion**: 優化的動畫引擎

### 圖片策略

- 目前使用 Picsum Photos CDN (https://picsum.photos)
- 建議替換為實際專案圖片時使用 WebP 格式
- 建議實作響應式圖片 (srcset)

---

## ♿ 無障礙設計

### 已實作功能

1. **鍵盤導航**: 所有互動元素可用鍵盤操作
2. **語意化 HTML**: 使用正確的標籤結構
3. **對比度**: 深淺模式都符合 WCAG AA 標準
4. **Focus 狀態**: 清晰的焦點指示器
5. **替代文字**: 圖片包含 alt 屬性

### 建議改進

- 添加 ARIA 標籤
- Skip to content 連結
- 螢幕閱讀器測試

---

## 📂 專案資料

### 專案列表 (共 5 個)

1. **查公司 (Cha Company)** - SaaS Platform
2. **Open Taipei (臺北市資料大平台)** - Government / Open Data
3. **Scout | KYC Finance SaaS** - FinTech / B2B
4. **Taiwan Experience Empirical Survey** - Education / Research
5. **The F2E (喵立翰)** - Side Project

### 技術標籤

- **設計工具**: Figma, Illustrator, Photoshop
- **前端技術**: Vue 3, Nuxt 3, React, HTML, CSS/SCSS, Tailwind
- **其他**: i18n, Accessibility AA, Data Visualization

---

## 🔐 瀏覽器支援

### 目標瀏覽器

- Chrome (最新兩個版本)
- Firefox (最新兩個版本)
- Safari (最新兩個版本)
- Edge (最新兩個版本)

### 功能支援需求

- ES6+ JavaScript
- CSS Grid & Flexbox
- CSS Custom Properties (變數)
- `prefers-color-scheme` 媒體查詢

---

## 🐛 已知限制與未來改進

### 目前限制

1. 無後端整合,所有資料為靜態
2. 無聯絡表單功能
3. 無 CMS 系統,內容更新需修改程式碼
4. 社群連結為示意連結

### 未來改進方向

1. **CMS 整合**: 使用 Headless CMS (如 Strapi, Contentful)
2. **聯絡表單**: 整合 EmailJS 或 Formspree
3. **部落格功能**: 新增技術文章區塊
4. **專案篩選**: 依分類或技術篩選作品
5. **搜尋功能**: 全站搜尋
6. **Analytics**: Google Analytics 或 Plausible
7. **SEO 優化**: Meta tags, Open Graph, Sitemap
8. **PWA**: 離線支援與安裝功能

---

## 📝 授權與版權

### 版權資訊

© 2025 Eleanore Wu. All rights reserved.

### 專案授權

此為個人作品集專案,未指定開源授權。

---

## 📞 聯絡資訊

### 開發者

- **姓名**: Eleanore Wu (吳雨恩)
- **職稱**: Sr. UI/UX Designer
- **Email**: yuenwu850823@gmail.com
- **地點**: Taipei City, Taiwan

### 社群連結

- LinkedIn
- Instagram
- GitHub

---

## 📚 技術文件參考

### 框架與函式庫

- [React 官方文件](https://react.dev/)
- [TypeScript 官方文件](https://www.typescriptlang.org/)
- [Vite 官方文件](https://vitejs.dev/)
- [Framer Motion 文件](https://www.framer.com/motion/)
- [GSAP 文件](https://greensock.com/docs/)
- [React Router 文件](https://reactrouter.com/)
- [Tailwind CSS 文件](https://tailwindcss.com/)

---

**文件版本**: 1.0  
**最後更新**: 2025 年 12 月 11 日  
**維護者**: Eleanore Wu
