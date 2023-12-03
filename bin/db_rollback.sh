file_count=$(ls migrations | wc -l)
for i in $(seq $file_count $n); do
  knex migrate:down
done