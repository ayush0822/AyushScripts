// const fs = require("fs");
import { createClient } from "redis";
import { parsePhoneNumber } from "awesome-phonenumber";

async function main() {
  // console.log(parsePhoneNumber(`+${91917459976958}`));
  // console.log("Started Script");
  // await redis.connect();
  // console.log("redis connected");

  // const sName = `cluster_priority_map:TN`;
  // const input = [];

  // const values = ["1"];

  // for (let i = 0; i < values.length; i++) {
  //   input.push({ score: 0, value: values[i] });
  // }

  // const result = await redis.zAdd(sName, input);

  // console.log(result);

  // const test =
  // const inactivePhoneNoSet = await redis.sMembers("Message:InactivePhoneNoSet");
  //   console.log("Cache length", inactivePhoneNoSet.length);

  //   let count = 0, ind = 0;

  //   console.log(parsePhoneNumber(`+${918707725836}`));
  // for (const inActiveNum of inactivePhoneNoSet) {

  //   let number = inActiveNum;

  //   if(inActiveNum === '3224982007') {
  //       co
  //   }
  //   if(number.length === 10) {
  //       number = `91${inActiveNum}`;
  //   }
    const phoneNumber = parsePhoneNumber(`+${707725836}`);

  //   ind++;
  //   if (!phoneNumber ||  !phoneNumber.typeIsMobile) {
  //     count += 1;
  //   }
  // }
  // console.log("Only", count, ind);
}

//85677 not a mobile number
main();
