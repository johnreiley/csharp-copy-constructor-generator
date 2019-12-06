function convertInput() {
    var className = document.querySelector('#class-name').value;
    var objectName = className[0].toLowerCase() + className.slice(1);
    var input = document.querySelector('#input').value;
    var output = document.querySelector('#output');

    var propertyAssignments = input
        .split('\n')
        .filter((item) => {
            console.log(item.split(' '));
            return (
                item !== "" &&
                item !== " " &&
                !item.includes('[') //&& // get rid of property attributes
            )
        })
        .map((item) => {
            item = item
                .split(' ')
                .filter(item => {
                    console.log(item)
                    return (
                        item !== '' &&
                        item !== 'public' &&
                        item !== 'private' &&
                        item !== 'protected' &&
                        item !== 'internal' &&
                        item !== 'static'
                    )
                });

            if (item.length > 0) {

                console.log(item);
                var type = item[0];
                var propertyName = item[1];

                // get ride of nullable types
                if (type[type.length - 1] === '?') {
                    type = type.slice(0, type.length - 1)
                }

                // determine if it needs to be newed up
                if (datatypes.includes(type)) {
                    return `\t${propertyName} = ${objectName}.${propertyName};`;
                } else {
                    return `\t${propertyName} = new ${type}(${objectName}.${propertyName});`;
                }
            }
            return null;

        })
        .filter(i => i !== null)
        .join('\n')

    console.log(input);

    var constructor = `public ${className}(${className} ${objectName})\n{\n${propertyAssignments}\n}`

    output.value = constructor;
}


var datatypes = [
    'int',
    'long',
    'float',
    'double',
    'decimal',
    'char',
    'bool',
    'string',
    'object',
    'DateTime'
]