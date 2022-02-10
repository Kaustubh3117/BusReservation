export const changeKeysFromObject = (data) =>{
    console.log("data: ", data);
    if( data !== undefined && data.length > 0){
        const resData = data.map((elm) => (
            {
            name:  elm.drop_location !== undefined ? elm.drop_location : elm.pick_location,
            code: elm.id,
          }
          ));
          return resData
    }
    return data
}