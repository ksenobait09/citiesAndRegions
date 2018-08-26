DROP table country;
create table country(
	id			INTEGER primary key AUTOINCREMENT,
	name		character varying(128) not null,
	crt_date	TIMESTAMP);

DROP table region;
create table region(
	id			INTEGER primary key AUTOINCREMENT,
	country_id	INTEGER REFERENCES country (id),
	name		character varying(128) not null,
	crt_date	TIMESTAMP);

DROP TABLE city;
create table city(
	id			INTEGER primary key AUTOINCREMENT,
	region_id	INTEGER REFERENCES region (id),
	name		character varying(128) not null,
	crt_date	TIMESTAMP);

