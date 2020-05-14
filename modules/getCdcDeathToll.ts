import { Page } from 'puppeteer';
import { deathToll } from './urls';

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

export default getDeathToll;
