# Logical-images

You can try it [here](https://mihahanya.github.io/Logical-images/) 

### Setting any binary image with a logical formula

Divide all the variables of a logical expression into two axes and iterate through all possible combinations of variable values. Solve the logical expression for each cell of the "two-dimensional truth table" and paint the cells in the appropriate colors. That's it!

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
