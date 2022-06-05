import styled, { keyframes } from "styled-components";

const gradient = keyframes`
    0% {opacity: 0.6;}
    50% {opacity: 1;}
    100% {opacity: 0.6;}
` 

export const Fake = styled.div<{height: number}>`
    background-color: #DDD;
    height: ${props => props.height || 20}px;
    background: #BBB;
    transition: all ease 0.5s;
    animation: ${gradient} 2s ease infinite;
    
`

export const PageArea = styled.div<{width: number, currentImage: number}>`
    display: flex;
    // margin-top: 20px;

    .box {
        // background-color: #FFF;
        border-radius: 5px;
        // box-shadow: 0px 0px 4px #999;
        margin-bottom: 20px;
    }

    .box--padding{
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;

        .box {
            // display: flex;
            padding: 2px;
        }

        .area--image {
            display: flex;

            .productImage {
                width: 500px;
                height: 500px;
                overflow: hidden;
                position: relative;
                display: flex;
                align-items: center;
                z-index: 1;
    
                .arrow {
                    position: absolute;
                    font-size: 30px;
                    background-color: #DDD;
                    opacity: 0.5;
                    padding: 3px 12px;;
                    border-radius: 50%;
                    margin: 10px;
                    cursor: pointer;
    
                    &:hover {
                        opacity: 0.7;
                    }
                }
    
                .left {
                    left: 0;
                    z-index: 2;
                }
    
                .right {
                    right:0;
                    z-index: 2;
                }
    
                .slide--Area{
                    display: flex;
                    position: relative;
                    width: ${props => props.width}px;
                    margin-left: ${props => props.currentImage}px;
                    height: 500px;
                    // transition: all ease 0.5s;
                }
    
                .slide--Item{
                    
                    img {
                        width: 500px;
                        height: 500px;
                        border-radius: 5px;
                    }
                }
            }

            .mini--images {
                width: 50px;
                margin-left: 10px;

                .mini--item {
                    width: 50px;
                    height: 50px;
                    margin-bottom: 10px;
                    background-color: #fff;

                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                }

                .active {
                    border: 2px solid #999;
                    opacity: 0.5;
                }
            }

        }

     

        .pdInfo {
            flex: 1;
            padding: 15px 2px;

            .descTitle {
                font-size: 25px;
            }

            .pdDescription {
                margin-top: 10px;
                width: 500px;
            }
            
            .pdName {
                margin-bottom: 20px;

                h2 {
                    margin: 0;
                    // margin-top: 20px;
                }
                small {
                    color: #999;
                    font-size: 13px;
                }

                .sub-infos {

                    small {
                        margin-right: 20px;
                    }
                }
            }
        }
    }

    .rightSide {
        width: 250px;

        .box--padding{
            background-color: #6e0ad6;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;

            &:hover {

                .price span {
                    font-size: 24px;
                    
                }
            }
        }

        .price span {
            text-align: end;
            padding: 5px 10px;
            color: #FFF;
            display: block;
            font-size: 27px;
            transition: all ease 0.2s;
        }

        .contactSelletLink {
            background-color: #0000FF;
            color: #FFF;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0px 0px 4px #999;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            margin-top: 20px;
        }

        a {
            text-decoration: none;

            div {
                height: 30px;
                border-radius: 5px;
                box-shadow: 0px 0px 4px #999;
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                margin-top: 20px;
                color: #FFF;

                &:hover {
                    box-shadow: 0px 0px 5px #444;
                }
            }

            .editAdButton{
                background-color: #53576b;
            }

            .statusAdButton{
                background-color: #faad14;
            }

            .deleteAdButton{
                background-color: #c9242e;
            }
        }

        .createdBy {
            margin-top: 20px;
        }

        .createdBy small{
            display: block;
            color: #999;
            margin-top: 10px;
        }
    }
`

export const OthersArea = styled.div`
    h2 {
        font-size: 20px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
`

export const BreadChumb = styled.div`
    font-size: 15px;
    margin-top: 20px;

    a {
        display: inline-block;
        margin: 0px 5px;
        text-decoration: underline;
        color: #000;
    }
    
    div {
        color: blue;
        display: inline-block;
        margin: 0px 5px;
        cursor: default;
    }
`