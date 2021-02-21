.PHONY: postgres clean

postgres:
	docker run \
		--name=dev_postgres \
		-e POSTGRES_PASSWORD=password \
		-e POSTGRES_USER=user \
		-e POSTGRES_DB=postgres \
		-v /var/lib/postgresql/data \
		-p 5432:5432 \
		-d postgres

clean:
	docker container rm -f dev_postgres