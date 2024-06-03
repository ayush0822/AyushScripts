import { createClient } from "redis";
const redis = createClient({

  socket: {
    host: "localhost",
    port: 6380,
  },
  database: 0,
});
redis.on("error", (err) => console.log("Redis Client Error", err));

async function main2() {

  await redis.connect();
  console.log("redis connected");
  try{ 
    const result = await redis.sIsMember('COMMUNI_VERSE:Messages:INACTIVE_MOBILE_NUMBER_SET', '919672279140');
    console.log("Testing", result);
  } catch(error) {
    console.log("Error:",error);
  }

 
}
main2();

async function main() {
  console.log("Started Script");
  await redis.connect();
  console.log("redis connected");

  const sName = "accounting_agents_map";
  const input = [];

  const values = [
    "11461372",
    "11403594",
    "11461332",
    "11461337",
    "11490470",
    "11461241",
    "10648979",
    "10786038",
    "11017667",
    "8831204",
    "11467468",
    "9690100",
    "11461368",
    "11405585",
    "9850920",
    "10421636",
    "9849579",
    "11428133",
  ];

  for (let i = 0; i < values.length; i++) {
    input.push({ score: 0, value: values[i] });
  }

  const result = await redis.zAdd(sName, input);

  console.log(result);
}
// main();
