//Si el objeto es nulo, retorna 404, si no, retorna veradero
function ifNull404(res,obj){
    if(obj == null){
        res.status(404).send("resource not found");
        return true;
    }
    else{
        return false;
    }
}

module.exports = {ifNull404}