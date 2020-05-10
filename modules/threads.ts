import { Thread } from '../types';

//the covid threadId changes every month when the thread gets closed and a new one starts
const covidThreadId = 3921857;

const covidThread = {
    name: 'CSPAM Covid thread',
    threadId: covidThreadId,
};

//the trump threadId changes every month when the thread gets closed and a new one starts
const trumpThreadId = 3921885;

const trumpThread = {
    name: 'CSPAM Trump thread',
    threadId: trumpThreadId,
    limit: { startPage: 301 },
};

const threads: Thread[] = [covidThread, trumpThread];

export default threads;
