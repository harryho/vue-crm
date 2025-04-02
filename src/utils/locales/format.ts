export function formatToCurrencyString(price: number):string{

      return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
      }).format(price)
}

export function formatToCurrencyNumber(price: number):number {

      return  Number(price.toFixed(2))
}


export function toTitleCase(str:string) :string{
      str = str.replace('-',' ').replace(',',' ')
      return str.split(' ').map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join(' ');
  }