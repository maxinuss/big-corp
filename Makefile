#.PHONY: up down

MAKEPATH := $(abspath $(lastword $(MAKEFILE_LIST)))
PWD := $(dir $(MAKEPATH))

up:
	docker-compose up -d --build

down:
	docker-compose down

node:
	docker exec -it big_corp_node_nusspaumer_container bash