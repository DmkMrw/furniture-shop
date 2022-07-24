import React from 'react';
import styles from './FeedbackSection.module.scss';
import Swipeable from '../../common/Swipeable/Swipeable';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { feedbackState, feedbackLength } from '../../../recoil/feedbackAtom';
import { fadeDurationInMs, contentRefreshDelayInMs } from '../../../constants';
import SliderDots from '../../common/SliderDots/SliderDots';
import SectionHeading from '../../common/SectionHeading/SectionHeading';

const FeedbackSection = () => {
  const feedbacks = useRecoilValue(feedbackState);
  const feedbacksLength = useRecoilValue(feedbackLength);

  const [activePage, setActivePage] = useState(0);
  const [isFaded, setIsFaded] = useState(false);

  const { description, picture, firstName, lastName, role } = feedbacks[activePage];

  const handlePageChange = pageToSet => {
    setIsFaded(true);
    setTimeout(() => setIsFaded(false), fadeDurationInMs);
    setTimeout(() => setActivePage(pageToSet), contentRefreshDelayInMs);
  };

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.panelBar}>
          <SectionHeading text={'Client feedback'} />
          <div className={styles.dotsLayout}>
            <SliderDots
              currentPage={activePage}
              action={handlePageChange}
              isFaded={isFaded}
              pagesNumber={feedbacksLength}
            />
          </div>
        </div>

        <Swipeable
          action={setActivePage}
          page={activePage}
          pagesNumber={feedbacksLength}
        >
          <div className={`row ${isFaded ? styles.faded : ''}`}>
            <div className={styles.feedbackBox}>
              <p className={styles.decoration}>&quot;</p>
              <p className={styles.desc}>{description}</p>
              <div className='mx-auto mt-4'>
                <div className='d-inline-flex'>
                  <div>
                    <img
                      className={`rounded ${styles.image}`}
                      src={picture}
                      alt='person'
                    />
                  </div>
                  <div className={styles.personDesc}>
                    <p>{`${firstName} ${lastName}`}</p>
                    <p>{role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Swipeable>
      </div>
    </div>
  );
};

export default FeedbackSection;
