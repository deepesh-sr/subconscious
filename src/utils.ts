export default function random( num : number) : string {
    let parentString = "qwertyuiopasdfghjklzxcvbnm1234567890";

    let hash = ""

    for ( let i =0 ; i < num ; i++) {
        hash = hash + parentString[Math.floor(Math.random() * 20)]
    }
    return hash
}
