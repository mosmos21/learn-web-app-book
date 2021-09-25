## setup

```shell
docker-compose up -d
make db_reset
```

## 起動

### バックエンド

```shell
cd backend
npm ci
npm run dev
```

### フロントエンド
```shell
cd frontend
npm ci
npm run start
```
