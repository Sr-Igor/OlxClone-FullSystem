import styled from "styled-components";

export const PageArea = styled.div<{seeCat: string}>`
    display: flex;
    margin-top:20px;

    .leftSide {
        width:250px;
        margin-right: 10px;

        .filterName {
            font-size: 15px;
            margin: 10px 0;
        }

        input, select {
            width: 100%;
            height: 40px;
            border: 2px solid #9BB83C;
            border-radius: 5px;
            font-size: 15px;
            color: #777;
            padding: 10px;
            outline: none;
        }

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .arrow-down {
            display: none;
        }

        .categoryItem {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            color: #000;
            cursor: pointer;
            transition: all ease .2s;

            img {
                height: 25px;
                width: 25px;
                margin-right: 5px;
            }

            span {
                font-size: 14px;
            }
        }

        .categoryItem:hover, 
        .categoryItem.active {
            background-color: #9BB83C;
            color: #FFF;
        }
    }

    .rightSide {
        flex: 1;

        h2 {
            margin: 0;
            margin-left: 15px;
            font-size: 25px;
        }

        .listWarning {
            padding: 30px;
            text-align: center;
        }

        .list {
            display: flex;
            flex-wrap: wrap;

            .AdItem {
                width: 33%;
            }
        }

        .pagination {
            display: flex;
            justify-content: center;
            margin: 10px;
    
            .pageItem {
                background-color: #FF8100;
                color: #FFF;
                margin: 2px;
                padding: 5px 10px;
                border-radius: 50%;
                font-size: 12px;
                cursor: pointer;
            }
    
            .active {
                background-color: #6e0ad6;
                opacity: 0.5;
            }
        }
    }

@media (max-width:600px) {
    flex-direction: column;
    margin: 0;

    .leftSide {
        color: #FFF;
        width: auto;
        margin: 0;
        background-color: #6e0ad6;
        height: ${props => (props.seeCat=="none"?"225px":"885px")};
        transition: all ease 0.3s;

        form {
            background-color: #4444;
            padding: 20px 10px;;
        }

        ul {

            .categoryItem {
                background-color: #FFF;
                margin: 10px 0;
                display: ${props=>props.seeCat};
            }
        }

        .arrow-down {
            display: flex;
            justify-content: center;

            img {
                width: 25px;
                transform: ${props => (props.seeCat=="none"?"":"rotate(180deg)")};
                transition: all ease 0.4s;
            }
        }

    }

    .rightSide {
        border-top: 1px solid #CCC;

        h2 {
            margin: 15px 0;
            text-align: center;
            width: 100%;
            color: #4a4a4a;
        }

        .list {
            display: flex;
            flex-wrap: wrap;

            .AdItem {
                width: 100%;
            }
        }
    }
}
`
