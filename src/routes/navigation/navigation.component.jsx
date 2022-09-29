import { Fragment } from 'react'
import { Outlet, Link } from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";

import CartIcon from '../../components/cart-icon/cart-icon.component'

import {selectCurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component'
import { ReactComponent as CrownLogo} from '../../assets/crown.svg'
import {signOutStart} from "../../store/user/user.action";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles.jsx'

// import './navigation.styles.scss'

const Navigation = () => {
    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)
    const currentUser = useSelector(selectCurrentUser)
    const signOutUser = () => dispatch(signOutStart())
    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <div>
                        <CrownLogo className='logo'/>
                    </div>
                </LogoContainer>

                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>{' '}SIGN OUT{' '}</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropDown />}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation