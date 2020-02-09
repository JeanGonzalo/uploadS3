const game = {
    'suspect': [
        {
            name: 'Rusty',
            color: 'Yellow'
        },

        {
            name: 'Javier',
            color: 'Blue'
        }
    ],

    nombre: 'jean',
    apeellido: 'zapata',
}

const games = [
    {
        'suspect': [
            {
                name: 'Rusty',
                color: 'Yellow'
            },

            {
                name: 'Javier',
                color: 'Blue'
            }
        ]
    },

    { nombre: 'jean' },
    { apeellido: 'zapata' },
]

console.log(games.map(games => games.suspect));