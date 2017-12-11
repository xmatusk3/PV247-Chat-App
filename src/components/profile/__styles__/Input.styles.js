import styled from 'styled-components';

export const FormGroup =  styled.div`
    margin-left: 10px;
    margin-top: 5px;
`;

export const StyledValidationMessage =  styled.div`
    font-family: "Open Sans";
    font-color: #ffb732;
`;

export const InputGroupDiv = styled.div`
    display: left;
    margin-left: 10px;
    margin-top: 5px;
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

export const Button = styled.button`
    display: inline-block;
    align-items: center;
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

export const UpdateButton = Button.extend`
    color: #fff;
    background-color: #ffa500;
    border-color: #b27300;
    margin: auto;
    display: center;
    &:hover {
        color: #fff;
        background-color: #e59400;
        border-color: #ffb732;
    }
`;

export const StyledLabel = styled.label`
    font-family: "Open Sans";
    font-color: #ffb732;
`;

// position: relative;
// display: table;
// bor  der-collapse: separate;
// vertical-align: middle;
// width: auto;
// float: left;
// margin-left: 5px;