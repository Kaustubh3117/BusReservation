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