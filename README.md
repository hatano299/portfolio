# Portfolio

個人ポートフォリオサイト。

## Tech Stack

| 項目 | 技術 |
|------|------|
| Framework | Next.js 15 (Pages Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Deploy | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) で確認。

## Project Structure

```
src/
├── components/
│   ├── common/        # 共通コンポーネント（Header, Layout, parts/）
│   └── works/         # Works ページ用コンポーネント
├── lib/
│   ├── data/          # 静的データ・定数
│   └── types/         # 型定義
├── pages/             # ページコンポーネント
└── styles/            # グローバル CSS
public/
└── images/            # 画像アセット
```

## Environment Variables

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SITE_URL` | サイトの公開URL（OGP用） |

`.env.*` に設定する（`.gitignore` 管理）。

## Adding Works

`src/lib/data/works.json` に以下の形式で追記する。

```json
[
  {
    "id": 1,
    "title": "作品タイトル",
    "image_url": "/images/works/example.png",
    "description": "説明文",
    "created_at": "2026-07",
    "link_url": "https://github.com/hatano299/xxx"
  }
]
```

## Styling

Tailwind CSS に統一する。  
再利用パターンは `src/styles/globals.css` の `@layer components` に記述し、アニメーション等は同ファイルの `@layer` 外に記述する。

## Deploy

`main` ブランチへの push で Vercel が自動デプロイする。
