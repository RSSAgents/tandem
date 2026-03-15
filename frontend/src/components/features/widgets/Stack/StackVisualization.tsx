import { Box, Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { ANIMATION_CONFIG, QUEUE_ANIMATION_CONFIG } from './Stack.constants';
import classes from './Stack.module.css';
import type { QuizState } from '@/hooks/useWidgetStack';

interface StackVisualizationProps {
  stack: number[];
  queue: number[];
  quizState: QuizState;
}

const StackVisualization = ({ stack, queue, quizState }: StackVisualizationProps) => (
  <Box className={classes.visualizations}>
    {(quizState === 'lifo-animation' ||
      quizState === 'fifo-question' ||
      quizState === 'fifo-animation' ||
      quizState === 'completed') && (
      <Box className={classes.section}>
        <Text className={classes.sectionTitle}>LIFO</Text>
        <Box className={classes.stackContainer}>
          <AnimatePresence mode="popLayout">
            {stack.map((item) => (
              <motion.div
                key={`stack-${item}`}
                className={classes.stackItem}
                initial={ANIMATION_CONFIG.initial}
                animate={ANIMATION_CONFIG.animate}
                exit={ANIMATION_CONFIG.exit}
                layout
              >
                <Text className={classes.itemText}>{item}</Text>
              </motion.div>
            ))}
          </AnimatePresence>
          {stack.length === 0 && quizState !== 'lifo-animation' && (
            <Text className={classes.emptyText}>Stack is empty</Text>
          )}
        </Box>
      </Box>
    )}

    {(quizState === 'fifo-animation' || quizState === 'completed') && (
      <Box className={classes.section}>
        <Text className={classes.sectionTitle}>FIFO</Text>
        <Box className={classes.queueContainer}>
          <AnimatePresence mode="popLayout">
            {queue.map((item) => (
              <motion.div
                key={`queue-${item}`}
                className={classes.queueItem}
                initial={QUEUE_ANIMATION_CONFIG.initial}
                animate={QUEUE_ANIMATION_CONFIG.animate}
                exit={QUEUE_ANIMATION_CONFIG.exit}
                layout
              >
                <Text className={classes.itemText}>{item}</Text>
              </motion.div>
            ))}
          </AnimatePresence>
          {queue.length === 0 && quizState !== 'fifo-animation' && (
            <Text className={classes.emptyText}>Queue is empty</Text>
          )}
        </Box>
      </Box>
    )}
  </Box>
);

export default StackVisualization;
