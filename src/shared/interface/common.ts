import { HTTPCode } from "../common/enum";

export type Response = {
  code: HTTPCode;
  data: any;
};
