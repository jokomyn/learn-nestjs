import { Migration } from '@mikro-orm/migrations';

export class Migration20241119071611 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "rental" drop constraint "rental_book_id_foreign";`);
    this.addSql(`alter table "rental" drop constraint "rental_member_id_foreign";`);

    this.addSql(`alter table "book" alter column "id" drop default;`);
    this.addSql(`alter table "book" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "book" alter column "id" drop default;`);

    this.addSql(`alter table "member" alter column "id" drop default;`);
    this.addSql(`alter table "member" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "member" alter column "id" drop default;`);

    this.addSql(`alter table "rental" alter column "id" drop default;`);
    this.addSql(`alter table "rental" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "rental" alter column "member_id" drop default;`);
    this.addSql(`alter table "rental" alter column "member_id" type uuid using ("member_id"::text::uuid);`);
    this.addSql(`alter table "rental" alter column "book_id" drop default;`);
    this.addSql(`alter table "rental" alter column "book_id" type uuid using ("book_id"::text::uuid);`);
    this.addSql(`alter table "rental" alter column "id" drop default;`);
    this.addSql(`alter table "rental" add constraint "rental_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade;`);
    this.addSql(`alter table "rental" add constraint "rental_member_id_foreign" foreign key ("member_id") references "member" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "book" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "member" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "rental" alter column "id" type text using ("id"::text);`);
    this.addSql(`alter table "rental" alter column "member_id" type text using ("member_id"::text);`);
    this.addSql(`alter table "rental" alter column "book_id" type text using ("book_id"::text);`);

    this.addSql(`alter table "rental" drop constraint "rental_member_id_foreign";`);
    this.addSql(`alter table "rental" drop constraint "rental_book_id_foreign";`);

    this.addSql(`alter table "book" alter column "id" type int4 using ("id"::int4);`);
    this.addSql(`create sequence if not exists "book_id_seq";`);
    this.addSql(`select setval('book_id_seq', (select max("id") from "book"));`);
    this.addSql(`alter table "book" alter column "id" set default nextval('book_id_seq');`);

    this.addSql(`alter table "member" alter column "id" type int4 using ("id"::int4);`);
    this.addSql(`create sequence if not exists "member_id_seq";`);
    this.addSql(`select setval('member_id_seq', (select max("id") from "member"));`);
    this.addSql(`alter table "member" alter column "id" set default nextval('member_id_seq');`);

    this.addSql(`alter table "rental" alter column "id" type int4 using ("id"::int4);`);
    this.addSql(`alter table "rental" alter column "member_id" type int4 using ("member_id"::int4);`);
    this.addSql(`alter table "rental" alter column "book_id" type int4 using ("book_id"::int4);`);
    this.addSql(`create sequence if not exists "rental_id_seq";`);
    this.addSql(`select setval('rental_id_seq', (select max("id") from "rental"));`);
    this.addSql(`alter table "rental" alter column "id" set default nextval('rental_id_seq');`);
    this.addSql(`alter table "rental" add constraint "rental_member_id_foreign" foreign key ("member_id") references "member" ("id") on update cascade on delete no action;`);
    this.addSql(`alter table "rental" add constraint "rental_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade on delete no action;`);
  }

}
