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
    border-radius: 5px;
    width: 100%;
`
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

export const PageArea = styled.div<{width: number, currentImage: number}>`
    display: flex;

    .box {
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .box--padding{
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;

        .box {
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
                    margin: 10px;
                    opacity: 0.2;
                    cursor: pointer;

                    img {
                        width: 40px;
                    }
    
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
                    align-items: center;
                    position: relative;
                    width: ${props => props.width}px;
                    margin-left: ${props => props.currentImage}px;
                    height: 500px;
                    background-color: #fff;
                }
    
                .slide--Item{
                   width: 500px;
                   display: flex;

                    img {
                        max-width: 100%;
                        max-height: 500px;
                        margin: auto;
                    }
                }
            }

            .mini--images {
                width: 54px;
                margin-left: 10px;

                .mini--item {
                    width: 54px;
                    height: 50px;
                    display:flex;
                    margin-bottom: 10px;
                    background-color: #fff;
                    border-radius: 5px;

                    img {
                        width: 50px;
                        height: 50px;
                        object-fit: cover;
                        object-position: center;
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

        .box-price{
            background-color: #6e0ad6;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            color: #fff;
            text-align: end;

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
            background-color: #63997a;
            color: #FFF;
            height: 30px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            margin-top: 20px;
        }

        .createdBy {
            margin-top: 20px;
            background-color: #FFF;
            border-radius: 5px;
            box-shadow: 0 0 5px #000;
    
            .img-name {
                display: flex;
                align-items: center;
    
                img{
                    max-width: 50px;
                    border-radius: 25px;
                    margin-right: 20px;
                }
            }
        }
    
        .createdBy small{
            display: block;
            color: #999;
            margin-top: 10px;
        }

        .action-buttons {
            
            a {
                text-decoration: none;
            }
                
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                padding: 10px 15px;
                color: #FFF;
                cursor: pointer;

                &:hover {
                    opacity: 0.8;
                }

                img {
                    width: 20px;
                    margin-right: 5px;
                }
            }
    
            .editAdButton{
                background-color: #086788;
            }

            .statusAdButton.available{
                background-color: #369f64;
            }

            .statusAdButton.unavailable{
                background-color: #faad14;
            }

            .deleteAdButton{
                background-color: #c9242e;
            }
        }
    }


@media (max-width:600px) {
    flex-direction: column;

    .leftSide {
        margin:0;

        .area--image {

            .productImage{
                width: 100vw;
                height: 300px;
    
                .arrow {
                    margin: 3px;
                    opacity: 1;

                    img {
                        width: 30px;
                    }
                }

                .slide--Area{
                    display: flex;
                    align-items: center;
                    position: relative;
                    width: calc(${props => props.width/500} * 100vw);
                    margin-left: calc(${props => props.currentImage/500} * 100vw);
                    height: 100%;
                    padding:0;
                    background-color: #eee;
                }
    
                .slide--Item{
                   width: 100vw;
                   display: flex;
                   justify-content: center;

                    img {
                        max-width: 100%;
                        height: auto;
                        // margin: auto;
                        margin: 0;
                    }
                }
            }

            .mini--images{
                display: none;
            }
        }

        .pdInfo {
            flex: 1;
            padding: 15px 2px;

            .descTitle {
                font-size: 20px;
                margin: 5px;
            }

            .pdDescription {
                margin: 15px 5px;
                width: 100%;
                font-size: 15px;
                color: #4a4a4a;
            }
            
            .pdName {
                margin-bottom: 5px;

                h2 {
                    margin: 0;
                }

                small {
                    color: #999;
                    font-size: 11px;
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
        width: 100%;

        .box-price{
            border-radius: 0;
        }

        .price span {
            text-align: center;
        }

        .contactSelletLink {
            border-radius: 0;
            margin-top: 0px;
        }

        .createdBy {
            margin-top: 10px;
            border-radius: 5px;
            box-shadow: none;
            border: 1px solid #ccc;
    
            .img-name {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
    
                img{
                    border-radius: 25px;
                    margin-right: 0px;
                }
            }
        }
    
        .createdBy small{
            display: block;
            color: #999;
            margin-top: 10px;
        }

        .action-buttons {
            margin-bottom: 10px;
            
            a {
                text-decoration: none;
            }
                
            div {
                height: 30px;
                border-radius: 0;
                margin-top: 0px;
                padding: 30px 10px;
            }
        }
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

@media (max-width:600px) {

    h2 {
        width: 100%;
        font-size: 14px;
        text-align: center;
        margin-bottom: 18px;
        color: #4a4a4a;
    }
    
    .list {
        flex-direction: column;

        .AdItem {
            width: 100%;
        }
    }
}
`

export const BreadChumb = styled.div`
    font-size: 15px;
    margin-top: 20px;

    a {
        display: inline-block;
        margin: 0px 5px;
        text-decoration: none;
        color: #000;
    }
    
    div {
        color: #999;
        display: inline-block;
        margin: 0px 5px;
        cursor: default;
    }

@media (max-width: 600px) {
    font-size: 9px;
    margin-left: 10px;
}
`