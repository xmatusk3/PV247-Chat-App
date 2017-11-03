import { incresdNumbah } from './demoReducer';
import { increaseCount } from '../../actions/demoActionCreators';

test('increases number of cunts', () => {
    const expectedCunts = 9;
    const newState = incresdNumbah(8, increaseCount());

    expect(newState).toBe(expectedCunts);
});