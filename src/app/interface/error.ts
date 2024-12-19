export type TError = {
  field: string | number;
  message: string;
}[];
export type TGenericError = {
  statusCode: number;
  message: string;
  error: TError;
};
