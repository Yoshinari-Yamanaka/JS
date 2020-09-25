/**
 * divide the list by number of n
 */
const array = [0,1,2,3,4,5,6,7,8,9];
function* devide(n){
    for(let i = 0; i < array.length; i += n){
        yield array.slice(i,i+n);
    }
}
let l = [];
for (const iterator of devide(3)) {
    l.push(iterator);
}
console.log(l);




/**
 * multiple array -> single one
 */
function* flatten_list(l){
    for(let el of l){
        if(isinstance(el, "array")){
            for (const iterator of flatten_list(el)) {
                yield iterator
            }
        }else{
            yield el
        }
    }
}
l = [];
let l_2d_5 = [[0, 1, {k: "v"}], [0, 1, {k: "v"}], [0, 1, {k: "v"}], [0, 1, {k: "v"}], [0, 1, {k: "v"}]]
for (const iterator of flatten_list(l_2d_5)) {
    l.push(iterator);
}
console.log(l);


/**
 * extract the specified type of data from the list or dictionary
 * 
 */
function isinstance(arg,expected){
    if (Object.prototype.toString.call(arg).slice(8,-1).toLowerCase() === expected) {
        return true
    }
    return false
}

function search(arg, obj_type){
    let res = [];
    if(isinstance(arg,obj_type)){
        res.push(arg);
    }else if(isinstance(arg, "array")){
        for(const item of arg){
            res = res.concat(search(item, obj_type));
        }
    }else if(isinstance(arg, "object")){
        for(const key of Object.keys(arg)){
            res = res.concat(search(arg[key], obj_type));
        }
    }
    return res;
}

const sample = {
    a: [{
        b: "y",
        c: [{d: [2,3]}],
        e: {g: "z"}
    }],
    f: ["x"],
}
// get string value
console.log(search(sample,"string"));
// get number value
console.log(search(sample,"number"));


//make list
x = [...Array(10).keys()]  //[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
x = [...Array(10).keys()].filter((x)=> x % 2 == 0 )  //[ 0, 2, 4, 6, 8 ]
