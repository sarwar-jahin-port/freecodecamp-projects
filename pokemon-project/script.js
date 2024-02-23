const searchText = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
console.log(searchText.value);

const getData = async () => {
    let data=[];
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchText.value}`;
    try{
        const res = await fetch(url);
        if(!res.ok){
            throw new Error("Data not found");
        }
        data = await res.json();
        console.log(data);
        return data;
    }catch(err){
        console.error(err);
    }
}

searchBtn.addEventListener("click", async ()=>{
    const data = await getData();
    console.log(data);
});