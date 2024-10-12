import PropTypes from 'prop-types'
function WinnerModal({restart}){
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Game Over!</h2>
                <p>Congratulations, You have Won!</p>
                <button onClick={restart}>Restart</button>
            </div>
        </div>
    )
}

WinnerModal.propTypes = {
    restart: PropTypes.func.isRequired
}

export default WinnerModal;