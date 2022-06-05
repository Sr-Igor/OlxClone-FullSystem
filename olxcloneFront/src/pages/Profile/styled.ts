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
    display: flex;
    flex-direction: column;
    align-items: center;

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
        min-width: 800px;
        border-radius: 5px;
        box-shadow: 0 0 5px #BBB;
        padding: 35px;

        .message {
            color: #FFF;
            background-color: ${props => props.color};
            // background-color: #c9242e; //error
            //background-color: #408140; // sucess
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
`