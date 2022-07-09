const csv = require("csvtojson");
const json = require("json2csv");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const moment = require("moment");
const colors = require("colors");

async function getData(){
    if (!fs.existsSync(path.join(__dirname, "./../uploads/dream_beach.csv"))){
        console.log("file dream_beach.csv tidak ditemukan".red);
        return
    }

    const data = await csv({ headers: ["date", "pcv", "out", "cus", "dep", "des", "deb", "cre"] }).fromFile(
        path.join(__dirname, "./../dream_beach.csv"),
    );

    const lembongan = data.filter((d) => d.cus === "Lembongan");
    const putraKembar = data.filter((d) => d.cus === "Putra Kembar");
    const mele = data.filter((d) => d.cus === "Mele");
    const other = data.filter(
        (d) => ["Lembongan", "Putra Kembar", "Mele"].indexOf(d.cust) === -1
    );

    let listSupplier = [
        {
            name: "Lembongan",
            data: lembongan,
        },
        {
            name: "Putra Kembar",
            data: putraKembar,
        },
        {
            name: "Mele",
            data: mele,
        },
        {
            name: "Other",
            data: other,
        },
    ];

    // perhitungan(lembongan, "lembongan");
    // perhitungan(putraKembar, "putra_kembar");
    // perhitungan(mele, "mele");
    // perhitungan(other, "other")

    let result = [];

    for (let i of listSupplier) {
        let data = await perhitungan(i.data, i.name);
        result.push(data);
    }

    return result;
}

async function perhitungan(supplier, name) {
    const dataGroup = _.groupBy(supplier, "date");
    let result = {};
    for (let d of Object.keys(dataGroup)) {
        let hsl = _.map(_.groupBy(dataGroup[d], "dep"), (o, idx) => {
            return {
                dep: idx,
                total: o.map((i) => Number(i.cre)).reduce((a, b) => a + b, 0),
            };
        });
        result[d] = hsl;
    }

    let jadi = Object.keys(result).map((d) => {
        return {
            date: Number(d),
            Kitchen: result[d]?.find((i) => i.dep.includes("Kitchen"))?.total ?? 0,
            Non_Operasional:
                result[d]?.find((i) => i.dep.includes("Operasional"))?.total ?? 0,
            Lain_Lain: result[d]?.find((i) => i.dep.includes("Lain"))?.total ?? 0,
            Proyek_Besar:
                result[d]?.find((i) => i.dep.includes("Proyek"))?.total ?? 0,
            total: result[d]?.map((i) => i.total)?.reduce((a, b) => a + b, 0) ?? 0,
        };
    });

    let totalPerItem = {
        date: "Sub Total",
        Kitchen: jadi.map((i) => i.Kitchen).reduce((a, b) => a + b, 0),
        Non_Operasional: jadi.map((i) => i.Non_Operasional).reduce((a, b) => a + b, 0),
        Lain_Lain: jadi.map((i) => i.Lain_Lain).reduce((a, b) => a + b, 0),
        Proyek_Besar: jadi.map((i) => i.Proyek_Besar).reduce((a, b) => a + b, 0),
        total: jadi.map((i) => i.total).reduce((a, b) => a + b, 0),
    }

    jadi.push(totalPerItem);

    if(!fs.existsSync(path.join(__dirname, "./../result"))){
        fs.mkdirSync(path.join(__dirname, "./../result"));
        console.log("folder result berhasil dibuat".green);
    }

    // write to csv
    // fs.writeFileSync(path.join(__dirname, `./../result/${name}.csv`), json.parse(jadi).toString(), "utf-8")

    // console.log(`[ ${moment().format('DD-MM-YY hh:mm')} ] ${name}.csv berhasil di generate`.yellow);

    return json.parse(jadi).toString();
}



// const Generator = {
//     getData,
//     perhitungan,
// }

// module.exports = Generator


