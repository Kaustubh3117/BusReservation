 export const ManageDeletePayload = (data)=>{
    const deletePayload = [];
    if (Array.isArray(data) && data.length > 0) {
      for (const i in data) {
        deletePayload.push(data[i].id);
      }
    } else {
      deletePayload.push(data.id);
    }
    const finalPayload = { data: deletePayload };
    return finalPayload
}

export const ConvertToDropDownFormat = (response)=>{
    const resDataArr = []
    response.data.map((data) => {
        resDataArr.push({name: data.bus_id.bus_name, value:data.id})
      });
    return resDataArr
}