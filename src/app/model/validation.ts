export interface ValidationError {

    bindingFailure: boolean;
    code: string;
    codes: string[];
    defaultMessage: string;
    field: string;
    objectName: string;
    rejectedValue: any;

}