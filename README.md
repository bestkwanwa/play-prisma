# Play Prisma

## Scripts

generate .env and schema.prisma
```
npx prisma init
```

generate and execute migration.sql and generate client code under node_modules
```
npx prisma migrate dev --name init
```

remove all data in db and apply schema
```
npx prisma migrate reset
```

generate schema based on db
```
npx prisma db pull
```

make db sync with schema (when schema changed)
```
npx prisma db push
```

for generating some initial data when init
```
npx prisma db seed
```

only generate client code based on schema, not sync with db
```
npx prisma generate
```

format schema.prisma
```
npx prisma format
```
