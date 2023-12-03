exports.seed = async function (knex) {
    await knex('app_control').del()
  
    await appControllTable(knex)

  };
  
  async function appControllTable(knex) {
    await knex("app_control").insert([
      {
        in_maintenance: false,
        maintenance_text: "",
        version: 0.1,
      },
    ]);
  }