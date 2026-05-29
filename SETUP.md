# QMS 品質管理 - 正式版部署說明

## 檔案清單
- `index.html` — 主程式 (v1.0)
- `manifest.json` — PWA設定
- `sw.js` — Service Worker（離線支援）
- `qms_icon_512.svg` — App圖示（需轉成PNG）
- `qms_apps_script.js` — Google Apps Script代碼

---

## Step 1：建立 Google Sheet

1. 開啟 Google Drive → 新增 → Google 試算表
2. 命名：`QMS品質管理`
3. 不需要手動建欄位，程式會自動建立

---

## Step 2：部署 Google Apps Script

1. 在試算表中：擴充功能 → Apps Script
2. 刪除預設代碼，貼上 `qms_apps_script.js` 全部內容
3. 儲存（Ctrl+S），命名專案：`QMS API`
4. 點「部署」→「新增部署作業」
5. 設定：
   - 類型：網路應用程式
   - 執行身分：**我**（Steven的帳號）
   - 存取：**任何人**
6. 點「部署」→ 複製 Web App URL（格式：https://script.google.com/...）

---

## Step 3：上傳到 GitHub Pages

1. 到 `steventeng1226-collab` GitHub帳號
2. 新增 Repository，命名：`qms-app`，設為 Public
3. 上傳以下4個檔案：
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`（需從SVG轉換）
   - `icon-512.png`（需從SVG轉換）
4. Settings → Pages → Branch: main → Save
5. App網址：`https://steventeng1226-collab.github.io/qms-app/`

---

## Step 4：設定 Google Sheets 連接

1. 用手機Chrome開啟 App 網址
2. 主控台頁面 → 點「☁ 設定同步」按鈕
3. 貼上 Step 2 複製的 Web App URL
4. 確定後頁面重新載入，右上角顯示 **✓** 代表連接成功

---

## Step 5：安裝到手機主畫面

1. Chrome 開啟 App 網址
2. 右上角三點 → 「新增到主畫面」
3. 名稱：品質管理 → 新增
4. 主畫面會出現 App 圖示

---

## 圖示轉換（SVG → PNG）

用 https://convertio.co 或其他工具：
- `qms_icon_512.svg` → `icon-512.png`（512×512）
- 縮小到 192×192 → `icon-192.png`

---

## 資料說明

- 資料存在 Google Sheets（主要）+ 手機本地快取（備份）
- 每次新增/修改案件，自動同步到 Sheets（2秒後）
- 點右上角 `⟳` 可手動立即同步
- 換手機：安裝新手機 App → 設定同一個 Sheets URL → 資料自動載入
