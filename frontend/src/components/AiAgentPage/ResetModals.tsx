import { Button, Group, Modal, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface ResetModalsProps {
  resetInterviewerModalOpen: boolean;
  closeResetInterviewer: () => void;
  clearInterviewerHistory: () => void;
  resetTeacherModalOpen: boolean;
  closeResetTeacher: () => void;
  clearTeacherHistory: () => void;
}

export const ResetModals = ({
  resetInterviewerModalOpen,
  closeResetInterviewer,
  clearInterviewerHistory,
  resetTeacherModalOpen,
  closeResetTeacher,
  clearTeacherHistory,
}: ResetModalsProps) => {
  const { t } = useTranslation('aiAgent');

  return (
    <>
      <Modal
        opened={resetInterviewerModalOpen}
        onClose={closeResetInterviewer}
        title={t('modals.resetInterview.title')}
        centered
      >
        <Text size="sm" mb="md">
          {t('modals.resetInterview.body')}
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={closeResetInterviewer}>
            {t('modals.cancel')}
          </Button>
          <Button color="red" onClick={clearInterviewerHistory}>
            {t('modals.resetInterview.confirm')}
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={resetTeacherModalOpen}
        onClose={closeResetTeacher}
        title={t('modals.resetTeacher.title')}
        centered
      >
        <Text size="sm" mb="md">
          {t('modals.resetTeacher.body')}
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={closeResetTeacher}>
            {t('modals.cancel')}
          </Button>
          <Button color="red" onClick={clearTeacherHistory}>
            {t('modals.resetTeacher.confirm')}
          </Button>
        </Group>
      </Modal>
    </>
  );
};
