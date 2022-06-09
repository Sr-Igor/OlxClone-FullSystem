import styled from "styled-components";

export const PageArea = styled.div`

    .box-error {
        margin: 10px 0;
        background-color: #c9242e;
        border-radius: 5px;
        color: #FFF;
        padding: 10px;
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
                width: 200px;
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
`