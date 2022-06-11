import styled from "styled-components";

export const Warning = styled.div<{display: string}>`
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left:0;
    bottom: 0;
    right: 0;
    z-index: 2;
    display: ${props => props.display};
    justify-content: center;
    align-items: center;

    .box--warn {
        width: 600px;
        height:250px;
        background-color: #FFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: 0 0  5px #000;
        padding: 20px;

        .warning {
            background-color: #faad14;
            color: #fff;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 5px 15px;
            border-radius: 5px;
            font-size: 19px;

            img{
                width: 30px;
                margin-right: 10px;
            }
        }

        .message-box {
            display: flex;
            flex-direction: column;

            span {
                text-align: center;
                margin: 5px;
                font-weight: bold;
            }
        }

        .box--buttons {

            button {
                border: none;
                font-size: 15px;
                cursor: pointer;
            }

            .confirm{
                background-color: #c9242e;
                border-radius: 5px;
                color: #FFF;
                padding: 5px 10px;
                margin-right: 10px;
                width 150px;
            }

            .cancel {
                background-color: transparent;
                font-size: 15px;
            }
        }

    }
`

export const PageArea = styled.div<{color: string}>`

    .message {
        color: #FFF;
        background-color: ${props => props.color};
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .message-mobile {
        display: none;
    }

    .ads--area {

        .images--area {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }

        .row-1 {
            display: flex;
            justify-content: end;
            margin-bottom: 15px;

            .input--area {
                margin: 0px 10px;

                img {
                    width: 20px;
                    margin-right: 5px;
                }

                .unavailable, .available, .del{
                    border: none;
                    color: #fff;
                    font-size: 15px;
                    border-radius: 5px;
                    padding: 5px 10px;
                    box-shadow: 0 0 5px #ccc;
                    transition: all ease .1s;
                    cursor: pointer;
                    display: flex;
                }

                .unavailable {
                    background-color: #413b6b;

                    &:hover {
                        box-shadow: 0 0 1px #000;
                        background-color: #5c65c0;
                    }

                }

                .available {
                    background-color: #369F64;

                    &:hover {
                        box-shadow: 0 0 1px #000;
                        background-color: #75a480;
                    }
                }

                .del {
                    background-color: #d83018;

                    &:hover {
                        opacity: 0.7;
                    }
                }
            }
        }

        .row-2 {
            width: 100%;
            display: flex;
            min-height: 200px;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: start;
            margin-top: 50px;

            .col {
                display: flex;
                flex-direction: column;
                align-items: end;
                flex: 1;
                padding: 10px;

                .input--area {
                    margin: 10px 0;
                    display: flex; 
                    align-items: center;
                }

                label {
                    padding-right: 10px;
                    font-size: 13px;
                    color: #555;
                    font-weight: bold;
                }

                input, textarea, select {
                    border: none;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    outline: none;
                    font-size: 15px;
                    padding: 5px;
                    color: #555;

                    &:focus {
                        border: 1px solid #6e0ad7;
                    }
                }

                input, select{
                    height: 35px;
                    width: 250px;
                }

                textarea {
                    resize: none;
                    height: 80px;
                    width: 250px;
                }

                input[type="checkbox"] {
                    height: 15px;
                    width: 15px;
                }
            }
        }

        .row-3 {
            display: flex;
            justify-content: end;
            margin-top: 15px;

            button, a {
                text-decoration: none;
                border: none;
                color: #FFF;
                font-size: 15px;
                padding: 10px 15px;
                border-radius: 20px;
                cursor: pointer;
                transition: all ease .2s;
                margin: 0px 10px;
            }

            .saveEdit {
                background-color: #e57706;

                &:hover {
                    background-color: #88c425;
                }
            }

            .cancelEdit {
                background-color: #d83018;
            }
        }
    }

@media (max-width:600px) {
    .message {
        display: none;
    }

    .message-mobile {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 2;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);

        .box-message {
            background-color: #FFF;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            height: 250px;
            width: 100%;

            .title-message {
                background-color: ${props => props.color};
                color: #FFF;
                width: 100%;
                text-align: center;
                padding: 10px 15px;
                font-size: 20px;
            }

            .body-message {
                padding: 10px;
                text-align: center;
                font-weight: bold;
            }

            .ok-button {
                border: 1px solid #CCC;
                padding: 3px 20px;
            } 
        }
    }

    h2 {
        width: 100;
        text-align: center;
        font-size: 20px;
        color: #4a4a4a;
    }

    .ads--area {

        .images--area {
            flex-wrap: wrap;
        }

        .row-1 {
            justify-content: center;
    
            .input--area {
                margin: 0px 0px;
                width: 100%;

                img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }

                .unavailable, .available, .del{
                    align-items: center;
                    height: 50px;
                    font-size: 12px;
                    border-radius: 0;
                    box-shadow: none;
                }
            }
        }

        .row-2 {
            flex-direction: column;
            align-items: center;
            height: 100%;
            margin-top: 6px;

            .col {
                align-items: center;
                padding: 0px 0px;

                .input--area {
                    margin: 15px 0;
                    align-items: start;
                    flex-direction: column;
                }

                .input--checkbox--mobile {
                    flex-direction: row;
                    width: 100%;
                }

                label {
                    margin-bottom: 3px;
                }

                input, select{
                    width: 280px;
                }

                textarea {
                    width: 280px;
                }
            }
        }

        .row-3 {
            justify-content: center;
            margin-top: 0px;

            button, a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                font-size: 18px;
                padding: 10px 15px;
                border-radius: 0px;
                margin: 0px 0px;
            }
        }
    }
}
`

export const ImgArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items center;
    padding: 10px;

    .del {
        width: 90px;
        border: none;
        padding: 3px 7px;
        border-radius: 3px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 20px;
            height: 20px;
            transform: scale(0.8);
            transition: all ease 0.2s;
        }

        &:hover {

            img {
                transform: scale(1);
            }
        }
    }

    .del {
        background-color: #cf1500;
    }

@media (max-width:600px) {
    max-width: 30%;
    padding: 0px;

    .del {
        width: 90px;
        padding: 1px 4px;
        border-radius: 0px;
    }
}
`

export const Item = styled.div`
    margin: 10px;
    border-radius: 5px;
    background-color: #FFF;
    height: 140px;
    width: 140px;
    display: flex;
    box-shadow: 3px 2px 3px #777;

    img {
        max-width: 140px;
        max-height: 140px;
        object-fit: cover;
        object-position: center;
        margin: auto;
    }

@media (max-width:600px) {
    width: 90px;
    height: 90px;
    border-radius: 2px;
    box-shadow: none;
    margin: 10px;
    border: 2px solid #ccc;
    
    img {
        max-width: 80px;
        max-height: 80px;
    }
}
`

export const InputFile = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    margin-right: 20px;

    label {
        margin-right: 10px;
    }

    .add {
        display: flex;
        align-items: center;
        color: #FFF;
        background-color: #e57706;
        padding: 10px 15px;
        border-radius: 3px;
        cursor: pointer;

        input {
            display: none;
        }

        img {
            width: 20px;
            margin-right: 5px;
            transform: scale(0.8);
            transition: all ease 0.2s;
        }

        &:hover {
            
            img {
                transform: scale(1);
            }
        }
    }

@media (max-width:600px) {
    flex-direction: column;
    justify-content: center;
    margin: 0px;
    margin-top: 20px;

    label {
        margin-right: 0px;
    }

    .add {
        width: 100%;
        justify-content: center;
        background-color: #1875FF;
        padding: 8px 12px;
        font-size: 15px;
        border-radius: 0px;
        margin-bottom: 2px;
    }

    div {
        font-size: 10px;
        font-weight: bold;
        color: #555;
    }
}
`
