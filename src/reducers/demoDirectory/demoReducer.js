import { DEMO_GOT_CLICKED } from '../../constants/demoActionTypes';

export const incresdNumbah = (prevStat = 0, action) => {
    switch(action.type) {
        case DEMO_GOT_CLICKED:
            return prevStat + 1;
        default:
            return 0;
    }
};