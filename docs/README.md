
## 対象

TODO

## やること

TODO

## やらないこと

TODO

## 事前準備

以下のセットアップが必要です

- node
- docker-compose

## 仕様

以下の仕様を満たすTODOアプリを作成します

- ユーザー登録・ログイン機能がある
    - ユーザーはIDとパスワードの組み合わせて登録する
    - ユーザーは、ログイン後・設定画面で任意の表示名を設定することができる
- カテゴリを作成することができる
    - カテゴリはユーザーに紐づき・任意のラベルを設定することができる
- タスクを作成することができる
    - タスクには、カテゴリ、タイトル、内容、ステータスを設定することができる
    - ステータスは新規・実施中・完了の3つです

## 画面設計

- トップページ
    - タスクの一覧を表示する
    - タスクのステータスを変更することができる
    - タスクの登録フォームがある
        - タスクの登録時に、名前・カテゴリを設定する
- 登録ページ
    - ID・パスワードの入力フォームがある
- ログインページ
    - ID・パスワードの入力フォームがある
- カテゴリ一覧ページ
    - カテゴリの一覧を表示する
      - テーブルには、名前、関連づけられているタスクの数を表示する
    - カテゴリの追加フォームがある
- 設定ページ
    - 名前を設定・変更することができる

## DB設計

- ユーザーの以下仕様を満たすテーブルを設計する
    - 名前を設定できる
    - ログインID・パスワードを設定することができる

テーブル名: users

| カラム名             | 型            |                                        |                        |
|------------------|--------------|----------------------------------------|------------------------|
| id               | bigint       | not null, auto increment, primary key  | 主キー                    |
| name             | varchar(255) |                                        | 任意設定なのでnot null はつけない  |
| loginId          | varchar(255) | not null, unique                       | 一意である必要があるため、ユニーク制約が必要 |
| encrptedPassword | varchar(255) | not null                               | ハッシュ化したパスワード           |
| createdAt        | datetime(3)  | not null, default current_timestamp(3) | レコードが挿入された時間           |
| updatedAt        | datetime(3)  | not null, default current_timestamp(3) | レコードが更新された時間           |

- カテゴリの以下仕様を満たすテーブルを設計する
    - ユーザごとに紐づく
    - 名前を設定することができる

テーブル名: categories

| カラム名      | 型            |                                        |              |
|-----------|--------------|----------------------------------------|--------------|
| id        | bigint       | not null, auto increment, primary key  | 主キー          |
| userId    | bigint       | not null                               |              |
| name      | varchar(255) |                                        |              |
| createdAt | datetime(3)  | not null, default current_timestamp(3) | レコードが挿入された時間 |
| updatedAt | datetime(3)  | not null, default current_timestamp(3) | レコードが更新された時間 |

※ userId には外部キー制約が必要
※ ユーザーIDごとに一意のカテゴリになるように複合キーでユニーク制約を付ける

- タスクの以下仕様を満たすテーブルを作成する
    - カテゴリを選択してタスクを作る
    - タイトルをつけることができる
    - ステータスを持つことができる（新規・作業中・完了）

テーブル名: tasks

| カラム名       | 型                                 |                                        |              |
|------------|-----------------------------------|----------------------------------------|--------------|
| id         | bigint                            | not null, auto increment, primary key  | 主キー          |
| categoryId | bigint                            | not null                               |              |
| title      | varchar(255)                      | not null                               |              |
| status     | enum('new', 'doing', 'completed') | not null, default 'new'                |              |
| createdAt  | datetime(3)                       | not null, default current_timestamp(3) | レコードが挿入された時間 |
| updatedAt  | datetime(3)                       | not null, default current_timestamp(3) | レコードが更新された時間 |

※ categoryIdには外部キー制約が必要

### coding

- 上のテーブル設計を下にテーブルを作るSQLを書く
  - sql/initialize.sqlに書く
  - 書き終わったら、 `docker-compose up -d ` → `make db_reset` を実行して、開発用のテーブルを作ります

## API設計

- GET /api/v1/auth/me 
  - ログインしているユーザーの情報を返す(status: 200)
  - ログインしていない場合は何も返さない(status: 400) 
- POST /api/v1/auth/sign_up
  - ログインID、表示名、パスワードを送信して登録する
  - 登録が成功した場合はユーザー情報を返す(status: 201)
  - 登録できない場合はエラーメッセージをかえす(status: 400)
- POST /api/v1/auth/sign_in
  - ログインID・パスワードを送信してログインする
  - ログインが成功した場合はユーザー情報を返す(status: 200)
  - ログインできない場合はエラーメッセージを返す(status: 400)
- GET /api/v1/categories
  - ログインしているユーザーが作成したカテゴリ一覧を返す(status: 200)
  - ログインしていない場合は何も返さない(status: 400)
- POST /api/v1/categories
  - 新しいカテゴリを登録する
  - 登録に成功した場合はカテゴリを返す(status: 201)
  - 登録できない場合はエラーメッセージを返す(status: 400)
- GET /api/v1/tasks
  - 任意のパラメータでカテゴリIDを指定することができる
  - ユーザーが作成したタスク一覧を返す(status: 200)
  - カテゴリが指定されている場合はそのカテゴリに紐づくタスク一覧を返す(status: 200)
- POST /api/v1/tasks
  - カテゴリID・タスク名を送信して登録する
  - 登録が成功した場合はタスクを返す(status: 201)
- PATCH /api/v1/tasks/:id
  - タスク状態を送信して、更新する
  - 更新が成功した場合は何も返さない(status: 201)

### coding

- この型定義はフロントエンドとバックエンドで共通で利用するものです
- schema/index.d.tsに記載済みなのでコピペする

## 課題

- 設定ページから名前を設定できるようにする
- カテゴリ・タスクを削除できるようにする
- 表にページネーションの機能をつける
- タスクを登録する時に同時に新しいカテゴリも設定することができるようにする

