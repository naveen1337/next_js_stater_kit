export const fnRtrnCodes = {
    "OK": "OK",
    "SUCCESS": "SUCCESS",
    "FAIL": "FAIL",
    "EXCEPTION": "EXCEPTION",
    "FOUND": "FOUND",
    "NOT_FOUND": "NOT_FOUND"
}

interface getFnReturnInterface{
    code:string,
    data:any,
    msg:string | null
}

export function getFnReturn(code: string, data: any, msg: string | null):getFnReturnInterface{
    return { code, data, msg }
}

export function getSuccessRes(res:any,httpcode: number, data: any, msg: string | null) {
    return res.status(httpcode).json({isOk:true,data,msg})
}
export function getFailRes(res:any,httpcode: number, data: any, msg: string | null) {
    return res.status(httpcode).json({isOk:false,data,msg})
}