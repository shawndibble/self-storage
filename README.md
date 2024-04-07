# Self Storage

Laravel application for a self storage company.

## Requirements

*   Docker

## Setup

1.  Rename the .env file and set any needed settings. By default you shouldn't need to set anything.

```bash
mv .env.example .env
```

2.  Execute the following initial setup (used to install compser and get the needed vendor files without needing a proper local setup)

```bash
   docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
```

3.  create a bash/terminal alias to access sail. Note: you can alteratively call sail from `./vendor/bin/sail`

```bash
alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'
```

4.  Start up sail. The `-d` flag will allow docker to run in the background.

```bash
sail up -d
```

5.  Generate a unique laravel key to be added to your local .env file.

```bash
sail artisan key:generate
```

6.  Install node_modules and build the application.

```bash
sail npm i && npm run dev
```

### Optionally seed the database

`sail artisan migrate:fresh --seed`

default admin credentials: `test@gmail.com` | `password`

See data is generated from [DatabaseSeeder.php](https://github.com/shawndibble/self-storage/blob/master/database/seeders/DatabaseSeeder.php)

### Access the site

After running `sail up`, you can access the site via http://localhost

## NPM

The root directory has your package.json, webpack files and node modules, however javascript code should be built in the `/resources/` directory. Webpack will then bundle the files and drop them into the `/public` directory.

To reference files relative to the resource/js directory, use the @ symbol.

For example, to reference `/resources/js/Components/Button.jsx`, you would use `import Button from '@/Components/Button';`

Files are compiled with [Laravel Mix](https://laravel.com/docs/8.x/mix)

## SAIL

Please visit [the sail documentation](https://laravel.com/docs/8.x/sail#introduction) for details on using sail. Most laravel, composer and npm commands should be preceeded with the `sail` command.

This project is tested with BrowserStack.