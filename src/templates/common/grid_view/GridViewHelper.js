
 export const selectValues = [
        { name: 'Seater', value: 'seater'},
        { name: 'Sleeper', value: 'sleeper' },
        { name: 'Semi Sleeper', value: 'semi_sleeper' },
    ];

export const SetInitialValues = (formFields)=>{
    const initialValues = {}
    formFields.map((formFieldEle)=>{
        initialValues[formFieldEle.name] = formFieldEle.fieldType === 'text' ? '' : formFieldEle.fieldType === 'number' ? 0 : null
    })
    return initialValues
}

