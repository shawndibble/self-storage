# Self Storage

Laravel application for a self storage company.

## Requirements

*   Docker

## Setup

1.  `composer install --ignore-platform-reqs`
2.  `mv .env.example .env`
3.  `./vendor/bin/sail up` (use the -d flag to run it in the background)
4.  create the following alias for easy access to sail: `alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'`
5.  `sail artisan key:generate`
6.  `sail npm i && npm run dev`

### Optionally seed the database

`sail artisan migrate:fresh --seed`

default admin credentials: `test@gmail.com` | `password`

See data is generated from [DatabaseSeeder.php](https://github.com/shawndibble/self-storage/blob/master/database/seeders/DatabaseSeeder.php)

### Access the site

After running `sail up`, you can access the site via http://localhost
