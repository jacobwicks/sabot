import makePost from './makePost';
import log from '../log';
import { RespondToPostProps } from '../../types';
import getDeathToll from '../getCdcDeathToll';

//posts the death toll from
//https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html
const postDeathToll = async ({
    page,
    postId,
    threadId,
}: RespondToPostProps) => {
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
        log('postDeathToll failed - no toll received', {
            page,
            postId,
            threadId,
        });
    }
};

export default postDeathToll;
