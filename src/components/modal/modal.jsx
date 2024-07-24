import "./modal.css"

function Modal(props) {
    // console.log(props.modalUser)

    function closeModal(){
        props.closeModal()
    }

    return(
        <div class="wrap">
            <div class="modal">
                <button type="modalButton" onClick={closeModal}><i class="fa fa-close"></i></button>
                <div class="modal__content">
                <header>
                    <a>
                        {props.modalUser.firstName} {props.modalUser.lastName} {props.modalUser.maidenName}
                    </a>
                </header>
                <ul>
                    <li type="leftColumn">
                        <a>Возраст: </a>
                        {props.modalUser.age}
                    </li>
                    <li type="rightColumn">
                        <a>Адрес: </a>
                        {props.modalUser.address.city}, {props.modalUser.address.address}
                    </li>
                </ul>
                <ul>
                    <li type="leftColumn">
                        <a>Рост: </a>
                        {props.modalUser.height} 
                    </li>
                    <li type="rightColumn">
                        <a>Телефон: </a>
                        {props.modalUser.phone}      
                    </li>
                </ul>
                <ul>
                    <li type="leftColumn">
                        <a>Вес: </a>
                        {props.modalUser.weight} 
                    </li>
                    <li type="rightColumn">
                        <a>Почта: </a>
                        {props.modalUser.email} 
                    </li>
                </ul>
                </div>
            </div>
        </div>
        
    )
    
}

export default Modal