const addSpaceBeforeCapital = ( string ) => (
  !string ? string : string.replace(/([a-z])([A-Z])/g, '$1 $2')
)

const makeCopy = ( data ) => (
  JSON.parse( JSON.stringify( data ) )
)

export {
  addSpaceBeforeCapital,
  makeCopy
};