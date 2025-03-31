# 使用するベースイメージ
FROM node:20

# 作業ディレクトリを指定
WORKDIR /app

# パッケージのインストールに必要なファイルをコピー
COPY package.json package-lock.json ./

# npm install を実行して依存関係をインストール
RUN npm install

# 残りのファイルをコピー
COPY . .

# サーバーがリッスンするポートを開放
EXPOSE 3000

# Express アプリケーションを起動
CMD ["npm", "run" , "dev"]