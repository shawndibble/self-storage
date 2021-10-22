export default function PageName(name) {
    const lookupTable = {
        'Users': 'Customers',
        'StorageUnits': 'Storage Units'
    };

    return lookupTable[name] ?? name;
}
