import classes from '@/pages/LibraryPage/LibraryPage.module.css';
import { Title, Text, Box } from '@mantine/core';

interface FormattedDescriptionProps {
  text: string;
}

export const FormattedDescription: React.FC<FormattedDescriptionProps> = ({ text }) => {
  const formatText = (text: string) => {
    const blocks = text.split(/\n\n/);

    return blocks.map((block, blockIndex) => {
      const lines = block.split('\n');
      const firstLine = lines[0]?.trim() || '';

      const isTitle =
        lines.length === 1 &&
        (block.includes(':') || block.includes(':')) &&
        block.length < 100 &&
        !block.includes('{') &&
        !block.includes('}') &&
        !block.includes('//');

      if (isTitle) {
        return (
          <Title key={blockIndex} order={6} className={classes.title}>
            {block}
          </Title>
        );
      }

      const isPlainTextWithCodeWords =
        firstLine.startsWith('Особенности') ||
        firstLine.includes('—') ||
        firstLine.includes('–') ||
        (firstLine.includes('try...catch') && !firstLine.includes('{'));

      const isCodeBlock =
        !isPlainTextWithCodeWords &&
        ((block.includes('{') && block.includes('}')) ||
          block.includes('throw new') ||
          (block.includes('class ') && block.includes('extends')) ||
          (block.includes('fetch(') && block.includes('.then(')) ||
          (block.includes('await') && block.includes('try')) ||
          block.includes('// код') ||
          block.includes('// обработка') ||
          firstLine.startsWith('try {') ||
          firstLine.startsWith('throw') ||
          firstLine.startsWith('class') ||
          firstLine.startsWith('fetch(') ||
          (firstLine.startsWith('// Промисы') && lines.length > 1) ||
          (firstLine.startsWith('// async/await') && lines.length > 1));

      if (isCodeBlock) {
        return (
          <Box key={blockIndex} className={classes.codeBlockWrapper}>
            <Text component="code" className={classes.codeText}>
              {block}
            </Text>
          </Box>
        );
      }

      return (
        <Box key={blockIndex} className={classes.paragraph}>
          {lines.map((line, lineIndex) => (
            <Text key={lineIndex} component="p" className={classes.line}>
              {line}
            </Text>
          ))}
        </Box>
      );
    });
  };

  return <Box className={classes.description}>{formatText(text)}</Box>;
};
