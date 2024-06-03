import axios from 'axios';


// export interface AxiosError<T = any, D = any> extends Error {
//     config: AxiosRequestConfig<D>;
//     code?: string;
//     request?: any;
//     response?: AxiosResponse<T, D>;
//     isAxiosError: boolean;
//     toJSON: () => object;
//   }


// failure?: {
//     errorCode: string;
//     errorData: Record<string, any>;
//     isInvalidNumber: boolean;
//     isTemplateBlocked: boolean;
//     isPending: boolean;
//   };
// }
async function main() {
    try {

        const response = await axiosRequest();

        console.log("success", response);


    } catch (error) {

        const responseStatus = {
            errorCode: error.response.status,
            errorData : error.code,
            isInvalidNumber: false,
            isTemplateBlocked: false,
            isPending: false,
        }
        console.log("fail Test by Ayush", responseStatus);
    }
}
async function axiosRequest() {
    try {
        const config = {
            method: 'GET',
            url: "https://api.datagenit.com/sms2?auth=D!~4889R2vZmDJGNB&msisdn=745997695&message=3370 is your OTP to verify your phone with Vyapar account. Please do not share OTP as it's confidential&senderid=VYAPAR&template_id=1107160067210556521&entity_id=1101469920000011318",

        };


        const { data } = await axios(config);

        return data;
    } catch (error) {

        throw error;
    }
}


main();