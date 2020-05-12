import { Page } from 'puppeteer';
import getPageNumber from './getPageNumber';

//gets the number of the last page in the thread
const getLastPageNumber = async (page: Page) => {
    //puppeteer element handle
    const lastPageEH = await page.$('[title="Last page"]');

    //puppeteer javascript handle
    const lastPageJH = await lastPageEH?.getProperty('innerText');

    //value of innertext
    const lastPageJV = await lastPageJH?.jsonValue();

    //cut off the trailing >> characters, remove whitespace
    //cast to number
    const lastPage = Number((lastPageJV as string)?.slice(0, -2).trim());

    //if lastPage doesn't exist, it's because we are on the last page
    //and on the last page, the last page element doesn't exist
    return lastPage || getPageNumber(await page.url());
};

export default getLastPageNumber;
