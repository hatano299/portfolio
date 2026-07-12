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
│   ├── common/        # 共通コンポーネント（Header, Layout, etc.）
│   └── works/         # Works ページ用コンポーネント
├── hooks/             # カスタムフック
├── lib/
│   ├── common/        # 型定義
│   └── data/          # 静的データ・定数
└── pages/             # ページコンポーネント
public/
└── data/
    └── works.json     # 作品データ
```

## Environment Variables

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SITE_URL` | サイトの公開URL（OGP用） |

`.env.*` に設定する（`.gitignore` 管理）。

## Adding Works

`public/data/works.json` に以下の形式で追記する。

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

## Deploy

`main` ブランチへの push で Vercel が自動デプロイする。
