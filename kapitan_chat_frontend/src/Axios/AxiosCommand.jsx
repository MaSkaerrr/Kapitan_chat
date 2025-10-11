import axios from "axios";
export function getAxios(url){
return axios.get(url);
}
export function postAxiosAdd(url, obj) {
  
    axios.post(url, obj)
        .then((response) => {
            console.log("Element is added:", response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
export function deleteAxios(url,num){
    const currentURL = `${url}/${num}`
    axios.delete(currentURL).then((res)=>{
        console.log("Succes delete:"+ res);
    })
.catch(()=>{
    console.log("Error");
});
}
export function putAxios(url, id, updatedData) {
    const currentURL = `${url}/${id}`;
    
    axios.put(currentURL, updatedData)
        .then((response) => {
            console.log('Элемент успешно обновлен:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка', error);
        });
}
