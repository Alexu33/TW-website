const res = require("express/lib/response");


const coachesrepository=require('../repository/CoachRepository.js')


module.exports.GetAllcoaches=()=>{
    const lista = coachesrepository.readJSONFile();
    return lista;
    
}

module.exports.AddCoacher=(newCoach)=>{
    lista = coachesrepository.readJSONFile();
    newCoach.id = (lista.length+1).toString();
    lista.push(newCoach);
    coachesrepository.writeJSONFile(lista);
    return newCoach;
}


module.exports.Delete=(id)=>
{
    lista = coachesrepository.readJSONFile();
    for (let i=0 ; i< lista.length; i++)
    {   
        console.log("asdsadgf:",id, " - ", lista[i].id)
        if(lista[i].id == id)
        {
            
            lista.splice(i,1);
            coachesrepository.writeJSONFile(lista);
            console.log(lista);
            return true;

        }

    }
    console.log("fals?");
    return false;

}

module.exports.Update=(id, name, img)=>
{
    lista = coachesrepository.readJSONFile();
    for(let i=0; i< lista.length; i++)
    {
        if(lista[i].id == id)
        {
            lista[i].name = name;
            lista[i].img = img;
            coachesrepository.writeJSONFile(lista);
            return true;
        }
    }
    return false;
}