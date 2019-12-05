function convertInput() {
    var className = document.querySelector('#class-name').value;
    var objectName = className[0].toLowerCase() + className.slice(1);
    var input = document.querySelector('#input').value;
    var output = document.querySelector('#output');

    var propertyAssignments = input
        .split('\n')
        .filter((item) => {
            return (
                item !== "" &&
                item !== " " &&
                !item.includes('[') // get rid of property attributes
            )
        })
        .map((item) => {
            item = item
                .split(' ')
                .filter(item => item !== '')[2];

            return `\t\t${item} = ${objectName}.${item};`;
        })
        .join('\n')

    console.log(input);

    var constructor = `
    public ${className}(${className} ${objectName})
    {
    ${propertyAssignments}
    }   
    `
    output.value = constructor;
}