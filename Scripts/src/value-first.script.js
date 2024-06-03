
// import fs from 'fs';
import request from 'request-promise';
// const fs = require("fs");
async function invite() {
    console.log("Started Script");
    // const users = fs
    //     .readFileSync("/Users/ayushsrivastava/Desktop/ParulWork.csv", "utf-8")
    //     .split("\n")
    //     .map((e) => e.trim());


    const users = ['7459976958'];
    // const request = require("request-promise")
    for (const i in users) {
        const user = users[i].split(",");
        const mobile = user[0];

        if (/^\d+$/.test(mobile) && mobile.length === 10) {
            console.log(mobile, i);
            const media = "https://youtu.be/-dUMQl0KeOM";
            var options = {
                method: "POST",
                url: "https://api.myvfirst.com/psms/servlet/psms.Eservice2",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                form: {

                    data: `<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE MESSAGE SYSTEM "http://127.0.0.1:8181/psms/dtd/messagev12.dtd">

                    <MESSAGE VER="1.2">
                        <USER USERNAME="vyaparappWA" PASSWORD=")hda(3@1" CH_TYPE="4" />
                    <SMS UDH="0" CODING="1" TEXT="" TEMPLATEINFO="10081709" 
                    MEDIADATA="https://vyapar-staging.s3.ap-south-1.amazonaws.com/message-transactions/images/Price-Drop-gold-plan-whatsapp.jpg" 
                    TYPE="image" MSGTYPE="3" B_URLINFO="https://vyaparapp.in/pricing" PROPERTY="0" ID="202305174832" TEMPLATE="" EMAILTEXT="" 
                    ATTACHMENT="">
                        <ADDRESS FROM="916366827431" TO="${mobile}" EMAIL="" SEQ="1" TAG="whatsapp"/>
                        </SMS>
                    </MESSAGE>`,
                    action: "send",
                },
            };
            try {
                const res = await request(options);
                console.log("response\n", res);
            } catch (error) {
                console.log("error\n", error);
            }
        }
        
    }
}
invite();