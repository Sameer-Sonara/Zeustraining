let ans = [1]; 
// console.log("hello");

const N = 1000000000;
function multi(a, b) 
{
    let res = Array(a.length + b.length).fill(0);

    for (let i = 0; i < a.length; i++) 
        {
        for (let j = 0; j < b.length; j++) 
            {
                res[i + j] += a[i] * b[j];
                if (res[i + j] >= N) 
                {
                    res[i + j + 1] += Math.floor(res[i + j] / N);
                    res[i + j] %= N;
                }
        }
    }

    while (res.length > 1 && res[res.length - 1] === 0) 
        {
            res.pop();
        }

    return res;
}

function fact(x) 
{
    ans = [1];  
    for (let i = 2; i <= x; i++) 
        {
            let temp = [];
            let num = i;
            while (num > 0) 
                {
                    temp.push(num % N);
                    num = Math.floor(num / N);
                }
            ans = multi(ans, temp);
    }

    return ans;
}


console.time("Time: ");
var factorial = fact(1000000);

var str = factorial[factorial.length - 1].toString();
for(let i = factorial.length-2 ; i>=0 ; i--)
{
    str += factorial[i].toString().padStart(9,"0");   
}
console.timeEnd("Time: ");

console.log(factorial);  // Output: "120"
console.log(str);
console.log("hello");