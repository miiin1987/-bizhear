# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Start production server (requires build first)
```

No test runner is configured yet.

## Architecture

This is a **Next.js 16 App Router** project using **React 19**, **TypeScript**, and **Tailwind CSS v4**.

- `src/app/` — App Router root. `layout.tsx` is the root layout (Geist fonts, full-height flex body). `page.tsx` is the home route.
- `src/app/globals.css` — Tailwind v4 entry (`@import "tailwindcss"`). CSS custom properties define `--background`/`--foreground` with dark mode via `prefers-color-scheme`. Theme tokens are mapped via `@theme inline`.
- Path alias `@/*` maps to `src/*`.

### Key configuration choices

- **Turbopack** is enabled in both dev (`next dev`) and configured in `next.config.ts` with the `@tailwindcss/turbopack` loader for CSS.
- **`cacheComponents: true`** and **`partialPrefetching: true`** are enabled in `next.config.ts` (Next.js 16 experimental features for React Server Components caching and partial prefetch).
- **Tailwind v4** uses the new `@import "tailwindcss"` syntax (no `tailwind.config.js`). Custom design tokens go in `globals.css` under `@theme`.
- TypeScript strict mode is on.

## BizHear Development Rules

- **技術スタック固定**: Next.js / TypeScript / Tailwind CSS のみ使用する。他のフレームワークやUIライブラリは追加しない。
- **UI言語**: すべての画面テキスト・ラベル・メッセージは日本語で実装する。
- **MVPスコープ厳守**: MVP（最小限の機能）に含まれない機能は実装しない。スコープ外の機能追加・先回り実装はしない。
- **実装禁止領域**: 認証・データベース・AI連携は実装しない。
- **ライブラリ追加禁止**: 既存の依存関係（Next.js / React / Tailwind CSS / TypeScript）で実現できる場合、新たなnpmパッケージを追加しない。
- **既存設定の尊重**: `next.config.ts`・`tsconfig.json`・`eslint.config.mjs`・`globals.css` の設定を無断で変更しない。

### MVPの禁止範囲

以下の機能（F-09〜F-17）はMVPスコープ外のため実装しない。

| ID | 機能名 | Phase |
|---|---|---|
| F-09 | 記入例の表示 | v1.0 |
| F-10 | 任意の担当者情報 | v1.0 |
| F-11 | 作業時間・頻度の入力 | v1.0 |
| F-12 | 課題の優先度設定 | v1.0 |
| F-13 | 下書き保存（localStorage） | v1.0 |
| F-14 | テキストコピー | v1.0 |
| F-15 | 案件管理 | v2.0 |
| F-16 | AI改善提案 | v2.0 |
| F-17 | 要件定義書案生成 | v2.0 |

### XSS対策

- ユーザーの入力値は必ずプレーンテキストとして表示する。`dangerouslySetInnerHTML` は使用しない。
- 確認画面では入力値をそのまま反映し、内容を自動推測・補完しない。

### 状態管理方針

- 入力フォーム（`/`）と確認画面（`/review`）間の値はReact Context でクライアント側のみに保持する。
- サーバーへの送信・保存は行わない。
- `/review` をリロード・直接アクセスして入力値が失われた場合は、入力画面（`/`）にリダイレクトする。

### 手動検証手順

MVP完了の確認として以下を手動で実施する。

1. **入力検証**: 5項目すべて空欄で「確認する」→ 各項目にエラーが表示され遷移しないこと。
2. **文字数超過**: いずれかの項目で最大文字数を超えた状態で「確認する」→ 該当項目にエラーが出ること。
3. **正常フロー**: 5項目を入力して「確認する」→ `/review` に遷移し全項目が表示されること。
4. **値の保持**: 確認画面で「入力に戻る」→ 入力済みの値が維持されていること。
5. **PDF保存**: 確認画面で「PDFとして保存」→ ブラウザ印刷ダイアログが開くこと。
6. **印刷レイアウト**: 印刷プレビューでボタン・ナビゲーションが非表示、A4縦で読みやすく出力されること。
7. **直接アクセス**: `/review` に直接アクセス → 入力画面にリダイレクトされること。
8. **レスポンシブ**: 幅375pxのスマートフォン表示で横スクロールが発生しないこと。
