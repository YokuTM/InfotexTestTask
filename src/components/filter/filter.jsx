function Filter() {

    const filters = ["firstName","lastName","maidenName","age","gender","phone", "address.city","address.address"];
        
    
    function getPromisesFilteredUsers (value){
        const promises = []
        filters.forEach(parametr => {
            promises.push(fetch(`https://dummyjson.com/users/filter?key=${parametr}&value=${value}`))
            });
            return promises
    }
    function getFilterUsers (value){
        const jsons = [];
            Promise.allSettled(getPromisesFilteredUsers(value)).then((promises) => {
            
            promises.forEach((promise) => {
                jsons.push(promise.value.json())
            })
            Promise.allSettled(jsons).then((json) => {
                console.log(json)
            })
        })
    }
    function checkInput(event){
        if (event.code == "Enter"){
                getFilterUsers (event.nativeEvent.target.value)
                console.log(event.nativeEvent.target.value)
        }
        
        
    }
    
    return (
        <div className='flex justify-between my-8'>
                <div class="col-md-2 mb-2">
                    <input onKeyDown={checkInput} type="text" placeholder="Поиск" class="form-control" />
                </div>
                </div>
)

}


export default Filter;