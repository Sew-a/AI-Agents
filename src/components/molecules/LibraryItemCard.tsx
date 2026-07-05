import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { CopyButton } from '@/components/molecules/CopyButton';
import { LibraryItem } from '@/types';

interface LibraryItemCardProps {
  item: LibraryItem;
}

export function LibraryItemCard({ item }: LibraryItemCardProps) {
  return (
    <Card variant="prompt" className="prompt-example">
      <div>
        <h3>{item.title}</h3>
        <p>{item.use}</p>
      </div>
      <div>
        <div className="copy-row">
          <Badge>Example</Badge>
          <CopyButton text={item.prompt} label="Copy" />
        </div>
        <pre>
          <code>{item.prompt}</code>
        </pre>
      </div>
    </Card>
  );
}