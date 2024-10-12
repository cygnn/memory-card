import PropTypes from 'prop-types'
function Card({ src, name, onClick}){
    return(
        <div className="card" onClick={()=> onClick(name)}>
            <div className="img">
                {/* {image goes here} */}
                <img src={src} />
            </div>
            <p className="name">{name}</p>
        </div>
    )
}

Card.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Card;