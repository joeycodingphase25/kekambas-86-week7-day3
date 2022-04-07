// Callback Hell Problem is solved with Promises!


/*
    In JavaScript, a promise is an object that returns a value which you hope to receive in the future, but not now.
    Has three states:
    1. Pending: initial state, neither fulfilled nor rejected
    2. Fulfilled: meaning that the operation was completed successfully
    3. Rejected: meaning that the operation failed
*/


// function downloadSong(songName){
//     console.log(`Searching for ${songName} in our database...`)
//     return new Promise((resolve, reject)=>{
//         if (songName.length > 4){
//             resolve(songName)
//         } else {
//             reject(`${songName} is not valid`)
//         }
//     })
// }


// let mySong = downloadSong('Mrs');

// console.log(mySong);

// mySong.then(s => console.log(s)).catch(rs => console.log(rs.toUpperCase()))


function downloadSong(songName){
    console.log(`Searching for ${songName} in our database...`)
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            if (songName.length > 4){
                resolve(`${songName}.mp4`)
            } else {
                reject(`${songName} is not valid`)
            }
        }, 3000)
    })
}

function playSong(songFile){
    return new Promise((res, rej) => {
        setTimeout(
            () =>{
                res(`${songFile} is playing`)
            }, 2000
        )
    })
}

// let mySong = downloadSong('Mrs. Robinson');

// console.log(mySong);

// mySong
//     .then((s) => {
//         console.log(`${s} has downloaded`)
//         return playSong(s)
//     })
//     .then(message => console.log(message))
//     .catch(rs => console.log(rs.toUpperCase()))


// Example: Get the price of a user's order based on user if
// userId -> user -> user's order -> calculate order total

function getUser(userId){
    return new Promise((resolve, reject) => {
        console.log(`Searching for user #${userId} in database...`)
        setTimeout(() => {
            // Set up some fake rules for if a user does or does not exist
            if (userId > 100){
                let user = {
                    id: userId,
                    username: 'johnqsample'
                }
                resolve(user)
            } else {
                reject(`No user with id #${userId}`)
            }
        }, 2000)
    })
}


function getUserOrder(user){
    return new Promise((res, rej) => {
        console.log(`Getting the orders for ${user.username}`)
        setTimeout(() => {
            let orders = [
                {prodName: 'Computer', price: 1000},
                {prodName: 'Water Bottle', price: 10},
                {prodName: 'Picture Frame', price: 25}
            ];
            res(orders);
            // rej(`${user.username} has no orders`)
        }, 2000)
    })
}


function getOrderTotal(order){
    console.log(order)
    return new Promise((resolve, reject) => {
        console.log('Calculating...')
        setTimeout(() => {
            let total = 0;
            order.forEach(p => total += p.price)
            resolve(total)
        }, 1000)
    })
}


function getUsersTotalFromUserId(userId){
    getUser(userId)
        .then(u => getUserOrder(u))
        .then(o => getOrderTotal(o))
        .then(total => console.log(`Your total is $${total}`))
        .catch(err => console.error(err))
}

// getUsersTotalFromUserId(123);


// Async / Await allows us to write our code to look more synchronous. *It is simply syntactical sugar for Promises*

function getPost(postId){
    return new Promise((res, rej) => {
        if (postId > 10){
            let post = {
                id: postId,
                title: `Post ${postId}`,
                authorId: postId * 9
            }
            res(post)
        } else {
            rej(`${postId} is not a valid post`)
        }
    })
}

function getAuthor(authorId){
    return new Promise((res, rej) => {
        res({id: authorId, name: 'Brian'})
    })
}

// function emailPostAuthor(postId){
//     getPost(postId)
//         .then(p => getAuthor(p.authorId))
//         .then(author => console.log(`Hello ${author.name}`))
//         .catch(e => console.error(e.toUpperCase()))
// }


async function emailPostAuthor(postId){
    try{
        let p = await getPost(postId)
        let author = await getAuthor(p.authorId)
        console.log(`Dear ${author.name}, I loved your post titled ${p.title}. It was very inspiring`)
    } catch(e){
        console.error(e.toUpperCase())
    }
}


// emailPostAuthor(123)
// emailPostAuthor(1)




// In-class Exercise: Turn the Get Order Total into an async function. It should take in a user id and log out the total for their order


const getUserOrderTotal = async (userId) => {
    try
    {
        let user = await getUser(userId);
        let order = await getUserOrder(user);
        let total = await getOrderTotal(order);
        console.log(`Your total is $${total}`)
    } 
    catch(err)
    {
        console.error(err.toUpperCase())
    }
}



getUserOrderTotal(432)