import styled from "styled-components";

export const HeaderArea = styled.header`
    background-color: #FFF;
    height: 65px;
    border-bottom: 1px solid #CCC;

    .container {
        max-width: 1000px;
        margin: auto;
        display: flex
    }

    a{
        text-decoration: none;
    }

    .logo {
        flex: 1;
        display: flex;
        align-items: center;
        height: 60px;

        .logo-1,
        .logo-2,
        .logo-3 {
            font-size: 27px;
            font-weight: bold;
        }

        .logo-1 {color: #6e0ad6;}
        .logo-2 {color: #8ce563;}
        .logo-3 {color: #f28000;}
    }

    nav {
        margin: 0;
        padding: 0;

        ul {
            display: flex;
            align-items: center;
            list-style: none;
            height: 40px;

            li{
                margin-left: 20px;
                margin-right: 20px;

                a, button{
                    border: 0;
                    background: none;
                    cursor: pointer;
                    outline: 0;
                    color: #4a4a4a;
                    font-size: 14px;
                    display:flex;
                    align-items: center;

                    svg {
                        margin-right: 2px;
                    }

                    &:hover {
                        color: #6e0ad7;

                        svg path {
                            fill: #6e0ad7;
                        }
                    }
                    
                    img {
                        width: 25px;
                        border-radius: 20px;
                        margin-right: 2px;
                    }
                }

                .button {
                    background-color: #FF8100;
                    color: #FFF;
                    border-radius: 25px;
                    padding: 10px 15px;

                    &:hover {
                        background-color: #E57706;
                        color: #FFF
                    }
                }
            }
        }
    }

@media (max-width: 600px) {
    height: auto;

    .container{
        flex-direction: column;
        height: 100%;
    }

    .logo {
        justify-content: center;
        margin-top: 20px;
    }

    nav {

        ul {
            margin:0;
            padding: 0;
            justify-content: center;;
            align-items: center;
            flex-wrap: wrap;
            height: auto;
            margin-top: 10px;
        
            li {
                width: 50%;
                margin: 0;
                display: flex;
                justify-content: center;
                margin-top: 10px;
    
                .button{
                    border-radius: 5px;
                }
            }
    
            .l2 {
                width: 100%;
                display:flex;
                justify-content: center;

                .button{
                    width: 100%;
                    border-radius:0;
                    margin:0;
                    display: flex;
                    justify-content: center;
                    margin-bottom: -1px;
                }
            }
        }
    
        
    }
}
`