document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("sortText").value = "";
    document.getElementById("sortResult").value = "";
    document.getElementById('noReverse').checked=true;
    document.getElementById('noLine').checked=true;
    document.getElementById('sort1').checked=true;
    iconChange(true);
    document.getElementById("sort1").disabled = true;
    document.getElementById("sortText").placeholder = "Wklejone liczby zostaną posortowane (wszystkie litery i znaki specjalne zostaną pominięte poza - oraz .)";
 });

//Functions
//Delete function
    const deleteFx = () => {
        let deleteText = "";
        document.getElementById("sortText").value = deleteText;
    };

//Copy function
    const copyFx = () => {
        let copyText = document.getElementById("sortResult");
        copyText.select();
        document.execCommand("copy");
    };

    var sorted;
    var isCorrect;
    var sort;

//Creating array of element to sort
    const sortArray = (reverse) => {
        sort = document.querySelector('input[name = "whatSort"]:checked');
        let text = document.getElementById("sortText").value;
        text = text.toLowerCase();
        let i =0;
        let lastValue =0;
        let textArray = [];
        text =text + " ";
        while(i<text.length)
        {
            let tempWord;
            let tempLetter;
            tempLetter = text.slice(i, (i+1));

             //If to skip - in text to sort for numbers(and to check if - is next to number)
                if((tempLetter=="-" || tempLetter=="−")&& sort.value == 1)
                {
                    checkLetter1 = text.slice((i-1), i);
                    arrFx(checkLetter1);
                    if(isCorrect===true)
                    {
                        tempWord = text.slice(lastValue, i);
                        textArray.push(tempWord);
                        lastValue = i;
                    }
                    else
                    {
                        checkLetter2 = text.slice((i+1), (i+2));
                        arrFx(checkLetter2);
                        if(isCorrect!==true)
                        {
                            lastValue = i+1;
                            i++;
                        }
                    }
                }
                //If to skip . in text to sort for numbers
                if(tempLetter=="." && sort.value == 1)
                {
                    checkLetter1 = text.slice((i-1), i);
                    arrFx(checkLetter1);
                    if(isCorrect!==true)
                    {
                        tempWord = text.slice(lastValue, i);
                        lastValue = i;
                        checkLetter2 = text.slice((i+1), (i+2));
                        arrFx(checkLetter2);
                        if(isCorrect!==true)
                        {
                            i=i+1;
                            lastValue = i;
                            tempLetter = text.slice(i, (i+1));
                        }
                    }
                }

            arrFx(tempLetter); 
            if(isCorrect!==true)
            {
                
                tempWord = text.slice(lastValue, i);
                
                    if(tempWord.length!=0)
                    {
                        console.log(tempWord);
                        textArray.push(tempWord);
                    }
                    
                    lastValue = i+1;
                    i++;
            }
            else 
            {
                i++;
            }
        }

        if(reverse == true)
        {
            if(sort.value==1)
            {
                numberSort(textArray);
                sorted =textArray.reverse();
            }
            else{
                let tempSorted = textArray.sort();
                sorted =tempSorted.reverse();
            }
        }
        else
        {
            if(sort.value==1)
            {
                numberSort(textArray);
                sorted =textArray;
            }
            else{
                sorted =textArray.sort();
            }  
        }
    };


//What  to search function
    const arrFx = (word) => {
        sort = document.querySelector('input[name = "whatSort"]:checked');
        let arr;
        if(sort.value==1)
            {
                arr = ["1","2","3","4","5","6","7","8","9","0",".","-","−"];
            }
        if(sort.value==2)
            {
                arr = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","ą","ę","ć","ś","ź","ż","ó","ł"];
            }

        let j=0;

        while(j<arr.length)
            {
                if(arr[j] == word)
                    {
                        isCorrect =true;
                        j=arr.length;
                    }
                else
                    {
                        isCorrect =false;
                        j++;
                    }
            }   
    };
//Presentation of sorted array function
    const showArray =(line) =>{
        let l=0;
        let SortingText ="";
        if(line==true)
        {
            while(l<sorted.length)
            {
                SortingText += sorted[l] +"\n";
                l++;
            }
            document.getElementById("sortResult").value = SortingText;
        }
        else
        {
            while(l<sorted.length)
            {
                SortingText += sorted[l] +" ";
                l++;
            }
            document.getElementById("sortResult").value = SortingText;
        }
    };

// Full sorting function
    const sortFx =() =>{
        let typeOfOrder = document.querySelector('input[name = "typeOfOrder"]:checked');
        let typeOfText = document.querySelector('input[name = "typeOfText"]:checked');

        if(typeOfOrder.value==1)
        {
            sortArray(false);
        }  
        else
        {
            sortArray(true);
        }

        if(typeOfText.value==1)
        {
            showArray(true);
        }  
        else
        {
            showArray(false);
        }
    };


    

//Sort numbers
    const numberSort = (myArr)=>{

        let j=0;
        let k=0;
        
        while( j<myArr.length )
        {
            if (myArr[k]>myArr[k+1])
            {
                    let tmp = parseFloat(myArr[k]);
                    myArr[k] = parseFloat(myArr[k+1]);
                    myArr[k+1] = tmp;    
                    i = k;
                    while(i>=0)
                    {
                        if (myArr[i]>myArr[i+1]){
                            tmp = myArr[i];
                            myArr[i] = myArr[i+1];
                            myArr[i+1] = tmp;  
                            i--;
                        }
                        else 
                        {
                            i--;
                        }
                    }
                k++;
            }
            else
            {
                k++;
            }
            j++;
        }
    };


//Append and remove function    
    const iconChange = (icon) => {
        if(icon===false)
        {
            let elem = document.getElementById("num");
            if(elem!=null)
            {
                elem.parentNode.removeChild(elem);
            }

            let elem2 = document.getElementById("num2");
            if(elem2!=null)
            {
                elem2.parentNode.removeChild(elem2);
            }

            let logo = document.createElement("i");
                logo.classList.add("fas");
                logo.classList.add("fa-sort-alpha-down");
                logo.setAttribute("id", "alph");
                document.getElementById("label1").appendChild(logo);

            let logo2 = document.createElement("i");
                logo2.classList.add("fas");
                logo2.classList.add("fa-sort-alpha-up");
                logo2.setAttribute("id", "alph2");
                document.getElementById("label2").appendChild(logo2);

            document.getElementById("sortText").placeholder = "Wklejony tekst zostanie posortowany alfabetycznie (wszystkie liczby i znaki specjalne zostaną pominięte)";

        }
        else{
            let elem = document.getElementById("alph");
            if(elem!=null)
            {
                elem.parentNode.removeChild(elem);
            }
            let elem2 = document.getElementById("alph2");
            if(elem2!=null)
            {
                elem2.parentNode.removeChild(elem2);
            }

            let logo = document.createElement("i");
                logo.classList.add("fas");
                logo.classList.add("fa-sort-numeric-down");
                logo.setAttribute("id", "num");
                document.getElementById("label1").appendChild(logo);

            let logo2 = document.createElement("i");
                logo2.classList.add("fas");
                logo2.classList.add("fa-sort-numeric-up");
                logo2.setAttribute("id", "num2");
                document.getElementById("label2").appendChild(logo2);
 
            document.getElementById("sortText").placeholder = "Wklejone liczby zostaną posortowane (wszystkie litery i znaki specjalne zostaną pominięte poza - oraz .)";
        }
    };

//Radio append and remove    
    var icons = document.querySelector('input[id = "sort1"]');
    icons.addEventListener( 'click', function() {
            iconChange(true);
            document.getElementById("sort1").disabled = true;
            document.getElementById("sort2").disabled = false;
    });

    var icons2 = document.querySelector('input[id = "sort2"]');
    icons2.addEventListener( 'click', function() {
            iconChange(false);
            document.getElementById("sort1").disabled = false;
            document.getElementById("sort2").disabled = true;
    });


//Buttons
    //Delete
    document.getElementById("btnDelete").addEventListener("click", deleteFx);
    //Copy
    document.getElementById("btnCopy").addEventListener("click", copyFx);
    //Sort
    document.getElementById("btnSort").addEventListener("click", sortFx);






   