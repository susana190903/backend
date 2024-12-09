const pokemonSeeder = async () => { 

    const pokemons = await Promise.all(
        results.map (async (poke) => {
            const pokemon = await fetch (poke.url).then(res => res.json());
        
            return{
                name:poke.name,
                image: pokemon.sprites.other.dream_world.front_default,
            }
        })
    );

let conn;

try{

conn = await pool.getConnection();

await conn.query('SET FOREIGN_KEY_CHECKS = 0');
await conn.query('TRUNCATE pokemons');
await conn.query('SET FOREIGN_KEY_CHECKS = 1');



pokemons.forEach(async (pokemon) => {
    await conn.query('INSERT INTO pokemons(name, image) VALUES (?, ?)',[
        pokemon.name,
        pokemon.image
])
});

}catch(err){
    console.log(err)

}finally{
    if(conn) conn.end();

}




}

module.exports = pokemonSeeder;