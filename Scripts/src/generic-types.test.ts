interface GupshupType {
  id: string;
}

interface VfType {
  idvf: number;
}
const gupshupReqBody: GupshupType = {
  id: "gupshup id",
};

const vfReqBody: VfType = {
  idvf: 12,
};

interface AxiosReqPayload<reqBodyType> {
  requestBody: reqBodyType;
}

const gtestVariable: AxiosReqPayload<GupshupType> = {
  requestBody: gupshupReqBody,
};
const vftestVariable: AxiosReqPayload<VfType> = { requestBody: vfReqBody };

testing(gtestVariable);
testing(vftestVariable);

function testing<T>(testVariable: AxiosReqPayload<T>) {}
