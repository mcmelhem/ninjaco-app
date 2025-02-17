import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import './cards.scss';
import { cardStat, unpaidBalances, schedule, growth, events, balance } from "../data";
const CustomCards = (props) => {
    if (props.type == "stastics2") {
        var cardData = cardStat.find((obj) => parseInt(obj.id) == parseInt(props.id));
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="card card-rounded">
                            <div className="card-horizontal">
                                <div className="img-square-wrapper m-2">
                                    <img src={require(`../../Images/icons/${cardData.icon}`)} width="40" height="40" alt="Logo" />
                                </div>
                                <div className="card-body">
                                    <h4 className="card-title">  {cardData.title}</h4>
                                    <p className="card-text"> {cardData.subTitle} </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    } else if (props.type == "stastics3") {
        var cardDataArr;

        if (props.id == 1) {
            cardDataArr = unpaidBalances;
            var numColumns = Object.keys(cardDataArr.length) - 1;
            var bootstrapCols = 12 / numColumns;
        } else if (props.id == 2) {
            cardDataArr = schedule;
            var numColumns = Object.keys(cardDataArr.length) - 1;
            var bootstrapCols = 12 / numColumns;
        } else if (props.id == 3) {
            cardDataArr = growth;
            var numColumns = Object.keys(cardDataArr.length) - 1;
            var bootstrapCols = 12 / numColumns;
        } else {
            cardDataArr = schedule;
            var numColumns = Object.keys(cardDataArr.length) - 1;
            var bootstrapCols = 12 / numColumns;
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className={"card card-rounded " + (props.cardClass ? props.cardClass : "")}>
                            <div className="m-1 card-title">
                                {cardDataArr[0].title}
                            </div>
                            <div className="card-body">
                                {cardDataArr.map((cardData, idx) => (
                                    <div className="row" key={idx}>
                                        <div className="col-3">
                                            {cardData.k1}
                                        </div>
                                        <div className="col-3">
                                            {cardData.k2}
                                        </div>
                                        <div className="col-3">
                                            {cardData.k3}
                                        </div>
                                        <div className="col-3">
                                            <a> {cardData.k4}</a>
                                        </div>
                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    } else if (props.type == "statistics1") {
        var cardDataArr = balance;
        var numColumns = Object.keys(cardDataArr.length) - 1;
        var bootstrapCols = 12 / numColumns;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className={"card card-rounded " + (props.cardClass ? props.cardClass : "")}>
                            <div className="m-1 card-title">
                                {cardDataArr[0].title}
                            </div>
                            <div className="card-body">
                                {cardDataArr.map((cardData, idx) => (
                                    <div className="row" key={idx}>
                                        <div className="col-3">
                                            {cardData.k1}
                                        </div>
                                        <div className="col-3">
                                            {cardData.k2}
                                        </div>
                                        <div className="col-3">
                                            {cardData.k3}
                                        </div>
                                        <div className="col-3">
                                            <a> {cardData.k4}</a>
                                        </div>
                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div >);


    }
};

export default CustomCards;

