import { toast } from 'sonner';

import { Button } from '../shadcn/button';

export function Sonner({
  title,
  description,
  action,
  buttonText,
  handleClick,
}) {
  const newDescription =
    description && description.length > 0 ? description : '';

  return (
    <Button
      variant="outline"
      onClick={() => {
        handleClick();

        toast(title, {
          description: newDescription,
          action: {},
        });
      }}
    >
      {buttonText}
    </Button>
  );
}
