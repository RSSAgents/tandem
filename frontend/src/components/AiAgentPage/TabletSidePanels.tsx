import { DrawerType, RoleType, StressModeType } from '@/types/aiAgentTypes';
import { SettingsPanel } from '@components/AiAgentPage/SettingsPanel';
import { TopicsPanel } from '@components/AiAgentPage/TopicsPanel';
import { Button, Paper, Text, Transition } from '@mantine/core';
import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import classes from '../../pages/AiAgentPage/AiAgentPage.module.css';

interface TabletSidePanelsProps {
  openPanel: DrawerType | null;
  setOpenPanel: (panel: DrawerType | null) => void;
  settingsBtnRef: RefObject<HTMLButtonElement | null>;
  topicsBtnRef: RefObject<HTMLButtonElement | null>;
  settingsPanelRef: RefObject<HTMLDivElement | null>;
  topicsPanelRef: RefObject<HTMLDivElement | null>;
  role: RoleType;
  stressMode: StressModeType;
  readinessPercentage: number;
  onRoleChange: (role: RoleType) => void;
  onStressModeChange: (mode: StressModeType) => void;
  onOpenCodeRunner: () => void;
  activeTopic: string | null;
  scores: Record<string, number>;
  onTopicSelect: (topic: string) => void;
}

export const TabletSidePanels = ({
  openPanel,
  setOpenPanel,
  settingsBtnRef,
  topicsBtnRef,
  settingsPanelRef,
  topicsPanelRef,
  role,
  stressMode,
  readinessPercentage,
  onRoleChange,
  onStressModeChange,
  onOpenCodeRunner,
  activeTopic,
  scores,
  onTopicSelect,
}: TabletSidePanelsProps) => {
  const { t } = useTranslation('aiAgent');

  return (
    <>
      <Button
        ref={settingsBtnRef}
        onClick={() => setOpenPanel(openPanel === 'menu' ? null : 'menu')}
        variant="filled"
        color="#ae3ec9"
        className={`${classes.tabButton} ${classes.tabButtonSettings}`}
      >
        <Text size="9px" fw={700} className={classes.tabButtonLabel}>
          {t('mobile.settings')}
        </Text>
      </Button>
      <Transition mounted={openPanel === 'menu'} transition="slide-right" duration={200}>
        {(style) => (
          <Paper
            ref={settingsPanelRef}
            className={`${classes.slidePanel} ${classes.slidePanelSettings}`}
            style={style}
            shadow="lg"
            p="md"
            radius="0 md md 0"
          >
            <SettingsPanel
              role={role}
              stressMode={stressMode}
              readinessPercentage={readinessPercentage}
              onRoleChange={onRoleChange}
              onStressModeChange={onStressModeChange}
              onOpenCodeRunner={onOpenCodeRunner}
            />
          </Paper>
        )}
      </Transition>

      <Button
        ref={topicsBtnRef}
        onClick={() => setOpenPanel(openPanel === 'topics' ? null : 'topics')}
        variant="filled"
        color="#22b8cf"
        className={`${classes.tabButton} ${classes.tabButtonTopics}`}
      >
        <Text size="9px" fw={700} className={classes.tabButtonLabel}>
          {t('mobile.topics')}
        </Text>
      </Button>
      <Transition mounted={openPanel === 'topics'} transition="slide-right" duration={200}>
        {(style) => (
          <Paper
            ref={topicsPanelRef}
            className={`${classes.slidePanel} ${classes.slidePanelTopics}`}
            style={style}
            shadow="lg"
            p="md"
            radius="0 md md 0"
          >
            <TopicsPanel
              activeTopic={activeTopic}
              scores={scores}
              onTopicSelect={onTopicSelect}
              isMobile={true}
              onClose={() => setOpenPanel(null)}
            />
          </Paper>
        )}
      </Transition>
    </>
  );
};
