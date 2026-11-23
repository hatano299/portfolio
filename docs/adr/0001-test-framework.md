# 0001. テスト基盤にVitest + React Testing Libraryを採用

## 結論
Vitest + React Testing Library を導入する

## 理由
Next.js 15 + Turbopack構成では、Jestより設定が軽く実行速度も速い

## 見直すタイミング
Vitestで解決できない互換性の問題(Next.js特有のAPIのモック等)に当たったとき
