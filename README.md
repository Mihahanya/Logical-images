# Logical expressions to binary images

The project implements the idea of encoding a binary image by means of a logical expression. Basically, the idea is to make a truth table for the expression and to split it into two dimensions (by dividing variables into two columns), and the corresponding values of the table will be the values of the image bits. 

[expr-to-img demo](https://mihahanya.github.io/Logical-images/) 

[img-to-expr demo (not finished)](https://mihahanya.github.io/Logical-images/index2.html) 

For `a^b+c`:
```
[]    []
    [][]
```

`a+c*b^d`:
```
[][]    
    [][]
[]      
  [][][]
```

`a=b=c=d=e`:
```
[]    []  [][]  
  [][]  []    []
  [][]  []    []
[]    []  [][]
```

* true - `  `
* false - `[]`
