const DOMAIN = process.env.DOMAIN;
const APIKEY = process.env.APIKEY;
const SECRETAPIKEY = process.env.SECRETAPIKEY;

const porkbunGetExternalIp = async () => {
  const url = "https://porkbun.com/api/json/v3/ping";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      secretapikey: SECRETAPIKEY,
      apikey: APIKEY,
    }),
  });
  const json = await res.json();
  return json.yourIp;
};

const porkbunGetARecordId = async () => {
  const url = `https://porkbun.com/api/json/v3/dns/retrieve/${DOMAIN}`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      secretapikey: SECRETAPIKEY,
      apikey: APIKEY,
    }),
  });
  const json = await res.json();
  const records = json.records;
  const aRecord = records.find((r) => r.name === DOMAIN && r.type === "A");
  return aRecord;
};

const porkbunSetARecord = async (id, ip) => {
  const url = `https://porkbun.com/api/json/v3/dns/edit/${DOMAIN}/${id}`;
  console.log(`POST ${url}`);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      secretapikey: SECRETAPIKEY,
      apikey: APIKEY,
      type: "A",
      name: "",
      content: ip,
      ttl: "600",
    }),
  });
  const json = await res.json();
  console.log(json);
};

const run = async () => {
  console.log(new Date())
  const ip = await porkbunGetExternalIp();
  const record = await porkbunGetARecordId();
  if (record.content === ip) {
    console.log(`${record.content}, record is up to date`)
  } else {
    console.log(`updating to ${ip}`)
    await porkbunSetARecord(record.id, ip);
  }
  console.log()
};

run();
