import styled from 'styled-components';
import chatAppLogo from '../../../static/assets/chat_logo_only_smallest.png';
import mailIcon from '../../../static/assets/email.svg';

export const MailIcon = styled.div`
    background-image: url(${mailIcon});
    background-size: 20px;
    width: 20px;
    height: 20px;
`;

export const Input = styled.input`
	padding: 0.5em;
	margin: 0.5em;
	color: paleorange;
	background: papayawhip;
	border: none;
	border-radius: 3px;
	display:inline-block
	text-align: center;
`;

export const LoginHeader = styled.h1`
    margin-top: -20px;
    font-size: 4em;
	text-align: center;
	color: #F2F0D5;
	text-shadow: 1px 1px #c1c0aa;
	font-weight: bold;
	font-family: "Geektastic";3
`;

export const Button = styled.button`
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
        touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
    &:focus {
        color: #333;
        text-decoration: none;
    };
    &:active {
        background-image: none;
        outline: 0;
        -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
                box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
    }
`;

export const FrontPageImage = styled.img`
    width: 20%;
    height: 125px;
    top:0px;
    left:0px;
    background-image: url(${chatAppLogo});
    margin: auto;
`;

export const InputDiv = styled.div`
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputGroupAddon = styled.div`
    padding: 4px 5px;
    margin-right: -7px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

export const ButtonWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FormBox = styled.div`
    width: 50%;
    heigth: 50%;
    border-color: #ff7f50;
    border-radius: 25px;
    padding-top: 30px;
    padding-bottom: 30px;
    margin-bottom: 30px;
    color: inherit;
    background-color: #223144;
    position: absolute;
    left: 0;
    right: 0;

    margin: auto;
`;

export const CenterDiv = styled.div`
    width: 20%;
    margin: auto;
`;

export const StartChattingButton = Button.extend`
    color: #fff;
    background-color: #ffa500;
    border-color: #b27300;
    margin: auto;
    &:hover {
        color: #fff;
        background-color: #e59400;
        border-color: #ffb732;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;
`;