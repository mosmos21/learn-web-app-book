db_drop:
	docker-compose exec db mysql -u root -ppassword -e "DROP DATABASE IF EXISTS app_development"

db_create:
	docker-compose exec db mysql -u root -ppassword -e "CREATE DATABASE app_development"

db_init:
	docker-compose exec db bash -c "mysql -u root -ppassword app_development < /sql/initialize.sql"

db_reset: db_drop db_create db_init

db_drop_test:
	docker-compose exec db mysql -u root -ppassword -e "DROP DATABASE IF EXISTS app_test"

db_create_test:
	docker-compose exec db mysql -u root -ppassword -e "CREATE DATABASE app_test"

db_init_test:
	docker-compose exec db bash -c "mysql -u root -ppassword app_test < /sql/initialize.sql"

db_reset_test: db_drop_test db_create_test db_init_test
