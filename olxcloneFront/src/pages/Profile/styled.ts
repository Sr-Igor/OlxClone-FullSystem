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
        height: 300px;
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
    display: flex;
    flex-direction: column;
    align-items: center;

    .options{
        display: flex;
        justify-content: end;
        position relative;
        heigth: 60px;
        background-color: #40453f;

        div {
            cursor: pointer;
            transition: width 0.5s 0s ease;
            width: 30%;
            text-align: center;
            color: #ccc;
            padding: 5px 10px;
            font-size: 13px;
        }

        .active {
            text-align: center;
            width: 95%;
            background-color: #198754;
            color: #fff;
        }
    }

    .title--area { 
        width: 100%;

        h2 {
            font-size: 35px;
            color: #4A4A4A;
            font-weight: 300;
            margin: 0;
            margin: 20px 0px;
        }
        
        small {
            color: #4A4A4A;
        }
    } 

    hr {
        width: 100%;
    }

    .box--info {
        margin-top: 20px;
        background-color: #fff;
        max-width: 800px;
        min-height: 550px;
        border-radius: 5px;
        box-shadow: 0 0 5px #BBB;
        padding: 35px;

        .currentImage {
            display: flex;
            justify-content: center;

            img {
                width: 200px;
                height: 200px;
                object-fit: cover;
                object-position: center;
                border-radius: 100px;
            }
        }

        .input--area {
            display: flex;
            justify-content: center;

            label {
                background-color: #e57706;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                width: 35px;
                height: 35px;
                border-radius: 30px;
                margin-top: -15px;
                cursor: pointer;

                img {
                    width: 20px;
                }
            }

            input[type="file"] {
                display: none;
            }

            .delete-label {
                margin-top: 10px;
                width: 150px;
                font-size: 15px;
                height: 40px;
                cursor: pointer;
                background-color: #cf1500;

                .del {
                    display: flex;
                    align-items: center;
                
                    img {
                        width: 20px;
                    }

                    span {
                        color: #fff;
                        margin: 0;
                        margin-left: 5px;
                    }
                }
            }
        }

        .message {
            color: #FFF;
            background-color: ${props => props.color};
            margin-top: 15px;
            padding: 5px 10px;
            border-radius: 5px;
        }

        .title-box {
            font-size: 24px;
            color: #4a4a4a;
        }

        form {
            margin-top: 30px;
            display: flex;
            flex-direction: column;

            label {
                display: flex;
                flex-direction: column;
                font-size: 19px;
                margin-bottom: 20px;
                width: 500px;

                span {
                    margin-bottom: 10px;
                    color: #4a4a4a;
                    position: relative;
                    display: flex;
                    align-items: center;

                    small {
                        font-size: 10px;
                        font-weight: bold;
                        position: absolute;
                        right: 0;
                    }
                }

                input, select {
                    border: none;
                    border: 1px solid #bbb;
                    border-radius: 5px;
                    height: 35px;
                    font-size: 17px;
                    padding: 5px;
                    outline: none;

                    &:focus {
                        border: 1px solid #6e0ad7
                    }
                }

                select {
                    width: 80px;
                }
            }


            .vs-password {
                width: 100%;
                position: relative;
                display: flex;
                align-items: center;
                
                input {
                    width: 100%;
                }

                img {
                    width: 20px;
                    position: absolute;
                    right: 0;
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
        }

        .send {
            border: none;
            max-width: 200px;
            margin-top: 30px;
            font-size: 15px;
            color: #fff;
            background-color: #e57706;
            padding: 15px 17px;
            border-radius: 15px;
            cursor: pointer;

            &:hover {
                background-color: #e57746;
                box-shadow: 0 0 4px #999;
            }
        }
    }

@media (max-width:600px){

    .options{

        div {
            display: flex;
            align-items: center;
            flex: 1;  
        }

        .active {
            width: auto;
        }
    }

    .box--info {
        min-width: 100%;
        padding: 15px;

        form {
        
            label {
                width: 100%;
            }
        }
               
    }
}
`