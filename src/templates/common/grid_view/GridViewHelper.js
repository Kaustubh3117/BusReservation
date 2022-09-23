
export const SetInitialValues = (formFields)=>{
    const initialValues = {}
    formFields.map((formFieldEle)=>{
        initialValues[formFieldEle.name] = formFieldEle.fieldType === 'text' ? '' : formFieldEle.fieldType === 'number' ? 0 : null
    })
    return initialValues
}

