export default function PageName(name) {
  // componentName: page title
  const lookupTable = {
    Users: 'Customers',
    UserDetails: 'Customers',
    StorageUnits: 'Storage Units',
    StorageUnitDetails: 'Storage Unit',
  };

  return lookupTable[name] ?? name;
}
