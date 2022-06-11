import styled from "styled-components";

export const PageArea = styled.div`

    .box-error {
        margin: 10px 0;
        background-color: #c9242e;
        border-radius: 5px;
        color: #FFF;
        padding: 10px;
    }

    .message-mobile {
        display: none;
    }

    form {
        background-color: #FFF;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;
        display: flex;

        .col-1 {
            flex: 1;

            .area--title {
                width: 100px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;
            }
        
            .area--input {
                flex: 1;
    
                input, select, textarea {
                   width: 100%;
                   font-size: 14px;
                   padding: 5px;
                   border: 1px solid #DDD;
                   border-radius: 3px;
                   outline: 0; 
                   transition: all ease 0.4s;
    
                   &:focus {
                    border: 1px solid #333;
                   }
                }
    
                textarea {
                    height: 150px;
                    resize: none;
                }
    
                .check-input{
                    width: auto;
                }
            }
        }

        .col-2 {
            flex: 1;
            margin-left: 15px;

            label {
                flex-direction: column;

                .area--title {
                    background-color: #FF8100;
                    color: #FFF;
                    padding: 5px 10px;
                    border-radius: 10px;
                    cursor: pointer;
                }

                .area--input{

                    input {
                        display: none;
                    }
                }
            }

            .box-images {
                display: flex;
                flex-wrap: wrap;
                
                .images{
                    display: flex;
                    justify-content: start;
                    flex-wrap: wrap;

                    .image {
                        background-color: #000;
                        display:flex;
                        margin: 3px;
                        height: 150px;
                    }
                }
                
                img {
                    width: 150px;
                    max-height: 150px;
                    object-fit: cover;
                    object-position: center;
                    margin: auto;
                }
               
                .button {

                    button {
                        margin-top: 10px;
                        border-radius: 10px;
                        color: #FFF;
                        border: none;
                        background-color: #d64242;
                        padding: 10px 15px;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .button-area {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 15px;

        button {
            background-color: #0089FF;
            border: 0;
            outline: 0;
            padding: 10px 15px;
            border-radius: 20px;
            color: #FFF;
            font-size: 18px;
            cursor: pointer;
    
            &:hover {
                background-color: #006FCE;
            }
        }    
    }

    .area {
        display: flex;
        align-items: center;
        padding: 10px;
        max-width: 500px;
    }

@media (max-width:600px) {

    h2 {
        width: 100%;
        text-align: center;
        color: #4a4a4a;
    }

    .box-error {
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
                background-color: #c9242e;
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

    form {
        flex-direction: column;

        .col-2 {

            label {
                flex-direction: column;
                width: 100%;

                .area--title {
                    background-color: #1875FF;
                    width:100%;
                    border-radius: 0;
                    text-align: center;
                    margin-bottom: 10px;
                }
                small {
                    color: #4a4a4a;
                    font-weight: bold;
                }
            }

            .box-images {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 20px;

                .images{

                    .image {

                        height: 50px;
                    }
                }

                img {
                    width: 50px;
                    max-height: 50px;
                }

                .button {
                    width: 100%;

                    button {
                        width: 100%;
                        border-radius: 0;
                    }
                }
            }
        }

        .col-1 {

            .area {
                flex-direction: column;
                align-items: start;
                
            }

            .area-checkbox {
                flex-direction: row;
            }

            .area--title {
                width: 200px;
                text-align: start;
                color: #4a4a4a;
                width: auto;
            }
        
            .area--input {
                width: 100%;
            }
        }
    }
}
`