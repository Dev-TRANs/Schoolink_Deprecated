# Schoolink
Schoolinkは、学校の生徒会間をスムーズに連携するアプリケーションです

## 開発
### 前提条件
- [Bun](https://bun.sh) : JavaScript/TypeScriptランタイムとパッケージマネージャー
- [Python](https://python.org) : 汎用プログラミング言語
- [Poetry](https://python-poetry.org/) : Pythonのためのパッケージマネージャー

がインストールされていることです。

Windowsの場合、WSLでの開発を推奨します。
### 依存関係のインストール
Bun(Node.js):
```bash
bun install
```
Poetry(Python):
```
poetry install
```
### Develop Server
Schoolinkでは、本番環境の高速性と開発時の快適さを両立するために、開発モードと本番モードが分かれています。

開発サーバーをスタート:
```bash
bun run dev
```
これにより、Viteの開発サーバーと、FastAPIの開発サーバーが起動します。
ViteのURLにアクセスしてください。

`/api`配下がFastAPIにプロキシされます。