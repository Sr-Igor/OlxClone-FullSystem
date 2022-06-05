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
        width: 500px;
        height:250px;
        background-color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: 0 0  5px #000;

        span {
            font-size: 20px;
            margin-bottom: 60px;
        }

        .box--buttons {

            button {
                border: none;
                font-size: 20px;
                cursor: pointer;
            }

            .confirm{
                background-color: #c9242e;
                border-radius: 5px;
                color: #FFF;
                padding: 5px 10px;
                margin-right: 10px;
                width 100px;
            }

            .cancel {
                background-color: transparent;
                font-size: 18px;
            }
        }
    }
`

export const PageArea = styled.div`

    .errorMessage {
        color: #FFF;
        background-color: #c9242e;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .ads--area {

        .images--area {
            display: flex;
            justify-content: center;
        }

        .row-1 {
            display: flex;
            justify-content: end;
            margin-bottom: 15px;

            .input--area {
                margin: 0px 10px;

                .unavailable {
                    border: none;
                    background-color: #413b6b;
                    color: #fff;
                    font-size: 15px;
                    border-radius: 5px;
                    padding: 5px 10px;
                    box-shadow: 0 0 5px #ccc;
                    transition: all ease .1s;
                    cursor: pointer;

                    &:hover {
                        box-shadow: 0 0 1px #000;
                        background-color: #5c65c0;
                    }
                }

                .available {
                    border: none;
                    background-color: #6da67a;
                    color: #fff;
                    font-size: 15px;
                    border-radius: 5px;
                    padding: 5px 10px;
                    box-shadow: 0 0 5px #ccc;
                    transition: all ease .1s;
                    cursor: pointer;

                    &:hover {
                        box-shadow: 0 0 1px #000;
                        background-color: #75a480;
                    }
                }

                .del {
                    border: none;
                    font-size: 15px;
                    background-color: #d83018;
                    border-radius: 5px;
                    padding: 5px 10px;
                    color: #fff;
                    cursor: pointer;

                    &:hover {
                        opacity: 0.7;
                    }
                }
            }
        }

        .row-2 {
            display: flex;
            min-height: 200px;
            justify-content: space-around;
            align-items: center;

            .col {
                display: flex;
                flex-direction: column;
                align-items: end;

                .input--area {
                    margin: 10px 0;
                    display: flex; 
                    align-items: center;
                }

                label {
                    margin-right: 10px;
                }

                input, textarea, select {
                    border: none;
                    border-radius: 5px;
                    border: 2px solid #ccc;
                    outline: none;

                    &:focus {
                        border: 2px solid #6e0ad7;
                    }
                }

                input[type="text"] {
                    height: 35px;
                    width: 250px;
                }

                textarea {
                    resize: none;
                    height: 80px;
                    width: 250px;
                }
            }
        }

        .row-3 {
            display: flex;
            justify-content: end;

            button, a {
                text-decoration: none;
                border: none;
                color: #FFF;
                font-size: 18px;
                padding: 5px 10px;
                border-radius: 5px;
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
`

export const Item = styled.div`
    margin: 10px;
    border-radius: 10px;
    background-color: #FFF;

    img {
        max-width:140px;
        height: 140px;
        border-radius: 5px;
        box-shadow: 3px 2px 3px #777;
    }
`

export const InputFile = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    margin-right: 20px;

    label {
        margin-right: 10px;
    }
    .add {

        display: flex;
        align-items: center;
        color: #FFF;
        background-color: #e57706;
        padding: 3px 7px;
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
`
