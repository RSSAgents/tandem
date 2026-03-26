import { DrawerType } from '@/types/aiAgentTypes';
import { useEffect, useRef, useState } from 'react';

export const useClickOutsidePanel = () => {
  const [openPanel, setOpenPanel] = useState<DrawerType | null>(null);
  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const topicsBtnRef = useRef<HTMLButtonElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const topicsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openPanel) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        openPanel === 'menu' &&
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(target) &&
        !settingsBtnRef.current?.contains(target)
      ) {
        setOpenPanel(null);
      }
      if (
        openPanel === 'topics' &&
        topicsPanelRef.current &&
        !topicsPanelRef.current.contains(target) &&
        !topicsBtnRef.current?.contains(target)
      ) {
        setOpenPanel(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openPanel]);

  return {
    openPanel,
    setOpenPanel,
    settingsBtnRef,
    topicsBtnRef,
    settingsPanelRef,
    topicsPanelRef,
  };
};
