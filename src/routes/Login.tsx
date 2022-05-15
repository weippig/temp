/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from "react";
import { createMnemonic,checkMnemonicIsCorrect, getMnemonic } from "../api/utils/mnemonicAPI";
import { DIDManager }from "../api/veramoDIDManager"

export const Login = () => {
    const [errorMessages, setErrorMessages] = useState({ message: ''});
    const [state, setState] = useState({ value: '' });
    const didManager = new DIDManager()

    const handleChange = (event: ChangeEvent<{ value: string }>) => {
        setState({ value: event?.currentTarget?.value });
    }

    const handleClick2 = ()=> {
        console.log(didManager)
        // didManager.createDID().then(did => {
        //     alert(did)
        // })
        // checkMnemonicIsCorrect(state?.value.split(" "))
    }

    const handleClick = () => {
        // checkPassword(state?.value, function(result) {
        //     if(!result) setErrorMessages({ message: "invalid password" });
        // })
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