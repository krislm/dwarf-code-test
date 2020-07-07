export const DBConfig = {
    name: 'SundownDB',
    version: 1,
    objectStoresMeta: [
        {
            store: 'orders',
            storeConfig: { keyPath: 'email', autoIncrement: false },
            storeSchema: [
                { name: 'email', keypath: 'email', options: { unique: false } },
                { name: 'dateTime', keypath: 'dateTime', options: { unique: false } },
                { name: 'numberOfPeople', keypath: 'numberOfPeople', options: { unique: false } },
                { name: 'dish', keypath: 'dish', options: { unique: false } },
                { name: 'drinks', keypath: 'drinks', options: { unique: false } }
            ]
        },
        /*{
            store: 'dishes',
            storeConfig: { keyPath: 'idMeal' },
            storeSchema: [
                { name: 'strMeal', keypath: 'strMeal', options: { unique: false } },
                { name: 'strMealThumb', keypath: 'strMealThumb', options: { unique: false } },
                { name: 'strInstructions', keypath: 'strInstructions', options: { unique: false } }
            ]
        },
        {
            store: 'drinks',
            storeConfig: { keyPath: 'id' },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'tagline', keypath: 'tagline', options: { unique: false } },
                { name: 'description', keypath: 'description', options: { unique: false } },
                { name: 'image_url', keypath: 'image_url', options: { unique: false } }
            ]
        }*/
    ]
};