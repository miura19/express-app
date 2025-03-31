# ベースイメージ
FROM node:20

# 作業ディレクトリ
WORKDIR /app

# 依存関係をコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install

# Vue のソースコードをコピー
COPY . .

# 開発サーバーを起動
CMD ["npm", "run", "dev"]