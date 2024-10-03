declare module "yup" {
    interface StringSchema<TType, TContext, TDefault, TFlags> {
        cnpj(errorMessage: string): this;
    }
}

import * as yup from "yup";

export default yup