export default async function() {
  let dtMsg = "";
  
  try {
    const data = [
      {
        name: "Peter Hernandez",
        job: "Training manager",
        email: "peterkhernandez@rhyta.com",
        created: "30/10/2021",
        status: "Approved"
      },
      {
        name: "Candice Palmieri",
        job: "Landscape contractor",
        email: "candicejpalmieri@armyspy.com ",
        created: "16/06/2020",
        status: "Pending"
      },
      {
        name: "Peter Hernandez",
        job: "Training manager",
        email: "peterkhernandez@rhyta.com",
        created: "30/10/2021",
        status: "Denied"
      },
      {
        name: "Candice Palmieri",
        job: "Landscape contractor",
        email: "candicejpalmieri@armyspy.com ",
        created: "16/06/2020",
        status: "Expired"
      }
    ]
    const nameType = {
      chart1: [
        "PKBU Berpiutang",
        "PKBU Tertagih"
      ],
      chart2: [
        "Nominal Piutang & Denda",
        "Nominal Tertagih"
      ],
      table1: [
        "Name",
        "Job Title",
        "Email",
        "Created",
        "Status"
      ],
      table2: [
        "Saldo Awal Piutang",
        "IBR",
        "Piutang Baru",
        "Total Koreksi",
        "Piutang Setelah Koreksi",
        "Pembayaran Piutang",
        "Saldo Akhir"
      ]
    }
    return {
      ret: 0,
      msg: "OK",
      tableParamsSatu: tableSeriesSatu(data, nameType.table1),
    };
  } catch (e) {
    dtMsg = `Mohon maaf, terjadi kesalahan pada sistem. Silahkan ulangi kembali. Error: ${e}.`;
    return { ret: -1, msg: dtMsg };
  }
}

function tableSeriesSatu(data, nameType) {
  let headerByListKantor = nameType.map((name) => ({
    text: name,
    status: name === "Status"
  }));
  let bodyByListKantor = [];

  data.forEach((data) => {
    bodyByListKantor.push([
      data.name,
      data.job,
      data.email,
      data.created,
      data.status
    ]);
  });

  return {
    Header: headerByListKantor,
    Body: bodyByListKantor
  };
}