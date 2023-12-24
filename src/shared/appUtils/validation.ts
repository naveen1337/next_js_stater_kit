import Ajv, { str } from "ajv"
import AjvErrors from "ajv-errors";
import AjvFormats from "ajv-formats"
import ajvKeywords from "ajv-keywords";
import { fnRtrnCodes, getFnReturn } from "./response";
import Joi from "joi";

const ajv = new Ajv({ allErrors: true, strictNumbers: true })
AjvErrors(ajv, { singleError: true });
AjvFormats(ajv, ['email']);

//https://ajv.js.org/packages/ajv-keywords.html
ajvKeywords(ajv, ['instanceof']);

interface stringColumnInterface {
    "addIndex": boolean,
    "unique": boolean,
    "required": boolean,
    "minLength": number,
    "maxLength": number
}

interface numberColumnInterface {
    "addIndex": boolean,
    "unique": boolean,
    "required": boolean,
    "min": number,
    "max": number
}

interface dateTimeInterface {
    "addIndex": boolean,
    "unique": boolean,
    "required": boolean,
    "minDate": number,
    "maxDate": number
}


export function validateCreateViewPayload(payload: any) {
    try {
        const structure = validateStructure(payload)
     
    } catch (err) {
        console.log(err)
        return getFnReturn(fnRtrnCodes.EXCEPTION, null, 'unknown exception')
    }
}

export function validateStructure(payload: any) {
    try {
        const schema = Joi.object({
            viewName: Joi.string()
                .min(3)
                .max(30)
                .required(),
            shortDesc: Joi.string()
                .min(3)
                .max(30)
                .required(),
            longDesc: Joi.string()
                .min(3)
                .max(100)
                .required(),
            columns: Joi.array().min(10).max(30).required()
        },)
        const validate = schema.validate(payload,{stripUnknown:true})
        if(validate?.error?.details){
            return getFnReturn(fnRtrnCodes.FAIL,null,validate.error.details[0].message)
        }else{
            return getFnReturn(fnRtrnCodes.SUCCESS, null, null)
        }
    } catch (err) {
        return getFnReturn(fnRtrnCodes.EXCEPTION, 'excemption in structure', null)
    }
}




export function validateStringType(payload: stringColumnInterface) {

}
export function validateNumberType(payload: stringColumnInterface) {

}
export function validateDateTimeType(payload: stringColumnInterface) {

}