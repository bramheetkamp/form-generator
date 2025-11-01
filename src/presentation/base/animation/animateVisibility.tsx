import {memo} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

interface Props {
  children: JSX.Element | JSX.Element[];
  isVisible?: boolean;
}

export const AnimateVisibility = memo(({children, isVisible = true}: Props) => {
  return (
    <AnimatePresence mode={'wait'}>
      {isVisible && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: {
              height: {
                duration: 0.3,
              },
              opacity: {
                duration: 0.25,
                delay: 0.15,
              },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: {
                duration: 0.3,
              },
              opacity: {
                duration: 0.25,
              },
            },
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
