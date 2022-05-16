/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from "react";
import { createKey, importKey } from "../api/keyManager";
import { createIdentifier } from "../api/didManager";
import { createMnemonic } from "../api/utils/mnemonicAPI";



export const Login = () => {
    const [errorMessages, setErrorMessages] = useState({ message: ''});
    const [state, setState] = useState({ value: '' });

    const handleChange = (event: ChangeEvent<{ value: string }>) => {
        setState({ value: event?.currentTarget?.value });
    }

    const handleClick2 = async ()=> {
        // console.log(getMnemonic())
        // getMnemonic(console.log)
        // getIdentifier(console.log)
    }

    const handleClick = () => {
        const mnemonic = createMnemonic()
        console.log(mnemonic)
    }

    const renderErrorMessage = () => <div className="error">{errorMessages.message}</div>

    return (
        <div className="login-bg">
            <img src="../../logo/cathay.png" srcSet="../../logo/cathay@2x.png 2x,
                        ../../logo/cathay@3x.png 3x"
                className="cathay" alt=""></img>

            {/* <input className="password-bar" name={'password'}>
            </input> */}
            <input className="password-bar" type="password" onChange={handleChange} />
            {renderErrorMessage()}
            <button className="login-button" onClick={handleClick}>
                <div className="login-word">
                    登入
                </div>
            </button>

            <div className="or-box">
                <span className="or-left"></span>
                <span className="or">
                    OR
                </span>
                <span className="or-right"></span>
            </div>
            <button className="memword-button" onClick={handleClick2}>
                <div className="memword-login">
                    助記詞登入
                </div>
            </button>
            <span className="Wallet-HaveYouSignOn">
                尚未註冊DID Wallet ? 
                點選
                <span className="text-style-1">創建錢包</span>
            </span>
            <img src="../../end/frame.png"
                srcSet="../../end/frame@2x.png 2x,
                ../../end/frame@3x.png 3x"
                className="end" alt="">
            </img>
        </div>
    )
}

//svg, png
//react.component