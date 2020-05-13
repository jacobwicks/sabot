import makePost from './makePost';
import log from '../log';
import { respondToPostProps } from '../../types';
import { Page } from 'puppeteer';
import { deathToll } from '../urls';

const getDeathToll = async (page: Page) => {
    await page.goto(deathToll, {
        waitUntil: 'networkidle0',
    });

    return await page.evaluate(() => {
        const callouts = <HTMLSpanElement[]>[
            ...document.getElementsByClassName('callout'),
        ];

        const getNewAndTotal = (span: HTMLSpanElement) => {
            const arr = span.innerText.split(' ');
            return {
                new: arr[3],
                total: arr[2],
            };
        };

        const cases = getNewAndTotal(callouts[0]);

        const deaths = getNewAndTotal(callouts[1]);

        return {
            cases,
            deaths,
        };
    });
};

//posts the death toll from
//https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html
const postDeathToll = async ({
    page,
    postId,
    threadId,
}: respondToPostProps) => {
    const toll = await getDeathToll(page);

    if (toll.cases && toll.deaths) {
        const { cases, deaths } = toll;

        //generate the postcontent string
        const postContent = `There have been ${deaths.total} total deaths, including ${deaths.new} newly reported.
There are ${cases.total} COVID 19 cases, including ${cases.new} newly reported.`;

        try {
            await makePost({
                postContent,
                page,
                postId,
                threadId,
            });
        } catch (err) {
            //if something goes wrong, then log it!
            log('postDeathToll failed', { page, postId, threadId }, err);
        }
    } else {
        log('postDeathTol failed - no toll received', {
            page,
            postId,
            threadId,
        });
    }
};

export default postDeathToll;
