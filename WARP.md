# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A tiny terminal timer built with @opentui/react, Redux Toolkit, and bundled by Bun into a single-file executable. Implements ELM architecture with Functional Core, Imperative Shell pattern.

## Development Commands

- Setup
  ```bash
  bun install
  ```

- Run (watch / auto-restart)
  ```bash
  bun run dev       # package.json scripts.dev → bun run --watch src/index.tsx
  ```

- Run once (no watch)
  ```bash
  bun src/index.tsx
  ```

- Build (single-file executable)
  ```bash
  bun run compile   # outputs dist/tm
  ```

- Code quality
  ```bash
  bun run format    # biome format src/
  bun run check     # biome check src/
  bun run typecheck # tsc --noEmit
  ```

- Tests (bun:test)
  ```bash
  bun test                          # run all
  bun test src/foo/bar.test.ts      # single file
  bun test --filter "name or regex" # by test name
  ```

- Git hooks (optional but recommended)
  ```bash
  bunx lefthook install
  ```

- Release (creates tag and triggers GitHub Actions)
  ```bash
  bun run release 1.0.0   # or ./scripts/release.sh 1.0.0
  ```
## Architecture & Structure (Functional Core, Imperative Shell)

### Functional Core (`src/core/timer/`)
Pure business logic without side effects:
- `entity.ts` … Timer型定義とドメイン定数
- `calculations.ts` … ドメイン計算（残り時間、進捗率など）
- `updates.ts` … タイマー状態の純粋な変換関数
- `constants.ts` … タイマー関連の定数

### Imperative Shell - Store Layer (`src/store/`)
State management with Redux Toolkit:
- `index.ts` … ストア設定とミドルウェア統合
- `hooks.ts` … 型付きRedux hooks
- `slices/timer.slice.ts` … タイマー状態管理（coreの純粋関数を使用）
- `middleware/timer.middleware.ts` … tick処理の副作用管理（setInterval）
- `selectors/timer.selectors.ts` … UI用のメモ化セレクター

### Imperative Shell - UI Layer (`src/shell/`)
User interface and formatting:
- `tui/index.tsx` … メインTUIコンポーネント
- `tui/enhance.ts` … グローバルキーボードハンドラ（ESC終了）
- `tui/components/header.tsx` … ASCII fontタイトル
- `tui/components/timer/` … タイマー表示と制御
  - `index.tsx` … タイマーUI（状態表示、プログレスバー、コントロール）
  - `enhance.ts` … Redux接続とキーボード制御
- `ui/formatters/time.formatter.ts` … 時間表示フォーマット関数

### Configuration highlights
- TypeScript (tsconfig.json)
  - `jsx`: react-jsx / `jsxImportSource`: `@opentui/react`
  - Path alias: `@/*` → `src/*`（bundler 解決）
  - `moduleResolution`: bundler, `strict`: true, `noEmit`: true
- Dependencies
  - `@reduxjs/toolkit`, `react-redux`: 状態管理
  - `@opentui/react`, `@opentui/core`: TUIフレームワーク
- Packaging (package.json)
  - `scripts.compile`: Bun の `bun build --compile` で `dist/tm` を生成（`--minify --sourcemap`）
  - `module`: `src/index.tsx`（ESM）
- Biome (biome.json)
  - 整形と推奨 Lint、ダブルクォート、インポート整理が有効
- Lefthook (lefthook.yml)
  - pre-commit: `biome format`, `biome check`, `tsc --noEmit` を対象のステージ済みファイルへ実行

## Controls & Runtime Notes

### Keyboard Controls
- **ESC**: アプリ終了（グローバル）
- **S**: タイマー開始（idle/completed時）
- **P**: 一時停止（running時）
- **R**: 再開（paused時）
- **X**: 停止/リセット（running/paused/completed時）

### Timer States
- `idle`: 初期状態
- `running`: タイマー実行中
- `paused`: 一時停止中
- `completed`: 30分経過で完了

### Development
- `NODE_ENV=development` で起動時はログパネルが表示される
- Redux DevToolsは未設定（TUI環境のため）

### Distribution
- `bun run compile` で単一バイナリ `dist/tm` を生成
- GitHub Releases からプラットフォーム別バイナリをダウンロード可能

### CI/CD
- **GitHub Actions** (.github/workflows/)
  - `ci.yml`: Push/PR時の自動テスト（型チェック、Lint、テスト、ビルド）
  - `release.yml`: タグプッシュ時の自動リリース（全プラットフォーム向けビルド）
- **リリースプロセス**
  1. `bun run release <version>` でタグ作成・プッシュ
  2. GitHub Actionsが自動でビルド・リリース作成
  3. Linux/macOS(ARM64/x64)/Windows向けバイナリが生成される

## What to extend next (seams)

### 実装済み
- ✅ ELMアーキテクチャ（Model-Update-View）
- ✅ Functional Core, Imperative Shell パターン
- ✅ Redux Toolkitによる状態管理
- ✅ タイマーの基本機能（開始/停止/一時停止/再開）
- ✅ キーボードショートカット

### 拡張候補
- セッション履歴のSQLite保存（`src/shell/database/`）
- タイマー完了時の通知（音やシステム通知）
- カスタマイズ可能なタイマー時間（現在は30分固定）
- ポモドーロタイマーモード（作業/休憩の切り替え）
- 統計情報の表示（今日の作業時間など）
