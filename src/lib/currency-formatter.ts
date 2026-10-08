export const currencyFormatter = (value:number) => {
  return value.toLocaleString('es-AR',{
    style:'currency',
    currency:'ARG',
    minimumFractionDigits:2
  })
}