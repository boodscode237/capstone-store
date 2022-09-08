// We have 3 types of buttons invert, defaults, authentication as google button
import './button.styles.scss'
const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button
            className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button