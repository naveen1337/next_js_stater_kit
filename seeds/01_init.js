exports.seed = async function (knex) {
    await knex('appControl').del()
    await knex('refConstant').del()
  
    await appControllTable(knex)
    await refConstantsTable(knex)

  };
  
  async function appControllTable(knex) {
    await knex("appControl").insert([
      {
        inMaintenance: false,
        maintenanceText: "",
        version: 0.1,
      },
    ]);
  }

  async function refConstantsTable(knex) {
    await knex("refConstant").insert([
      {
        refValue: 'VNDR_TXN_OPN',
        refValueCode: 'VNDR_TXN_',
        refLabel: "Vendor transaction Pending",
        refTable: "vendorsTxn",
        refColumn: "status",
      },
      {
        refValue: 'VNDR_TXN_PGS',
        refValueCode: 'VNDR_TXN_',
        refLabel: "Vendor transaction In progress",
        refTable: "vendorsTxn",
        refColumn: "status",
      },
      {
        refValue: 'VNDR_TXN_CNCL',
        refValueCode: 'VNDR_TXN_',
        refLabel: "Vendor transaction Cancelled",
        refTable: "vendorsTxn",
        refColumn: "status",
      },
      {
        refValue: 'VNDR_TXN_CMP',
        refValueCode: 'VNDR_TXN_',
        refLabel: "Vendor transaction Completed",
        refTable: "vendorsTxn",
        refColumn: "status",
      },
    ]);
  }

  