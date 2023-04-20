let array = [1, 2, 3]

const sum = (arr) => {
    let total = 0
    for (let i = 0; i < arr.length; i++) {
        total += arr[i]
    }

    return total
}

let total = array.reduce((total, item) => total += item, 0)

// console.log(sum(array))
console.log(total)