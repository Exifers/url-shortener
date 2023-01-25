import { Migration } from '@mikro-orm/migrations';

export class Migration20230125074527 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `url` (`id` integer not null primary key autoincrement, `value` text not null, `author` text not null, unique (`id`));');

    this.addSql('create table `token` (`id` integer not null primary key autoincrement, `value` text not null, `visits` integer not null default 0, `url_id` text not null, constraint `token_url_id_foreign` foreign key(`url_id`) references `url`(`id`) on update cascade, unique (`id`));');
    this.addSql('create unique index `token_value_unique` on `token` (`value`);');
    this.addSql('create index `token_url_id_index` on `token` (`url_id`);');
  }

}
