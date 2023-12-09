const n = slider.value;
var array = [];
init(slider.value);

slider.oninput = function (){
    array = [];
    init(slider.value);
    console.log(array);
}

function init(n=slider.value){
    
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    
    array.slice(slider.value-1);
    showBars();
}

function play(){

    const copy = [...array]
    var swaps = [];
    console.log(swaps)
    if(document.getElementById('option1').checked){swaps = bubbleSort(copy);}
    if(document.getElementById('option2').checked){swaps = qsort(copy);}
    if(document.getElementById('option3').checked){swaps = selnsort(copy);}

    console.log(swaps)
    animate(swaps);
}


function animate(swaps) {
    console.log("hello")
    console.log(swaps)
    if (swaps.length ==0) {
        return;
    }
    const [i,j] = swaps.shift();
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    setTimeout(function(){
        animate(swaps)
    },slider.value/(.0003*slider1.value));
}

function bubbleSort(array){
    const swaps = [];
    do{
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            if(array[i-1] > array[i]){
                swapped = true;
                swaps.push([i-1,i]);
                [array[i],array[i-1]]=[array[i-1],array[i]];

            } 
            
        }
    }while(swapped)
    return swaps;
}






function qsort(arr)
{
    const swaps = [];
    function partition(arr, low, high) {
        // Choosing the pivot
        let pivot = arr[high];
    
        // Index of smaller element and indicates the right position of pivot found so far
        let i = low - 1;
    
        for (let j = low; j <= high - 1; j++) {
            // If current element is smaller than the pivot
            if (arr[j] < pivot) {
                // Increment index of smaller element
                i++;
                swaps.push([j,i]);
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
            }
        }
        swaps.push([high,i+1]);
    
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
        return i + 1; // Return the partition index
    }
    
    // The main function that implements QuickSort
    function quickSort(arr, low, high) {
        if (low < high) {
            // pi is the partitioning index, arr[pi] is now at the right place
            let pi = partition(arr, low, high);
    
            // Separately sort elements before partition and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    // Driver code
    let N = arr.length;
    
    // Function call
    quickSort(arr, 0, N - 1);
    return swaps;
}



function selnsort(arr){
    console.log(arr);
    var swaps = [];   
        function swap(arr,xp, yp)
    {
        swaps.push([yp,xp]);
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }
    
    function selectionSort(arr,  n)
    {
        var i, j, min_idx;
    
        for (i = 0; i < n-1; i++)
        {
            min_idx = i;
            for (j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
    
            swap(arr,min_idx, i);
        }
    }
    selectionSort(arr, arr.length)
    console.log(swaps);
    return swaps;
    
}





function showBars(indices){
    container.innerHTML="";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i]*100+"%";
        bar.classList.add("bar");
        if (indices && indices.includes(i)) {
            bar.style.backgroundColor="#0d6ffd";
        }
        container.appendChild(bar);
        
    }
}
console.log(array);