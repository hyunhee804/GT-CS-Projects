// Lab2 Activity2

// 0a. document is the DOM, select the #main div
var main = document.getElementById('main');

// 0b. Create a new DOM element
var header = document.createElement("h3");
main.appendChild(header);
header.textContent = "Pokemon Starters";

// 0c. Copy data structure
pokemonList = [{
    "name": "Pikachu",
    "type": "Electric",
    "final_evolution": "Raichu",
    "hp": 50,
    "attack_power": 82,
},
{
    "name": "Squirtle",
    "type": "Water",
    "final_evolution": "Blastoise",
    "hp": 80,
    "attack_power": 83,
},
{
    "name": "Evee",
    "type": "Normal",
    "final_evolution": "Sylveon",
    "hp": 44,
    "attack_power": 55,
}]

// 1a. Reduce hp by half
function halfHP(pokemonHP) {
    return pokemonHP /= 2;
}

// 1b. Loop to call halfHP
function loop_halfHP(pokemonList) {
    for (i = 0; i < pokemonList.length; i++) {
        if (pokemonList[i]["name"] != "Squirtle") {
            pokemonList[i]["hp"] = halfHP(pokemonList[i]["hp"]);
        }
    }
}

// 2. Debug your data
function debugPoke() {
    newPokemonList = [];
    for (i = 0; i < pokemonList.length; i++) {
        newPokemonList[i] = {"name": pokemonList[i]["name"], "hp": pokemonList[i]["hp"]};
    }
    console.log('debugPoke: ', newPokemonList);
}

loop_halfHP(pokemonList);
debugPoke();


// 3. Changing the DOM with JavaScript

for (i = 0; i < pokemonList.length; i++) {
    var div = document.createElement("div");
    main.appendChild(div);

    var poke_name = document.createElement("h5");
    div.appendChild(poke_name);
    poke_name.textContent = pokemonList[i]["name"];

    var type = document.createElement("p");
    div.appendChild(type);
    type.textContent = "Type: " + pokemonList[i]["type"];

    var fin_evo = document.createElement("p");
    div.appendChild(fin_evo);
    fin_evo.textContent = "Final Evolution: " + pokemonList[i]["final_evolution"];

    var hp = document.createElement("p");
    div.appendChild(hp);
    hp.textContent = "HP: " + pokemonList[i]["hp"]
    
    var att_power = document.createElement("p");
    div.appendChild(att_power);
    att_power.textContent = "Attack Power: " + pokemonList[i]["attack_power"];
}