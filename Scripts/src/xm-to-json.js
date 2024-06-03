import { xml2json } from "xml-js";
const failureXml = `<?xml version="1.0" encoding="ISO-8859-1"?><MESSAGEACK><Err Code="52992" Desc="UserName Password Incorrect"/></MESSAGEACK>`;

const successXml = `<?xml version="1.0" encoding="ISO-8859-1"?><MESSAGEACK><GUID GUID="ko38f0156900d3f440e00hf5i7VYAPARAPPW" SUBMITDATE="2024-03-08 15:01:56" ID="202305174832"></GUID></MESSAGEACK>`;

const failRes = xml2json(failureXml, { compact: true, spaces: 4 });

const successRes = xml2json(successXml, { compact: true, spaces: 4 });
console.log(Date.now());
console.log(successRes);
