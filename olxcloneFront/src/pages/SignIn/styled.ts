import styled from "styled-components";

export const PageArea = styled.div<{opacity: number}>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    .signin--area {
        background-color: #FFF;
        width: 500px;
        min-height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        opacity: ${props => props.opacity};

        .logo {
            display: flex;
            align-items: center;
            margin-top: 30px;
    
            .logo-1,
            .logo-2,
            .logo-3 {
                font-size: 38px;
                font-weight: bold;
            }
    
            .logo-1 {color: #6e0ad6;}
            .logo-2 {
                color: #8ce563;
                margin-bottom: 20px;
            }
            .logo-3 {color: #f28000;}
        }

        .title--page {
            font-weight: bold;
            color: #555;
            margin-bottom: 25px;
            font-size: 20px;
        }

        .OAuth {
            color: #FFF;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 70%;
            padding: 15px 10px;
            border-radius: 25px;
            margin-bottom: 10px;
            font-size: 16px;
            cursor: pointer;

            img {
                width: 20px;
                position: absolute;
                left: 0;
                margin-left: 15px;
            }
        }

        .facebook-login {
            background-color: rgb(58, 89, 152);
        }

        .google-login {
            background-color: rgb(66, 133, 244);
        }

        .or {
            font-size: 13px;
            color: #999;
            margin: 15px;
        }

        .box-error {
            background-color:  #d64242;
            color: #FFF;
            padding: 10px 5px;
            width: 70%;
            margin: 1px 0px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 30px;
                margin-right: 15px;
            }
        }

        form {
            width: 70%;
            margin-top: 15px;

            label {
                width: 100%;

                .area--title{
                    font-weight: bold;
                    color: #555;
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .area--input {

                    input {
                        width: 100%;
                        height: 45px;
                        border: 0;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        margin-bottom: 15px;
                        outline: none;
                        padding: 10px;
                        font-size: 18px;
                        color: #555;

                        &:focus {
                            border: 1px solid #6e0ad7;
                        }
                    }

                    .vs-password {
                        width: 100%;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                        input {
                            width: 100%;
                            padding-right: 35px;
                        }
        
                        img {
                            width: 20px;
                            position: absolute;
                            right: 0;
                            margin-right: 10px;
                            cursor: pointer;
                            margin-bottom: 15px;
                            opacity: 0.5;
                        }
                    }
                }
            }

            .area--checkbox {
                display: flex;
                align-items: center;

                input[type="checkbox"] {
                    width: 12px;
                    margin: 0;
                    margin-left: 10px;
                }
            } 
        }

        .button-area {
            width: 70%;

            button {
                width: 100%;
                border: 0;
                font-size: 17px;
                background-color: #e57706;
                color: #FFF;
                padding: 16px 20px;
                border-radius: 25px;
                cursor: pointer;
            }
        }

        .signup--box {
            margin: 40px 0px;
            color: #555;
            font-size: 15px;

            a {
                text-decoration: none;
                color: #6e0ad7;
                font-weight: bold;
            }
        }

        .help-box {
            color: #555;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 15px;
            cursor: pointer;
        }
    }

    .info--area {
        color: #555;
        font-size: 11px;
        margin-top: 15px;
        max-width: 500px;
        line-height: 25px;

        .pointer {
            color: #6e0ad7;
            font-weight: bold;
        }
    }

@media (max-width:600px) {

    margin-top: 0;

    .signin--area {
        width: 100vw;

        .OAuth {
            font-size: 13px;
            padding-left: 25px;
        }

        form {
            width: 90%;

            small {
                font-size: 10px;
            }
        }
    }
    
    .info--area {
        padding: 15px;
    }
}
`