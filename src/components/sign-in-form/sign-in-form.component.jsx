import {useState} from 'react'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
    createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils"
import './sign-in-form.styles.scss'
const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password,} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const SignInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(response)
            resetFormFields()
        }catch (e) {
            // if (e.code === 'auth/wrong-password'){
            //     alert('Incorrect password')
            // }else if(e.code === 'auth/user-not-found') {
            //     alert('user not found in database')
            // }
            // console.log(e.code)
            switch(e.code) {
                case 'auth/wrong-password': alert('incorrect password for email');
                break
                case 'auth/user-not-found': alert('Not such user in database');
                break
                default: alert(e.code)
            }
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label={'Email'}
                    type="email" required
                    onChange={handleChange} name='email'
                    value={email}
                />
                <FormInput
                    label={'Password'}
                    type="password" required
                    onChange={handleChange} name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button buttonType="default" type='submit'>Sign in</Button>
                    <Button type="button" buttonType="google" onClick={SignInWithGoogle}>Google Sign In</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm