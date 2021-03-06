//直列実行
Promise.resolve()
    .then(
        ()=>{
            return new Promise((resolve,reject)=>{
                resolve("直列実行");
            })
        }
    )
    .then(
        (value)=>{
            console.log(value);
            return new Promise((resolve,reject)=>{
                resolve("直列実行");
            })
        }
    )
    .then(
        (value)=>{
            console.log(value);
        }
    );


//動的に直列実行
(async function (){
    const array = [];
    for (let index = 0; index < 10; index++) {
        array.push(
            (resolve,reject)=>{
                resolve(`${index} : 動的に実行`)
            }
        );
    }
    for (let index = 0; index < array.length; index++) {
        const value = await new Promise(array[index]);
        console.log(value);    
    }
})();

//並列実行
(async function(){
    let array = [];
    for (let index = 0; index < 10; index++) {
        array.push(
            (resolve,reject)=>{
                resolve(index);
            }
        );
    }
    Promise.all(array.map((item)=>{ return new Promise(item) }))
        .then((result)=>{
            console.log(result);
        })
})();